import React, { useState, useEffect } from 'react';
import { X, Plus, BookMarked, Trash2 } from 'lucide-react';

interface EditNodesSideBarProps {
  styles: {
    rightSidebarContent: string;
    rightSidebarTitle: string;
    rightSidebarField: string;
    rightSidebarLabel: string;
    rightSidebarInput: string;
    rightSidebarButton: string;
  };
  selectedNode: any;
  handleUpdateNodeFromSidebar: (data: any) => void;
  handleDeleteNode: (id: string) => void;
  allNodes?: any[];
}

export default function EditNodesSideBar({
  styles,
  selectedNode,
  handleUpdateNodeFromSidebar,
  handleDeleteNode,
  allNodes = [],
}: EditNodesSideBarProps) {
  const [isAddingPrerequisite, setIsAddingPrerequisite] = useState(false);
  const [prerequisiteId, setPrerequisiteId] = useState('');

  // Initialize trash from node data or empty array
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
      // Remove invalid prerequisites and add them to trash
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

  const availableNodes = allNodes.filter(
    (node) =>
      node.id !== selectedNode.id &&
      !selectedNode.data?.prerequisites?.includes(node.id),
  );

  const handleAddPrerequisite = () => {
    if (!prerequisiteId) return;

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
    const updatedPrerequisites = (
      selectedNode.data?.prerequisites || []
    ).filter((id: string) => id !== prereqId);

    // Add removed prerequisite to trash
    const newTrash = [...trash];
    if (!newTrash.includes(prereqId)) {
      newTrash.push(prereqId);
    }

    handleUpdateNodeFromSidebar({
      ...selectedNode.data,
      prerequisites: updatedPrerequisites,
      prerequisitesTrash: newTrash,
    });

    setTrash(newTrash);
  };

  const handleRestoreFromTrash = (trashedId: string) => {
    // Only restore if the node exists in allNodes
    if (allNodes.some((node) => node.id === trashedId)) {
      const newTrash = trash.filter((id) => id !== trashedId);
      const updatedPrerequisites = [
        ...(selectedNode.data?.prerequisites || []),
        trashedId,
      ];

      handleUpdateNodeFromSidebar({
        ...selectedNode.data,
        prerequisites: updatedPrerequisites,
        prerequisitesTrash: newTrash,
      });

      setTrash(newTrash);
    }
  };

  const getNodeLabel = (nodeId: string) => {
    return allNodes.find((node) => node.id === nodeId)?.data?.label || nodeId;
  };

  return (
    <div className={styles.rightSidebarContent}>
      <h3 className={styles.rightSidebarTitle}>Node Details</h3>
      {/* Existing fields */}
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
          value={selectedNode.data?.skillName || ''}
          onChange={(e) =>
            handleUpdateNodeFromSidebar({
              ...selectedNode.data,
              skillName: e.target.value,
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
              onClick={() => setIsAddingPrerequisite(true)}
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
                className="flex-1 px-3 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                onClick={() => {
                  setIsAddingPrerequisite(false);
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

        {/* Trash Section
        {trash.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <Trash2 size={16} />
              <span className="text-sm font-medium">Removed Prerequisites</span>
            </div>
            <div className="space-y-2">
              {trash.map((trashedId) => (
                <div
                  key={trashedId}
                  className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded group hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-2 text-gray-500">
                    <span>{getNodeLabel(trashedId)}</span>
                  </div>
                  {allNodes.some((node) => node.id === trashedId) && (
                    <button
                      onClick={() => handleRestoreFromTrash(trashedId)}
                      className="text-gray-400 hover:text-green-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Plus size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )} */}
      </div>

      <button
        className={styles.rightSidebarButton}
        onClick={() => handleDeleteNode(selectedNode.id)}
      >
        Delete Node
      </button>
    </div>
  );
}