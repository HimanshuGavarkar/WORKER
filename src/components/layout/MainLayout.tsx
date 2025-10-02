'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import DebugPanel from '../common/DebugPanel';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="lg:pl-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-6">
          {children}
        </main>
      </div>
      
      {/* Debug Panel - only in development */}
      {process.env.NODE_ENV === 'development' && <DebugPanel />}
    </div>
  );
}