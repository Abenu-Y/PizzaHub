import { z, ZodType } from 'zod';
import { adminRegisterData, formData,loginformData ,ToppingsFormData} from './type';


export const registerSchema: ZodType<formData> = z.object({
    email: z.string().nonempty("Please enter your email.").email("Invalid email format."),
    password: z.string().min(5, "Password must be at least 5 characters long.").max(20, "Password must not exceed 20 characters."),
    confirmPassword: z.string(),
    location: z.string().min(1, "Location is required."),
    agreeToTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms and conditions." }),
    phoneNumber: z.string().regex(/^(?:\+251|0)?9\d{8}$/, "Phone number must be in the format +251955273015 or 0955273015."),
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
  });


  export const loginSchema:ZodType<loginformData> = z.object({
    email: z.string().nonempty("Please enter your email.").email("Invalid email format."),
    password: z.string().min(5, "Password must be at least 5 characters long"),
    rememberMe: z.boolean().optional()
  })


  export const adminRegisterSchema:ZodType<adminRegisterData> = z.object({
    name:z.string().nonempty("Please enter your name"),
    email: z.string().nonempty("Please enter your email.").email("Invalid email format."),
    phoneNumber:z.string().regex(/^(?:\+251|0)?9\d{8}$/, "Phone number must be in the format +251955273015 or 0955273015."),
    password: z.string().min(5, "Password must be at least 5 characters long."),
    confirmPassword: z.string(),
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
  });



export const  toppingsSchema:ZodType<ToppingsFormData> = z.object({
  mozzarella: z.boolean(),
  tomato: z.boolean(),
  bellPeppers: z.boolean(),
  onions: z.boolean(),
  olives: z.boolean(),
});