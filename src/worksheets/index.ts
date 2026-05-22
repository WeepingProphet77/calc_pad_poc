import { lazy, type LazyExoticComponent, type ComponentType } from 'react';

export interface WorksheetEntry {
  id: string;
  name: string;
  reference: string;
  category: string;
  description: string;
  component: LazyExoticComponent<ComponentType>;
}

export const worksheets: WorksheetEntry[] = [
  {
    id: 'zp5-flat-wall-face',
    name: 'Flat Wall Panel to Flat Wall Panel Face',
    reference: '5.3.2.2.ZP5',
    category: 'Panel-to-Panel Connections',
    description:
      'Face connection capacity (X, Y, Z) of weld + field plate + precast embed assembly.',
    component: lazy(() => import('./zp5-flat-wall-face/index')),
  },
];

export function groupByCategory(items: WorksheetEntry[]): Record<string, WorksheetEntry[]> {
  return items.reduce(
    (acc, w) => {
      (acc[w.category] ||= []).push(w);
      return acc;
    },
    {} as Record<string, WorksheetEntry[]>
  );
}
