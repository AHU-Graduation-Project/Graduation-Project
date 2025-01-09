import { Link } from "react-router-dom";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  imageUrl: string;
  linkText: string;
  linkUrl: string;
  gradient: string;
}

export default function Feature({
  icon,
  title,
  description,
  imageUrl,
  linkText,
  linkUrl,
  gradient,
}: FeatureProps) {
  return (
    <div className="flex items-center gap-12">
      <div className="flex-1">
        <div className="w-12 h-12 mb-4">{icon}</div>
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">{description}</p>
        <Link
          to={linkUrl}
          className="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium"
        >
          {linkText}
        </Link>
      </div>
      <div className="flex-1 relative">
        <div
          className={`absolute inset-0 ${gradient} rounded-2xl blur opacity-20`}
        />
        <img
          src={imageUrl}
          alt={title}
          className="relative rounded-2xl shadow-xl"
        />
      </div>
    </div>
  );
}
