interface EditNodesSideBarProps {
  styles: any;
  selectedEdge: any;
  setEdges: any;
  handleUpdateEdgeFromSidebar: (id: string, params: any) => void;
  handleDeleteEdge: (id: string) => void;
  rightSidebarRef: any;
  isRightSidebarOpen: boolean;
}

export default function EditEdgesSideBar({
  styles,
  selectedEdge,
  setEdges,
  handleUpdateEdgeFromSidebar,
  handleDeleteEdge,
  rightSidebarRef,
  isRightSidebarOpen,
}: EditNodesSideBarProps) {
  const handleSwapDirection = () => {
    setEdges((edges: any) =>
      edges.map((edge: any) => {
        if (edge.id === selectedEdge.id) {
          // Extract positions from handles
          const sourceHandleParts = edge.sourceHandle.split('-');
          const targetHandleParts = edge.targetHandle.split('-');
          
          // Keep the original positions (top/bottom) but swap source/target
          const newSourceHandle = `${targetHandleParts[0]}-source`;
          const newTargetHandle = `${sourceHandleParts[0]}-target`;

          return {
            ...edge,
            source: edge.target,
            target: edge.source,
            sourceHandle: newSourceHandle,
            targetHandle: newTargetHandle,
          };
        }
        return edge;
      }),
    );
  };
  return (
    <div
      ref={rightSidebarRef}
      className={`${styles.rightSidebar} ${
        isRightSidebarOpen ? styles.open : ''
      }`}
    >
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
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                id="edge-animation"
                type="checkbox"
                checked={selectedEdge.animated || false}
                onChange={(e) =>
                  handleUpdateEdgeFromSidebar(selectedEdge.id, {
                    animated: e.target.checked,
                  })
                }
                className="sr-only peer"
                aria-label="Toggle edge animation"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-none peer-focus:ring-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-theme"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Animated
              </span>
            </label>
            {selectedEdge.animated && (
              <button
                onClick={handleSwapDirection}
                className="ml-2 p-1 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                title="Toggle animation direction"
                aria-label="Toggle animation direction"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 5a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm7 6a1 1 0 01-1 1H6a1 1 0 110-2h8a1 1 0 011 1zm-7 4a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
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
