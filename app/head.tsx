// head.tsx – Document head for global metadata and favicon
export default function Head() {
  return (
    <>
      <title>Andrew in Motion</title>
      <meta name="description" content="Operational advisory and automation services by Andrew Lonati" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* Link to the favicon in the public directory */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
    </>
  );
}
