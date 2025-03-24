
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Calendar, ChevronRight } from 'lucide-react';

export interface ClubProps {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string;
  memberCount: number;
  eventCount: number;
}

const ClubCard = ({ club }: { club: ClubProps }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-medium hover:border-primary/20 h-full flex flex-col animate-scale-in">
      <CardHeader className="pb-4">
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
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="line-clamp-3">
          {club.description}
        </CardDescription>
        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
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
      <CardFooter className="pt-2">
        <Button asChild variant="ghost" className="w-full justify-between group">
          <Link to={`/clubs/${club.id}`}>
            <span>View Details</span>
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ClubCard;
