
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ClubsList from '@/components/clubs/ClubsList';
import { ChevronRight, Users, Calendar, Trophy, Zap } from 'lucide-react';

// Mock data for featured clubs
const featuredClubs = [
  {
    id: '1',
    name: 'Tech Innovators',
    description: 'A community of tech enthusiasts working on cutting-edge projects and exploring emerging technologies.',
    logo: '/placeholder.svg',
    category: 'technology',
    memberCount: 120,
    eventCount: 15
  },
  {
    id: '2',
    name: 'Creative Arts Society',
    description: 'For students passionate about visual arts, design, photography, and creative expression.',
    logo: '/placeholder.svg',
    category: 'arts',
    memberCount: 85,
    eventCount: 8
  },
  {
    id: '3',
    name: 'Debate Club',
    description: 'Enhancing critical thinking and public speaking skills through competitive debating and discussions.',
    logo: '/placeholder.svg',
    category: 'academic',
    memberCount: 45,
    eventCount: 12
  }
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:pt-40 md:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-5" aria-hidden="true" />
        
        <div className="container relative mx-auto max-w-7xl">
          <div className="text-center space-y-8 max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Discover & Join College Clubs
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with like-minded students, pursue your passions, and make the most of your college experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="button-animation">
                <Link to="/clubs">Explore Clubs</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="button-animation">
                <Link to="/start-club">Start a Club</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Clubs */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-10">
            <div>
              <h2 className="text-3xl font-bold">Featured Clubs</h2>
              <p className="text-muted-foreground mt-2">Discover popular student organizations</p>
            </div>
            <Button asChild variant="ghost" className="group mt-4 md:mt-0">
              <Link to="/clubs" className="flex items-center gap-1">
                View all clubs
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          
          <ClubsList clubs={featuredClubs} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Why Use ClubHub?</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Our platform makes it easy to discover, join, and manage clubs at your college.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-secondary/30 rounded-lg text-center">
              <div className="rounded-full bg-primary/10 h-12 w-12 flex items-center justify-center mx-auto mb-4">
                <Users size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-muted-foreground">Join clubs that align with your interests and meet like-minded peers.</p>
            </div>

            <div className="p-6 bg-secondary/30 rounded-lg text-center">
              <div className="rounded-full bg-primary/10 h-12 w-12 flex items-center justify-center mx-auto mb-4">
                <Calendar size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Organize</h3>
              <p className="text-muted-foreground">Create and manage events effortlessly with our intuitive tools.</p>
            </div>

            <div className="p-6 bg-secondary/30 rounded-lg text-center">
              <div className="rounded-full bg-primary/10 h-12 w-12 flex items-center justify-center mx-auto mb-4">
                <Trophy size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Achieve</h3>
              <p className="text-muted-foreground">Build your portfolio and develop leadership skills for your future.</p>
            </div>

            <div className="p-6 bg-secondary/30 rounded-lg text-center">
              <div className="rounded-full bg-primary/10 h-12 w-12 flex items-center justify-center mx-auto mb-4">
                <Zap size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Simplify</h3>
              <p className="text-muted-foreground">Streamline club administration with membership and resource management.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold">Ready to get involved?</h2>
            <p className="text-muted-foreground">
              Join the vibrant community of student clubs and organizations today.
            </p>
            <Button asChild size="lg" className="button-animation mt-4">
              <Link to="/register">Create an Account</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
