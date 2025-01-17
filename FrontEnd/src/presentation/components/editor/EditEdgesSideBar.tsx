interface EditNodesSideBarProps {
  styles: any;
  selectedEdge: any;
  handleUpdateEdgeFromSidebar: (id: string, params: any) => void;
  handleDeleteEdge: (id: string) => void;
  rightSidebarRef: any;
  isRightSidebarOpen: boolean;
}

export default function EditEdgesSideBar({
  styles,
  selectedEdge,
  handleUpdateEdgeFromSidebar,
  handleDeleteEdge,
  rightSidebarRef,
  isRightSidebarOpen,
}: EditNodesSideBarProps) {
  return (
    <div
        ref={rightSidebarRef}
        className={`${styles.rightSidebar} ${
          isRightSidebarOpen ? styles.open : ''
        }`}>
      <div className={styles.rightSidebarContent}>
        <h3 className={styles.rightSidebarTitle}>Edge Details</h3>

        {/* Edge Type Selector */}
        <div className={styles.rightSidebarField}>
          <label className={styles.rightSidebarLabel}>Type</label>
          <select
            aria-label="Edge type selector"
            className={
              styles.rightSidebarInput + ' bg-[#f5f5f5] dark:bg-[#262626]'
            }
            value={selectedEdge.type || 'default'}
            onChange={(e) =>
              handleUpdateEdgeFromSidebar(selectedEdge.id, {
                type: e.target.value,
              })
            }
          >
            <option value="default">Default</option>
            <option value="smoothstep">Smooth Step</option>
            <option value="step">Step</option>
            <option value="straight">Straight</option>
          </select>
        </div>

        {/* Animation Checkbox */}
        <div className={styles.rightSidebarField}>
          <label className={styles.rightSidebarLabel}>Animation</label>
          <div className="flex items-center gap-2">
            <input
              id="edge-animation"
              type="checkbox"
              checked={selectedEdge.animated || false}
              onChange={(e) =>
                handleUpdateEdgeFromSidebar(selectedEdge.id, {
                  animated: e.target.checked,
                })
              }
              aria-label="Toggle edge animation"
            />
            <label htmlFor="edge-animation">Animated</label>
          </div>
        </div>

        {/* Line Style Selector */}
        <div className={styles.rightSidebarField}>
          <label className={styles.rightSidebarLabel}>Line Style</label>
          <select
            aria-label="Line style selector"
            className={
              styles.rightSidebarInput + ' bg-[#f5f5f5] dark:bg-[#262626]'
            }
            value={selectedEdge.style?.strokeDasharray ? 'dashed' : 'solid'}
            onChange={(e) =>
              handleUpdateEdgeFromSidebar(selectedEdge.id, {
                style: {
                  strokeDasharray:
                    e.target.value === 'dashed' ? '5,5' : undefined,
                },
              })
            }
          >
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
          </select>
        </div>

        {/* Delete Edge Button */}
        <button
          className={styles.rightSidebarButton}
          onClick={() => handleDeleteEdge(selectedEdge.id)}
        >
          Delete Edge
        </button>
      </div>
    </div>
  );
}
