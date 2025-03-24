
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-secondary/50 backdrop-blur-sm mt-auto">
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-xl font-bold text-primary">ClubHub</Link>
            <p className="mt-4 text-muted-foreground">
              A modern platform for college clubs management. Connect, collaborate, and create amazing events with your peers.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/clubs" className="text-muted-foreground hover:text-foreground transition-colors">Find Clubs</Link></li>
              <li><Link to="/events" className="text-muted-foreground hover:text-foreground transition-colors">Upcoming Events</Link></li>
              <li><Link to="/start-club" className="text-muted-foreground hover:text-foreground transition-colors">Start a Club</Link></li>
              <li><Link to="/guidelines" className="text-muted-foreground hover:text-foreground transition-colors">Club Guidelines</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} ClubHub. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Twitter
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Instagram
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
