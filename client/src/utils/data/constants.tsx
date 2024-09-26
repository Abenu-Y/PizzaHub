

type mockObj = {
    name: string,
    description: string
};

type mockStatusObj={
    name:string,
    description:string,
    order_status:string
  }

// Mock restaurant data
export const MockRestuarnt: mockObj[] = [
    { name: "Azmera Pizza", description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to..." },
    { name: "Pizza Palace", description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to..." },
    { name: "The Slice", description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to..." },
    { name: "Cheesy Crust", description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to..." },
    { name: "Crust & Crumble", description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to..." },
    { name: "Pizza Perfection", description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to..." },
    { name: "Slice of Heaven", description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to..." }
];


// Mock pizza data
export const MockPizza: mockObj[] = [
    { name: "Margherita", description: "Tomato, Mozzarella, Bell Peppers, Onions, Olives" },
    { name: "Hawaiian", description: "Tomato, Mozzarella, Ham, Pineapple, Olives" },
    { name: "Quattro Formaggi", description: "Tomato, Mozzarella, Parmesan, Gorgonzola, Ricotta" },
    { name: "Margherita", description: "Tomato, Mozzarella, Bell Peppers, Onions, Olives" },
    { name: "Hawaiian", description: "Tomato, Mozzarella, Ham, Pineapple, Olives" },
    { name: "Quattro Formaggi", description: "Tomato, Mozzarella, Parmesan, Gorgonzola, Ricotta" }
];



  
 export  const MockStatusPizza :mockStatusObj[]=[
    {
        name:"Margherita",
        description:"Tomato, Mozzarella, Bell Peppers, Onions, Olives",
        order_status:"Ordered"
    },
    {
        name:"Hawaiian",
        description:"Tomato, Mozzarella, Ham, Pineapple,Olive,Ricotta",
        order_status:"Recieved"
    },
    {
        name:"Quattro Formaggi",
        description:"Tomato, Mozzarella, Parmesan, Gorgonzola, Ricotta",
        order_status:"Recieved"
    },
    {
        name:"Quattro Stagioni",
        description:"Tomato, Mozzarella, Ham, Pineapple, Olives, Artichokes",
        order_status:"Ordered"
    },
    {
        name:"Margherita",
        description:"Tomato, Mozzarella, Bell Peppers, Onions, Olives",
        order_status:"Recieved"
    },
    {
        name:"Hawaiian",
        description:"Tomato, Mozzarella, Ham, Pineapple,Olive,Onion",
        order_status:"Recieved"
    },
   
  ]