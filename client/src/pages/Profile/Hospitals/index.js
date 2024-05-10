import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { Table, message } from "antd";
import { GetAllHospitalsOfAnOrganization } from "../../../apicalls/users";
import { getDateFormat } from "../../../utils/helper";

function Hospitals() {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(SetLoading(true));
            const response = await GetAllHospitalsOfAnOrganization();
            dispatch(SetLoading(false));
            if (response.success) {
                setData(response.data);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            dispatch(SetLoading(false));
            message.error(error.message);
        }
    }

    const columns = [
        {
            title: "Hospital Name",
            dataIndex: "hospitalName",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Owner",
            dataIndex: "owner",
        },
        {
            title: "Phone",
            dataIndex: "phone",
        },
        {
            title: "Address",
            dataIndex: "address",
        },
    ];

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    );
}

export default Hospitals;