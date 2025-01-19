import React from 'react';
import NodeDetailsModal from '../Modal/NodeDetailsModal';
import RoadmapInfo from './RoadmapInfo';
import ChatPanel from '../chat/ChatPanel';
import CourseModal from './CoursesModal';
import RatingModal from '../Modal/RatingModel';

interface ModalsAndPanelsProps {
  selectedNode: any;
  setSelectedNode: React.Dispatch<React.SetStateAction<any>>;
  showInfo: boolean;
  setShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
  showChat: boolean;
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
  showDetails: boolean;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  showCourses: boolean;
  setShowCourses: React.Dispatch<React.SetStateAction<boolean>>;
  showRating: boolean;
  setShowRating: React.Dispatch<React.SetStateAction<boolean>>;
  roadmap: any;
  userProgress: any;
}

export default function ModalsAndPanels({
  selectedNode,
  setSelectedNode,
  showInfo,
  setShowInfo,
  showChat,
  setShowChat,
  showDetails,
  setShowDetails,
  showCourses,
  setShowCourses,
  showRating,
  setShowRating,
  roadmap,
  userProgress,
}: ModalsAndPanelsProps) {
  return (
    <>
      <NodeDetailsModal
        isOpen={showDetails}
        onClose={() => {
          setShowDetails(false);
          setSelectedNode(null);
        }}
        node={selectedNode}
      />
      <RoadmapInfo
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        roadmap={roadmap}
      />
      <ChatPanel
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        roadmap={roadmap}
        userProgress={userProgress}
      />
      <CourseModal
        isOpen={showCourses}
        onClose={() => {
          setShowCourses(false);
          setSelectedNode(null);
        }}
        topic={!selectedNode ? roadmap?.title : selectedNode?.label}
      />
      <RatingModal
        isOpen={showRating}
        onClose={() => setShowRating(false)}
        onSubmit={(rating, comment) =>
          console.log('Rating:', rating, 'Comment:', comment)
        }
      />
    </>
  );
}
