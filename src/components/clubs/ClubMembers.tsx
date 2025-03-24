
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Users, AlertCircle, UserPlus } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  role: string;
  avatar: string;
  joinDate: string;
}

interface ClubMembersProps {
  members: Member[];
}

const ClubMembers = ({ members }: ClubMembersProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      year: 'numeric'
    }).format(date);
  };
  
  // Group members by role
  const leadershipRoles = ['President', 'Vice President', 'Secretary', 'Treasurer'];
  const leadership = members.filter(member => leadershipRoles.includes(member.role));
  const regularMembers = members.filter(member => !leadershipRoles.includes(member.role));

  if (members.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No members yet</h3>
        <p className="text-muted-foreground mt-2">
          Be the first to join this club!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {leadership.length > 0 && (
        <div>
          <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
            <UserPlus className="h-5 w-5" />
            Club Leadership
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leadership.map((member) => (
              <Card 
                key={member.id} 
                className="p-4 flex items-center gap-4 animate-scale-in"
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {member.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{member.name}</h4>
                    <Badge variant="outline">{member.role}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Joined {formatDate(member.joinDate)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {regularMembers.length > 0 && (
        <div>
          <h3 className="text-lg font-medium flex items-center gap-2 mb-4">
            <Users className="h-5 w-5" />
            Members
            <Badge variant="outline" className="ml-2">{regularMembers.length}</Badge>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {regularMembers.map((member) => (
              <Card 
                key={member.id} 
                className="p-4 flex items-center gap-3 animate-scale-in"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {member.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-sm">{member.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    Joined {formatDate(member.joinDate)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubMembers;
