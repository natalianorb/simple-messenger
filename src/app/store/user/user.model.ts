export interface User {
  id?: string;
  name: string;
  email: string;
}

export interface UserCreationData {
  name: string;
  email: string;
  password: string;
}

export interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

export const initialUserState: UserState = {
  currentUser: null,
  loading: false,
  error: null
};
