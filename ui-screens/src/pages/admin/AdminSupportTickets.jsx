import { useEffect, useState } from "react";
import { Button, Input, Modal, Select, Space, Table } from "antd";
import { SearchOutlined, EditOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import { editSupportTickets, getSupportTickets } from "../api/api";
import { toast } from "react-toastify";

const AdminSupport = () => {
  const [activeStatus, setActiveStatus] = useState("");
  const initialData = [];

  const [dataSource, setDataSource] = useState(initialData);
  const [searchText, setSearchText] = useState("");

  const handleUsers = async () => {
    try {
      const response = await getSupportTickets({
        support_status: activeStatus || "Pending",
      });
      setDataSource(
        response?.supports?.length ? response?.supports : initialData
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleUsers();
  }, [activeStatus]);
  // Handle search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    const filteredData = initialData.filter((item) =>
      Object.values(item).some((field) =>
        String(field).toLowerCase().includes(value)
      )
    );
    setDataSource(filteredData);
  };

  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedOption, setSelectedOption] = useState();
  const [remarks, setRemarks] = useState("");
  const [email, setEmail] = useState("");

  const openEditModal = (record) => {
    setSelectedRow(record);
    setSelectedOption("");
    setRemarks("");
    setIsModalOpenEdit(true);
  };

  const handleSave = async () => {
    try {
      const response = await editSupportTickets(selectedRow?.support_id, {
        support_status: selectedOption,
        support_remarks: remarks,
        support_email: selectedRow?.support_email,
      });
      toast.success(response?.message);
      handleUsers();
      console.log("Selected Option:", selectedOption);
      console.log("Remarks:", remarks);
      console.log("Editing Row:", selectedRow);
      setIsModalOpenEdit(false);
      setSelectedRow();
      setSelectedOption();
      setRemarks("");
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancel = () => {
    setIsModalOpenEdit(false);
    setSelectedRow(null);
  };

  // Table columns definition
  const columns = [
    {
      title: "Id",
      dataIndex: "support_id",
      key: "support_id",
      className: "text-orange-500",
    },
    {
      title: "Name",
      dataIndex: "support_name",
      key: "name",
      className: "text-orange-600 font-semibold",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "support_email",
      key: "support_email",
      className: "text-orange-500",
    },
    {
      title: "Role",
      dataIndex: "support_type",
      key: "support_type",
      className: "text-orange-500",
    },
    {
      title: "Suport Subject",
      dataIndex: "support_subject",
      key: "support_subject",
      className: "text-orange-500",
    },
    {
      title: "Message",
      dataIndex: "support_message",
      key: "support_message",
      className: "text-orange-500",
    },

    {
      title: "Phone Number",
      dataIndex: "support_phone_number",
      key: "support_phone_number",
      className: "text-orange-500",
    },

    {
      title: "Remarks",
      dataIndex: "support_remarks",
      key: "support_remarks",
      className: "text-orange-400",
    },
    {
      title: "Status",
      dataIndex: "support_status",
      key: "support_status",
      className: "text-orange-500",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            className="text-orange-500"
            onClick={() => openEditModal(record)}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  console.log("record->", selectedRow);

  return (
    <div>
      {" "}
      <ul className="event_filter">
        <li>
          <span
            className={`cursor-pointer ${
              activeStatus === "" && "text-orange-400"
            }`}
            onClick={() => {
              setActiveStatus("");
            }}
          >
            Support Pending
          </span>
        </li>
        <li>
          <span
            className={`cursor-pointer ${
              activeStatus === "In Progress" && "text-orange-400"
            }`}
            onClick={() => {
              setActiveStatus("In Progress");
            }}
          >
            In Progress
          </span>
        </li>
        <li>
          <span
            className={`cursor-pointer ${
              activeStatus === "Resolved" && "text-orange-400"
            }`}
            onClick={() => {
              setActiveStatus("Resolved");
            }}
          >
            Resolved
          </span>
        </li>
        <li>
          <span
            className={`cursor-pointer ${
              activeStatus === "Closed" && "text-orange-400"
            }`}
            onClick={() => {
              setActiveStatus("Closed");
            }}
          >
            Closed
          </span>
        </li>
      </ul>{" "}
      <div className="container mx-auto p-4">

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
      {/* Modal for Editing */}
      <Modal
        title={`Edit ${selectedRow?.support_name || ""} `}
        open={isModalOpenEdit}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            onClick={handleSave}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Save
          </Button>,
        ]}
      >
        <div className="space-y-4">
          {/* Select Option */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <Select
              className={`rounded-lg  font-medium  border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
              style={{
                width: "100%",
                height: 40,
              }}
              placeholder="Select status"
              optionFilterProp="label"
              value={selectedOption || selectedRow?.support_status || undefined}
              onChange={(value) => setSelectedOption(value)}
              options={[
                {
                  value: "Pending",
                  label: "Pending",
                },
                {
                  value: "In Progress",
                  label: "In Progress",
                },
                {
                  value: "Resolved",
                  label: "Resolved",
                },
                {
                  value: "Closed",
                  label: "Closed",
                },
              ]}
            />
          </div>

          {/* Remarks Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Remarks
            </label>
            <Input.TextArea
              placeholder="Enter remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={4}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminSupport;
