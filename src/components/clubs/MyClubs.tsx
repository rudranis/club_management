
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Calendar, Settings, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ClubProps } from './ClubCard';

interface MyClubsProps {
  clubs: ClubProps[];
}

const MyClubs = ({ clubs }: MyClubsProps) => {
  if (clubs.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">You haven't joined any clubs yet</h3>
        <p className="text-muted-foreground mt-2 mb-6">
          Explore the clubs in your college and join them to see them here
        </p>
        <Button asChild variant="outline">
          <Link to="/dashboard">Explore Clubs</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clubs.map((club) => (
          <Card 
            key={club.id} 
            className="overflow-hidden transition-all duration-300 hover:shadow-medium hover:border-primary/20 animate-scale-in"
          >
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 rounded-md">
                    <AvatarImage src={club.logo} alt={club.name} />
                    <AvatarFallback className="rounded-md bg-primary/10 text-primary">
                      {club.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {club.category}
                    </Badge>
                    <CardTitle className="text-xl">{club.name}</CardTitle>
                  </div>
                </div>
                <Badge variant="outline">Member</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="line-clamp-2 mb-4">
                {club.description}
              </CardDescription>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>{club.memberCount} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{club.eventCount} events</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button asChild variant="outline" size="sm">
                <Link to={`/clubs/${club.id}`}>Club Details</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to={`/clubs/${club.id}/manage`}>
                  <Settings className="mr-2 h-4 w-4" />
                  Manage
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <Button asChild variant="outline">
          <Link to="/dashboard">Find More Clubs</Link>
        </Button>
      </div>
    </div>
  );
};

export default MyClubs;
