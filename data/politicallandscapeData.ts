
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

export const politicallandscapeData: MainSection = {
  id: "political-landscape",
  title: "Political Landscape",
  icon: "flag",
  description: "Understanding America's political parties and movements",
  sections: [],
};
