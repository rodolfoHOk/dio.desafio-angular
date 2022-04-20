export interface User {
  id: number;
  avatar: string;
  name: string;
  email: string;
  additionalContact?: string;
  role: string;
  department: string;
  submitsTo?: string;
  admittedTo: Date;
}
