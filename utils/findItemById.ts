
import { contentData } from '@/data/contentData';

export function getItemRoute(itemId: string): string {
  const foundingDocuments = [
    'declaration',
    'articles',
    'constitution',
    'bill-of-rights',
    'federalist-papers',
  ];

  if (foundingDocuments.includes(itemId)) {
    return `/document/${itemId}`;
  }

  return `/detail/${itemId}`;
}

export function findItemById(itemId: string) {
  for (const main of contentData) {
    if (!main || !main.sections) continue;
    for (const sec of main.sections) {
      if (!sec || !sec.subsections) continue;
      for (const sub of sec.subsections) {
        if (sub && sub.id === itemId) {
          return {
            item: sub,
            section: sec.title,
            mainSection: main.title,
          };
        }
      }
    }
  }
  return null;
}
