const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center font-mono">
      <div className="text-center max-w-lg">
        <h1 className="text-6xl font-bold text-slate-600 dark:text-slate-400 mb-8 animate-pulse">
          404
        </h1>
        <p className="text-xl mb-6">
          Oops! The page you’re looking for does not exist.
        </p>
        <div className="relative inline-block">
          <span className="absolute inset-0 border-t-2 border-blue-500 animate-pulse" />
          <a
            href="/"
            className="relative z-10 p-5 text-lg font-semibold text-theme hover:text-blue-600 transition duration-300"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
