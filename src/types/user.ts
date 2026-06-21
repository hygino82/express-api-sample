export type User = {
  id: number;
  email: string;
  password: string;
  phoneNumber: string;
};

export type RequestUserDto = {
  email: string;
  password: string;
  phoneNumber: string;
};

