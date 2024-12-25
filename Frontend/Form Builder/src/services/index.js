const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const register = async(data)=>{
    const response = await fetch(`${BACKEND_URL}api/user/register`,{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify(data)
    })
    if(response.status === 200 || response.status === 400)
        return response.json()
    throw new Error('Something went wrong')
}

export const login = async(data) => {
    const response = await fetch(`${BACKEND_URL}api/user/login`,{
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body:JSON.stringify(data)
    })
    if(response.status === 200 || response.status === 400)
        return response.json()
    throw new Error('Something went wrong')
}

export const updateUser = async (data) => {
    const token = localStorage.getItem("token"); 
    const response = await fetch(`${BACKEND_URL}api/user/update`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Send token for authentication
      },
      body: JSON.stringify(data),
    });
  
    if (response.ok) {
      return response.json(); // Return the updated user data
    } else {
      throw new Error("Failed to update user data");
    }
};