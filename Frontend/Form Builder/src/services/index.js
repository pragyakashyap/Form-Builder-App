import axios from "axios"

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
      return await response.json(); // Return the updated user data
    } else {
      throw new Error("Failed to update user data");
    }
};

//Workspaces
export const fetchWorkspaces = async()=>{
    const token = localStorage.getItem("token"); 
    const response = await fetch(`${BACKEND_URL}api/workspaces`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      });
    
      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Failed to load workspace: ${errorDetails}`);
    }
    const data = await response.json(); 
    console.log("API Response:", data); // Log API response
    return data; 
}

//folders
export const createFolder = async (folderData) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BACKEND_URL}api/folders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token
      },
      body: JSON.stringify(folderData),
    });
  
    if (response.ok) {
      return response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create folder");
    }
  };
  
//delete folder
export const deleteFolder = async (folderId) =>{
    const token = localStorage.getItem("token");
    const response = await fetch(`${BACKEND_URL}api/folders/${folderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token
      },
    });
  
    if (response.ok) {
      return response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete folder");
    }
}

//create forms
export const createForm = async (formData) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BACKEND_URL}api/forms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token
      },
      body: JSON.stringify(formData),
    });
  
    if (response.ok) {
      return response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create form");
    }
  };   
  
  //delete folder
export const deleteForm = async (formId) =>{
  const token = localStorage.getItem("token");
  const response = await fetch(`${BACKEND_URL}api/forms/${formId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Include the token
    },
  });

  if (response.ok) {
    return response.json();
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete form");
  }
}

export const fetchFormById = async (formId) => {
  const token = localStorage.getItem("token"); 
  const response = await fetch(`${BACKEND_URL}api/forms/${formId}`, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });

  if (!response.ok) throw new Error("Failed to fetch form");
  return await response.json();
};


export const updateForm = async (formId, formData) => {
  const token = localStorage.getItem("token"); 
  const response = await fetch(`${BACKEND_URL}api/forms/${formId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`, 
      "Content-Type": "application/json", 
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) throw new Error("Failed to update form");
  return await response.json();
};
