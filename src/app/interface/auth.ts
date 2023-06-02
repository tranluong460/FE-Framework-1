export interface ILoginUser {
  email: string;
  password: string;
}

export interface IRegisterUser {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  password: string;
  randomCode: string;
  randomString: string;
}
