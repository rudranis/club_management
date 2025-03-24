
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ExternalLink, AlertCircle } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
}

interface ClubEventsProps {
  events: Event[];
}

const ClubEvents = ({ events }: ClubEventsProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };
  
  const isUpcoming = (dateString: string) => {
    const eventDate = new Date(dateString);
    const now = new Date();
    return eventDate > now;
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No upcoming events</h3>
        <p className="text-muted-foreground mt-2">
          This club has no scheduled events at the moment
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden animate-scale-in">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 h-48 md:h-auto relative">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
                {isUpcoming(event.date) && (
                  <Badge className="absolute top-2 left-2">
                    Upcoming
                  </Badge>
                )}
              </div>
              <div className="flex-1 flex flex-col">
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(event.date)}</span>
                  </CardDescription>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{event.location}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm">{event.description}</p>
                </CardContent>
                <CardFooter className="justify-end gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/events/${event.id}`}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Event Details
                    </Link>
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClubEvents;
