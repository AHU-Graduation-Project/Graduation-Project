import { CSSProperties, useEffect, useRef, useMemo } from 'react';
import { ReactFlowState, useStore, Node } from 'reactflow';

interface LineStyle {
  color?: string;
  width?: number;
  dash?: number[];
  opacity?: number;
}

interface GridConfig {
  spacing?: number;
  color?: string;
  opacity?: number;
  dash?: number[];
}

interface SpacingGuide {
  start: number;
  end: number;
  position: number;
  distance: number;
  isVertical: boolean;
}

interface CenterGuides {
  horizontal?: number;
  vertical?: number;
}

export interface HelperLinesProps {
  horizontal?: number | number[];
  vertical?: number | number[];
  lineStyle?: LineStyle;
  showGrid?: boolean;
  gridConfig?: GridConfig;
  snapToGrid?: boolean;
  snapThreshold?: number;
  showMeasurements?: boolean;
  measurementConfig?: {
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    unit?: string;
    precision?: number;
  };
  spacingGuides?: SpacingGuide[];
  centerGuides?: CenterGuides;
}

const defaultLineStyle: LineStyle = {
  color: '#0041d0',
  width: 1,
  opacity: 0.6,
  dash: [],
};

const defaultGridConfig: GridConfig = {
  spacing: 20,
  color: '#e2e2e2',
  opacity: 0.3,
  dash: [4, 4],
};

const defaultMeasurementConfig = {
  fontSize: 12,
  fontFamily: 'Arial',
  color: '#666',
  unit: 'px',
  precision: 0,
};

const canvasStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  zIndex: 10,
  pointerEvents: 'none',
};

const storeSelector = (state: ReactFlowState) => ({
  width: state.width,
  height: state.height,
  transform: state.transform,
  nodes: state.getNodes(),
});

export default function HelperLinesRenderer({
  horizontal,
  vertical,
  lineStyle = defaultLineStyle,
  showGrid = false,
  gridConfig = defaultGridConfig,
  snapToGrid = false,
  snapThreshold = 5,
  showMeasurements = false,
  measurementConfig = defaultMeasurementConfig,
  spacingGuides = [],
  centerGuides = {},
}: HelperLinesProps) {
  const { width, height, transform, nodes } = useStore(storeSelector);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const horizontalLines = useMemo(() => {
    return Array.isArray(horizontal)
      ? horizontal
      : horizontal !== undefined
      ? [horizontal]
      : [];
  }, [horizontal]);

  const verticalLines = useMemo(() => {
    return Array.isArray(vertical)
      ? vertical
      : vertical !== undefined
      ? [vertical]
      : [];
  }, [vertical]);

  const drawSpacingGuides = (ctx: CanvasRenderingContext2D) => {
    spacingGuides.forEach((guide) => {
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = measurementConfig.color || '#666';
      ctx.setLineDash([4, 4]);

      const x = guide.isVertical
        ? guide.position * transform[2] + transform[0]
        : 0;
      const y = guide.isVertical
        ? 0
        : guide.position * transform[2] + transform[1];

      if (guide.isVertical) {
        const startY = guide.start * transform[2] + transform[1];
        const endY = guide.end * transform[2] + transform[1];
        const midY = (startY + endY) / 2;

        // Draw the guide line
        ctx.moveTo(x, startY);
        ctx.lineTo(x, endY);

        // Draw the measurement
        if (showMeasurements) {
          ctx.font = `${measurementConfig.fontSize}px ${measurementConfig.fontFamily}`;
          ctx.textAlign = 'center';
          ctx.translate(x, midY);
          ctx.rotate(-Math.PI / 2);
          ctx.fillText(
            `${Math.round(guide.distance)}${measurementConfig.unit}`,
            0,
            -10,
          );
        }
      } else {
        const startX = guide.start * transform[2] + transform[0];
        const endX = guide.end * transform[2] + transform[0];
        const midX = (startX + endX) / 2;

        // Draw the guide line
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);

        // Draw the measurement
        if (showMeasurements) {
          ctx.font = `${measurementConfig.fontSize}px ${measurementConfig.fontFamily}`;
          ctx.textAlign = 'center';
          ctx.fillText(
            `${Math.round(guide.distance)}${measurementConfig.unit}`,
            midX,
            y - 10,
          );
        }
      }

      ctx.stroke();
      ctx.restore();
    });
  };

  const drawCenterGuides = (ctx: CanvasRenderingContext2D) => {
    if (!centerGuides) return;

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = lineStyle.color || '#0041d0';
    ctx.globalAlpha = 0.4;
    ctx.setLineDash([2, 4]);

    if (centerGuides.vertical !== undefined) {
      const x = centerGuides.vertical * transform[2] + transform[0];
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }

    if (centerGuides.horizontal !== undefined) {
      const y = centerGuides.horizontal * transform[2] + transform[1];
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }

    ctx.stroke();
    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!ctx || !canvas) return;

    const dpi = window.devicePixelRatio;
    canvas.width = width * dpi;
    canvas.height = height * dpi;

    ctx.scale(dpi, dpi);
    ctx.clearRect(0, 0, width, height);

    // Draw grid if enabled
    if (showGrid) {
      drawGrid(ctx);
    }

    // Draw helper lines
    ctx.beginPath();
    ctx.strokeStyle = lineStyle.color ?? defaultLineStyle.color ?? '#000000';
    ctx.lineWidth = lineStyle.width ?? defaultLineStyle.width ?? 1;
    ctx.globalAlpha = lineStyle.opacity ?? defaultLineStyle.opacity ?? 1;
    ctx.setLineDash(lineStyle.dash || []);

    // Draw regular alignment lines
    verticalLines.forEach((pos) => {
      const x = pos * transform[2] + transform[0];
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      if (showMeasurements) {
        drawMeasurements(ctx, x, 0, true);
      }
    });

    horizontalLines.forEach((pos) => {
      const y = pos * transform[2] + transform[1];
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      if (showMeasurements) {
        drawMeasurements(ctx, 0, y, false);
      }
    });

    ctx.stroke();

    // Draw spacing guides
    drawSpacingGuides(ctx);

    // Draw center guides
    drawCenterGuides(ctx);

    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
  }, [
    width,
    height,
    transform,
    horizontalLines,
    verticalLines,
    lineStyle,
    showGrid,
    gridConfig,
    showMeasurements,
    measurementConfig,
    spacingGuides,
    centerGuides,
  ]);

  // Keep existing grid snapping logic
  useEffect(() => {
    if (snapToGrid && gridConfig.spacing) {
      nodes.forEach((node) => {
        const snapX =
          Math.round(node.position.x / gridConfig.spacing!) *
          gridConfig.spacing!;
        const snapY =
          Math.round(node.position.y / gridConfig.spacing!) *
          gridConfig.spacing!;

        if (
          Math.abs(node.position.x - snapX) < snapThreshold &&
          Math.abs(node.position.y - snapY) < snapThreshold
        ) {
          node.position = { x: snapX, y: snapY };
        }
      });
    }
  }, [nodes, snapToGrid, gridConfig.spacing, snapThreshold]);

  return (
    <canvas
      ref={canvasRef}
      className="react-flow__canvas"
      style={canvasStyle}
      data-testid="helper-lines-renderer"
    />
  );
}
