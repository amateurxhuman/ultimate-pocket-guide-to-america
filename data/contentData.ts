
import { foundationsData } from './foundationsData';
import { civicliteracyData } from './civicliteracyData';
import { politicallandscapeData } from './politicallandscapeData';
import { principlespracticeData } from './principlespracticeData';
import { landlifeData } from './landlifeData';

export interface SubSection {
  id: string;
  title: string;
  content: string;
  fullText?: string;
  context?: string;
  imageUrl?: string;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  subsections: SubSection[];
}

export interface MainSection {
  id: string;
  title: string;
  icon: string;
  description: string;
  sections: Section[];
}

export const contentData: MainSection[] = [
  foundationsData,
  civicliteracyData,
  politicallandscapeData,
  principlespracticeData,
  landlifeData,
];

export function getSectionById(sectionId: string): MainSection | undefined {
  return contentData.find((section) => section.id === sectionId);
}

export function getSubSectionById(
  mainSectionId: string,
  sectionId: string,
  subsectionId: string
): SubSection | undefined {
  const mainSection = getSectionById(mainSectionId);
  if (!mainSection) return undefined;

  const section = mainSection.sections.find((s) => s.id === sectionId);
  if (!section) return undefined;

  return section.subsections.find((ss) => ss.id === subsectionId);
}
