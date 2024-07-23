
const apiKey = "U9szHIQzZ7"
const apiURL = "https://comp2140.uqcloud.net/api/"

// Fetch one music sample from the API by its ID
export async function fetchOneSample(id) {
    try {
        // Send a request to the API to fetch a specific sample
        const response = await fetch(`${apiURL}sample/${id}/?api_key=${apiKey}`);
        // Parse the response JSON data
        const responseJson = await response.json();
        return responseJson; // Return the sample data
    } catch (error) {
        console.error("Error fetching sample: ", error);
    }
}


// Fetch all locations from the API
export async function fetchAllLocations() {
    try {
        // Send a request to the API to fetch all locations
        const response = await fetch(`${apiURL}location/?api_key=${apiKey}`);
        // Parse the response JSON data
        const responseJson = await response.json();
        return responseJson; // Return the list of locations
    } catch (error) {
        console.error("Error fetching locations: ", error);
    }
}


// Fetch all samples shared with locations and filter samples for a given location
export async function fetchSamples(locationId) {
    try {
        // Send a request to the API to fetch sample-location associations
        const response = await fetch(`${apiURL}sampletolocation/?api_key=${apiKey}`);
        // Parse the response JSON data
        const responseJson = await response.json();
        // Filter the data to get sample-location associations for the specified location
        const filteredData = responseJson.filter(item => item.location_id === locationId);
        // Extract unique sample IDs from the filtered data
        const sampleIds = Array.from(new Set(filteredData.map(item => item.sample_id)));
        // Fetch all samples associated with the location
        const samples = await Promise.all(sampleIds.map(id => fetchOneSample(id));

        return samples; // Return the list of samples for the location
    } catch (error) {
        console.error("Error fetching samples: ", error);
        return [];
    }
}


//Convert a datetime object to date string for easy reading
export function convertToDate(datetimeString) {
    const dateTimeObject = new Date(datetimeString);
    const date = `${dateTimeObject.getFullYear()}-${dateTimeObject.getMonth() + 1}-${dateTimeObject.getDate()}`
    return date
}