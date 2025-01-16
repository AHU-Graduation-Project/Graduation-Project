import { useState, useCallback } from 'react';
import {
  Edit2,
  Plus,
  ChevronRight,
  ChevronLeft,
  Save,
  Upload,
  Sparkle,
  Sparkles,
} from 'lucide-react';
import styles from './EditorSideBar.module.css';

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
  onRestore: () => void;
  onDragStart: (e: React.DragEvent, type: 'topic' | 'subTopic') => void;
};

const EditorSideBar = ({
  isSidebarOpen,
  setIsSidebarOpen,

  setIsEditDialogOpen,
  nodes,
  handleEditNode,
  onSave,
  onRestore,
  onDragStart,
}: SidebarProps) => {
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
          <h2 className={styles.sidebarTitle}>Roadmap Editor</h2>
          <div className={styles.sidebarActions}>
            <button
              className={styles.actionButton}
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Edit2 size={20} />
              Edit Roadmap
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
                <button onClick={onRestore} className={styles.button}>
                  <Upload size={16} />
                  Restore
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
                    className={styles.nodeListButton}
                    onClick={() => handleEditNode(node.id)}
                    aria-label="Edit node"
                  >
                    <Edit2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.sidebar}></div>
      </div>
    </>
  );
};

export default EditorSideBar;
