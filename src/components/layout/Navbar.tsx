
import React from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Bell, HelpCircle, User } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <SidebarTrigger>
            <Button variant="ghost" size="icon" className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </Button>
          </SidebarTrigger>
          <h1 className="text-xl font-semibold ml-2 text-agri-primary hidden md:block">
            Planificación Financiera Agrícola
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
