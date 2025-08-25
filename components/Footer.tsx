import { Github, Linkedin } from 'lucide-react'

export default function Footer(){
  return (
    <footer className="section pt-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/75">
        <p className="text-sm">© {new Date().getFullYear()} Andrew Lonati</p>

        <div className="flex items-center gap-5">
          <a
            href="https://github.com/aroman117-1618"
            target="_blank" rel="noopener"
            className="inline-flex items-center gap-2 hover:text-white"
            aria-label="GitHub"
          >
            <Github size={18} /> <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/andrew-lonati/"
            target="_blank" rel="noopener"
            className="inline-flex items-center gap-2 hover:text-white"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} /> <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
