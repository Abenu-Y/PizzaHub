


// Update User Type
export type User = {
  id: string;           // Assuming you still want an ID
  name: string;        // For Name
  topping: string;     // For Topping
  quantity: number;    // For Quantity
  customerNo: string;  // For Customer No
  createdAt: string;   // For Created at (you can use Date object or ISO string)
  status: 'delivered' | 'ready' | 'received'; // For Status
};

// Update Fake Data
export const fakeData: User[] = [
  {
    id: '1',
    name: 'Margherita',
    topping: 'Tomato, Mozzarella',
    quantity: 2,
    customerNo: 'C001',
    createdAt: '2024-09-26T10:00:00Z',
    status: 'delivered',
  },
  {
    id: '2',
    name: 'Pepperoni',
    topping: 'Pepperoni, Mozzarella',
    quantity: 1,
    customerNo: 'C002',
    createdAt: '2024-09-26T11:00:00Z',
    status: 'ready',
  },
  {
    id: '3',
    name: 'Veggie',
    topping: 'Bell Peppers, Olives',
    quantity: 3,
    customerNo: 'C003',
    createdAt: '2024-09-26T12:00:00Z',
    status: 'received',
  },
  // Add more data as needed...
];
