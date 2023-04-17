export interface ITodoBody {
  id?: number;
  title: string;
  description: string;
  isPrivate: boolean;
  isComplete?: boolean;
  userId?: number;
}
