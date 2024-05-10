import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../../redux/loadersSlice";
import { GetAllBloodGroupsInInventory } from "../../apicalls/dashboard";
import { message } from "antd";
import InventoryTable from "../../components/InventoryTable";


function Home(){
    const {currentUser} = useSelector((state)=> state.users);
    const [bloodGroupsData,setBloodGroupsData] = useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(SetLoading(true));
            const response = await GetAllBloodGroupsInInventory();
            dispatch(SetLoading(false));
            if (response.success) {
                setBloodGroupsData(response.data);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            dispatch(SetLoading(false));
            message.error(error.message);
        }
    };
    
    useEffect(() => {
        getData();
    }, []);

    const colours = [
        "#2B3467",
        "#1A5F7A",
        "#B8621B",
        "#245953",
        "#2C3333",
        "#804674",
        "#A84448",
        "#635985",
    ];

    return (
        
        <div>
           
            {currentUser.userType === "organization" && (
                <>
                    <div className="grid grid-cols-4 gap-5 mb-5 mt-2">
                        {bloodGroupsData.map((bloodGroup, index) => {
                            const color = colours[index];
                            return (
                                <div
                                    className={"p-5 flex justify-between text-white rounded items-center"}
                                    style={{ backgroundColor: color }}
                                >
                                    <h1 className="text-5xl uppercase">
                                        {bloodGroup.bloodGroup}
                                    </h1>
                
                                    <div className="flex flex-col justify-between gap-2">
                                        <div className="flex justify-between gap-5">
                                            <span>Total In</span>
                                            <span>{bloodGroup.totalIn} ML</span>
                                        </div>
                                        
                                        <div className="flex justify-between gap-5">
                                            <span>Total Out</span>
                                            <span>{bloodGroup.totalOut} ML</span>
                                        </div>
                
                                        <div className="flex justify-between gap-5">
                                            <span>Available</span>
                                            <span>{bloodGroup.available} ML</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
        
                    <span className="text-xl text-gray-700 font-semibold">
                        Your Recent Inventory
                    </span>

                    <InventoryTable
                        filters={{
                            organization: currentUser._id,
                        }}
                        limit={5}
                        userType={currentUser.userType}
                    />
                </>
            )}
  
            {currentUser.userType === "donor" && (
                <div>
                    <span className="text-xl text-gray-700 font-semibold">
                        Your Recent Donations
                    </span>
                    <InventoryTable
                        filters={{
                            donor: currentUser._id,
                        }}
                        limit={5}
                        userType={currentUser.userType}
                    />
                </div>
            )}
  
            {currentUser.userType === "hospital" && (
                <div>
                    <span className="text-xl text-gray-700 font-semibold">
                        Your Recent Requests / Consumptions
                    </span>
                    <InventoryTable
                        filters={{
                            hospital: currentUser._id,
                        }}
                        limit={5}
                        userType={currentUser.userType}
                    />
                </div>
            )}

      </div>

    )
}

export default Home;