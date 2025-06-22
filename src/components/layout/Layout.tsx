// src/components/layout/Layout.tsx
import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-purple-50 flex flex-col">
      <Navbar />
      <div className="flex-1 p-8 flex justify-center">
        <div className="w-full max-w-4xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;