
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Upload } from 'lucide-react';

interface CreateClubFormProps {
  onCancel: () => void;
}

const CreateClubForm = ({ onCancel }: CreateClubFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    logo: null as File | null,
  });
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, logo: file }));
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.description) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      // This would be replaced with actual API call to PHP backend
      console.log('Creating club with:', formData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Club created!",
        description: "Your club has been successfully created.",
      });
      
      // Reset form and close
      onCancel();
    } catch (error) {
      console.error('Error creating club:', error);
      toast({
        title: "Creation failed",
        description: "There was an error creating your club.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-medium border border-border/50 animate-scale-in">
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">Create a New Club</CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <CardDescription>
          Create a new club for students to join and participate in activities
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Club Name*</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Photography Club"
              required
              value={formData.name}
              onChange={handleChange}
              className="focus-ring"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category*</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleSelectChange('category', value)}
            >
              <SelectTrigger className="focus-ring">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="arts">Arts & Culture</SelectItem>
                <SelectItem value="recreational">Recreational</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description*</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your club, its mission, and activities"
              rows={4}
              required
              value={formData.description}
              onChange={handleChange}
              className="focus-ring resize-none"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="logo">Club Logo</Label>
            <div className="flex items-center gap-4">
              {logoPreview ? (
                <div className="relative h-24 w-24 rounded-md overflow-hidden border border-border">
                  <img 
                    src={logoPreview} 
                    alt="Logo preview" 
                    className="h-full w-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6"
                    onClick={() => {
                      setLogoPreview(null);
                      setFormData(prev => ({ ...prev, logo: null }));
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="h-24 w-24 flex items-center justify-center rounded-md bg-muted border border-dashed border-border">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1">
                <Input
                  id="logo"
                  name="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="focus-ring"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Recommended size: 512x512 pixels. PNG or JPG format.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="button-animation"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Club...' : 'Create Club'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateClubForm;
