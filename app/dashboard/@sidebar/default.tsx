// app/(dashboard)/@sidebar/page.tsx
import React from 'react';
import Link from 'next/link'

export default function Sidebar() {
  return (
    <div>
      <h2>Dashboard Sidebar</h2>
      <nav>
        <ul>
          <Link href="/dashboard/settings">D-Overview</Link>
          <Link href="/dashboard/settings">D-Settings</Link>
          <Link href="/dashboard/profile">D-Profile </Link>
        </ul>
      </nav>
    </div>
  );
}
