import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Check, X, Loader2, Search, Eye, ClipboardCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { RootState } from '../store/store';
import useAxios from '../hooks/useAxios';

interface Application {
  _id: string;
  companyName: string;
  industry: string;
  foundedDate: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'info_requested';
  createdAt: string;
  location: string;
  teamSize: number;
  fundingStage: string;
  fundingNeeded: number;
  pitch: string;
  problem: string;
  solution: string;
  marketSize: string;
  competition: string;
  businessModel: string;
  userId: string;
}

type SortField = 'companyName' | 'createdAt' | 'industry' | 'status';
type SortOrder = 'asc' | 'desc';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin } = useSelector((state: RootState) => state.auth);
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const { isLoading, error, execute } = useAxios();

  // Status styling configurations
  const getStatusStyle = (status: Application['status']) => {
    const styles = {
      draft: 'bg-gray-100 text-gray-800',
      submitted: 'bg-yellow-100 text-yellow-800',
      under_review: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      info_requested: 'bg-purple-100 text-purple-800'
    };
    return styles[status];
  };

  // Status icon components
  const StatusIcon = ({ status }: { status: Application['status'] }) => {
    const icons = {
      draft: <RefreshCw className="h-4 w-4" />,
      submitted: <AlertCircle className="h-4 w-4" />,
      under_review: <ClipboardCheck className="h-4 w-4" />,
      approved: <Check className="h-4 w-4" />,
      rejected: <X className="h-4 w-4" />,
      info_requested: <AlertCircle className="h-4 w-4" />
    };
    return icons[status];
  };

  // Admin check effect
  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  // Initial data fetch
  useEffect(() => {
    fetchApplications();
  }, []);

  // Fetch applications data
  const fetchApplications = async () => {
    try {
      const response = await execute({
        method: 'GET',
        url: '/api/applications'
      });
      
      // Update submitted applications to under_review
      const updatedApplications = await Promise.all(
        response.applications.map(async (app: Application) => {
          if (app.status === 'submitted') {
            try {
              await execute({
                method: 'PATCH',
                url: `/api/applications/${app._id}/status`,
                data: { status: 'under_review' }
              });
              return { ...app, status: 'under_review' };
            } catch (error) {
              console.error('Failed to update status:', error);
              return app;
            }
          }
          return app;
        })
      );
      
      setApplications(updatedApplications);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    }
  };

  // Handle status updates
  const handleStatusUpdate = async (id: string, status: Application['status']) => {
    try {
      await execute({
        method: 'PATCH',
        url: `/api/applications/${id}/status`,
        data: { status }
      });
      fetchApplications();
      if (selectedApp?._id === id) {
        setSelectedApp(null);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  // Sort applications
  const sortApplications = (apps: Application[]) => {
    return [...apps].sort((a, b) => {
      if (sortField === 'createdAt') {
        return sortOrder === 'asc' 
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return sortOrder === 'asc'
        ? a[sortField].localeCompare(b[sortField])
        : b[sortField].localeCompare(a[sortField]);
    });
  };

  // Filter applications
  const filteredApplications = sortApplications(
    applications.filter(app => {
      const matchesSearch = 
        app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
  );

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Render action buttons
// Render action buttons
const renderActionButtons = (app: Application) => {
  return (
    <div className="flex space-x-2 items-center">
      {/* Always show the View button */}
      <button
        onClick={() => setSelectedApp(app)}
        className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-50 transition-colors"
        title="View Details"
      >
        <Eye className="h-5 w-5" />
      </button>

      {/* Show action buttons only for under_review status */}
      {app.status === 'under_review' && (
        <>
          <button
            onClick={() => handleStatusUpdate(app._id, 'approved')}
            className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
            title="Approve"
          >
            <Check className="h-4 w-4 mr-1" />
            Approve
          </button>
          <button
            onClick={() => handleStatusUpdate(app._id, 'rejected')}
            className="inline-flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
            title="Reject"
          >
            <X className="h-4 w-4 mr-1" />
            Reject
          </button>
          <button
            onClick={() => handleStatusUpdate(app._id, 'info_requested')}
            className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
            title="Request Info"
          >
            <AlertCircle className="h-4 w-4 mr-1" />
            Request Info
          </button>
        </>
      )}
    </div>
  );
};

  // Loading state
  if (isLoading && applications.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Stats Overview */}
        <div className="mb-8 grid grid-cols-4 gap-4">
          {['under_review', 'approved', 'rejected', 'info_requested'].map((status) => (
            <div key={status} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500 capitalize">
                  {status.replace('_', ' ')}
                </h3>
                <StatusIcon status={status as Application['status']} />
              </div>
              <p className="mt-2 text-2xl font-semibold text-gray-900">
                {applications.filter(app => app.status === status).length}
              </p>
            </div>
          ))}
        </div>

        {/* Header and Search */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Applications Dashboard</h1>
          
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Status</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="info_requested">Info Requested</option>
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
            {error}
          </div>
        )}

        {/* Applications Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('companyName')}
                >
                  Company
                  {sortField === 'companyName' && (
                    <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('industry')}
                >
                  Industry
                  {sortField === 'industry' && (
                    <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Funding Stage
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  Status
                  {sortField === 'status' && (
                    <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((app) => (
                <tr key={app._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{app.companyName}</div>
                    <div className="text-sm text-gray-500">{app.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{app.industry}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {app.teamSize}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {app.fundingStage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(app.status)}`}>
                      {app.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {renderActionButtons(app)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      {/* Application Details Modal */}
      {selectedApp && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900">{selectedApp.companyName}</h2>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Status Section */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <StatusIcon status={selectedApp.status} />
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusStyle(selectedApp.status)}`}>
                      {selectedApp.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Company Overview */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Company Overview</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Industry</p>
                        <p className="mt-1 text-sm text-gray-900">{selectedApp.industry}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Location</p>
                        <p className="mt-1 text-sm text-gray-900">{selectedApp.location}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Founded Date</p>
                        <p className="mt-1 text-sm text-gray-900">
                          {new Date(selectedApp.foundedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Team Size</p>
                        <p className="mt-1 text-sm text-gray-900">{selectedApp.teamSize}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Details */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Business Details</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-500">Pitch</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedApp.pitch}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-500">Problem</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedApp.problem}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-500">Solution</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedApp.solution}</p>
                    </div>
                  </div>
                </div>

                {/* Market & Competition */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Market & Competition</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-500">Market Size</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedApp.marketSize}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-500">Competition</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedApp.competition}</p>
                    </div>
                  </div>
                </div>

                {/* Funding Details */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Funding Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-500">Funding Stage</p>
                      <p className="mt-1 text-sm text-gray-900">{selectedApp.fundingStage}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-gray-500">Funding Needed</p>
                      <p className="mt-1 text-sm text-gray-900">
                        ${selectedApp.fundingNeeded.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {selectedApp.status === 'under_review' && (
                  <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
                    <button
                      onClick={() => handleStatusUpdate(selectedApp._id, 'approved')}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(selectedApp._id, 'info_requested')}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Request Info
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(selectedApp._id, 'rejected')}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};