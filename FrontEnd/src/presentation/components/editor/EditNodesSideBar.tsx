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
      <button
        className={styles.rightSidebarButton}
        onClick={() => handleDeleteNode(selectedNode.id)}
      >
        Delete Node
      </button>
    </div>
  );
}
