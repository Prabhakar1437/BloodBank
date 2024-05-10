import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { Table, message } from "antd";
import { getDateFormat } from "../../../utils/helper";
import { GetAllDonorsOfAnOrganization } from "../../../apicalls/users";

function Donors() {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(SetLoading(true));
            const response = await GetAllDonorsOfAnOrganization();
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
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
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

export default Donors;