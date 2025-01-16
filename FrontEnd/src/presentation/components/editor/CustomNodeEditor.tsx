import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import styles from './CustomNode.module.css';

type NodeType = 'topic' | 'subTopic';

type CustomNodeData = {
  label: string;
  description: string;
  type: NodeType;
  isSelected: boolean;
  isSelectAblePrerequisite: boolean;
};

type CustomNodeProps = NodeProps<CustomNodeData>;

const CustomNodeEditor = ({ data}: CustomNodeProps) => {
  return (
    <div
      className={`${styles.customNode} ${styles[data.type]} ${
        data.isSelected
          ? data.type == 'topic'
            ? ' bg-theme'
            : 'border-theme border-2 text-theme'
          : data.isSelectAblePrerequisite
          ? 'bg-theme-shadow animate-breath'
          : ''
      } `}
    >
      {/* Handles for all sides */}
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        className={styles.handle}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        className={styles.handle}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        className={styles.handle}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        className={styles.handle}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="top-target"
        className={styles.handle}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top-source"
        className={styles.handle}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-target"
        className={styles.handle}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        className={styles.handle}
      />

      <div className={'nodeContent'}>
        <div className={'nodeHeader'}>
          <span className={'nodeLabel'}>{data.label}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(CustomNodeEditor);
