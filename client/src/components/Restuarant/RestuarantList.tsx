import { Box, Typography } from '@mui/material';
import RestuarantCard from './RestaurantCard'; 

const RestaurantList = () => {
    type mockObj = {
        name: string,
        description: string
    };

    // Mock restaurant data
    const MockRestuarnt: mockObj[] = [
        { name: "Azmera Pizza", description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to..." },
        { name: "Pizza Palace", description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to..." },
        { name: "The Slice", description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to..." },
        { name: "Cheesy Crust", description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to..." },
        { name: "Crust & Crumble", description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to..." },
        { name: "Pizza Perfection", description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to..." },
        { name: "Slice of Heaven", description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to..." }
    ];

    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: "center",
                background: 'linear-gradient(180deg, rgba(250, 126, 0, 0) 0%, rgba(250, 126, 0, 0.2) 60.5%, rgba(148, 74, 0, 0) 100%)',
                padding: '40px', 
            }}
            className="restaurantList"
        >
            <Typography 
                variant="h4" 
                component="h2" 
                sx={{ mb: 4, color: '#00000080', fontSize: '50px', fontWeight: 500 }}
            >
                Top Restaurants
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
                    MockRestuarnt.map((restuarant, index) => (
                        <RestuarantCard key={index} r_name={restuarant.name} description={restuarant.description} />
                    ))
                }
            </Box>
        </Box>
    );
};

export default RestaurantList;
