import { Edit, Code, Map, Plus, Brain, Library, Cpu, LucideIcon } from 'lucide-react';

export enum IconType {
  EDIT = 'edit',
  CODE = 'code',
  MAP = 'map',
  PLUS = 'plus',
  BRAIN = 'brain',
  LIBRARY = 'library',
  CPU = 'cpu'
}

export const IconComponents: Record<IconType, LucideIcon> = {
  [IconType.EDIT]: Edit,
  [IconType.CODE]: Code,
  [IconType.MAP]: Map,
  [IconType.PLUS]: Plus,
  [IconType.BRAIN]: Brain,
  [IconType.LIBRARY]: Library,
  [IconType.CPU]: Cpu,
};
