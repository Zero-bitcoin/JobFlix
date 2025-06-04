import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Bell, 
  Plus, 
  Menu, 
  X,
  User,
  Building,
  FileText,
  LogOut
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Lavori", active: location === "/" },
    { href: "/companies", label: "Aziende", active: location === "/companies" },
    { href: "/applications", label: "Candidature", active: location === "/applications" },
    { href: "/post-job", label: "Pubblica Lavoro", active: location === "/post-job" },
    { href: "/profile", label: "Profilo", active: location === "/profile" },
  ];

  const MobileNav = () => (
    <div className="space-y-4">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          <button
            onClick={() => setIsOpen(false)}
            className={`block w-full text-left px-3 py-2 text-lg font-medium transition-colors duration-200 ${
              item.active 
                ? "text-white netflix-red" 
                : "netflix-text hover:text-white"
            }`}
          >
            {item.label}
          </button>
        </Link>
      ))}
      <div className="pt-4 border-t border-gray-700">
        <Button className="w-full bg-netflix-red hover:bg-netflix-dark-red text-white mb-4">
          <Plus className="h-4 w-4 mr-2" />
          Pubblica Lavoro
        </Button>
        <div className="space-y-2">
          <button className="flex items-center w-full px-3 py-2 text-left netflix-text hover:text-white">
            <User className="h-4 w-4 mr-3" />
            Il mio profilo
          </button>
          <button className="flex items-center w-full px-3 py-2 text-left netflix-text hover:text-white">
            <FileText className="h-4 w-4 mr-3" />
            Le mie candidature
          </button>
          <button className="flex items-center w-full px-3 py-2 text-left netflix-text hover:text-white">
            <LogOut className="h-4 w-4 mr-3" />
            Esci
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <nav className="fixed top-0 w-full netflix-bg/95 backdrop-blur-sm z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/">
              <h1 className="text-3xl font-bold netflix-red cursor-pointer tracking-wide">JobFlix</h1>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <button
                      className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                        item.active 
                          ? "text-white netflix-red" 
                          : "netflix-text hover:text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Cerca lavoro..."
                className="netflix-surface border-gray-600 rounded-lg px-4 py-2 pl-10 text-sm focus:ring-2 focus:ring-netflix-red focus:border-netflix-red w-64"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 netflix-text" />
            </div>

            {/* Post CV Button */}
            <Link href="/upload-cv">
              <Button className="bg-netflix-red hover:bg-netflix-dark-red text-white">
                <Plus className="h-4 w-4 mr-2" />
                Pubblica CV
              </Button>
            </Link>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="netflix-text hover:text-white">
              <Bell className="h-5 w-5" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-8 h-8 bg-netflix-red rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold">MR</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 netflix-surface border-gray-700">
                <Link href="/profile">
                  <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700">
                    <User className="mr-2 h-4 w-4" />
                    <span>Il mio profilo</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700">
                  <Building className="mr-2 h-4 w-4" />
                  <span>La mia azienda</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Le mie candidature</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="hover:bg-gray-700 focus:bg-gray-700">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Esci</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="netflix-surface border-gray-700 w-80">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold netflix-red tracking-wide">JobFlix</h2>
                </div>
                <MobileNav />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
