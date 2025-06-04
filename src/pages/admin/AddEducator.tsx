
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const AddEducator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    expertise: '',
    phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    console.log('Creating educator:', formData);
    
    toast({
      title: "Educator created successfully",
      description: `${formData.name} has been added as an educator.`,
    });
    
    // Navigate back to educators list
    navigate('/admin/educators');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Button variant="outline" size="sm" asChild className="mr-4">
              <Link to="/admin/educators">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Educators
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Educator</h1>
          <p className="text-gray-600">Create a new educator account for the platform</p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserPlus className="w-5 h-5 mr-2" />
              Educator Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter educator's full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="educator@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expertise">Area of Expertise</Label>
                  <Input
                    id="expertise"
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleInputChange}
                    placeholder="e.g., Web Development, Data Science"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio/Description</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Brief description about the educator's background and experience..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Button type="button" variant="outline" asChild>
                  <Link to="/admin/educators">Cancel</Link>
                </Button>
                <Button type="submit">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create Educator
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddEducator;
