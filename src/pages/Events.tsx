
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ClubEvents from '@/components/clubs/ClubEvents';

const Events = () => {
  // Mock data for events (will be replaced with PHP/MySQL data)
  const events = [
    {
      id: '1',
      title: 'Annual Photography Exhibition',
      description: 'Showcasing the best photographs taken by club members throughout the year. Open to all students and faculty.',
      date: '2023-11-15T18:00:00',
      location: 'Arts Building, Gallery Hall',
      image: '/placeholder.svg',
    },
    {
      id: '2',
      title: 'Robotics Workshop',
      description: 'Learn the basics of robot building and programming. Materials will be provided. No prior experience required.',
      date: '2023-10-22T14:00:00',
      location: 'Engineering Block, Lab 204',
      image: '/placeholder.svg',
    },
    {
      id: '3',
      title: 'Chess Tournament',
      description: 'Annual inter-college chess championship. Participants from all skill levels are welcome. Prizes for winners!',
      date: '2023-12-05T10:00:00',
      location: 'Student Center, Main Hall',
      image: '/placeholder.svg',
    },
    {
      id: '4',
      title: 'Environmental Awareness Drive',
      description: 'Join us for a campus clean-up and tree planting session. Help make our campus greener!',
      date: '2023-09-30T09:00:00',
      location: 'Main Campus Garden',
      image: '/placeholder.svg',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container px-4 py-8 max-w-6xl mx-auto mt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Upcoming Events</h1>
          <p className="text-muted-foreground">Find and participate in events across all campus clubs</p>
        </div>

        <ClubEvents events={events} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
