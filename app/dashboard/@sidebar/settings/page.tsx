// app/(dashboard)/@sidebar/page.tsx
import React from 'react';
import Link from 'next/link'

export default function Sidebar() {
  return (
    <div>
      <h2>Dashboard Sidebar</h2>
      <nav>
        <ul>
          <Link href="/dashboard">S-Overview</Link>
          <Link href="/dashboard/settings">S-Settings</Link>
          <Link href="/dashboard/profile">S-Profile </Link>
        </ul>
      </nav>
    </div>
  );
}
