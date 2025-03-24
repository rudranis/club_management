
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { CalendarDays, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

interface JoinRequest {
  id: string;
  clubId: string;
  clubName: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface JoinRequestsProps {
  requests: JoinRequest[];
}

const JoinRequests = ({ requests }: JoinRequestsProps) => {
  const pendingRequests = requests.filter(req => req.status === 'pending');
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  const handleCancelRequest = (requestId: string) => {
    // This would connect to the PHP backend in a real implementation
    toast({
      title: "Request cancelled",
      description: "Your join request has been cancelled.",
    });
    console.log('Cancelling request:', requestId);
  };
  
  if (pendingRequests.length === 0) {
    return (
      <div className="text-center py-12">
        <CheckCircle2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">You have no pending join requests</h3>
        <p className="text-muted-foreground mt-2">
          When you request to join a club, it will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Your Pending Requests</h3>
      <div className="grid grid-cols-1 gap-4">
        {pendingRequests.map((request) => (
          <Card key={request.id} className="animate-scale-in">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{request.clubName}</CardTitle>
                <Badge>Pending</Badge>
              </div>
              <CardDescription className="flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                <span>Requested on {formatDate(request.requestDate)}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>Waiting for club admin approval</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleCancelRequest(request.id)}
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Cancel Request
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JoinRequests;
