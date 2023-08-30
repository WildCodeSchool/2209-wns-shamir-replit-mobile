export type IUser<T = Date> = {
  id: string;
  email: string;
  login: string;
  date_start_subscription?: T | null;
  date_end_subscription?: T | null;
};

export type CreateUser = {
  email: string;
  login: string;
  password: string;
};

export type IUserId = {
  id: number;
  login: string;
  email: string;
};
