
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Users, Trophy, MapPin, Clock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Mock club data
const clubsData = {
  '1': {
    id: '1',
    name: 'Tech Innovators',
    description: 'A community of tech enthusiasts working on cutting-edge projects and exploring emerging technologies.',
    longDescription: 'The Tech Innovators club is dedicated to fostering innovation and technical excellence among college students. We host workshops, hackathons, and tech talks featuring industry professionals. Our members work on collaborative projects spanning web development, mobile apps, AI, and emerging technologies. We aim to bridge the gap between academic learning and real-world applications, providing hands-on experience that prepares members for future careers in technology.',
    logo: '/placeholder.svg',
    category: 'technology',
    memberCount: 120,
    establishedYear: 2018,
    president: 'Alex Morgan',
    contactEmail: 'techinnovators@college.edu',
    meetingSchedule: 'Every Tuesday, 5:00 PM',
    meetingLocation: 'Engineering Building, Room 204',
    events: [
      {
        id: 'e1',
        title: 'Web Development Workshop',
        date: '2023-06-10',
        time: '3:00 PM - 5:00 PM',
        location: 'Tech Building, Room 302',
        description: 'Learn the fundamentals of modern web development with React and Node.js.'
      },
      {
        id: 'e2',
        title: 'Annual Hackathon',
        date: '2023-07-15',
        time: '9:00 AM - 9:00 PM',
        location: 'Student Center',
        description: '12-hour coding competition with prizes for the most innovative projects.'
      }
    ],
    members: [
      { id: 'm1', name: 'Alex Morgan', role: 'President', avatar: '/placeholder.svg' },
      { id: 'm2', name: 'Jamie Lee', role: 'Vice President', avatar: '/placeholder.svg' },
      { id: 'm3', name: 'Taylor Kim', role: 'Treasurer', avatar: '/placeholder.svg' },
      { id: 'm4', name: 'Jordan Smith', role: 'Secretary', avatar: '/placeholder.svg' },
      { id: 'm5', name: 'Casey Jones', role: 'Member', avatar: '/placeholder.svg' }
    ]
  },
  '2': {
    id: '2',
    name: 'Creative Arts Society',
    description: 'For students passionate about visual arts, design, photography, and creative expression.',
    longDescription: 'The Creative Arts Society brings together students from all disciplines who share a passion for artistic expression. We provide spaces, resources, and opportunities for members to develop their creative skills through workshops, collaborative projects, and exhibitions. Our inclusive community welcomes artists of all skill levels and backgrounds, fostering an environment where creativity can flourish.',
    logo: '/placeholder.svg',
    category: 'arts',
    memberCount: 85,
    establishedYear: 2015,
    president: 'Sam Wilson',
    contactEmail: 'arts@college.edu',
    meetingSchedule: 'Every Thursday, 4:30 PM',
    meetingLocation: 'Arts Building, Studio 12',
    events: [
      {
        id: 'e3',
        title: 'Spring Art Exhibition',
        date: '2023-05-20',
        time: '6:00 PM - 9:00 PM',
        location: 'Campus Gallery',
        description: 'Annual showcase of student artwork across multiple mediums.'
      }
    ],
    members: [
      { id: 'm6', name: 'Sam Wilson', role: 'President', avatar: '/placeholder.svg' },
      { id: 'm7', name: 'Riley Adams', role: 'Vice President', avatar: '/placeholder.svg' },
      { id: 'm8', name: 'Jesse Parker', role: 'Treasurer', avatar: '/placeholder.svg' }
    ]
  }
};

const ClubDetails = () => {
  const { clubId } = useParams();
  const [activeTab, setActiveTab] = useState('about');
  const [isRequesting, setIsRequesting] = useState(false);
  
  // Get club data based on clubId
  const club = clubsData[clubId as keyof typeof clubsData];
  
  if (!club) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-32 pb-20 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Club Not Found</h1>
          <p className="mb-6">The club you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/clubs">Back to Clubs</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleJoinRequest = () => {
    setIsRequesting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRequesting(false);
      toast({
        title: "Request Sent!",
        description: `Your request to join ${club.name} has been submitted.`,
      });
    }, 1000);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Club Header */}
          <div className="bg-secondary/30 rounded-lg p-6 mb-8 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <Avatar className="h-24 w-24 rounded-lg">
                <AvatarImage src={club.logo} alt={club.name} />
                <AvatarFallback className="text-2xl font-bold rounded-lg bg-primary/10 text-primary">
                  {club.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-grow text-center md:text-left">
                <div className="mb-2">
                  <Badge variant="secondary">{club.category}</Badge>
                </div>
                <h1 className="text-3xl font-bold mb-2">{club.name}</h1>
                <p className="text-muted-foreground mb-4">{club.description}</p>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-1">
                    <Users size={16} className="text-muted-foreground" />
                    <span>{club.memberCount} members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy size={16} className="text-muted-foreground" />
                    <span>Est. {club.establishedYear}</span>
                  </div>
                </div>
              </div>
              
              <Button 
                className="button-animation"
                onClick={handleJoinRequest}
                disabled={isRequesting}
              >
                {isRequesting ? 'Sending Request...' : 'Request to Join'}
              </Button>
            </div>
          </div>
          
          {/* Club Content */}
          <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-2xl font-semibold mb-4">About {club.name}</h2>
                      <p className="whitespace-pre-line mb-6">{club.longDescription}</p>
                      
                      <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                      <p className="mb-1"><strong>President:</strong> {club.president}</p>
                      <p className="mb-1"><strong>Email:</strong> {club.contactEmail}</p>
                      
                      <h3 className="text-lg font-semibold mt-6 mb-3">Meeting Details</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock size={16} className="text-muted-foreground" />
                        <span>{club.meetingSchedule}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-muted-foreground" />
                        <span>{club.meetingLocation}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">Leadership</h3>
                      <div className="space-y-4">
                        {club.members
                          .filter(member => member.role !== 'Member')
                          .map(leader => (
                            <div key={leader.id} className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={leader.avatar} alt={leader.name} />
                                <AvatarFallback className="bg-primary/10 text-primary">
                                  {leader.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{leader.name}</p>
                                <p className="text-sm text-muted-foreground">{leader.role}</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="events" className="animate-fade-in">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>
                  
                  {club.events.length > 0 ? (
                    <div className="space-y-6">
                      {club.events.map(event => (
                        <div 
                          key={event.id} 
                          className="p-4 border rounded-lg transition-all hover:border-primary/20 hover:shadow-subtle"
                        >
                          <h3 className="text-xl font-medium mb-2">{event.title}</h3>
                          <p className="text-muted-foreground mb-3">{event.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <Calendar size={16} className="text-muted-foreground" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock size={16} className="text-muted-foreground" />
                              <span>{event.time}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-2">
                            <MapPin size={16} className="text-muted-foreground" />
                            <span>{event.location}</span>
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <Button asChild variant="outline" size="sm">
                              <Link to={`/events/${event.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-12 text-muted-foreground">
                      No upcoming events scheduled. Check back later!
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="members" className="animate-fade-in">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-6">Club Members</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {club.members.map(member => (
                      <div 
                        key={member.id} 
                        className="p-4 border rounded-lg flex items-center gap-3 transition-all hover:border-primary/20 hover:shadow-subtle"
                      >
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {member.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <Badge variant="outline">{member.role}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ClubDetails;
