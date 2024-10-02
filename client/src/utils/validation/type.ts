
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


export  type ToppingsFormData = {
  mozzarella: boolean;
  tomato: boolean;
  bellPeppers: boolean;
  onions: boolean;
  olives: boolean;
};


export type Topping = {
  name: string;
  price: number | null; 
}

export type Pizza =  {
  pizza_id: number;
  pizza_name: string;
  pizza_base_price: number | string; 
  restaurant_name: string;
  restaurant_id:number;
  toppings: Topping[]; 
}

export type PizzaId =  {
  pizza_id: number;
  pizza_name: string;
  pizza_base_price: number | string; 
  restaurant_name: string;
  restaurant_id:number;
  topping_id:number;
  toppings: Topping[]; 
}