// Define the structure for the restaurantId array
interface RestaurantId {
    user_id: number;
    role_id: number;
    restaurant_id: number;
    deleted_at: string | null; // Can be null if not deleted
}

// Define the new User interface
interface User {
    id: number;
    restaurantId: RestaurantId[]; // An array of RestaurantId objects
    iat: number; // Issued at timestamp
    exp: number; // Expiry timestamp
    token:string | null;
}

// Modify the getAuth function to use the new User type
const getAuth = async (): Promise<User | {}> => {
    const storedData = localStorage.getItem('info');
    const parsedData = storedData ? JSON.parse(storedData) : null; // Get and parse the stored data
    // console.log("pasr",parsedData)
// console.log("stored data",storedData,)
    if (parsedData) {
        const decodedToken = await decodeTokenPayload(parsedData.token); // Decode the token
        // console.log(decodedToken)
        decodedToken.token = parsedData.token;
        // Assuming decodedToken matches the User interface
        return decodedToken as User; // Return the decoded user info
    } else {
        return {};
    }
};

// Modify the decodeTokenPayload function as required
const decodeTokenPayload = (token: string | any): any => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join('')
    );
    return JSON.parse(jsonPayload);
};

export default getAuth;
