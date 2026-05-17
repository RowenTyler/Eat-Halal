"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, LogOut, Settings, Shield, Menu, X } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

interface UserProfile {
  full_name: string;
  avatar_url: string;
}

const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isAdmin, setIsAdmin] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      checkAdminStatus();
      fetchUserProfile();
    }
  }, [user]);

  // Close mobile menu when screen size changes
  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isMobile, mobileMenuOpen]);

  const checkAdminStatus = async () => {
    setIsAdmin(user?.role === 'admin');
  };

  const fetchUserProfile = async () => {
    setUserProfile({
      full_name: user?.fullName || '',
      avatar_url: user?.avatarUrl || ''
    });
  };

  const handleSignOut = async () => {
    try {
      logout();
      router.push('/');
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  const getUserDisplayName = () => {
    if (userProfile?.full_name) {
      return userProfile.full_name;
    }
    return user?.email || 'User';
  };

  const getUserInitials = () => {
    if (userProfile?.full_name) {
      return userProfile.full_name.charAt(0).toUpperCase();
    }
    return user?.email?.charAt(0).toUpperCase() || 'U';
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navigationItems = [
    { to: "/restaurants", label: "Discover Restaurants" },
    { to: "/add-restaurant", label: "Add Restaurant" },
    { to: "/claim-restaurant-search", label: "Claim Restaurant" },
    { to: "/pricing", label: "Pricing" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" }
  ];

  return (
    <>
      <header className="bg-white shadow-sm border-b relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Layout */}
            {isMobile ? (
              <>
                {/* Burger Menu */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMobileMenu}
                  className="p-2"
                >
                  {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>

                {/* Centered Logo */}
                <Link href="/" className="text-2xl font-bold text-green-600 absolute left-1/2 transform -translate-x-1/2">
                  Eat Halaal
                </Link>

                {/* Right Side - Login/User */}
                <div className="flex items-center">
                  {user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={userProfile?.avatar_url} alt={getUserDisplayName()} />
                            <AvatarFallback className="bg-green-100 text-green-700 text-xs">
                              {getUserInitials()}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="end" forceMount>
                        <div className="flex items-center justify-start gap-2 p-2">
                          <div className="flex flex-col space-y-1 leading-none">
                            <p className="font-medium text-sm">{getUserDisplayName()}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                            {isAdmin && (
                              <p className="text-xs text-green-600 font-medium">Administrator</p>
                            )}
                          </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard" className="cursor-pointer">
                            <User className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/profile-settings" className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Profile Settings</span>
                          </Link>
                        </DropdownMenuItem>
                        {isAdmin && (
                          <DropdownMenuItem asChild>
                            <Link href="/admin-dashboard" className="cursor-pointer">
                              <Shield className="mr-2 h-4 w-4" />
                              <span>Admin Dashboard</span>
                            </Link>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem asChild>
                          <Link href="/restaurant-dashboard" className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Restaurant Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Sign out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link href="/auth">
                      <Button size="sm">Login</Button>
                    </Link>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Desktop Layout */}
                <div className="flex items-center">
                  <Link href="/" className="text-2xl font-bold text-green-600">
                    Eat Halaal
                  </Link>
                </div>

                <nav className="hidden md:flex space-x-8">
                  {navigationItems.map((item) => (
                    <Link 
                      key={item.to}
                      href={item.to}
                      className="text-gray-700 hover:text-green-600 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="flex items-center space-x-4">
                  {user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={userProfile?.avatar_url} alt={getUserDisplayName()} />
                            <AvatarFallback className="bg-green-100 text-green-700">
                              {getUserInitials()}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="end" forceMount>
                        <div className="flex items-center justify-start gap-2 p-2">
                          <div className="flex flex-col space-y-1 leading-none">
                            <p className="font-medium">{getUserDisplayName()}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                            {isAdmin && (
                              <p className="text-xs text-green-600 font-medium">Administrator</p>
                            )}
                          </div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/dashboard" className="cursor-pointer">
                            <User className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/profile-settings" className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Profile Settings</span>
                          </Link>
                        </DropdownMenuItem>
                        {isAdmin && (
                          <DropdownMenuItem asChild>
                            <Link href="/admin-dashboard" className="cursor-pointer">
                              <Shield className="mr-2 h-4 w-4" />
                              <span>Admin Dashboard</span>
                            </Link>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem asChild>
                          <Link href="/restaurant-dashboard" className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Restaurant Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Sign out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link href="/auth">
                      <Button>Sign In</Button>
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobile && mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={closeMobileMenu}>
          <div className="fixed inset-y-0 left-0 w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <Link href="/" className="text-2xl font-bold text-green-600" onClick={closeMobileMenu}>
                  Eat Halaal
                </Link>
                <Button variant="ghost" size="sm" onClick={closeMobileMenu}>
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Mobile Menu Items */}
              <div className="flex-1 flex flex-col justify-center items-center space-y-8 p-8">
                {navigationItems.map((item) => (
                  <Link
                    key={item.to}
                    href={item.to}
                    className="text-2xl font-medium text-gray-900 hover:text-green-600 transition-colors text-center"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {user && (
                  <>
                    <Link
                      href="/dashboard"
                      className="text-2xl font-medium text-gray-900 hover:text-green-600 transition-colors text-center"
                      onClick={closeMobileMenu}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/restaurant-dashboard"
                      className="text-2xl font-medium text-gray-900 hover:text-green-600 transition-colors text-center"
                      onClick={closeMobileMenu}
                    >
                      Restaurant Dashboard
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Footer */}
              {user && (
                <div className="p-4 border-t">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={userProfile?.avatar_url} alt={getUserDisplayName()} />
                      <AvatarFallback className="bg-green-100 text-green-700">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{getUserDisplayName()}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => {
                      handleSignOut();
                      closeMobileMenu();
                    }} 
                    variant="outline" 
                    className="w-full"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;