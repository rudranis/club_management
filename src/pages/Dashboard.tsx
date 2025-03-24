
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Calendar, CheckCircle, Clock, X } from 'lucide-react';

// Mock data
const userClubs = [
  {
    id: '1',
    name: 'Tech Innovators',
    role: 'Member',
    logo: '/placeholder.svg',
    newNotifications: 3
  },
  {
    id: '2',
    name: 'Debate Club',
    role: 'Coordinator',
    logo: '/placeholder.svg',
    newNotifications: 0
  }
];

const pendingRequests = [
  {
    id: '1',
    clubName: 'Photography Society',
    status: 'pending',
    requestedAt: '2023-05-15'
  }
];

const upcomingEvents = [
  {
    id: '1',
    title: 'Web Development Workshop',
    clubName: 'Tech Innovators',
    date: '2023-06-10',
    time: '3:00 PM',
    location: 'Tech Building, Room 302'
  },
  {
    id: '2',
    title: 'Mock Debate: Climate Change',
    clubName: 'Debate Club',
    date: '2023-06-15',
    time: '5:30 PM',
    location: 'Humanities Hall, Room 101'
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage your clubs and activities</p>
            </div>
            <Button asChild className="button-animation">
              <a href="/explore">Explore More Clubs</a>
            </Button>
          </div>
          
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="clubs">My Clubs</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6 animate-fade-in">
              {/* Club Memberships */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Club Memberships</CardTitle>
                  <CardDescription>Clubs you have joined or requested to join</CardDescription>
                </CardHeader>
                <CardContent>
                  {userClubs.length > 0 ? (
                    <div className="space-y-4">
                      {userClubs.map(club => (
                        <div key={club.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={club.logo} alt={club.name} />
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {club.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{club.name}</h4>
                              <Badge variant="outline">{club.role}</Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {club.newNotifications > 0 && (
                              <div className="flex items-center gap-1 text-sm">
                                <Bell size={14} className="text-primary" />
                                <span>{club.newNotifications} new</span>
                              </div>
                            )}
                            <Button asChild variant="ghost" size="sm">
                              <a href={`/clubs/${club.id}`}>View</a>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-6 text-muted-foreground">
                      You haven't joined any clubs yet.
                    </p>
                  )}

                  {pendingRequests.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium mb-3">Pending Requests</h4>
                      {pendingRequests.map(request => (
                        <div key={request.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div>
                            <h4 className="font-medium">{request.clubName}</h4>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock size={14} />
                              <span>Requested on {new Date(request.requestedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <Badge variant="secondary">Pending Approval</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Events from your clubs</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingEvents.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingEvents.map(event => (
                        <div key={event.id} className="p-4 border rounded-lg hover:border-primary/20 transition-all">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{event.title}</h4>
                            <Badge variant="outline">{event.clubName}</Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>{event.date} at {event.time}</span>
                            </div>
                          </div>
                          <p className="text-sm mt-1">{event.location}</p>
                          <div className="flex justify-end mt-3">
                            <Button asChild variant="ghost" size="sm">
                              <a href={`/events/${event.id}`}>View Details</a>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-6 text-muted-foreground">
                      No upcoming events from your clubs.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="clubs" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>My Clubs</CardTitle>
                  <CardDescription>Manage your club memberships and roles</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    View all your club memberships, roles, and pending requests.
                  </p>
                  {/* Content will go here */}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="events" className="animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>My Events</CardTitle>
                  <CardDescription>Track upcoming and past events</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    View all events from your clubs, including your role and responsibilities.
                  </p>
                  {/* Content will go here */}
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

export default Dashboard;
