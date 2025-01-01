import { useEffect, useState } from "react";

import { Button, Input, Modal, Select, Space, Table } from "antd";
import moment from "moment";
import {
  FileTextOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";
import { getOrganizers, updateOrgStatus } from "../api/api";
import { toast } from "react-toastify";

const AdminOrg = () => {
  const [activeStatus, setActiveStatus] = useState("");
  const initialData = [];

  const [dataSource, setDataSource] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAttachments, setSelectedAttachments] = useState([]);

  const handleUsers = async () => {
    try {
      const response = await getOrganizers({
        organizer_status: activeStatus || "ACTIVE",
      });
      setDataSource(
        response?.organizers?.length ? response?.organizers : initialData
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

  const showAttachments = (attachments) => {
    setSelectedAttachments(attachments);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAttachments([]);
  };

  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedOption, setSelectedOption] = useState();
  const [remarks, setRemarks] = useState("");

  const openEditModal = (record) => {
    setSelectedRow(record);
    setSelectedOption("");
    setRemarks("");
    setIsModalOpenEdit(true);
  };

  const handleSave = async () => {
    try {
      const response = await updateOrgStatus(selectedRow?.organizer_id, {
        organizer_status: selectedOption,
        organizer_admin_remarks: remarks,
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
      dataIndex: "organizer_id",
      key: "organizer_id",
      className: "text-orange-500",
    },
    {
      title: "Name",
      dataIndex: "user_first_name",
      key: "name",
      className: "text-orange-600 font-semibold",
      render: (value, record) =>
        `${record?.organizer_first_name} ${record?.organizer_last_name}`,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "organizer_email",
      key: "organizer_email",
      className: "text-orange-500",
    },
    {
      title: "Gender",
      dataIndex: "organizer_gender",
      key: "organizer_gender",
      className: "text-orange-500",
    },
    {
      title: "Date Of Birth",
      dataIndex: "organizer_date_of_birth",
      key: "organizer_date_of_birth",
      className: "text-orange-500",
      render: (value) => moment(value).utc().format("DD/MM/YYYY"),
    },

    {
      title: "Phone Number",
      dataIndex: "organizer_primary_phone_number",
      key: "organizer_primary_phone_number",
      className: "text-orange-500",
    },
    {
      title: "Secondary Phone Number",
      dataIndex: "organizer_secondary_phone_number",
      key: "organizer_secondary_phone_number",
      className: "text-orange-500",
    },
    {
      title: "Address",
      dataIndex: "organizer_address_line_one",
      key: "organizer_address_line_one",
      className: "text-orange-400",
      render: (value, record) =>
        `${value},${record?.organizer_address_line_two},${record?.organizer_city},${record?.organizer_state},${record?.organizer_country},${record?.organizer_zipcode}`,
    },
    {
      title: "Status",
      dataIndex: "organizer_status",
      key: "organizer_status",
      className: "text-orange-500",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<FileTextOutlined />}
            className="text-orange-500"
            onClick={() => showAttachments(record)}
          >
            View Attachments
          </Button>
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
            Organizers
          </span>
        </li>
        <li>
          <span
            className={`cursor-pointer ${
              activeStatus === "NEW" && "text-orange-400"
            }`}
            onClick={() => {
              setActiveStatus("NEW");
            }}
          >
            Requests
          </span>
        </li>
        <li>
          <span
            className={`cursor-pointer ${
              activeStatus === "INACTIVE" && "text-orange-400"
            }`}
            onClick={() => {
              setActiveStatus("INACTIVE");
            }}
          >
            In Active Organizers
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
      {/* Modal for Attachments */}
      <Modal
        title="Attachments"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Close
          </Button>,
        ]}
      >
        <div className="space-y-4">
          {selectedAttachments?.organizer_identification_number_one && (
            <div
              key={selectedAttachments?.organizer_identification_number_one}
              className="p-2 border border-gray-200 rounded-lg"
            >
              <a
                href={
                  selectedAttachments?.organizer_identification_proof_image_url_one
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:underline"
              >
                {selectedAttachments.organizer_identification_number_type_one}
              </a>{" "}
              -{" "}
              <span>
                {selectedAttachments?.organizer_identification_number_one}
              </span>
              <div className="mt-2">
                <img
                  src={
                    selectedAttachments.organizer_identification_proof_image_url_one
                  }
                  alt={
                    selectedAttachments.organizer_identification_number_type_one
                  }
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            </div>
          )}
          {selectedAttachments?.organizer_identification_number_two && (
            <div
              key={selectedAttachments?.organizer_identification_number_two}
              className="p-2 border border-gray-200 rounded-lg"
            >
              <a
                href={
                  selectedAttachments?.organizer_identification_proof_image_url_two
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:underline"
              >
                {selectedAttachments.organizer_identification_number_type_two}
              </a>{" "}
              -{" "}
              <span>
                {selectedAttachments?.organizer_identification_number_two}
              </span>
              <div className="mt-2">
                <img
                  src={
                    selectedAttachments.organizer_identification_proof_image_url_two
                  }
                  alt={
                    selectedAttachments.organizer_identification_number_type_two
                  }
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </Modal>
      {/* Modal for Editing */}
      <Modal
        title={`Edit ${selectedRow?.organizer_first_name || ""} ${
          selectedRow?.organizer_last_name || ""
        }`}
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
              value={
                selectedOption || selectedRow?.organizer_status || undefined
              }
              onChange={(value) => setSelectedOption(value)}
              options={[
                {
                  value: "ACTIVE",
                  label: "Active",
                },
                {
                  value: "INACTIVE",
                  label: "In Active",
                },
                {
                  value: "NEW",
                  label: "New",
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

export default AdminOrg;
