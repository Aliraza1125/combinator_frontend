import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Button } from '../../ui/Button';
import { Upload, Loader2 } from 'lucide-react';
import axios from 'axios';

interface TeamMember {
  name: string;
  role: string;
  linkedin?: string;
  image?: string;
}

interface AddTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: TeamMember) => Promise<void>;
}

export function AddTeamMemberModal({
  isOpen,
  onClose,
  onSave
}: AddTeamMemberModalProps) {
  const [loading, setLoading] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<TeamMember>({
    name: '',
    role: '',
    linkedin: '',
    image: ''
  });

  const [errors, setErrors] = useState<Partial<TeamMember>>({});

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageUploadLoading(true);

    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("upload_preset", "e-tourism");
    uploadFormData.append("cloud_name", "de6y4p2ou");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/de6y4p2ou/image/upload",
        uploadFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      setFormData(prev => ({ ...prev, image: response.data.secure_url }));
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setImageUploadLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<TeamMember> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSave(formData);
      setFormData({
        name: '',
        role: '',
        linkedin: '',
        image: ''
      });
      onClose();
    } catch (error) {
      console.error('Error adding team member:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
          <DialogDescription>
            Add a new member to your startup team
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Image (Optional)
            </label>
            <div 
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-indigo-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="space-y-1 text-center">
                {formData.image ? (
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="mx-auto h-32 w-32 object-cover rounded-lg"
                  />
                ) : (
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                    <span>{imageUploadLoading ? 'Uploading...' : 'Upload an image'}</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={imageUploadLoading}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter team member's name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter team member's role"
            />
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role}</p>
            )}
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              LinkedIn Profile URL (Optional)
            </label>
            <input
              type="text"
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter LinkedIn profile URL"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading || imageUploadLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || imageUploadLoading}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {loading ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Adding...</span>
                </div>
              ) : (
                'Add Member'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}