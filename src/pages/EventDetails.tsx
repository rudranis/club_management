
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, MapPin, Users, ChevronLeft } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Mock events data
const eventsData = {
  'e1': {
    id: 'e1',
    title: 'Web Development Workshop',
    date: '2023-06-10',
    time: '3:00 PM - 5:00 PM',
    location: 'Tech Building, Room 302',
    description: 'Learn the fundamentals of modern web development with React and Node.js. This workshop is suitable for beginners and intermediate developers looking to enhance their skills. Bring your laptop with you to follow along with the practical exercises.',
    clubId: '1',
    clubName: 'Tech Innovators',
    clubLogo: '/placeholder.svg',
    attendeeCount: 45,
    maxAttendees: 60,
    organizers: [
      { id: 'o1', name: 'Alex Morgan', role: 'Workshop Lead', avatar: '/placeholder.svg' },
      { id: 'o2', name: 'Jamie Lee', role: 'Assistant', avatar: '/placeholder.svg' }
    ],
    requirements: [
      'Laptop with Node.js installed',
      'Basic understanding of HTML/CSS',
      'GitHub account'
    ],
    agenda: [
      { time: '3:00 PM', activity: 'Introduction to modern web development' },
      { time: '3:30 PM', activity: 'Setting up your development environment' },
      { time: '4:00 PM', activity: 'Hands-on coding session' },
      { time: '4:45 PM', activity: 'Q&A and resources for further learning' }
    ]
  },
  'e2': {
    id: 'e2',
    title: 'Annual Hackathon',
    date: '2023-07-15',
    time: '9:00 AM - 9:00 PM',
    location: 'Student Center',
    description: '12-hour coding competition with prizes for the most innovative projects. Form teams and build something amazing in a day! All skill levels are welcome.',
    clubId: '1',
    clubName: 'Tech Innovators',
    clubLogo: '/placeholder.svg',
    attendeeCount: 78,
    maxAttendees: 100,
    organizers: [
      { id: 'o1', name: 'Alex Morgan', role: 'Event Coordinator', avatar: '/placeholder.svg' },
      { id: 'o3', name: 'Taylor Kim', role: 'Logistics Manager', avatar: '/placeholder.svg' }
    ],
    requirements: [
      'Laptop and charger',
      'Team of 2-4 people (or join solo and we\'ll help you find a team)',
      'Student ID'
    ],
    agenda: [
      { time: '9:00 AM', activity: 'Check-in and team formation' },
      { time: '10:00 AM', activity: 'Kickoff and theme announcement' },
      { time: '10:30 AM - 8:00 PM', activity: 'Coding time!' },
      { time: '8:00 PM', activity: 'Project submissions due' },
      { time: '8:15 PM', activity: 'Project presentations and judging' },
      { time: '9:00 PM', activity: 'Winners announcement and prizes' }
    ]
  },
  'e3': {
    id: 'e3',
    title: 'Spring Art Exhibition',
    date: '2023-05-20',
    time: '6:00 PM - 9:00 PM',
    location: 'Campus Gallery',
    description: 'Annual showcase of student artwork across multiple mediums including painting, sculpture, photography, and digital art.',
    clubId: '2',
    clubName: 'Creative Arts Society',
    clubLogo: '/placeholder.svg',
    attendeeCount: 112,
    maxAttendees: 200,
    organizers: [
      { id: 'o4', name: 'Sam Wilson', role: 'Exhibition Curator', avatar: '/placeholder.svg' },
      { id: 'o5', name: 'Riley Adams', role: 'Gallery Manager', avatar: '/placeholder.svg' }
    ],
    requirements: [],
    agenda: [
      { time: '6:00 PM', activity: 'Doors open' },
      { time: '6:30 PM', activity: 'Opening remarks' },
      { time: '6:45 PM - 8:30 PM', activity: 'Gallery viewing' },
      { time: '8:30 PM', activity: 'Artist recognition ceremony' },
      { time: '9:00 PM', activity: 'Event concludes' }
    ]
  }
};

const EventDetails = () => {
  const { eventId } = useParams();
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Get event data based on eventId
  const event = eventsData[eventId as keyof typeof eventsData];
  
  if (!event) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-32 pb-20 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <p className="mb-6">The event you're looking for doesn't exist or has ended.</p>
          <Button asChild>
            <Link to="/events">Browse Events</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleRegister = () => {
    setIsRegistering(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRegistering(false);
      toast({
        title: "Success!",
        description: `You've registered for ${event.title}.`,
      });
    }, 1000);
  };
  
  const isEventFull = event.attendeeCount >= event.maxAttendees;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Back Link */}
          <Link to={`/clubs/${event.clubId}`} className="inline-flex items-center gap-1 mb-6 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft size={16} />
            <span>Back to {event.clubName}</span>
          </Link>
          
          {/* Event Header */}
          <div className="bg-secondary/30 rounded-lg p-6 mb-8 animate-fade-in">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={event.clubLogo} alt={event.clubName} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {event.clubName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Link to={`/clubs/${event.clubId}`} className="font-medium hover:text-primary transition-colors">
                  {event.clubName}
                </Link>
              </div>
              
              <div>
                <h1 className="text-3xl font-bold mb-3">{event.title}</h1>
                <p className="text-muted-foreground mb-5">{event.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-primary" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-primary" />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users size={18} className="text-muted-foreground" />
                    <span>{event.attendeeCount} / {event.maxAttendees} registered</span>
                    {isEventFull && (
                      <Badge variant="secondary">Event Full</Badge>
                    )}
                  </div>
                  
                  <Button 
                    className="button-animation"
                    onClick={handleRegister}
                    disabled={isRegistering || isEventFull}
                  >
                    {isRegistering 
                      ? 'Processing...' 
                      : isEventFull 
                        ? 'Event Full' 
                        : 'Register for Event'
                    }
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Event Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {/* Agenda */}
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">Event Agenda</h2>
                  
                  <div className="space-y-4">
                    {event.agenda.map((item, index) => (
                      <div 
                        key={index} 
                        className="flex gap-4 p-3 border-l-2 border-primary/30 pl-4 hover:border-primary transition-colors"
                      >
                        <div className="w-20 font-medium">{item.time}</div>
                        <div>{item.activity}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Requirements */}
              {event.requirements.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-semibold mb-4">What to Bring</h2>
                    
                    <ul className="list-disc pl-5 space-y-2">
                      {event.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div>
              {/* Organizers */}
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-lg font-semibold mb-4">Event Organizers</h2>
                  
                  <div className="space-y-4">
                    {event.organizers.map(organizer => (
                      <div key={organizer.id} className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={organizer.avatar} alt={organizer.name} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {organizer.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{organizer.name}</p>
                          <p className="text-sm text-muted-foreground">{organizer.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetails;
