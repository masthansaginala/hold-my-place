import { useEffect, useState } from "react";
import { Button, Input, Modal, Select, Space, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import { editContactTickets, getContactTickets } from "../api/api";
import { toast } from "react-toastify";

const AdminContact = () => {
  const [activeStatus, setActiveStatus] = useState("");
  const initialData = [];

  const [dataSource, setDataSource] = useState(initialData);
  const [searchText, setSearchText] = useState("");

  const handleUsers = async () => {
    try {
      const response = await getContactTickets({
        contact_status: activeStatus || "Pending",
      });
      setDataSource(
        response?.contacts?.length ? response?.contacts : initialData
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
      const response = await editContactTickets(selectedRow?.contact_id, {
        contact_status: selectedOption,
        contact_remarks: remarks,
        contact_email: selectedRow?.contact_email,
      });
      toast.success(response?.message);
      handleUsers();

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
      dataIndex: "contact_id",
      key: "contact_id",
      className: "text-orange-500",
    },
    {
      title: "Name",
      dataIndex: "contact_name",
      key: "contact_name",
      className: "text-orange-600 font-semibold",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "contact_email",
      key: "contact_email",
      className: "text-orange-500",
    },
    {
      title: "Contact Subject",
      dataIndex: "contact_subject",
      key: "contact_subject",
      className: "text-orange-500",
    },
    {
      title: "Message",
      dataIndex: "contact_message",
      key: "contact_message",
      className: "text-orange-500",
    },

    {
      title: "Phone Number",
      dataIndex: "contact_phone_number",
      key: "contact_phone_number",
      className: "text-orange-500",
    },

    {
      title: "Remarks",
      dataIndex: "contact_remarks",
      key: "contact_remarks",
      className: "text-orange-500",
    },
    {
      title: "Status",
      dataIndex: "contact_status",
      key: "contact_status",
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
              activeStatus === "" && "text-orange-500"
            }`}
            onClick={() => {
              setActiveStatus("");
            }}
          >
            Contact Pending
          </span>
        </li>
        <li>
          <span
            className={`cursor-pointer ${
              activeStatus === "In Progress" && "text-orange-500"
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
              activeStatus === "Resolved" && "text-orange-500"
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
              activeStatus === "Closed" && "text-orange-500"
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
        title={`${selectedRow?.contact_name || ""} `}
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
              value={selectedOption || selectedRow?.contact_status || undefined}
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

export default AdminContact;
