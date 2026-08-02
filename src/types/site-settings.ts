export type PersonalDetails = {
  name: string;
  role: string;
  location: string;
  availability: string;
  heroIntro: string;
  aboutIntro: string;
  aboutBody: string;
  study: string;
  focus: string;
  outsideCode: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  coordinates: string;
  contactPrompt: string;
  responseTime: string;
  footerNote: string;
};

export type PersonalDetailsVersion = {
  id: string;
  details: PersonalDetails;
  createdAt: string;
};
