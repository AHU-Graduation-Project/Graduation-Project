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
}

export default function EditNodesSideBar({
  styles,
  selectedNode,
  handleUpdateNodeFromSidebar,
  handleDeleteNode,
}: EditNodesSideBarProps) {
  return (
    <div className={styles.rightSidebarContent}>
      <h3 className={styles.rightSidebarTitle}>Node Details</h3>
      <div className={styles.rightSidebarField}>
        <label className={styles.rightSidebarLabel}>Label</label>
        <input
          className={styles.rightSidebarInput}
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
          className={styles.rightSidebarInput}
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
          className={styles.rightSidebarInput}
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
        <label className={styles.rightSidebarLabel}>Keywords (comma-separated)</label>
        <input
          className={styles.rightSidebarInput}
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
          className={styles.rightSidebarInput}
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
          className={styles.rightSidebarInput}
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
      <button
        className={styles.rightSidebarButton}
        onClick={() => handleDeleteNode(selectedNode.id)}
      >
        Delete Node
      </button>
    </div>
  );
}