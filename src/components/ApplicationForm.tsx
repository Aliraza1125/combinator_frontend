import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import useAxios from '../hooks/useAxios';
import axios from 'axios';

export function ApplicationForm() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const bannerInputRef = useRef(null);
  const { isLoading, error, execute, clearError } = useAxios();
  
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    website: '',
    foundedDate: '',
    location: '',
    teamSize: 1,
    pitch: '',
    problem: '',
    solution: '',
    marketSize: '',
    competition: '',
    businessModel: '',
    fundingStage: '',
    fundingNeeded: 0,
    logo: '',
    banner: ''
  });

  const [previewImage, setPreviewImage] = useState('');
  const [previewBanner, setPreviewBanner] = useState('');
  const [logoUploadLoading, setLogoUploadLoading] = useState(false);
  const [bannerUploadLoading, setBannerUploadLoading] = useState(false);
  const [logoUploadError, setLogoUploadError] = useState('');
  const [bannerUploadError, setBannerUploadError] = useState('');

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
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
      setPreviewImage(response.data.secure_url);
    } catch (error) {
      console.error('Upload error:', error.response?.data || error);
      setLogoUploadError('Logo upload failed. Please try again.');
    } finally {
      setLogoUploadLoading(false);
    }
  };

  const handleBannerUpload = async (event) => {
    const file = event.target.files[0];
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    try {
      const response = await execute({
        method: 'POST',
        url: '/api/applications',
        data: formData
      });

      if (response.application) {
        navigate('/startups');
      }
    } catch (error) {
      console.error('Application submission error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      companyName: '',
      industry: '',
      website: '',
      foundedDate: '',
      location: '',
      teamSize: 1,
      pitch: '',
      problem: '',
      solution: '',
      marketSize: '',
      competition: '',
      businessModel: '',
      fundingStage: '',
      fundingNeeded: 0,
      logo: '',
      banner: ''
    });
    setPreviewImage('');
    setPreviewBanner('');
    setLogoUploadError('');
    setBannerUploadError('');
    clearError();
  };

  const inputClasses = "mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
  const sectionClasses = "bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-gray-200 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-6 space-y-8">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8">
        <div className={sectionClasses}>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Startup Application</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className={labelClasses}>
                Company Logo
                <div 
                  className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg transition-colors ${!logoUploadLoading && 'hover:border-blue-400 cursor-pointer'} ${logoUploadLoading && 'opacity-50 cursor-not-allowed'}`}
                  onClick={() => !logoUploadLoading && fileInputRef.current?.click()}
                >
                  <div className="space-y-2 text-center">
                    {previewImage ? (
                      <img src={previewImage} alt="Logo Preview" className="mx-auto h-32 w-32 object-cover rounded-lg" />
                    ) : (
                      <div className="mx-auto h-32 w-32 flex items-center justify-center rounded-lg bg-gray-50">
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    <div className="flex justify-center items-center text-sm text-gray-600">
                      <Upload className="w-5 h-5 mr-1" />
                      <span>{logoUploadLoading ? 'Uploading...' : 'Upload logo'}</span>
                      <input
                        ref={fileInputRef}
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

            <div>
              <label className={labelClasses}>
                Company Banner
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
                  placeholder="Enter company name"
                  disabled={isLoading}
                />
              </label>
            </div>

            <div>
              <label className={labelClasses}>
                Industry
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                  disabled={isLoading}
                >
                  <option value="">Select Industry</option>
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
                  disabled={isLoading}
                />
              </label>
            </div>

            <div>
              <label className={labelClasses}>
                Founded Date
                <input
                  type="date"
                  name="foundedDate"
                  value={formData.foundedDate}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                  disabled={isLoading}
                />
              </label>
            </div>

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
                  disabled={isLoading}
                />
              </label>
            </div>

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
                  disabled={isLoading}
                />
              </label>
            </div>
          </div>
        </div>

        <div className={sectionClasses}>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Company Details</h2>
          <div className="space-y-6">
            <label className={labelClasses}>
              Pitch (One-line description)
              <textarea
                name="pitch"
                value={formData.pitch}
                onChange={handleChange}
                rows={2}
                className={inputClasses}
                required
                placeholder="Describe your startup in one sentence"
                disabled={isLoading}
              />
            </label>

            <label className={labelClasses}>
              Problem You're Solving
              <textarea
                name="problem"
                value={formData.problem}
                onChange={handleChange}
                rows={3}
                className={inputClasses}
                required
                placeholder="What problem does your startup solve?"
                disabled={isLoading}
              />
            </label>

            <label className={labelClasses}>
              Your Solution
              <textarea
                name="solution"
                value={formData.solution}
                onChange={handleChange}
                rows={3}
                className={inputClasses}
                required
                placeholder="How does your solution work?"
                disabled={isLoading}
              />
            </label>

            <label className={labelClasses}>
              Market Size
              <textarea
                name="marketSize"
                value={formData.marketSize}
                onChange={handleChange}
                rows={2}
                className={inputClasses}
                required
                placeholder="Describe your target market and its size"
                disabled={isLoading}
              />
            </label>

            <label className={labelClasses}>
              Competition
              <textarea
                name="competition"
                value={formData.competition}
                onChange={handleChange}
                rows={2}
                className={inputClasses}
                required
                placeholder="Who are your competitors?"
                disabled={isLoading}
              />
            </label>

            <label className={labelClasses}>
              Business Model
              <textarea
                name="businessModel"
                value={formData.businessModel}
                onChange={handleChange}
                rows={2}
                className={inputClasses}
                required
                placeholder="How do you make money?"
                disabled={isLoading}
              />
            </label>
          </div>
        </div>

        <div className={sectionClasses}>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Funding Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>
                Funding Stage
                <select
                  name="fundingStage"
                  value={formData.fundingStage}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                  disabled={isLoading}
                >
                  <option value="">Select stage</option>
                  <option value="pre-seed">Pre-seed</option>
                  <option value="seed">Seed</option>
                  <option value="series-a">Series A</option>
                  <option value="series-b">Series B</option>
                  <option value="series-c">Series C+</option>
                </select>
              </label>
            </div>

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
                  placeholder="Enter amount in USD"
                  disabled={isLoading}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={resetForm}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          disabled={isLoading}
        >
          Reset
        </button>
        <button 
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Submitting...</span>
            </div>
          ) : (
            'Submit Application'
          )}
        </button>
      </div>
    </form>
  );
}