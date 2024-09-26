
export type formData = {
    email: string,
    password: string,
    confirmPassword: string,
    location: string,
    agreeToTerms: boolean,
    phoneNumber: string,
  };

export type loginformData ={
    email: string;
    password: string;
    rememberMe?:boolean
}


export type adminRegisterData ={
  name:string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}