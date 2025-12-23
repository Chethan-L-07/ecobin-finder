import { Link } from 'react-router-dom';
import { Recycle, Mail, Phone, MapPin, Heart, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 eco-gradient rounded-xl flex items-center justify-center">
                <Recycle className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">
                E-Waste<span className="text-primary">Locator</span>
              </span>
            </Link>
            <p className="text-background/70 text-sm">
              Helping communities find e-waste collection points for a cleaner, greener future.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/map" className="hover:text-primary transition-colors">Find E-Waste Bins</Link></li>
              <li><Link to="/add-bin" className="hover:text-primary transition-colors">Add New Bin</Link></li>
              <li><Link to="/education" className="hover:text-primary transition-colors">E-Waste Education</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-primary transition-colors">E-Waste Guidelines</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Recycling Tips</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Environmental Impact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Partner With Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@ewastelocator.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>123 Green Street, Eco City, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            © 2024 E-Waste Locator. All rights reserved.
          </p>
          <p className="text-sm text-background/60 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> for a Greener Planet
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
