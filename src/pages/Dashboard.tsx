
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import ClubsList from '@/components/clubs/ClubsList';
import MyClubs from '@/components/clubs/MyClubs';
import JoinRequests from '@/components/clubs/JoinRequests';
import CreateClubForm from '@/components/clubs/CreateClubForm';
import { ClubProps } from '@/components/clubs/ClubCard';

const Dashboard = () => {
  const [showCreateClub, setShowCreateClub] = useState(false);
  
  // Mock data for clubs
  const mockClubs: ClubProps[] = [
    {
      id: '1',
      name: 'Photography Club',
      description: 'A community of photography enthusiasts who meet regularly to share techniques, critique work, and organize photo walks around campus.',
      logo: '/placeholder.svg',
      category: 'arts',
      memberCount: 42,
      eventCount: 5,
    },
    {
      id: '2',
      name: 'Debate Society',
      description: 'We organize debates, public speaking events, and participate in competitions to improve our argumentation and critical thinking skills.',
      logo: '/placeholder.svg',
      category: 'academic',
      memberCount: 38,
      eventCount: 12,
    },
    {
      id: '3',
      name: 'Robotics Club',
      description: 'Building and programming robots for competitions and demonstrations. We welcome members of all skill levels!',
      logo: '/placeholder.svg',
      category: 'technical',
      memberCount: 27,
      eventCount: 3,
    },
    {
      id: '4',
      name: 'Environmental Society',
      description: 'Working to make our campus more sustainable through awareness campaigns, tree planting drives, and waste management initiatives.',
      logo: '/placeholder.svg',
      category: 'social',
      memberCount: 56,
      eventCount: 8,
    },
    {
      id: '5',
      name: 'Chess Club',
      description: 'Weekly meetings to play chess, learn strategies, and prepare for inter-college chess tournaments. All levels welcome from beginners to masters.',
      logo: '/placeholder.svg',
      category: 'recreational',
      memberCount: 22,
      eventCount: 4,
    },
    {
      id: '6',
      name: 'Dance Ensemble',
      description: 'Contemporary, hip-hop, and traditional dance forms practiced and performed at various college events throughout the year.',
      logo: '/placeholder.svg',
      category: 'arts',
      memberCount: 34,
      eventCount: 9,
    },
  ];

  // Mock data for my clubs
  const myClubs = mockClubs.slice(0, 2);
  
  // Mock data for join requests
  const joinRequests = [
    {
      id: '1',
      clubId: '3',
      clubName: 'Robotics Club',
      requestDate: '2023-08-15T10:30:00',
      status: 'pending' as 'pending' | 'approved' | 'rejected',
    },
    {
      id: '2',
      clubId: '5',
      clubName: 'Chess Club',
      requestDate: '2023-08-12T15:45:00',
      status: 'pending' as 'pending' | 'approved' | 'rejected',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container px-4 py-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Manage your clubs, events, and memberships</p>
          </div>
          <Button onClick={() => setShowCreateClub(!showCreateClub)} className="button-animation">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create Club
          </Button>
        </div>

        {showCreateClub && (
          <div className="mb-8 animate-fade-in">
            <CreateClubForm onCancel={() => setShowCreateClub(false)} />
          </div>
        )}

        <Tabs defaultValue="explore" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="explore">Explore Clubs</TabsTrigger>
            <TabsTrigger value="myclubs">My Clubs</TabsTrigger>
            <TabsTrigger value="requests">Join Requests</TabsTrigger>
          </TabsList>
          <TabsContent value="explore" className="animate-fade-in">
            <ClubsList clubs={mockClubs} />
          </TabsContent>
          <TabsContent value="myclubs" className="animate-fade-in">
            <MyClubs clubs={myClubs} />
          </TabsContent>
          <TabsContent value="requests" className="animate-fade-in">
            <JoinRequests requests={joinRequests} />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
