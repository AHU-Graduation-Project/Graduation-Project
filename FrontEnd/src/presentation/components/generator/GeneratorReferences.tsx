import { Globe, BookOpen, GraduationCap, FileText, Book } from 'lucide-react';
import ThemeIcon from '../UI/ThemeIcon';

enum ReferenceType {
  DOCUMENTATION = 'documentation',
  COURSE = 'course',
  ARTICLE = 'article',
  BOOK = 'book'
}

interface GeneratorReferencesProps {
  references: {
    type: ReferenceType;
    title: string;
    description: string;
    url: string;
  }[];
}

const getIconByType = (type: ReferenceType) => {
  switch (type) {
    case ReferenceType.DOCUMENTATION:
      return FileText;
    case ReferenceType.COURSE:
      return GraduationCap;
    case ReferenceType.ARTICLE:
      return Globe;
    case ReferenceType.BOOK:
      return Book;
    default:
      return Globe;
  }
};

export default function GeneratorReferences({
  references: sources,
}: GeneratorReferencesProps) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-theme"> References</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {sources.map((source, index) => (
          <a
            key={index}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-2 p-3 rounded-lg bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-theme transition-all"
          >
            <div className="p-1.5 rounded-md bg-slate-50 dark:bg-slate-800 group-hover:bg-theme/10">
              <ThemeIcon icon={getIconByType(source.type)} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm mb-0.5 truncate group-hover:text-theme">
                {source.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {source.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
