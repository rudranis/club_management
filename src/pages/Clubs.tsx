
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ClubsList from '@/components/clubs/ClubsList';
import { ClubProps } from '@/components/clubs/ClubCard';

const Clubs = () => {
  // Mock data for clubs (will be replaced with PHP/MySQL data later)
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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container px-4 py-8 max-w-6xl mx-auto mt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">All Clubs</h1>
          <p className="text-muted-foreground">Discover and join clubs that match your interests</p>
        </div>

        <ClubsList clubs={mockClubs} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Clubs;
