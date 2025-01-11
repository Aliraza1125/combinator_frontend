import React, { useState } from 'react';
import { useStartupStore } from '../store/startupStore';
import { StartupProfile } from '../types/startup';
import { Button } from './ui/Button';
import { Plus, Trash2, Upload } from 'lucide-react';

interface StartupProfileEditorProps {
  startup: StartupProfile;
  onCancel: () => void;
  onSave: () => void;
}

export function StartupProfileEditor({
  startup,
  onCancel,
  onSave,
}: StartupProfileEditorProps) {
  const updateStartup = useStartupStore((state) => state.updateStartup);
  const [formData, setFormData] = useState<Partial<StartupProfile>>(startup);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStartup(startup.id, formData);
    onSave();
  };

  const handleTeamMemberChange = (index: number, field: string, value: string) => {
    const newTeamMembers = [...(formData.teamMembers || [])];
    newTeamMembers[index] = { ...newTeamMembers[index], [field]: value };
    setFormData({ ...formData, teamMembers: newTeamMembers });
  };

  const addTeamMember = () => {
    setFormData({
      ...formData,
      teamMembers: [
        ...(formData.teamMembers || []),
        { name: '', role: '', image: '', linkedin: '' },
      ],
    });
  };

  const removeTeamMember = (index: number) => {
    const newTeamMembers = [...(formData.teamMembers || [])];
    newTeamMembers.splice(index, 1);
    setFormData({ ...formData, teamMembers: newTeamMembers });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <h2 className="text-xl font-semibold">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Logo URL
              <input
                type="url"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.logo || ''}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cover Image URL
              <input
                type="url"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.coverImage || ''}
                onChange={(e) =>
                  setFormData({ ...formData, coverImage: e.target.value })
                }
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pitch Deck URL
              <input
                type="url"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.pitchDeckUrl || ''}
                onChange={(e) =>
                  setFormData({ ...formData, pitchDeckUrl: e.target.value })
                }
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Video URL
              <input
                type="url"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.videoUrl || ''}
                onChange={(e) =>
                  setFormData({ ...formData, videoUrl: e.target.value })
                }
              />
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Team Members</h2>
          <Button
            type="button"
            onClick={addTeamMember}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Team Member</span>
          </Button>
        </div>

        <div className="space-y-4">
          {formData.teamMembers?.map((member, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg relative"
            >
              <button
                type="button"
                onClick={() => removeTeamMember(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={member.name}
                    onChange={(e) =>
                      handleTeamMemberChange(index, 'name', e.target.value)
                    }
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={member.role}
                    onChange={(e) =>
                      handleTeamMemberChange(index, 'role', e.target.value)
                    }
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Profile Image URL
                  <input
                    type="url"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={member.image || ''}
                    onChange={(e) =>
                      handleTeamMemberChange(index, 'image', e.target.value)
                    }
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  LinkedIn URL
                  <input
                    type="url"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={member.linkedin || ''}
                    onChange={(e) =>
                      handleTeamMemberChange(index, 'linkedin', e.target.value)
                    }
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <h2 className="text-xl font-semibold">Social Links</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Twitter URL
              <input
                type="url"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.socialLinks?.twitter || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: {
                      ...(formData.socialLinks || {}),
                      twitter: e.target.value,
                    },
                  })
                }
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              LinkedIn URL
              <input
                type="url"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.socialLinks?.linkedin || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: {
                      ...(formData.socialLinks || {}),
                      linkedin: e.target.value,
                    },
                  })
                }
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Facebook URL
              <input
                type="url"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.socialLinks?.facebook || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialLinks: {
                      ...(formData.socialLinks || {}),
                      facebook: e.target.value,
                    },
                  })
                }
              />
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}