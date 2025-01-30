import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/Button";
import { Upload, X, Loader2 } from 'lucide-react';
import axios from 'axios';

interface StartupUpdate {
  title: string;
  content: string;
  type: 'milestone' | 'news' | 'product' | 'team' | 'funding';
  imageUrl?: string;
}

interface AddUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (update: StartupUpdate) => Promise<void>;
}

export function AddUpdateModal({ isOpen, onClose, onSave }: AddUpdateModalProps) {
  const [loading, setLoading] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<StartupUpdate>({
    title: '',
    content: '',
    type: 'milestone',
    imageUrl: ''
  });

  const [errors, setErrors] = useState<Partial<StartupUpdate>>({});

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
      setFormData(prev => ({ ...prev, imageUrl: response.data.secure_url }));
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setImageUploadLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<StartupUpdate> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    if (!formData.type) {
      newErrors.type = 'Type is required';
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
        title: '',
        content: '',
        type: 'milestone',
        imageUrl: ''
      });
      onClose();
    } catch (error) {
      console.error('Error adding update:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTypes = [
    { value: 'milestone', label: 'Milestone' },
    { value: 'news', label: 'News' },
    { value: 'product', label: 'Product Update' },
    { value: 'team', label: 'Team Update' },
    { value: 'funding', label: 'Funding News' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]  bg-white">
        <DialogHeader>
          <DialogTitle>Add Update</DialogTitle>
          <DialogDescription>
            Share a new milestone, news, or update about your startup.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Update Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Update Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as StartupUpdate['type'] })}
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            >
              {updateTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter update title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Describe your update"
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image (Optional)
            </label>
            <div 
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-indigo-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="space-y-1 text-center">
                {formData.imageUrl ? (
                  <img 
                    src={formData.imageUrl} 
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
                  <span>Saving...</span>
                </div>
              ) : (
                'Add Update'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}