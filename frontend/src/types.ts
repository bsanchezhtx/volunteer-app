export type Volunteer = {
  id: string;
  name: string;
  skills: string[];
  availability: string[];
};
export type Event = {
  id: string;
  name: string;
  requiredSkills: string[];
  date: string;
  urgency: number;
};
export type User = {
  email: string;
  role: string;
};
