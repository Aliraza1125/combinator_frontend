import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/Button";
import { Upload, Loader2 } from 'lucide-react';
import axios from 'axios';

interface Portfolio {
  name: string;
  description: string;
  logo?: string;
  exitValue?: number;
}

interface Investment {
  investorName: string;
  amount: number;
  date: string;
  investorLogo?: string;
  testimonial?: string;
  portfolio?: Portfolio[];
}

interface AddInvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (investment: Investment) => Promise<void>;
}

export function AddInvestmentModal({
  isOpen,
  onClose,
  onSave
}: AddInvestmentModalProps) {
  const [loading, setLoading] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Investment>({
    investorName: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    investorLogo: '',
    testimonial: '',
    portfolio: []
  });

  const [errors, setErrors] = useState<Partial<Investment>>({});
  const [showPortfolioSection, setShowPortfolioSection] = useState(false);
  const [currentPortfolio, setCurrentPortfolio] = useState<Portfolio>({
    name: '',
    description: '',
    exitValue: undefined
  });

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
      setFormData(prev => ({ ...prev, investorLogo: response.data.secure_url }));
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setImageUploadLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Investment> = {};
    
    if (!formData.investorName.trim()) {
      newErrors.investorName = 'Investor name is required';
    }
    if (formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddPortfolio = () => {
    if (currentPortfolio.name && currentPortfolio.description) {
      setFormData(prev => ({
        ...prev,
        portfolio: [...(prev.portfolio || []), currentPortfolio]
      }));
      setCurrentPortfolio({ name: '', description: '', exitValue: undefined });
    }
  };

  const removePortfolioItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      portfolio: prev.portfolio?.filter((_, i) => i !== index)
    }));
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
        investorName: '',
        amount: 0,
        date: new Date().toISOString().split('T')[0],
        investorLogo: '',
        testimonial: '',
        portfolio: []
      });
      onClose();
    } catch (error) {
      console.error('Error adding investment:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle>Add Investment</DialogTitle>
          <DialogDescription>
            Record a new investment in your startup.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Investor Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Investor Logo
            </label>
            <div 
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-indigo-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="space-y-1 text-center">
                {formData.investorLogo ? (
                  <img 
                    src={formData.investorLogo} 
                    alt="Investor Logo" 
                    className="mx-auto h-32 w-32 object-contain rounded-lg"
                  />
                ) : (
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                    <span>{imageUploadLoading ? 'Uploading...' : 'Upload logo'}</span>
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

          {/* Investor Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Investor Name
            </label>
            <input
              type="text"
              value={formData.investorName}
              onChange={(e) => setFormData({ ...formData, investorName: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter investor name"
            />
            {errors.investorName && (
              <p className="mt-1 text-sm text-red-600">{errors.investorName}</p>
            )}
          </div>

          {/* Investment Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Investment Amount (USD)
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
              min="0"
              step="1000"
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
            )}
          </div>

          {/* Investment Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Investment Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date}</p>
            )}
          </div>

          {/* Testimonial */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Testimonial (Optional)
            </label>
            <textarea
              value={formData.testimonial}
              onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Add investor testimonial"
            />
          </div>

          {/* Portfolio Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Portfolio Companies</h3>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPortfolioSection(!showPortfolioSection)}
              >
                {showPortfolioSection ? 'Hide' : 'Add Portfolio Companies'}
              </Button>
            </div>

            {showPortfolioSection && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={currentPortfolio.name}
                    onChange={(e) => setCurrentPortfolio({ ...currentPortfolio, name: e.target.value })}
                    className="rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={currentPortfolio.description}
                    onChange={(e) => setCurrentPortfolio({ ...currentPortfolio, description: e.target.value })}
                    className="rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <input
                    type="number"
                    placeholder="Exit Value (Optional)"
                    value={currentPortfolio.exitValue || ''}
                    onChange={(e) => setCurrentPortfolio({ ...currentPortfolio, exitValue: Number(e.target.value) })}
                    className="rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <Button
                    type="button"
                    onClick={handleAddPortfolio}
                    disabled={!currentPortfolio.name || !currentPortfolio.description}
                  >
                    Add Company
                  </Button>
                </div>

                {formData.portfolio && formData.portfolio.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {formData.portfolio.map((company, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                        <div>
                          <p className="font-medium">{company.name}</p>
                          <p className="text-sm text-gray-500">{company.description}</p>
                          {company.exitValue && (
                            <p className="text-sm text-green-600">Exit: {formatCurrency(company.exitValue)}</p>
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => removePortfolioItem(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
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
                'Add Investment'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}