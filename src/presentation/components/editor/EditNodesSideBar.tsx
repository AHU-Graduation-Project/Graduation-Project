import { useState, useEffect } from 'react';
import { X, Plus, BookMarked } from 'lucide-react';
import AddResourceModal from './AddResourcesModal';
import { Button } from '../UI/Button';

interface EditNodesSideBarProps {
  styles: {
    rightSidebarContent: string;
    rightSidebarTitle: string;
    rightSidebarField: string;
    rightSidebarLabel: string;
    rightSidebarInput: string;
    rightSidebarButton: string;
    rightSidebarButtonResources: string;
    rightSidebar: string;
    open: string
  };
  selectedNode: any;
  handleUpdateNodeFromSidebar: (data: any) => void;
  handleDeleteNode: (id: string) => void;
  allNodes?: any[];
  setSelectingPrerequisite: (value: boolean) => void;
  rightSidebarRef: any;
  isRightSidebarOpen: boolean;
}

export default function EditNodesSideBar({
  styles,
  selectedNode,
  handleUpdateNodeFromSidebar,
  handleDeleteNode,
  allNodes = [],
  setSelectingPrerequisite,
  rightSidebarRef,
  isRightSidebarOpen,
}: EditNodesSideBarProps) {
  const [isAddingPrerequisite, setIsAddingPrerequisite] = useState(false);
  const [prerequisiteId, setPrerequisiteId] = useState('');
  const [isResourcesDialogOpen, setIsResourcesDialogOpen] = useState(false);

  const [trash, setTrash] = useState<string[]>(
    selectedNode.data?.prerequisitesTrash || [],
  );

  // Effect to check for invalid prerequisites and move them to trash
  useEffect(() => {
    const prerequisites = selectedNode.data?.prerequisites || [];
    const invalidPrerequisites = prerequisites.filter(
      (prereqId: string) => !allNodes.some((node) => node.id === prereqId),
    );

    if (invalidPrerequisites.length > 0) {
      const validPrerequisites = prerequisites.filter(
        (prereqId: string) => !invalidPrerequisites.includes(prereqId),
      );

      const newTrash = [...trash];
      invalidPrerequisites.forEach((invalidId) => {
        if (!newTrash.includes(invalidId)) {
          newTrash.push(invalidId);
        }
      });

      handleUpdateNodeFromSidebar({
        ...selectedNode.data,
        prerequisites: validPrerequisites,
        prerequisitesTrash: newTrash,
      });

      setTrash(newTrash);
    }
  }, [allNodes, selectedNode.data?.prerequisites]);

  // Effect to restore prerequisites from trash if nodes become available again
  useEffect(() => {
    const currentPrerequisites = selectedNode.data?.prerequisites || [];
    const restoredPrerequisites = trash.filter(
      (trashedId) =>
        allNodes.some((node) => node.id === trashedId) &&
        !currentPrerequisites.includes(trashedId),
    );

    if (restoredPrerequisites.length > 0) {
      const newTrash = trash.filter(
        (id) => !restoredPrerequisites.includes(id),
      );

      handleUpdateNodeFromSidebar({
        ...selectedNode.data,
        prerequisites: [...currentPrerequisites, ...restoredPrerequisites],
        prerequisitesTrash: newTrash,
      });

      setTrash(newTrash);
    }
  }, [allNodes, trash]);

  useEffect(() => {
    setIsAddingPrerequisite(false);
  }, [selectedNode.data?.prerequisites]);

  const availableNodes = allNodes.filter(
    (node) =>
      node.id !== selectedNode.id &&
      !selectedNode.data?.prerequisites?.includes(node.id),
  );

  const handleAddPrerequisite = () => {
    if (!prerequisiteId) return;
    setSelectingPrerequisite(false);

    const updatedPrerequisites = [
      ...(selectedNode.data?.prerequisites || []),
      prerequisiteId,
    ];

    handleUpdateNodeFromSidebar({
      ...selectedNode.data,
      prerequisites: updatedPrerequisites,
      prerequisitesTrash: trash,
    });

    setPrerequisiteId('');
    setIsAddingPrerequisite(false);
  };

  const handleRemovePrerequisite = (prereqId: string) => {
    const currentPrerequisites = selectedNode.data?.prerequisites || [];
    const updatedPrerequisites = currentPrerequisites.filter(
      (id: string) => id !== prereqId,
    );

    handleUpdateNodeFromSidebar({
      ...selectedNode.data,
      prerequisites: updatedPrerequisites,
    });
  };

  const getNodeLabel = (nodeId: string) => {
    return allNodes.find((node) => node.id === nodeId)?.data?.label || nodeId;
  };

  return (
    <div ref={rightSidebarRef}>
      <div
        className={`${styles.rightSidebar} ${
          isRightSidebarOpen ? styles.open : ''
        }`}
      >
        <div className={styles.rightSidebarContent}>
          <h3 className={styles.rightSidebarTitle}>Node Details</h3>
          <div className={styles.rightSidebarField}>
            <label className={styles.rightSidebarLabel}>Label</label>
            <input
              className={
                styles.rightSidebarInput + ' bg-[#f5f5f5] dark:bg-[#262626]'
              }
              value={selectedNode.data?.label || ''}
              onChange={(e) =>
                handleUpdateNodeFromSidebar({
                  ...selectedNode.data,
                  label: e.target.value,
                })
              }
              title="Node Label"
              placeholder="Enter node label"
            />
          </div>
          <div className={styles.rightSidebarField}>
            <label className={styles.rightSidebarLabel}>Type</label>
            <select
              className={
                styles.rightSidebarInput + ' bg-[#f5f5f5] dark:bg-[#262626]'
              }
              value={selectedNode.data?.type || ''}
              onChange={(e) =>
                handleUpdateNodeFromSidebar({
                  ...selectedNode.data,
                  type: e.target.value as 'topic' | 'subTopic',
                })
              }
            >
              <option value="topic">Topic</option>
              <option value="subTopic">Sub Topic</option>
            </select>
          </div>
          <div className={styles.rightSidebarField}>
            <label className={styles.rightSidebarLabel}>Description</label>
            <textarea
              className={
                styles.rightSidebarInput + ' bg-[#f5f5f5] dark:bg-[#262626]'
              }
              value={selectedNode.data?.description || ''}
              onChange={(e) =>
                handleUpdateNodeFromSidebar({
                  ...selectedNode.data,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div className={styles.rightSidebarField}>
            <label className={styles.rightSidebarLabel}>
              Keywords (comma-separated)
            </label>
            <input
              className={
                styles.rightSidebarInput + ' bg-[#f5f5f5] dark:bg-[#262626]'
              }
              value={selectedNode.data?.keywords || ''}
              onChange={(e) =>
                handleUpdateNodeFromSidebar({
                  ...selectedNode.data,
                  keywords: e.target.value,
                })
              }
              placeholder="e.g., javascript, programming, web development"
            />
          </div>
          <div className={styles.rightSidebarField}>
            <label className={styles.rightSidebarLabel}>Skill Name</label>
            <input
              className={
                styles.rightSidebarInput + ' bg-[#f5f5f5] dark:bg-[#262626]'
              }
              value={selectedNode.data?.skillast_name || ''}
              onChange={(e) =>
                handleUpdateNodeFromSidebar({
                  ...selectedNode.data,
                  skillast_name: e.target.value,
                })
              }
            />
          </div>
          <div className={styles.rightSidebarField}>
            <label className={styles.rightSidebarLabel}>Analysis Needed</label>
            <select
              className={
                styles.rightSidebarInput + ' bg-[#f5f5f5] dark:bg-[#262626]'
              }
              value={selectedNode.data?.isAnalysisNeeded ? 'true' : 'false'}
              onChange={(e) =>
                handleUpdateNodeFromSidebar({
                  ...selectedNode.data,
                  isAnalysisNeeded: e.target.value === 'true',
                })
              }
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          {/* Enhanced Prerequisites Section with Trash */}
          <div className={styles.rightSidebarField}>
            <div className="flex items-center justify-between mb-2">
              <label className={styles.rightSidebarLabel + ' mb-0'}>
                Prerequisites
              </label>
              {!isAddingPrerequisite && (
                <button
                  onClick={() => {
                    setIsAddingPrerequisite(true);
                    setSelectingPrerequisite(true);
                  }}
                  className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors"
                >
                  <Plus size={16} />
                  <span className="text-sm">Add Prerequisite</span>
                </button>
              )}
            </div>

            {isAddingPrerequisite && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <select
                    className={
                      styles.rightSidebarInput +
                      ' bg-[#f5f5f5] dark:bg-[#262626] flex-grow'
                    }
                    value={prerequisiteId}
                    onChange={(e) => setPrerequisiteId(e.target.value)}
                    autoFocus
                    aria-label="Select prerequisite node"
                  >
                    <option value="">Select a prerequisite node</option>
                    {availableNodes.map((node) => (
                      <option key={node.id} value={node.id}>
                        {node.data?.label || node.id}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    className="flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                    onClick={handleAddPrerequisite}
                  >
                    <Plus size={16} />
                    Add
                  </button>
                  <button
                    className="flex-1 px-3 py-2 bg-red-500 dark:bg-red-600  text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                    onClick={() => {
                      setIsAddingPrerequisite(false);
                      setSelectingPrerequisite(false);
                      setPrerequisiteId('');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Active Prerequisites List */}
            <div className="mt-2 space-y-2">
              {selectedNode.data?.prerequisites?.map((prereqId: string) => (
                <div
                  key={prereqId}
                  className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 rounded group hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <BookMarked size={16} className="text-blue-500" />
                    <span>{getNodeLabel(prereqId)}</span>
                  </div>
                  <button
                    onClick={() => handleRemovePrerequisite(prereqId)}
                    className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            className={styles.rightSidebarButtonResources}
            onClick={() => setIsResourcesDialogOpen(true)}
          >
            Add resources
          </button>
          <button
            className={styles.rightSidebarButton}
            onClick={() => handleDeleteNode(selectedNode.id)}
          >
            Delete Node
          </button>
        </div>
      </div>
      <AddResourceModal
        isOpen={isResourcesDialogOpen}
        onClose={() => setIsResourcesDialogOpen(false)}
        onSave={(resources) => {
          // Handle saving resources
          console.log('Saving resources:', resources);
          setIsResourcesDialogOpen(false);
        }}
      />
    </div>
  );
}
