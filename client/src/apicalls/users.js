import { axiosInstance } from ".";


// Login User

export const LoginUser = async(payload)=>{
    const response = await axiosInstance("post","/api/users/login",payload);
    return response;
}


// Register User

export const RegisterUser = async(payload)=>{
    const response = await axiosInstance("post","/api/users/register",payload);
    return response;
}


// Login User Info

export const GetLoggedInUserInfo = async(payload)=>{
    const response = await axiosInstance("post","/api/users/get-current-user",payload);
    return response;
}


// Get all donors and hospitals of organization
export const GetAllDonorsOfAnOrganization = () => {
    return axiosInstance("get", "/api/users/get-all-donors");
};

export const GetAllHospitalsOfAnOrganization = () => {
    return axiosInstance("get", "/api/users/get-all-hospitals");
};


// Get all organizations of donor hospital

export const GetAllOrganizationsOfADonor = () => {
    return axiosInstance("get", "/api/users/get-all-organizations-of-a-donor");
  }
  
export const GetAllOrganizationsOfAHospital = () => {
    return axiosInstance("get", "/api/users/get-all-organizations-of-a-hospital");
}
  