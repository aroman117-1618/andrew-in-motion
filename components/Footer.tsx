import { Github, Linkedin } from 'lucide-react'
import DeepLink from '@/components/DeepLink'

export default function Footer(){
  return (
    <footer className="section pt-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/75">
        <p className="text-sm">© {new Date().getFullYear()} Andrew Lonati</p>

        <div className="flex items-center gap-5">
          <DeepLink
            webUrl="https://github.com/aroman117-1618"
            iosSchemeUrl="github://user?login=aroman117-1618"
            androidIntentUrl="intent://user?login=aroman117-1618#Intent;scheme=github;package=com.github.android;end"
            className="inline-flex items-center gap-2 hover:text-white"
          >
            <Github size={18} /> <span>GitHub</span>
          </DeepLink>

          <DeepLink
            webUrl="https://www.linkedin.com/in/andrewroman117"
            iosSchemeUrl="linkedin://in/andrewroman117"
            androidIntentUrl="intent://in/andrewroman117#Intent;scheme=linkedin;package=com.linkedin.android;end"
            className="inline-flex items-center gap-2 hover:text-white"
          >
            <Linkedin size={18} /> <span>LinkedIn</span>
          </DeepLink>
        </div>
      </div>
    </footer>
  )
}
