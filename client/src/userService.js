const API_URL = "http://localhost:5000/api/users";

// Function to get user profile
export const getProfile = async (token) => {
    const response = await fetch(`${API_URL}/profile`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch profile data");
    }

    return await response.json();
};

// Function to update user profile
export const updateProfile = async (token, updatedData) => {
    const response = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
        throw new Error("Failed to update profile");
    }

    return await response.json();
};
