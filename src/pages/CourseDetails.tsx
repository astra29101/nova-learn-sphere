
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Clock, PlayCircle, ShoppingCart, ArrowLeft } from 'lucide-react';
import { fetchCourseById } from '@/api/demoApi';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const { data: course, isLoading } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => fetchCourseById(courseId!),
    enabled: !!courseId
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course not found</h2>
          <Button onClick={() => navigate('/courses')}>Back to Courses</Button>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    toast({
      title: "Enrolled Successfully!",
      description: "You have been enrolled in the course.",
    });
    
    if (user.role === 'student') {
      navigate('/my-learning');
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    toast({
      title: "Added to Cart",
      description: "Course has been added to your cart.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Info */}
          <div className="lg:col-span-2">
            <Card>
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                {!course.approved && (
                  <Badge className="absolute top-4 right-4 bg-yellow-500">
                    Pending Review
                  </Badge>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="text-2xl">{course.title}</CardTitle>
                <p className="text-lg text-gray-600">by {course.instructor}</p>
                
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{course.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-gray-500 mr-1" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-500 mr-1" />
                    <span>{course.duration}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Course Description</h3>
                    <p className="text-gray-700">{course.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Course Content</h3>
                    {course.modules.length > 0 ? (
                      <div className="space-y-4">
                        {course.modules.map((module, index) => (
                          <Card key={module.id}>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-base">
                                Module {index + 1}: {module.title}
                              </CardTitle>
                              <p className="text-sm text-gray-600">{module.description}</p>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="space-y-2">
                                {module.videos.map((video) => (
                                  <div key={video.id} className="flex items-center space-x-3 p-2 rounded bg-gray-50">
                                    <PlayCircle className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm">{video.title}</span>
                                    <span className="text-xs text-gray-500 ml-auto">{video.duration}</span>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No modules available yet.</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    ${course.price}
                  </div>
                  <Badge variant="outline">{course.level}</Badge>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleEnroll}
                  >
                    Enroll Now
                  </Button>
                  
                  {user?.role === 'student' && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  )}
                </div>
                
                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Level:</span>
                    <span>{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span>{course.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Students:</span>
                    <span>{course.students}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
