
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Calendar, MapPin, Clock, ChevronLeft, Building, CalendarCheck, Users } from 'lucide-react';

const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Mock event data - in a real app, you would fetch this based on eventId
  const mockEvent = {
    id: eventId,
    title: 'Campus Photo Walk',
    description: 'Explore the campus and capture its beauty with fellow photographers. This event is perfect for photographers of all skill levels. We\'ll start at the Student Union and make our way through the campus gardens, historic buildings, and end at the lake for sunset shots. Bring your own camera equipment. The club has a limited number of DSLR cameras available for those who need to borrow one.',
    date: '2023-11-15T15:00:00',
    endTime: '2023-11-15T17:30:00',
    location: 'Meet at Student Union',
    image: '/placeholder.svg',
    organizer: {
      id: '1',
      name: 'Photography Club',
      logo: '/placeholder.svg'
    },
    tasks: [
      { id: '1', name: 'Equipment Setup', assigned: 'Jamie Smith' },
      { id: '2', name: 'Route Planning', assigned: 'Alex Johnson' },
      { id: '3', name: 'Refreshments', assigned: 'Morgan Brown' }
    ],
    sponsors: [
      { id: '1', name: 'Campus Bookstore', logo: '/placeholder.svg' },
      { id: '2', name: 'Local Camera Shop', logo: '/placeholder.svg' }
    ],
    attendees: 24,
    maxAttendees: 30
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };
  
  const handleRegister = async () => {
    setIsRegistering(true);
    
    try {
      // This would be an actual API call in a real implementation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Success!",
        description: `You've registered for ${mockEvent.title}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register for event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container px-4 py-8 max-w-6xl mx-auto">
        {/* Back button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link to={`/clubs/${mockEvent.organizer.id}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Club
          </Link>
        </Button>
        
        {/* Event header */}
        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8 animate-scale-in">
          <img 
            src={mockEvent.image} 
            alt={mockEvent.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="h-10 w-10 border-2 border-background">
                <AvatarImage src={mockEvent.organizer.logo} alt={mockEvent.organizer.name} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {mockEvent.organizer.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Badge variant="secondary">{mockEvent.organizer.name}</Badge>
            </div>
            <h1 className="text-3xl font-bold">{mockEvent.title}</h1>
          </div>
        </div>
        
        {/* Event content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About this Event</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{mockEvent.description}</p>
              </CardContent>
            </Card>
            
            {/* Tasks section */}
            <Card>
              <CardHeader>
                <CardTitle>Event Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="divide-y divide-border">
                  {mockEvent.tasks.map((task) => (
                    <li key={task.id} className="py-3 flex items-center justify-between">
                      <span className="font-medium">{task.name}</span>
                      <Badge variant="outline">{task.assigned}</Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {/* Sponsors section */}
            <Card>
              <CardHeader>
                <CardTitle>Event Sponsors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  {mockEvent.sponsors.map((sponsor) => (
                    <div key={sponsor.id} className="flex items-center gap-3 p-3 bg-muted rounded-md">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={sponsor.logo} alt={sponsor.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {sponsor.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{sponsor.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Event details sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Date</h4>
                    <p className="text-muted-foreground">{formatDate(mockEvent.date)}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Time</h4>
                    <p className="text-muted-foreground">
                      {formatTime(mockEvent.date)} - {formatTime(mockEvent.endTime)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-muted-foreground">{mockEvent.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Organized by</h4>
                    <p className="text-muted-foreground">{mockEvent.organizer.name}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-medium">Attendees</h4>
                    <p className="text-muted-foreground">
                      {mockEvent.attendees} / {mockEvent.maxAttendees} registered
                    </p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={handleRegister} 
                    disabled={isRegistering} 
                    className="w-full button-animation"
                  >
                    <CalendarCheck className="mr-2 h-5 w-5" />
                    {isRegistering ? 'Registering...' : 'Register for Event'}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  If you have any questions about this event, please contact the club organizers.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/clubs/${mockEvent.organizer.id}`}>
                    Contact Club
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetails;
