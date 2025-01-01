import { useEffect, useState } from "react";

import { Button, Input, Modal, Select, Space, Table } from "antd";
import moment from "moment";
import {
  SearchOutlined,
  FileTextOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";
import { getVendorsBusiness, updateVendorsBusinessStatus } from "../api/api";
import { toast } from "react-toastify";

const AdminVendorBusiness = () => {
  const [activeStatus, setActiveStatus] = useState("");
  const initialData = [];

  const [dataSource, setDataSource] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAttachments, setSelectedAttachments] = useState([]);

  const handleUsers = async () => {
    try {
      const response = await getVendorsBusiness({
        vendor_business_status: activeStatus || "ACTIVE",
      });
      setDataSource(
        response?.vendorBusinesses?.length
          ? response?.vendorBusinesses
          : initialData
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleUsers();
  }, [activeStatus]);

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
      const response = await updateVendorsBusinessStatus(
        selectedRow?.vendor_business_id,
        {
          vendor_business_status: selectedOption,
          vendor_business_admin_remarks: remarks,
        }
      );
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
      dataIndex: "vendor_business_id",
      key: "vendor_business_id",
      className: "text-orange-500",
    },
    {
      title: "Vendor Id",
      dataIndex: "vendor_id",
      key: "vendor_id",
      className: "text-orange-500",
    },
    {
      title: "Name",
      dataIndex: "vendor_business_name",
      key: "vendor_business_name",
      className: "text-orange-600 font-semibold",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "vendor_business_email",
      key: "vendor_business_email",
      className: "text-orange-500",
    },
    {
      title: "Date Of Establishment",
      dataIndex: "vendor_business_date_of_establishment",
      key: "vendor_business_date_of_establishment",
      className: "text-orange-500",
      render: (value) => moment(value).utc().format("DD/MM/YYYY"),
    },
    {
      title: "License Number",
      dataIndex: "vendor_business_license_number",
      key: "vendor_business_license_number",
      className: "text-orange-500",
    },
    {
      title: "Service Category",
      dataIndex: "vendor_business_service_category",
      key: "vendor_business_service_category",
      className: "text-orange-500",
    },
    {
      title: "Description",
      dataIndex: "vendor_business_description",
      key: "vendor_business_description",
      className: "text-orange-500",
    },
    {
      title: "Phone Number",
      dataIndex: "vendor_business_primary_phone_number",
      key: "vendor_business_primary_phone_number",
      className: "text-orange-500",
    },
    {
      title: "Secondary Phone Number",
      dataIndex: "vendor_business_secondary_phone_number",
      key: "vendor_business_secondary_phone_number",
      className: "text-orange-500",
    },
    {
      title: "Address",
      dataIndex: "vendor_business_address_line_one",
      key: "vendor_business_address_line_one",
      className: "text-orange-400",
      render: (value, record) =>
        `${value},${record?.vendor_business_address_line_two},${record?.vendor_business_city},${record?.vendor_business_state},${record?.vendor_business_country},${record?.vendor_business_zipcode}`,
    },
    {
      title: "Status",
      dataIndex: "vendor_business_status",
      key: "vendor_business_status",
      className: "text-orange-500",
    },
    {
      title: "Remarks",
      dataIndex: "vendor_business_admin_remarks",
      key: "vendor_business_admin_remarks",
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

          {/* <Popconfirm
              title="Are you sure you want to delete this record?"
              onConfirm={() => handleDelete(record.key)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="link"
                icon={<DeleteOutlined />}
                className="text-red-500"
              >
                Delete
              </Button>
            </Popconfirm> */}
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
            Businesses
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
            Business Requests
          </span>
        </li>
        <li>
          <span
            className={`cursor-pointer ${
              activeStatus === "PENDING" && "text-orange-400"
            }`}
            onClick={() => {
              setActiveStatus("PENDING");
            }}
          >
            Pending Businesses
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
            In Active Businesses
          </span>
        </li>
      </ul>{" "}
      <div className="container mx-auto p-4">
        {/* Search Input */}
        {/* <div className="flex items-center justify-end">
          <Input
            placeholder="Search table..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={handleSearch}
            className="w-1/2 p-2 border-orange-500 focus:border-orange-600"
          />
        </div> */}

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
          {selectedAttachments?.vendor_business_proof_image_url && (
            <div
              key={selectedAttachments?.vendor_business_license_number}
              className="p-2 border border-gray-200 rounded-lg"
            >
              <a
                href={selectedAttachments?.vendor_business_proof_image_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:underline"
              >
                {selectedAttachments.vendor_business_proof_type}
              </a>{" "}
              -{" "}
              <span>{selectedAttachments?.vendor_business_license_number}</span>
              <div className="mt-2">
                <img
                  src={selectedAttachments.vendor_business_proof_image_url}
                  alt={selectedAttachments.vendor_business_proof_type}
                  className="max-w-full h-auto rounded-lg"
                />
                {selectedAttachments?.vendor_business_image_url && (
                  <img
                    src={selectedAttachments.vendor_business_image_url}
                    alt={selectedAttachments.vendor_business_proof_type}
                    className="max-w-full h-auto rounded-lg"
                  />
                )}
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
                selectedOption ||
                selectedRow?.vendor_business_status ||
                undefined
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
                  value: "PENDING",
                  label: "Pending",
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

export default AdminVendorBusiness;
