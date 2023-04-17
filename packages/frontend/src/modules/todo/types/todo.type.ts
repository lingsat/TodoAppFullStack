export interface ITodo {
  id?: number;
  title: string;
  description: string;
  isPrivate: boolean;
  isComplete?: boolean;
  user?: {
    id: number;
    email: string;
  };
}

export interface ITodoWithCount {
  todos: ITodo[];
  count: number;
  nextPage?: number | undefined;
}
