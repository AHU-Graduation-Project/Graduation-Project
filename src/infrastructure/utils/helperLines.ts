import { Node, NodePositionChange, XYPosition } from 'reactflow';

// Types
interface SpacingGuide {
  start: number;
  end: number;
  position: number;
  distance: number;
  isVertical: boolean;
}

interface GetHelperLinesResult {
  horizontal?: number;
  vertical?: number;
  snapPosition: Partial<XYPosition>;
}

interface EnhancedHelperLinesResult extends GetHelperLinesResult {
  spacingGuides: SpacingGuide[];
  centerGuides: {
    horizontal?: number;
    vertical?: number;
  };
}

export function getEnhancedHelperLines(
  change: NodePositionChange,
  nodes: Node[],
  distance = 5,
): EnhancedHelperLinesResult {
  const defaultResult = {
    horizontal: undefined,
    vertical: undefined,
    snapPosition: { x: undefined, y: undefined },
    spacingGuides: [],
    centerGuides: {},
  };

  const nodeA = nodes.find((node) => node.id === change.id);
  if (!nodeA || !change.position) return defaultResult;

  const nodeABounds = {
    left: change.position.x,
    right: change.position.x + (nodeA?.width ?? 0),
    top: change.position.y,
    bottom: change.position.y + (nodeA?.height ?? 0),
    width: nodeA?.width ?? 0,
    height: nodeA?.height ?? 0,
    centerX: change.position.x + (nodeA?.width ?? 0) / 2,
    centerY: change.position.y + (nodeA?.height ?? 0) / 2,
  };

  let horizontalDistance = distance;
  let verticalDistance = distance;
  const spacingGuides: SpacingGuide[] = [];
  const centerGuides = {};

  return nodes
    .filter((node) => node.id !== nodeA.id)
    .reduce<EnhancedHelperLinesResult>(
      (result, nodeB) => {
        const nodeBBounds = {
          left: nodeB.position.x,
          right: nodeB.position.x + (nodeB?.width ?? 0),
          top: nodeB.position.y,
          bottom: nodeB.position.y + (nodeB?.height ?? 0),
          width: nodeB?.width ?? 0,
          height: nodeB?.height ?? 0,
          centerX: nodeB.position.x + (nodeB?.width ?? 0) / 2,
          centerY: nodeB.position.y + (nodeB?.height ?? 0) / 2,
        };

        // Left-Left alignment
        const distanceLeftLeft = Math.abs(nodeABounds.left - nodeBBounds.left);
        if (distanceLeftLeft < verticalDistance) {
          result.snapPosition.x = nodeBBounds.left;
          result.vertical = nodeBBounds.left;
          verticalDistance = distanceLeftLeft;
        }

        // Right-Right alignment
        const distanceRightRight = Math.abs(
          nodeABounds.right - nodeBBounds.right,
        );
        if (distanceRightRight < verticalDistance) {
          result.snapPosition.x = nodeBBounds.right - nodeABounds.width;
          result.vertical = nodeBBounds.right;
          verticalDistance = distanceRightRight;
        }

        // Left-Right alignment
        const distanceLeftRight = Math.abs(
          nodeABounds.left - nodeBBounds.right,
        );
        if (distanceLeftRight < verticalDistance) {
          result.snapPosition.x = nodeBBounds.right;
          result.vertical = nodeBBounds.right;
          verticalDistance = distanceLeftRight;
        }

        // Right-Left alignment
        const distanceRightLeft = Math.abs(
          nodeABounds.right - nodeBBounds.left,
        );
        if (distanceRightLeft < verticalDistance) {
          result.snapPosition.x = nodeBBounds.left - nodeABounds.width;
          result.vertical = nodeBBounds.left;
          verticalDistance = distanceRightLeft;
        }

        // Top-Top alignment
        const distanceTopTop = Math.abs(nodeABounds.top - nodeBBounds.top);
        if (distanceTopTop < horizontalDistance) {
          result.snapPosition.y = nodeBBounds.top;
          result.horizontal = nodeBBounds.top;
          horizontalDistance = distanceTopTop;
        }

        // Bottom-Top alignment
        const distanceBottomTop = Math.abs(
          nodeABounds.bottom - nodeBBounds.top,
        );
        if (distanceBottomTop < horizontalDistance) {
          result.snapPosition.y = nodeBBounds.top - nodeABounds.height;
          result.horizontal = nodeBBounds.top;
          horizontalDistance = distanceBottomTop;
        }

        // Bottom-Bottom alignment
        const distanceBottomBottom = Math.abs(
          nodeABounds.bottom - nodeBBounds.bottom,
        );
        if (distanceBottomBottom < horizontalDistance) {
          result.snapPosition.y = nodeBBounds.bottom - nodeABounds.height;
          result.horizontal = nodeBBounds.bottom;
          horizontalDistance = distanceBottomBottom;
        }

        // Top-Bottom alignment
        const distanceTopBottom = Math.abs(
          nodeABounds.top - nodeBBounds.bottom,
        );
        if (distanceTopBottom < horizontalDistance) {
          result.snapPosition.y = nodeBBounds.bottom;
          result.horizontal = nodeBBounds.bottom;
          horizontalDistance = distanceTopBottom;
        }

        // Center alignment checks
        const centerXDiff = Math.abs(nodeABounds.centerX - nodeBBounds.centerX);
        if (centerXDiff < verticalDistance) {
          result.snapPosition.x = nodeBBounds.centerX - nodeABounds.width / 2;
          result.centerGuides.vertical = nodeBBounds.centerX;
          verticalDistance = centerXDiff;
        }

        const centerYDiff = Math.abs(nodeABounds.centerY - nodeBBounds.centerY);
        if (centerYDiff < horizontalDistance) {
          result.snapPosition.y = nodeBBounds.centerY - nodeABounds.height / 2;
          result.centerGuides.horizontal = nodeBBounds.centerY;
          horizontalDistance = centerYDiff;
        }

        // Calculate spacing guides
        if (result.vertical !== undefined) {
        if (
          Math.abs(nodeABounds.left - nodeBBounds.right) <= distance ||
          Math.abs(nodeABounds.right - nodeBBounds.left) <= distance
        ) {
          const isLeftToRight = nodeABounds.left >= nodeBBounds.right;
          const actualDistance = isLeftToRight
            ? nodeABounds.left - nodeBBounds.right
            : nodeBBounds.left - nodeABounds.right;

          result.spacingGuides.push({
            start: Math.min(nodeABounds.top, nodeBBounds.top),
            end: Math.max(nodeABounds.bottom, nodeBBounds.bottom),
            position: isLeftToRight ? nodeABounds.left : nodeABounds.right,
            distance: Math.abs(actualDistance),
            isVertical: true,
          });
        }
        }

        if (result.horizontal !== undefined) {
         if (
           Math.abs(nodeABounds.top - nodeBBounds.bottom) <= distance ||
           Math.abs(nodeABounds.bottom - nodeBBounds.top) <= distance
         ) {
           const isTopToBottom = nodeABounds.top >= nodeBBounds.bottom;
           const actualDistance = isTopToBottom
             ? nodeABounds.top - nodeBBounds.bottom
             : nodeBBounds.top - nodeABounds.bottom;

           result.spacingGuides.push({
             start: Math.min(nodeABounds.left, nodeBBounds.left),
             end: Math.max(nodeABounds.right, nodeBBounds.right),
             position: isTopToBottom ? nodeABounds.top : nodeABounds.bottom,
             distance: Math.abs(actualDistance),
             isVertical: false,
           });
         }
        }

        return result;
      },
      { ...defaultResult, spacingGuides, centerGuides },
    );
}

// Rendering components
interface LineStyle {
  color?: string;
}

interface HelperLinesProps {
  width: number;
  height: number;
  lineStyle?: LineStyle;
}

interface EnhancedHelperLinesProps extends HelperLinesProps {
  spacingGuides?: SpacingGuide[];
  centerGuides?: {
    horizontal?: number;
    vertical?: number;
  };
}

interface MeasurementConfig {
  fontSize: number;
  fontFamily: string;
  color: string;
}

const defaultMeasurementConfig: MeasurementConfig = {
  fontSize: 12,
  fontFamily: 'Arial',
  color: '#666',
};

export function drawSpacingGuides(
  ctx: CanvasRenderingContext2D,
  guides: SpacingGuide[],
  measurementConfig: MeasurementConfig = defaultMeasurementConfig,
) {
  const { fontSize, fontFamily, color } = measurementConfig;

  guides.forEach((guide) => {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.setLineDash([4, 4]);

    if (guide.isVertical) {
      const midPoint = (guide.start + guide.end) / 2;
      ctx.moveTo(guide.position, guide.start);
      ctx.lineTo(guide.position, guide.end);

      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.translate(guide.position, midPoint);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(`${Math.round(guide.distance)}px`, 0, -10);
    } else {
      const midPoint = (guide.start + guide.end) / 2;
      ctx.moveTo(guide.start, guide.position);
      ctx.lineTo(guide.end, guide.position);

      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.fillText(
        `${Math.round(guide.distance)}px`,
        midPoint,
        guide.position - 10,
      );
    }

    ctx.stroke();
    ctx.restore();
  });
}

export function drawCenterGuides(
  ctx: CanvasRenderingContext2D,
  centerGuides: { horizontal?: number; vertical?: number },
  width: number,
  height: number,
  lineStyle: LineStyle = { color: defaultMeasurementConfig.color },
) {
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = lineStyle.color || defaultMeasurementConfig.color;
  ctx.setLineDash([2, 2]);

  if (centerGuides.vertical !== undefined) {
    ctx.moveTo(centerGuides.vertical, 0);
    ctx.lineTo(centerGuides.vertical, height);
  }

  if (centerGuides.horizontal !== undefined) {
    ctx.moveTo(0, centerGuides.horizontal);
    ctx.lineTo(width, centerGuides.horizontal);
  }

  ctx.stroke();
  ctx.restore();
}
