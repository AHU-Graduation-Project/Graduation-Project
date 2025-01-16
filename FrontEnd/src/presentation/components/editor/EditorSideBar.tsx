import {
  Edit2,
  ChevronRight,
  ChevronLeft,
  Save,
  Sparkle,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import styles from './EditorSideBar.module.css';
import { useNavigate } from 'react-router-dom';

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
  setSelectedNode: (node: { id: string; data: { label: string; type: 'topic' | 'subTopic' } }) => void;
  setShowRightSidebar: (show: boolean) => void;
};

const EditorSideBar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  setIsEditDialogOpen,
  nodes,
  handleEditNode,
  onSave,
  onDragStart,
  isPublished,
  onPublish,
  setSelectedNode,
  setShowRightSidebar,
}: SidebarProps) => {
  const navigate = useNavigate();

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
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Edit2 size={20} />
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
                <button onClick={onSave} className={styles.button}>
                  <Save size={16} />
                  Save Changes
                </button>
                {onPublish && (
                  <button
                    onClick={onPublish}
                    className={`${styles.button} ${
                      isPublished ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={isPublished}
                  >
                    {isPublished ? 'Published' : 'Publish Roadmap'}
                  </button>
                )}
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
