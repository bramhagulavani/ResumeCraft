export interface ResumeData {
  name: string;
  email: string;
  phone?: string;
  linkedin?: string;
  summary: string;
  skills: string[];
  experience: { company: string; role: string; description: string }[];
  education: { college: string; degree: string; year: string }[];
  projects: { title: string; description: string; tech: string }[];
}
