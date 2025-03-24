
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Calendar, Users, ChevronLeft, Info, Clock, MapPin, User, Calendar as CalendarIcon } from 'lucide-react';
import ClubEvents from '@/components/clubs/ClubEvents';
import ClubMembers from '@/components/clubs/ClubMembers';

// Mock club data
const mockClub = {
  id: '1',
  name: 'Photography Club',
  description: 'A community of photography enthusiasts who meet regularly to share techniques, critique work, and organize photo walks around campus. We welcome photographers of all skill levels, from beginners to advanced. Our club provides access to photography equipment, organizes workshops with professional photographers, and holds exhibitions of members\' work throughout the academic year.',
  logo: '/placeholder.svg',
  category: 'arts',
  memberCount: 42,
  eventCount: 5,
  createdDate: '2022-09-01T10:00:00',
  location: 'Arts Building, Room 302',
  meetingTime: 'Wednesdays, 4:00 PM',
  president: 'Alex Johnson',
  faculty: 'Prof. Maria Garcia'
};

// Mock events data
const mockEvents = [
  {
    id: '1',
    title: 'Campus Photo Walk',
    description: 'Explore the campus and capture its beauty with fellow photographers.',
    date: '2023-11-15T15:00:00',
    location: 'Meet at Student Union',
    image: '/placeholder.svg'
  },
  {
    id: '2',
    title: 'Portrait Photography Workshop',
    description: 'Learn portrait photography techniques with professional equipment.',
    date: '2023-11-22T16:00:00',
    location: 'Arts Building, Room 302',
    image: '/placeholder.svg'
  },
  {
    id: '3',
    title: 'Winter Exhibition Planning',
    description: 'Planning session for our upcoming winter photography exhibition.',
    date: '2023-12-01T15:00:00',
    location: 'Library Conference Room',
    image: '/placeholder.svg'
  }
];

// Mock members data
const mockMembers = [
  {
    id: '1',
    name: 'Alex Johnson',
    role: 'President',
    avatar: '/placeholder.svg',
    joinDate: '2022-09-01T10:00:00'
  },
  {
    id: '2',
    name: 'Jamie Smith',
    role: 'Vice President',
    avatar: '/placeholder.svg',
    joinDate: '2022-09-05T10:00:00'
  },
  {
    id: '3',
    name: 'Taylor Wilson',
    role: 'Secretary',
    avatar: '/placeholder.svg',
    joinDate: '2022-09-10T10:00:00'
  },
  {
    id: '4',
    name: 'Morgan Brown',
    role: 'Treasurer',
    avatar: '/placeholder.svg',
    joinDate: '2022-09-15T10:00:00'
  },
  {
    id: '5',
    name: 'Sam Davis',
    role: 'Member',
    avatar: '/placeholder.svg',
    joinDate: '2022-10-01T10:00:00'
  }
];

const ClubDetails = () => {
  const { clubId } = useParams<{ clubId: string }>();
  const [isJoinLoading, setIsJoinLoading] = useState(false);
  
  // In a real app, you would fetch club data based on clubId from your API
  // For now, we'll use the mock data
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric'
    }).format(date);
  };
  
  const handleJoinRequest = async () => {
    setIsJoinLoading(true);
    
    try {
      // This would be an actual API call in a real implementation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Request sent!",
        description: `Your request to join ${mockClub.name} has been sent.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send join request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsJoinLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container px-4 py-8 max-w-6xl mx-auto">
        {/* Back button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/dashboard">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        
        {/* Club header */}
        <div className="bg-accent p-6 rounded-lg mb-8 animate-scale-in">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="h-24 w-24 rounded-md border-4 border-background">
              <AvatarImage src={mockClub.logo} alt={mockClub.name} />
              <AvatarFallback className="text-2xl rounded-md bg-primary/10 text-primary">
                {mockClub.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-grow">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge>{mockClub.category}</Badge>
                <Badge variant="outline">{mockClub.memberCount} members</Badge>
                <Badge variant="outline">{mockClub.eventCount} events</Badge>
              </div>
              <h1 className="text-3xl font-bold">{mockClub.name}</h1>
              <p className="text-muted-foreground mt-1">
                Established {formatDate(mockClub.createdDate)}
              </p>
            </div>
            
            <Button onClick={handleJoinRequest} disabled={isJoinLoading} className="button-animation">
              {isJoinLoading ? 'Sending Request...' : 'Request to Join'}
            </Button>
          </div>
        </div>
        
        {/* Club content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar with club info */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Club Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
                  <p className="text-sm">{mockClub.description}</p>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <div className="flex items-start gap-3 mb-3">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Meeting Time</h4>
                      <p className="text-sm text-muted-foreground">{mockClub.meetingTime}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Location</h4>
                      <p className="text-sm text-muted-foreground">{mockClub.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 mb-3">
                    <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">President</h4>
                      <p className="text-sm text-muted-foreground">{mockClub.president}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Faculty Advisor</h4>
                      <p className="text-sm text-muted-foreground">{mockClub.faculty}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Upcoming Meeting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-3 bg-muted rounded-md">
                  <p className="font-medium">{mockClub.meetingTime}</p>
                  <p className="text-sm text-muted-foreground mt-1">{mockClub.location}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content area */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="events" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
              </TabsList>
              <TabsContent value="events" className="animate-fade-in">
                <ClubEvents events={mockEvents} />
              </TabsContent>
              <TabsContent value="members" className="animate-fade-in">
                <ClubMembers members={mockMembers} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ClubDetails;
