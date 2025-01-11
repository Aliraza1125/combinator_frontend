import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { Button } from './ui/Button';
import { uploadImage } from '../lib/firebase';

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  className?: string;
}

export function ImageUpload({ onImageUploaded, className = '' }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);
      onImageUploaded(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error appropriately
    }
  };

  return (
    <div className={className}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <Button
        type="button"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        className="w-full flex items-center justify-center gap-2"
      >
        <Upload className="w-4 h-4" />
        Upload Image
      </Button>
    </div>
  );
}