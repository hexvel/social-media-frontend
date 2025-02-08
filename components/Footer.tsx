"use client";

import { Github, Heart, Send } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className='w-full border-t border-white/10 bg-primary-theme backdrop-blur-sm mt-auto'>
      <div className='mx-auto max-w-7xl px-4 py-6'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          <div className='flex flex-col items-center md:items-start gap-2'>
            <Link
              href='/'
              className='text-xl font-medium tracking-tight hover:text-primary/90 transition-colors'
            >
              HEXBOOK
            </Link>
            <p className='text-sm text-muted-foreground text-center md:text-left'>
              Social network of the new generation
            </p>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <p className='text-sm text-muted-foreground flex items-center gap-1'>
              Made with <Heart className='w-4 h-4 text-red-500' /> in Russia
            </p>
            <p className='text-xs text-muted-foreground'>
              © {new Date().getFullYear()} HEXBOOK. All rights reserved
            </p>
          </div>

          <div className='flex items-center gap-4'>
            <Link
              href='https://github.com/hexvel'
              target='_blank'
              className='text-muted-foreground hover:text-primary transition-colors'
            >
              <Github className='w-5 h-5' />
            </Link>
            <Link
              href='https://t.me/hexvel'
              target='_blank'
              className='text-muted-foreground hover:text-primary transition-colors'
            >
              <Send className='w-5 h-5' />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
