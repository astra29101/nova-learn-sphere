
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Users, Clock } from 'lucide-react';
import { Course } from '@/api/demoApi';

interface CourseCardProps {
  course: Course;
  onEnroll?: () => void;
  onAddToCart?: () => void;
  enrolled?: boolean;
  showActions?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  onEnroll, 
  onAddToCart, 
  enrolled = false,
  showActions = true 
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/course-details/${course.id}`);
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        {!course.approved && (
          <Badge className="absolute top-2 right-2 bg-yellow-500">
            Pending Review
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 min-h-[3.5rem]">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600">by {course.instructor}</p>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-gray-700 text-sm line-clamp-2 mb-3">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{course.rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{course.students}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">
              ${course.price}
            </span>
          </div>
          
          {showActions && (
            <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
              {enrolled ? (
                <Button className="flex-1" variant="outline">
                  Continue Learning
                </Button>
              ) : (
                <>
                  <Button 
                    className="flex-1" 
                    onClick={onEnroll}
                  >
                    Enroll Now
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={onAddToCart}
                  >
                    Add to Cart
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
