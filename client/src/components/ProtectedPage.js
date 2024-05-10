import { message } from "antd";
import React, { useEffect, useState } from "react";
import { GetLoggedInUserInfo } from "../apicalls/users";
import {useNavigate} from "react-router-dom";
import { getLoggedInUserName } from "../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser } from "../redux/usersSlice";
import { SetLoading } from "../redux/loadersSlice";

function ProtectedPage({children}){

    const {currentUser} = useSelector((state)=> state.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getLoggedInUserInfo = async()=> {
        try {
            dispatch(SetLoading(true));
            const response = await GetLoggedInUserInfo();
            dispatch(SetLoading(false));
            if(response.success){
                message.success(response.message);
                dispatch(SetCurrentUser(response.data));
            }
            else{
                message.error(response.message);
                localStorage.removeItem("token");
                window.location.href="/login";
            }
        } catch (error) {
            dispatch(SetLoading(false));
            message.error(error.message);
            localStorage.removeItem("token");
            window.location.href="/login";
        }
    }

    useEffect(()=>{
        if(localStorage.getItem("token")){
            if(!currentUser){
                getLoggedInUserInfo();
            }
        }
        else{
            navigate("/login");
        }
    },[]);

    return (
        currentUser && (
            <div>
                {/* header */}
                <div className="flex justify-between items-center bg-primary text-white px-5 py-3 mx-5 rounded-b-md">
                    <div className="cursor-pointer" onClick={()=> navigate("/")}>
                        <h1 className="text-2xl">BLOODBANK</h1>
                        <span className="text-xs">{currentUser.userType.toUpperCase()}</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <i class="ri-shield-user-line"></i>
                        <div className="flex flex-col">
                            <span className="mr-5 text-md cursor-pointer"
                                onClick={()=> navigate("/profile")}>{getLoggedInUserName(currentUser).toUpperCase()}</span>
                        </div>
                        <i className="ri-logout-circle-r-line ml-5 cursor-pointer"
                            onClick={()=>{
                                localStorage.removeItem("token");
                                navigate("/login");
                            }}></i>
                    </div>
                </div>

                {/* body */}
                <div className="px-5 py-5">{children}</div>
            </div>
        )
    )
}

export default ProtectedPage;