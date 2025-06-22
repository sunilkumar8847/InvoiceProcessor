// src/components/layout/Navbar.tsx
import React from 'react';
import { Settings, HelpCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navigate = useNavigate();

  return (
    <div className="w-full bg-white bg-opacity-80 py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')} >
        <div className="text-blue-400">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L6 6L12 10L18 6L12 2Z" fill="currentColor" />
            <path d="M6 14L12 18L18 14" fill="currentColor" />
            <path d="M6 10L12 14L18 10" fill="currentColor" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold">Invoice Processor</h1>
      </div>
      <div className="flex items-center gap-6">
        <button className="flex items-center gap-1 text-sm text-gray-600">
          <Settings size={18} />
          <span>Settings</span>
        </button>
        <button className="flex items-center gap-1 text-sm text-gray-600">
          <HelpCircle size={18} />
          <span>Help</span>
        </button>
        <button className="flex items-center gap-1 text-sm text-gray-600">
          <LogOut size={18} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
