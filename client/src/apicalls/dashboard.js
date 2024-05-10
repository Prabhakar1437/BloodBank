import { axiosInstance } from ".";

export const GetAllBloodGroupsInInventory = () => {
    return axiosInstance("get", "/api/dashboard/blood-groups-data");
};