// components/layout/Navigation.tsx
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathname = usePathname();
  
  const navItems = [
    { path: '/bio', label: 'Bio' },
    { path: '/apps', label: 'Apps' },
    { path: '/blog', label: 'Blog' }
  ];

  return (
    <nav>
      <div className="flex justify-between items-center h-16">
        <Link 
          href="/" 
          className="text-xl font-medium text-neutral-800 hover:text-neutral-600 transition-colors"
        >
          Ashwin Kumar M V
        </Link>
        
        <div className="flex items-center gap-8">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              href={path}
              className={`relative py-1 text-sm font-medium transition-colors ${
                pathname === path 
                  ? 'text-neutral-800' 
                  : 'text-neutral-600 hover:text-neutral-800'
              }`}
            >
              {label}
              {pathname === path && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-neutral-800" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
