export type ProjectFact = { 
  label: string; 
  value: string 
};

export type Project = {
  id: string;
  issue: string;
  name: string;
  slug?: string;
  dek: string;
  image: string;
  tags: string[];
  links: { live?: string; code?: string };
  facts: ProjectFact[];
  caseStudy: { kicker: string; headline: string; sections: string[] };
  featured?: boolean;
  status?: "draft" | "published";
  displayOrder?: number;
};
