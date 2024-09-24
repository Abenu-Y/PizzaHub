import { Box, Typography } from '@mui/material';
import PizzaCard from '../PizzaCard/PizzaCard';

const Fasting = () => {
    type mockObj = {
        name: string,
        description: string
    }

    // Mock pizza data
    const MockPizza: mockObj[] = [
        { name: "Margherita", description: "Tomato, Mozzarella, Bell Peppers, Onions, Olives" },
        { name: "Hawaiian", description: "Tomato, Mozzarella, Ham, Pineapple, Olives" },
        { name: "Quattro Formaggi", description: "Tomato, Mozzarella, Parmesan, Gorgonzola, Ricotta" },
        { name: "Margherita", description: "Tomato, Mozzarella, Bell Peppers, Onions, Olives" },
        { name: "Hawaiian", description: "Tomato, Mozzarella, Ham, Pineapple, Olives" },
        { name: "Quattro Formaggi", description: "Tomato, Mozzarella, Parmesan, Gorgonzola, Ricotta" }
    ];

    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: "center",
                background: '#FFF8F1',
                padding: '50px', 
            }}
        >
            <Typography 
                variant="h4" 
                component="h2" 
                sx={{ mb: 4, color: '#00000080', fontSize: '50px', fontWeight: 500 }}
            >
                Fasting
            </Typography>

            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    alignItems: "center",
                    gap: 2, 
                    overflowX: 'scroll', 
                }}
                className="overflow_restaurant"
            >
                {
                    MockPizza.map((pizza, index) => (
                        <PizzaCard key={index} name={pizza.name} description={pizza.description} />
                    ))
                }
            </Box>
        </Box>
    );
};

export default Fasting;
