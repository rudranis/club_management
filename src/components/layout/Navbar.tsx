
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  User, 
  ChevronDown,
  LogOut
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Mock authentication state (replace with actual auth later)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Mock logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-background/90 backdrop-blur-md shadow-subtle py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 font-bold text-xl tracking-tight animate-fade-in"
        >
          <span className="text-primary">ClubHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 animate-fade-in">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/clubs" className="nav-link">Clubs</Link>
          <Link to="/events" className="nav-link">Events</Link>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User size={18} />
                  <span>Account</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 animate-scale-in">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center gap-2 cursor-pointer">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive">
                  <LogOut size={16} />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3">
              <Button asChild variant="ghost" className="button-animation">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="button-animation">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-background animate-slide-in">
          <nav className="container flex flex-col gap-4 pt-8">
            <Link to="/" className="w-full p-3 hover:bg-accent rounded-md">Home</Link>
            <Link to="/clubs" className="w-full p-3 hover:bg-accent rounded-md">Clubs</Link>
            <Link to="/events" className="w-full p-3 hover:bg-accent rounded-md">Events</Link>
            <div className="border-t my-4"></div>
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="w-full p-3 hover:bg-accent rounded-md">Dashboard</Link>
                <Link to="/profile" className="w-full p-3 hover:bg-accent rounded-md">Profile</Link>
                <Button 
                  variant="destructive" 
                  className="mt-4"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex flex-col gap-3 mt-4">
                <Button asChild variant="outline">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
