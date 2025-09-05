import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  DollarSign, 
  Minus, 
  Package, 
  Users, 
  BarChart3,
  Sprout 
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Sales', url: '/dashboard/sales', icon: DollarSign },
  { title: 'Expenses', url: '/dashboard/expenses', icon: Minus },
  { title: 'Inventory', url: '/dashboard/inventory', icon: Package },
  { title: 'Livestock', url: '/dashboard/livestock', icon: Users },
  { title: 'Reports', url: '/dashboard/reports', icon: BarChart3 },
];

export const AppSidebar: React.FC = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === 'collapsed';
  
  const getNavClass = ({ isActive }: { isActive: boolean }) => 
    isActive 
      ? 'bg-primary/10 text-primary font-medium border-r-2 border-primary' 
      : 'hover:bg-accent hover:text-accent-foreground';

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Sprout className="h-8 w-8 text-primary" />
          {!collapsed && (
            <span className="text-lg font-bold text-foreground">FarmManager</span>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="transition-colors">
                    <NavLink 
                      to={item.url} 
                      end={item.url === '/dashboard'}
                      className={getNavClass}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};