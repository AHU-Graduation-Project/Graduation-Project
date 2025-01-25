import CVForm from "./CVMain";

const CV = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500/10 to-purple-500/10 ">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">CV Builder</h1>
        <div className="grid lg:grid-cols-2 gap-8">
          <CVForm />
        </div>
      </div>
    </div>
  );
};

export default CV;
