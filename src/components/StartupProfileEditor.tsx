import React, { useState, useRef } from 'react';
import { Plus, Trash2, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import useAxios from '../hooks/useAxios';
import axios from 'axios';

interface StartupProfileEditorProps {
  startup: any;
  onCancel: () => void;
  onSave: (updatedData: any) => Promise<void>;
}

export function StartupProfileEditor({
  startup,
  onCancel,
  onSave,
}: StartupProfileEditorProps) {
  const [formData, setFormData] = useState(startup);
  const [previewLogo, setPreviewLogo] = useState(startup.logo || '');
  const [previewBanner, setPreviewBanner] = useState(startup.banner || '');
  const [logoUploadLoading, setLogoUploadLoading] = useState(false);
  const [bannerUploadLoading, setBannerUploadLoading] = useState(false);
  const [logoUploadError, setLogoUploadError] = useState('');
  const [bannerUploadError, setBannerUploadError] = useState('');
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const inputClasses = "mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
  const sectionClasses = "bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-colors";

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLogoUploadLoading(true);
    setLogoUploadError('');

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "e-tourism");
    formData.append("cloud_name", "de6y4p2ou");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/de6y4p2ou/image/upload",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      setFormData(prev => ({ ...prev, logo: response.data.secure_url }));
      setPreviewLogo(response.data.secure_url);
    } catch (error) {
      console.error('Upload error:', error.response?.data || error);
      setLogoUploadError('Logo upload failed. Please try again.');
    } finally {
      setLogoUploadLoading(false);
    }
  };

  const handleBannerUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setBannerUploadLoading(true);
    setBannerUploadError('');

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "e-tourism");
    formData.append("cloud_name", "de6y4p2ou");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/de6y4p2ou/image/upload",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      setFormData(prev => ({ ...prev, banner: response.data.secure_url }));
      setPreviewBanner(response.data.secure_url);
    } catch (error) {
      console.error('Upload error:', error.response?.data || error);
      setBannerUploadError('Banner upload failed. Please try again.');
    } finally {
      setBannerUploadLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information Section */}
      <div className={sectionClasses}>
        <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Logo Upload */}
          <div>
            <label className={labelClasses}>
              Company Logo
              <div 
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg transition-colors ${!logoUploadLoading && 'hover:border-blue-400 cursor-pointer'} ${logoUploadLoading && 'opacity-50 cursor-not-allowed'}`}
                onClick={() => !logoUploadLoading && logoInputRef.current?.click()}
              >
                <div className="space-y-2 text-center">
                  {previewLogo ? (
                    <img src={previewLogo} alt="Logo Preview" className="mx-auto h-32 w-32 object-cover rounded-lg" />
                  ) : (
                    <div className="mx-auto h-32 w-32 flex items-center justify-center rounded-lg bg-gray-50">
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  <div className="flex justify-center items-center text-sm text-gray-600">
                    <Upload className="w-5 h-5 mr-1" />
                    <span>{logoUploadLoading ? 'Uploading...' : 'Upload logo'}</span>
                    <input
                      ref={logoInputRef}
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      disabled={logoUploadLoading}
                    />
                  </div>
                  {logoUploadError && (
                    <p className="text-red-500 text-xs">{logoUploadError}</p>
                  )}
                </div>
              </div>
            </label>
          </div>

          {/* Banner Upload */}
          <div>
            <label className={labelClasses}>
              Banner Image
              <div 
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg transition-colors ${!bannerUploadLoading && 'hover:border-blue-400 cursor-pointer'} ${bannerUploadLoading && 'opacity-50 cursor-not-allowed'}`}
                onClick={() => !bannerUploadLoading && bannerInputRef.current?.click()}
              >
                <div className="space-y-2 text-center">
                  {previewBanner ? (
                    <img src={previewBanner} alt="Banner Preview" className="mx-auto h-32 w-full object-cover rounded-lg" />
                  ) : (
                    <div className="mx-auto h-32 w-full flex items-center justify-center rounded-lg bg-gray-50">
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  <div className="flex justify-center items-center text-sm text-gray-600">
                    <Upload className="w-5 h-5 mr-1" />
                    <span>{bannerUploadLoading ? 'Uploading...' : 'Upload banner'}</span>
                    <input
                      ref={bannerInputRef}
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleBannerUpload}
                      disabled={bannerUploadLoading}
                    />
                  </div>
                  {bannerUploadError && (
                    <p className="text-red-500 text-xs">{bannerUploadError}</p>
                  )}
                </div>
              </div>
            </label>
          </div>

          {/* Company Name */}
          <div>
            <label className={labelClasses}>
              Company Name
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </label>
          </div>

          {/* Industry */}
          <div>
            <label className={labelClasses}>
              Industry
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className={inputClasses}
                required
              >
                <option value="fintech">Fintech</option>
                <option value="healthtech">Healthtech</option>
                <option value="edtech">Edtech</option>
                <option value="ecommerce">E-commerce</option>
                <option value="saas">SaaS</option>
                <option value="ai">AI</option>
                <option value="cleantech">Cleantech</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>

          {/* Website */}
          <div>
            <label className={labelClasses}>
              Website
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className={inputClasses}
                placeholder="https://example.com"
              />
            </label>
          </div>

          {/* Founded Date */}
          <div>
            <label className={labelClasses}>
              Founded Date
              <input
                type="date"
                name="foundedDate"
                value={formData.foundedDate.split('T')[0]}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </label>
          </div>

          {/* Location */}
          <div>
            <label className={labelClasses}>
              Location
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={inputClasses}
                required
                placeholder="City, Country"
              />
            </label>
          </div>

          {/* Team Size */}
          <div>
            <label className={labelClasses}>
              Team Size
              <input
                type="number"
                name="teamSize"
                value={formData.teamSize}
                onChange={handleChange}
                min="1"
                className={inputClasses}
                required
              />
            </label>
          </div>
        </div>
      </div>

      {/* Company Details Section */}
      <div className={sectionClasses}>
        <h2 className="text-xl font-semibold mb-6">Company Details</h2>
        <div className="space-y-6">
          {/* Pitch */}
          <div>
            <label className={labelClasses}>
              Pitch (One-line description)
              <textarea
                name="pitch"
                value={formData.pitch}
                onChange={handleChange}
                className={inputClasses}
                rows={2}
                required
              />
            </label>
          </div>

          {/* Problem */}
          <div>
            <label className={labelClasses}>
              Problem You're Solving
              <textarea
                name="problem"
                value={formData.problem}
                onChange={handleChange}
                className={inputClasses}
                rows={3}
                required
              />
            </label>
          </div>

          {/* Solution */}
          <div>
            <label className={labelClasses}>
              Your Solution
              <textarea
                name="solution"
                value={formData.solution}
                onChange={handleChange}
                className={inputClasses}
                rows={3}
                required
              />
            </label>
          </div>

          {/* Market Size */}
          <div>
            <label className={labelClasses}>
              Market Size
              <textarea
                name="marketSize"
                value={formData.marketSize}
                onChange={handleChange}
                className={inputClasses}
                rows={2}
                required
              />
            </label>
          </div>

          {/* Competition */}
          <div>
            <label className={labelClasses}>
              Competition
              <textarea
                name="competition"
                value={formData.competition}
                onChange={handleChange}
                className={inputClasses}
                rows={2}
                required
              />
            </label>
          </div>

          {/* Business Model */}
          <div>
            <label className={labelClasses}>
              Business Model
              <textarea
                name="businessModel"
                value={formData.businessModel}
                onChange={handleChange}
                className={inputClasses}
                rows={2}
                required
              />
            </label>
          </div>
        </div>
      </div>

      {/* Funding Information */}
      <div className={sectionClasses}>
        <h2 className="text-xl font-semibold mb-6">Funding Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Funding Stage */}
          <div>
            <label className={labelClasses}>
              Funding Stage
              <select
                name="fundingStage"
                value={formData.fundingStage}
                onChange={handleChange}
                className={inputClasses}
                required
              >
                <option value="pre-seed">Pre-seed</option>
                <option value="seed">Seed</option>
                <option value="series-a">Series A</option>
                <option value="series-b">Series B</option>
                <option value="series-c">Series C+</option>
              </select>
            </label>
          </div>

          {/* Funding Needed */}
          <div>
            <label className={labelClasses}>
              Funding Needed (USD)
              <input
                type="number"
                name="fundingNeeded"
                value={formData.fundingNeeded}
                onChange={handleChange}
                className={inputClasses}
                required
                min="0"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end space-x-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          className="flex items-center space-x-2"
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          className="flex items-center space-x-2"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}

export default StartupProfileEditor;