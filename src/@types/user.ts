export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  subscribeToUpdates: boolean;
}

export type UserData = Omit<User, "id">;

export interface UserCredentials {
  email: string;
  password: string;
}
