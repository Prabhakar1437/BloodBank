import { axiosInstance } from ".";


// Add inventory

export const AddInventory = async(payload)=>{
    const response = await axiosInstance("post","/api/inventory/add",payload);
    return response;
}


// Get all inventories

export const GetInventory = () => {
    return axiosInstance("get", "/api/inventory/get");
};


export const GetInventoryWithFilters = (filters , limit) => {
    return axiosInstance("post", "/api/inventory/filter", {filters , limit});
}