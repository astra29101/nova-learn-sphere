
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Save, ArrowLeft } from 'lucide-react';
import { mockCourses } from '@/api/demoApi';
import { useToast } from '@/hooks/use-toast';

const ManageCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const course = mockCourses.find(c => c.id === courseId);
  const [editingCourse, setEditingCourse] = useState(false);
  const [editingModule, setEditingModule] = useState<string | null>(null);
  const [editingVideo, setEditingVideo] = useState<string | null>(null);

  const [courseData, setCourseData] = useState({
    title: course?.title || '',
    description: course?.description || '',
    price: course?.price || 0,
    duration: course?.duration || '',
    image: course?.image || ''
  });

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course not found</h2>
          <Button onClick={() => navigate('/educator/courses')}>Back to My Courses</Button>
        </div>
      </div>
    );
  }

  const handleSaveCourse = () => {
    toast({
      title: "Course Updated",
      description: "Course information has been saved successfully.",
    });
    setEditingCourse(false);
  };

  const handleDeleteModule = (moduleId: string) => {
    toast({
      title: "Module Deleted",
      description: "The module has been removed from the course.",
    });
  };

  const handleDeleteVideo = (videoId: string) => {
    toast({
      title: "Video Deleted",
      description: "The video has been removed from the module.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/educator/courses')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Course</h1>
              <p className="text-gray-600">Edit course content and structure</p>
            </div>
          </div>
          <Badge className={course.approved ? "bg-green-500" : "bg-yellow-500"}>
            {course.approved ? 'Approved' : 'Pending Review'}
          </Badge>
        </div>

        {/* Course Information */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Course Information</CardTitle>
              <Button
                variant="outline"
                onClick={() => setEditingCourse(!editingCourse)}
              >
                <Edit className="w-4 h-4 mr-2" />
                {editingCourse ? 'Cancel' : 'Edit'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {editingCourse ? (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    value={courseData.title}
                    onChange={(e) => setCourseData({...courseData, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={courseData.description}
                    onChange={(e) => setCourseData({...courseData, description: e.target.value})}
                    rows={4}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={courseData.price}
                      onChange={(e) => setCourseData({...courseData, price: Number(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={courseData.duration}
                      onChange={(e) => setCourseData({...courseData, duration: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={courseData.image}
                    onChange={(e) => setCourseData({...courseData, image: e.target.value})}
                  />
                </div>
                
                <Button onClick={handleSaveCourse}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="flex items-start space-x-6">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-48 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">${course.price}</Badge>
                    <Badge variant="outline">{course.duration}</Badge>
                    <Badge variant="outline">{course.students} students</Badge>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modules Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Course Modules</h2>
            <Button onClick={() => navigate(`/educator/courses/${courseId}/add-module`)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Module
            </Button>
          </div>

          {course.modules.length > 0 ? course.modules.map((module, moduleIndex) => (
            <Card key={module.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Module {moduleIndex + 1}: {module.title}</CardTitle>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => navigate(`/educator/courses/${courseId}/modules/${module.id}/add-video`)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Video
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingModule(editingModule === module.id ? null : module.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteModule(module.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                {editingModule === module.id ? (
                  <div className="space-y-4 mt-4">
                    <Input defaultValue={module.title} placeholder="Module title" />
                    <Textarea defaultValue={module.description} placeholder="Module description" />
                    <div className="flex space-x-2">
                      <Button size="sm">Save</Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingModule(null)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">{module.description}</p>
                )}
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {module.videos.length > 0 ? module.videos.map((video, videoIndex) => (
                    <div 
                      key={video.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-white"
                    >
                      <div className="flex-1">
                        {editingVideo === video.id ? (
                          <div className="space-y-2">
                            <Input defaultValue={video.title} placeholder="Video title" />
                            <Input defaultValue={video.url} placeholder="YouTube URL" />
                            <Input defaultValue={video.duration} placeholder="Duration" />
                            <div className="flex space-x-2">
                              <Button size="sm">Save</Button>
                              <Button size="sm" variant="outline" onClick={() => setEditingVideo(null)}>Cancel</Button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <h4 className="font-medium text-gray-900">{video.title}</h4>
                            <p className="text-sm text-gray-500">Duration: {video.duration}</p>
                          </div>
                        )}
                      </div>
                      
                      {editingVideo !== video.id && (
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingVideo(video.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteVideo(video.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  )) : (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <p className="text-gray-500 mb-4">No videos in this module yet</p>
                      <Button 
                        onClick={() => navigate(`/educator/courses/${courseId}/modules/${module.id}/add-video`)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add First Video
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )) : (
            <Card>
              <CardContent className="text-center py-16">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No modules yet</h3>
                <p className="text-gray-600 mb-6">Start building your course by adding the first module</p>
                <Button onClick={() => navigate(`/educator/courses/${courseId}/add-module`)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Module
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCourse;
