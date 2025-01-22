import { useState } from 'react';
import {
  Edit2,
  ChevronRight,
  ChevronLeft,
  Save,
  Sparkle,
  Sparkles,
  ArrowLeft,
  LibrarySquare,
  Eye,
  EyeOff
} from 'lucide-react';
import styles from './EditorSideBar.module.css';
import { useNavigate } from 'react-router-dom';
import { ToggleRoadmapVisibility } from '../../../infrastructure/api/publishandhidin';

export type SidebarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  selectedNodeType: 'topic' | 'subTopic';
  setSelectedNodeType: (type: 'topic' | 'subTopic') => void;
  setIsEditDialogOpen: (open: boolean) => void;
  addNode: () => void;
  nodes: { id: string; data: { label: string; type: 'topic' | 'subTopic' } }[];
  handleEditNode: (nodeId: string) => void;
  styles: CSSModuleClasses;
  onSave: () => void;
  onDragStart: (e: React.DragEvent, type: 'topic' | 'subTopic') => void;
  isPublished?: boolean;
  onPublish?: () => void;
  setSelectedNode: (node: {
    id: string;
    data: { label: string; type: 'topic' | 'subTopic' };
  }) => void;
  setShowRightSidebar: (show: boolean) => void;
  setIsResourcesDialogOpen: (open: boolean) => void;
  roadmapId: string;
  visibility: string;  // Changed from string to boolean
  onVisibilityChange: (newVisibility: boolean) => void;  // Changed to boolean
};

const EditorSideBar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  setIsEditDialogOpen,
  nodes,
  onSave,
  onDragStart,
  setSelectedNode,
  setShowRightSidebar,
  setIsResourcesDialogOpen,
  roadmapId,
  visibility,
}: SidebarProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const toggleVisibility = ToggleRoadmapVisibility();
  const navigate = useNavigate();
  const [visibilityVar, setVisibility] = useState(visibility);
  const handleVisibilityToggle = async () => {
    setIsLoading(true);
    try {
      const response = await toggleVisibility.execute(roadmapId);
      setIsLoading(false);
      setVisibility(response.roadmap.visibility);
    } catch (error) {
      console.error('Failed to toggle visibility:', error);
      // You might want to show an error toast here
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
    } catch (error) {
      console.error('Failed to save:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <button
        className={`${styles.sidebarToggle} ${
          isSidebarOpen ? styles.open : ''
        }`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
      <div
        className={`${styles.sidebar} ${isSidebarOpen ? '' : styles.collapsed}`}
      >
        <div className={styles.sidebarContent}>
          <div className="flex items-center justify-center  mb-6 mr-4">
            <button
              onClick={() => navigate('/roadmaps')}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Go back to roadmaps"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className={styles.sidebarTitle}>Roadmap Editor</h2>
          </div>

          <div className={styles.sidebarActions}>
            <button
              className={styles.actionButton}
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Edit2 size={20} />
              Edit Roadmap
            </button>
            <button
              className={styles.actionButton}
              onClick={() => setIsResourcesDialogOpen(true)}
            >
              <LibrarySquare size={20} />
              Edit Resources
            </button>
            <div className="flex flex-col gap-2">
              <h3>Node Types</h3>
              <div
                className={`${styles.dndNode}  ${styles.Topic}`}
                onDragStart={(e) => onDragStart(e, 'topic')}
                draggable
              >
                <Sparkle /> Topic Node
              </div>
              <div
                className={`${styles.dndNode}  ${styles.subTopic}`}
                onDragStart={(e) => onDragStart(e, 'subTopic')}
                draggable
              >
                <Sparkles />
                Sub Topic Node
              </div>
              <div className={styles.controls}>
                <button
                  onClick={handleSave}
                  className={`${styles.button} ${
                    isSaving ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                      Saving...
                    </div>
                  ) : (
                    <>
                      <Save size={16} />
                      Save Changes
                    </>
                  )}
                </button>
                <button
                  onClick={handleVisibilityToggle}
                  className={`${styles.button} ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                      {visibility !== 'public' ? 'Publishing...' : 'Hiding...'}
                    </div>
                  ) : (
                    <>
                      {visibilityVar !== 'public' ? (
                        <>
                          <Eye size={16} />
                          Publish Roadmap
                        </>
                      ) : (
                        <>
                          <EyeOff size={16} />
                          Hide Roadmap
                        </>
                      )}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <hr className="border-t border-gray-300 my-4" />
          <div className={styles.nodeList}>
            <h3 className={styles.nodeListTitle}>Nodes</h3>
            {nodes.map((node) => (
              <div key={node.id} className={styles.nodeListItem}>
                <span className={styles.nodeListLabel}>
                  <span
                    className={`${styles.nodeTypeIndicator} ${
                      styles[node.data.type]
                    }`}
                  />
                  {node.data.label}
                </span>
                <div className={styles.nodeListActions}>
                  <button
                    className={
                      styles.nodeListButton +
                      ' hover:scale-105 hover:bg-gray-200 dark:hover:bg-gray-500'
                    }
                    onClick={() => {
                      setSelectedNode(node);
                      setShowRightSidebar(true);
                    }}
                    aria-label="Edit node"
                  >
                    <Edit2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditorSideBar;
