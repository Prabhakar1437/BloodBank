import React, { useEffect, useState } from "react";
import { GetAllOrganizationsOfADonor, GetAllOrganizationsOfAHospital} from "../../../apicalls/users";
import { SetLoading } from "../../../redux/loadersSlice";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Table, message } from "antd";
import { getDateFormat } from "../../../utils/helper";
import InvetoryTable from "../../../components/InventoryTable";

function Organizations({ userType }) {
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const { currentUser } = useSelector((state) => state.users);
    const [selectedOrganization, setSelectedOrganization] = useState(null);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        try {
            dispatch(SetLoading(true));
            let response = null;
            if (userType === "hospital") {
                response = await GetAllOrganizationsOfAHospital();
            } else {
                response = await GetAllOrganizationsOfADonor();
            }
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
    };

    const columns = [
        {
            title: "Organization Name",
            dataIndex: "organizationName",
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
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <span
                    className="underline text-md cursor-pointer"
                    onClick={() => {
                        setSelectedOrganization(record);
                        setShowHistoryModal(true);
                    }}
                >
                    History
                </span>
            ),
        },
    ];

    useEffect(() => {
        getData();
    }, []);


    return (
        <div>
            <Table columns={columns} dataSource={data} />

            {showHistoryModal && (
                <Modal
                    title={
                        `${userType === "donor" ? "Donations History In" : "Consumptions History From"} ${selectedOrganization.organizationName}`
                    }
                    centered
                    open={showHistoryModal}
                    width={1000}
                    onCancel={() => setShowHistoryModal(false)}
                    onOk={() => setShowHistoryModal(false)}
                >
                    <InvetoryTable
                        filters={{
                            organization: selectedOrganization._id,
                            [userType]: currentUser._id,
                        }}
                        userType= {userType}
                    />
                </Modal>
            )}
        </div>
    );
}

export default Organizations;