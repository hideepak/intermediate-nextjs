// app/(dashboard)/@sidebar/page.tsx
import React from 'react';

export default function Sidebar() {
  return (
    <div>
      <h2>Dashboard Sidebar</h2>
      <nav>
        <ul>
          <li><a href="/dashboard">Overview</a></li>
          <li><a href="/dashboard/settings">Settings</a></li>
          <li><a href="/dashboard/profile">Profile</a></li>
        </ul>
      </nav>
    </div>
  );
}
