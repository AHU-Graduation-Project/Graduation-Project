import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import RoadmapCard from '../components/RoadmapCard';
import { roadmaps } from '../data/roadmaps';

export default function BrowseRoadmaps() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRoadmaps = roadmaps.filter(roadmap =>
    roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    roadmap.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-theme text-transparent bg-clip-text">
          {t('roadmaps.title')}
        </h1>
        <p className="text-lg text-slate-600 dark:text-white/80">
          {t('roadmaps.subtitle')}
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={t('search.placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoadmaps.map((roadmap) => (
          <RoadmapCard key={roadmap.id} {...roadmap} />
        ))}
        {filteredRoadmaps.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-slate-600 dark:text-slate-400">
              No roadmaps found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}