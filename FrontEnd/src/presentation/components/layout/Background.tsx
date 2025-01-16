const Background: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-gray-900">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-theme animate-gradient-x opacity-40 z-0"></div>

      {/* Pulsating Circles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-72 h-72 border border-blue-500 rounded-full opacity-90 animate-pulse top-1/4 left-1/4"></div>
        <div className="absolute w-96 h-96 border border-green-500 rounded-full opacity-90 animate-pulse bottom-1/3 right-1/3"></div>
        <div className="absolute w-64 h-64 border border-pink-500 rounded-full opacity-90 animate-pulse top-2/3 left-1/2"></div>
      </div>
    </div>
  );
};

export default Background;
