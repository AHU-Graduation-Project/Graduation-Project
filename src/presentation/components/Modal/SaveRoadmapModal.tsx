import { useState } from 'react';
import { X } from 'lucide-react';
import { AddGeneratedRoadmap } from '../../../infrastructure/api/AddGeneratedRoadmap';
import { useNavigate } from 'react-router-dom';
import useTokenStore from '../../../application/state/tokenStore';
interface SaveRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  edges: any;
  nodes: any;
  onSave: (title: string, description: string) => void;
  isGenerated?: boolean; // Add this prop to determine if it's a generated roadmap
}

export default function SaveRoadmapModal({
  isOpen,
  onClose,
  onSave,
  nodes,
  edges,
  isGenerated = true,
}: SaveRoadmapModalProps) {
  const { getUser } = useTokenStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const generatedRoadmapService = AddGeneratedRoadmap();
  const navigate = useNavigate();
  const user = getUser();
  if (!isOpen) return null;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (user) {
        if (isGenerated) {
          // Handle generated roadmap saving
          const created = await generatedRoadmapService.execute({
            title,
            description,
            nodes,
            edges,
          });

          // Save the data with the returned slug and id
          await generatedRoadmapService.saveData({
            nodes,
            edges,
            slug: created.roadmap.slug,
            roadmapId: created.roadmap.id,
          });

          navigate(`/roadmap/${created.roadmap.slug}`);
        }

        setTitle('');
        setDescription('');
        onClose();
      } else {
        navigate('/auth');
      }
    } catch (error) {
      console.error('Failed to save roadmap:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-theme">
            {isGenerated ? 'Save Generated Roadmap' : 'Save Roadmap'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 resize-none"
              rows={3}
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 rounded-lg bg-theme text-white hover:opacity-90 transition-colors disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Roadmap'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
