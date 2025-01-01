import { Table } from "antd";
import moment from "moment";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import { getUsers } from "../api/api";

const AdminUsr = () => {

  const [dataSource, setDataSource] = useState([]);

  const handleUsers = async () => {
    try {
      const response = await getUsers();
      setDataSource(response?.users);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleUsers();
  }, []);

  // Table columns definition
  const columns = [
    {
      title: "User Id",
      dataIndex: "user_id",
      key: "user_id",
      className: "text-orange-500",
    },
    {
      title: "Name",
      dataIndex: "user_first_name",
      key: "name",
      className: "text-orange-600 font-semibold",
      render: (value, record) =>
        `${record?.user_first_name} ${record?.user_last_name}`,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "user_email",
      key: "user_email",
      className: "text-orange-500",
    },
    {
      title: "Gender",
      dataIndex: "user_gender",
      key: "user_gender",
      className: "text-orange-500",
    },
    {
      title: "Date Of Birth",
      dataIndex: "user_date_of_birth",
      key: "user_date_of_birth",
      className: "text-orange-500",
      render: (value) => moment(value).utc().format("DD/MM/YYYY"),
    },

    {
      title: "Phone Number",
      dataIndex: "user_phone_number",
      key: "user_phone_number",
      className: "text-orange-500",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      className: "text-orange-500",
      render: (value, record) =>
        `${record?.user_address_line_one},${record?.user_address_line_two},${record?.user_city},${record?.user_state},${record?.user_country},${record?.user_zipcode}`,
    },
    {
      title: "Status",
      dataIndex: "user_status",
      key: "user_status",
      className: "text-orange-500",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Users List</h1>

      {/* Table */}
      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
          className="antd-table-custom min-w-[600px]"
        />
      </div>
    </div>
  );
};

export default AdminUsr;
