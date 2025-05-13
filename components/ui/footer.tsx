import { Github } from "lucide-react";
import Link from "next/link";
import { Separator } from "./separator";

export function Footer() {
  const currentYear = 2025;

  return (
    <footer className="w-full py-6 px-4 md:px-6 bg-background border-t">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-sm font-medium hover:underline">
                Home
              </Link>
              <Link
                href="https://github.com/alessandroamella/subito-client"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-medium hover:underline"
              >
                <Github size={16} />
                <span>GitHub</span>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} Created by{" "}
              <a
                href="https://bitrey.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline hover:text-primary"
              >
                Alessandro Amella
              </a>{" "}
              · <span className="font-medium">MIT License</span>
            </p>
          </div>

          <Separator className="md:hidden" />

          <div className="text-xs text-muted-foreground max-w-md text-center md:text-right">
            <p>
              This is an unofficial client for Subito.it. It is not affiliated with, authorized,
              maintained, sponsored, or endorsed by Subito or any of its affiliates or subsidiaries.
              Use at your own risk.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
