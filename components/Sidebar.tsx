// app/components/Sidebar.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

/**
 * isActive helper
 *
 * Checks whether the targetPath should be considered active given the currentPath.
 * Here, a route is active if the currentPath exactly matches the target,
 * or if the currentPath starts with the target (this behavior can be adjusted).
 *
 * @param currentPath - The current URL pathname.
 * @param targetPath - The route we want to check.
 * @returns boolean - true if active, false otherwise.
 */
function isActive(currentPath: string, targetPath: string): boolean {
  return currentPath === targetPath || currentPath.startsWith(targetPath);
}

export default function Sidebar() {
  // usePathname returns the current URL pathname.
  const pathname = usePathname();

  // Define your navigation items.
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Profile', path: '/profile' },
    { label: 'Settings', path: '/settings' },
  ];

  return (
    <nav className="p-4">
      <ul>
        {navItems.map((item) => (
          <li key={item.path} className="mb-2">
            {/*
                The <Link> element receives conditional styling:
                - If active, it gets a blue background and white text.
                - Otherwise, it gets gray text and a hover effect.
              */}
            <Link className={clsx(
              'block px-4 py-2 rounded transition-colors duration-200',
              isActive(pathname, item.path)
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            )} href={item.path}>


                {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
