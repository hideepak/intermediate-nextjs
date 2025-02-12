// app/(dashboard)/layout.tsx
import React from 'react';
import Sidebar from '@/components/Sidebar'

interface DashboardLayoutProps {
  children: React.ReactNode;
  // The prop name matches the folder name without the "@" prefix.
  sidebar: React.ReactNode;
}

export default function DashboardLayout({
                                          children,
                                          sidebar,
                                        }: DashboardLayoutProps) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar slot */}
      <aside style={{ width: '250px', background: 'blue', padding: '1rem' }}>
        {sidebar}
        <Sidebar />
      </aside>
      {/* Main dashboard content */}
      <main style={{ flex: 1, padding: '1rem' }}>{children}</main>
    </div>
  );
}
