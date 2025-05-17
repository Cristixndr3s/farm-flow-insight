
import React from 'react';
import { 
  Sidebar as SidebarComponent, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { Home, BarChart3, FileText, Settings, Leaf, PiggyBank, DollarSign, Calendar } from "lucide-react";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  // Menu items for the sidebar
  const menuItems = [
    { title: 'Inicio', icon: Home, url: '/' },
    { title: 'Nuevo Plan', icon: FileText, url: '/plan/new' },
    { title: 'Dashboard', icon: BarChart3, url: '/dashboard' },
    { title: 'Reportes', icon: FileText, url: '/reports' },
  ];

  const toolsItems = [
    { title: 'Calendario', icon: Calendar, url: '/calendar' },
    { title: 'Cultivos', icon: Leaf, url: '/crops' },
    { title: 'Finanzas', icon: PiggyBank, url: '/finances' },
    { title: 'Préstamos', icon: DollarSign, url: '/loans' },
  ];

  return (
    <SidebarComponent>
      <div className="p-4">
        <div className="flex items-center space-x-2">
          <img src="/placeholder.svg" alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-bold">AgriFinance</span>
        </div>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Herramientas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/settings" className="flex items-center">
                    <Settings className="h-5 w-5 mr-3" />
                    <span>Configuración</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
};

export default Sidebar;
