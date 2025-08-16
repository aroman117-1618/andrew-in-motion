export default function Footer() {
  return (
    <footer className="py-8 text-center border-t border-primary/20 bg-background/80">
      <p className="text-sm text-foreground/60">© {new Date().getFullYear()} Andrew in Motion. All rights reserved.</p>
    </footer>
  );
}