export type IUser = {
  id: string;
  email: string;
  login: string;
  date_start_subscription?: Date;
  date_end_subscription?: Date;
};

export type CreateUser = {
  email: string;
  login: string;
  password: string;
};
