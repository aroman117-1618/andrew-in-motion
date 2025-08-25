export const vert = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = (a_position * 0.5) + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export const frag = `
precision mediump float;
varying vec2 v_uv;

uniform vec2  u_resolution;
uniform float u_time;
uniform float u_seed;
uniform vec3  u_colors[5]; // deep greens → mint/near-white (highlights only)

/* ---------------- utils ---------------- */
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
vec2  rot(vec2 p, float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c)*p; }

float noise(in vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(a, b, u.x) + (c - a)*u.y*(1.0 - u.x) + (d - b)*u.x*u.y;
}

float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i=0; i<6; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

// Curl noise (scalar → 2D “velocity”)
vec2 curl(vec2 p) {
  float e = 0.001;
  float n1 = fbm(p + vec2(0.0, e));
  float n2 = fbm(p - vec2(0.0, e));
  float n3 = fbm(p + vec2(e, 0.0));
  float n4 = fbm(p - vec2(e, 0.0));
  return vec2((n1 - n2)/(2.0*e), -(n4 - n3)/(2.0*e));
}

float biasf(float x, float b){ return x / ( ((1.0/b)-2.0)*(1.0-x) + 1.0 ); }

// Palette: greens dominate; mint/white only as highlight
vec3 ramp(float t) {
  t = biasf(clamp(t,0.0,1.0), 0.35);
  float s0 = smoothstep(0.00, 0.30, t);
  float s1 = smoothstep(0.30, 0.55, t);
  float s2 = smoothstep(0.55, 0.80, t);
  vec3 c = mix(u_colors[0], u_colors[1], s0);
  c = mix(c, u_colors[2], s1);
  c = mix(c, u_colors[3], s2*0.5);
  c = mix(c, u_colors[4], smoothstep(0.92,0.995,t)); // rare highlights
  return c;
}

/* --------------- main --------------- */
void main(){
  vec2 uv = v_uv;
  vec2 res = u_resolution;
  vec2 p = (uv * res) / min(res.x, res.y);

  float t = u_time*0.006;
  float seed = u_seed;

  // Chaotic, time-varying flow (no single drift direction)
  vec2 q = p * 1.25 + seed;
  vec2 f1 = curl(q + t*0.65);
  vec2 f2 = curl(q*1.7 - t*0.43);
  vec2 f3 = curl(rot(q*0.9, sin(t*0.21 + seed))*1.3 + t*0.18);
  vec2 dir = normalize( rot(f1, t*0.4) + 0.7*rot(f2, -t*0.33) + 0.5*f3 + 1e-6 );

  // LIC with jitter so fibers feel stormy & never repeat
  const int   STEPS = 36;         // crispness
  const float STEP  = 0.052;      // spacing
  float acc = 0.0, wsum = 0.0;
  float sparkAcc = 0.0;

  for (int i = -STEPS/2; i < STEPS/2; i++) {
    float fi = float(i);

    // tiny per-sample jitter (breaks uniform flow)
    float jx = hash(q + vec2(fi*1.123, fi*0.927)) - 0.5;
    float jy = hash(q + vec2(-fi*0.733, fi*1.271)) - 0.5;
    vec2 jitter = 0.02 * vec2(jx, jy);

    // integrate asymmetrically (slight bias forward = visible “trails”)
    vec2 pp = q + (dir + jitter) * fi * STEP;

    float s = fbm(pp * 1.35 + t*0.50);

    // gaussian kernel: thin fibers
    float w = exp(-abs(fi) * 0.12);
    acc += s * w;
    wsum += w;

    // --- spark/bead kernel (bright balls of light with trailing) ---
    // periodic phase with randomness so beads don't align
    float phase = fract( fbm(pp*0.7 - t*0.15) * 5.0 + t*0.85 + hash(floor(pp*3.0 + seed)) );
    float bead  = exp(-phase*phase * 22.0);          // round bead
    float tail  = smoothstep(-0.2, 1.0, fi/float(STEPS/2)); // emphasize forward trail
    sparkAcc += bead * w * tail;
  }

  float streak = acc / max(wsum, 1e-4);
  float fibers = pow(smoothstep(0.62, 0.90, streak), 2.2);

  vec3 base = ramp(streak);
  // Sparks push toward highlight color
  vec3 highlight = mix(base, u_colors[4], 0.85);
  vec3 col = mix(base * 0.85, base + vec3(0.0), fibers);
  col = mix(col, highlight, clamp(sparkAcc * 0.7, 0.0, 1.0));

  // soft vignette
  vec2 d = uv - 0.5;
  col *= 1.0 - dot(d,d) * 0.20;

  gl_FragColor = vec4(pow(col, vec3(0.95)), 1.0);
}
`;
