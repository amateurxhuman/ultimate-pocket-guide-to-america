
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

export const landlifeData: MainSection = {
  id: "land-life",
  title: "Land and Life",
  icon: "globe",
  description: "America's geography, people, and heritage",
  sections: [],
};
