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
  id: number;
  role: string;
};
