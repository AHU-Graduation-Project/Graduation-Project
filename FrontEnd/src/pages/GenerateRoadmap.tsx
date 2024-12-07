import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/authStore';
import { generateRoadmap } from '../services/openai';
import GenerateForm from '../components/GenerateForm';
import GeneratePreview from '../components/GeneratePreview';
import html2canvas from 'html2canvas';
import { PDFDocument, rgb } from 'pdf-lib';

export default function GenerateRoadmap() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, saveCustomRoadmap } = useAuthStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roadmapData, setRoadmapData] = useState<{
    nodes: any[];
    edges: any[];
  } | null>(null);

  const handleGenerate = async (prompt: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const data = await generateRoadmap(prompt);
      
      const enhancedNodes = data.nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          t,
          onShowDetails: (nodeData: any) => {
            console.log('Node details:', nodeData);
          }
        }
      }));

      setRoadmapData({
        ...data,
        nodes: enhancedNodes
      });
    } catch (err: any) {
      setError(err.message || 'Failed to generate roadmap. Please try again.');
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    if (!roadmapData) return;
    const roadmapId = `custom-${Date.now()}`;
    saveCustomRoadmap(
      roadmapId,
      'Custom Roadmap',
      'Generated learning path',
      roadmapData.nodes,
      roadmapData.edges
    );
    navigate(`/roadmap/${roadmapId}`);
  };

  const handleDownload = async () => {
    if (!roadmapData) return;

    try {
      // Capture the ReactFlow canvas
      const flowElement = document.querySelector('.react-flow') as HTMLElement;
      const canvas = await html2canvas(flowElement, {
        backgroundColor: null,
        scale: 2,
      });

      // Create PDF
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([canvas.width / 2, canvas.height / 2]);
      
      // Add the captured image
      const jpgImage = await pdfDoc.embedJpg(canvas.toDataURL('image/jpeg'));
      page.drawImage(jpgImage, {
        x: 0,
        y: 0,
        width: page.getWidth(),
        height: page.getHeight(),
      });

      // Save the PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'learning-roadmap.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating PDF:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-theme text-transparent bg-clip-text">
          {t('generate.title')}
        </h1>
        <p className="text-lg text-slate-600 dark:text-white/80">
          {t('generate.subtitle')}
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <GenerateForm 
          onSubmit={handleGenerate}
          isGenerating={isGenerating}
        />
      </div>

      {error && (
        <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-500">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      )}

      {roadmapData && (
        <div className="max-w-4xl mx-auto">
          <GeneratePreview
            nodes={roadmapData.nodes}
            edges={roadmapData.edges}
            onSave={handleSave}
            onDownload={handleDownload}
          />
        </div>
      )}
    </div>
  );
}