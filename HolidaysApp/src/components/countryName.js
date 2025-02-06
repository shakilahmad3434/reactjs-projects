export const countryName = async () => {
    const APIKEY = import.meta.env.VITE_API_KEY;
    let data;
    try {
        const res = await fetch(`https://calendarific.com/api/v2/countries?&api_key=${APIKEY}`);
        data = await res.json();
        
    } catch (error) {
        throw error; // Corrected to throw the error
    }
    return data; // Returning as an object
}
