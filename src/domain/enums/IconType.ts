import {
  Edit,
  Code,
  Map,
  Plus,
  Brain,
  Library,
  Cpu,
  BookOpen,
  Video,
  Globe,
  Youtube,
  GraduationCap,
  FileText,
  Github,
  LucideIcon,
} from 'lucide-react';

export enum IconType {
  MAP = 'map',
  EDIT = 'edit',
  CODE = 'code',

  PLUS = 'plus',
  BRAIN = 'brain',
  LIBRARY = 'library',
  CPU = 'cpu',
  BOOK = 'book',
  VIDEO = 'video',
  LINK = 'link',
  YOUTUBE = 'youtube',
  COURSE = 'course',
  ARTICLE = 'article',
  GITHUB = 'github',
}

export const IconComponents: Record<IconType, LucideIcon> = {
  [IconType.MAP]: Map,
  [IconType.EDIT]: Edit,
  [IconType.CODE]: Code,

  [IconType.PLUS]: Plus,
  [IconType.BRAIN]: Brain,
  [IconType.LIBRARY]: Library,
  [IconType.CPU]: Cpu,
  [IconType.BOOK]: BookOpen,
  [IconType.VIDEO]: Video,
  [IconType.LINK]: Globe,
  [IconType.YOUTUBE]: Youtube,
  [IconType.COURSE]: GraduationCap,
  [IconType.ARTICLE]: FileText,
  [IconType.GITHUB]: Github,
};
