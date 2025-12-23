import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Recycle, Menu, X, MapPin, BookOpen, Phone, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home', icon: Recycle },
    { to: '/map', label: 'Find Bins', icon: MapPin },
    { to: '/add-bin', label: 'Add Bin', icon: PlusCircle },
    { to: '/education', label: 'Learn', icon: BookOpen },
    { to: '/contact', label: 'Contact', icon: Phone },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 eco-gradient rounded-xl flex items-center justify-center shadow-eco-sm group-hover:shadow-eco-md transition-shadow">
              <Recycle className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:block">
              E-Waste<span className="text-primary">Locator</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to}>
                <Button
                  variant={isActive(to) ? 'default' : 'ghost'}
                  size="sm"
                  className={`gap-2 ${isActive(to) ? 'eco-gradient text-primary-foreground shadow-eco-sm' : ''}`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link key={to} to={to} onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant={isActive(to) ? 'default' : 'ghost'}
                    className={`w-full justify-start gap-3 ${isActive(to) ? 'eco-gradient text-primary-foreground' : ''}`}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </Button>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
