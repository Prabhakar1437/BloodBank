import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { getInputValidation } from "../../utils/helper";

function OrgHospitalForm({type}){
    return (
        <>
            <Form.Item
                label={type=== "hospital" ? "Hospital Name" : "Organization Name"}
                name={type=== "hospital" ? "hospitalName" : "organizationName"} rules={getInputValidation()}>
                <Input/>
            </Form.Item>
            <Form.Item label="Owner" name="owner" rules={getInputValidation()}>
                <Input/>
            </Form.Item>
            <Form.Item label="Email" name="email" rules={getInputValidation()}>
                <Input type="email"/>
            </Form.Item>
            <Form.Item label="Phone" name="phone" rules={getInputValidation()}>
                <Input/>
            </Form.Item>
            <Form.Item label="Website" name="website" rules={getInputValidation()}>
                <Input/>
            </Form.Item>
            <Form.Item label="Password" name="password" rules={getInputValidation()}>
                <Input type="password"/>
            </Form.Item>
            <Form.Item label="Address" name="address" className="col-span-2" rules={getInputValidation()}>
                <TextArea/>
            </Form.Item>
        </>
    )
}

export default OrgHospitalForm;