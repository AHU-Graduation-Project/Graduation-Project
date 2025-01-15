import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import styles from './CustomNode.module.css';

type NodeType = 'topic' | 'sideTopic';

type CustomNodeData = {
  label: string;
  description: string;
  type: NodeType;
};

type CustomNodeProps = NodeProps<CustomNodeData>;

const CustomNode = ({ data, id }: CustomNodeProps) => {
  return (
    <div className={`${ "customNode"} ${styles[data.type]}`}>
      {/* Handles for all sides */}
      <Handle type="target" position={Position.Left} id="left-target" />
      <Handle type="source" position={Position.Left} id="left-source" />
      <Handle type="target" position={Position.Right} id="right-target" />
      <Handle type="source" position={Position.Right} id="right-source" />
      <Handle type="target" position={Position.Top} id="top-target" />
      <Handle type="source" position={Position.Top} id="top-source" />
      <Handle type="target" position={Position.Bottom} id="bottom-target" />
      <Handle type="source" position={Position.Bottom} id="bottom-source" />

      <div className={ "nodeContent"}>
        <div className={ "nodeHeader"}>
          <span className={ "nodeLabel"}>{data.label}</span>
        </div>

      </div>
    </div>
  );
};

export default memo(CustomNode);
