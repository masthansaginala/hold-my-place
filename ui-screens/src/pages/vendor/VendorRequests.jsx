import { useState, useEffect } from "react";
import { Input, Select, Button, Modal, Table, Tag } from "antd";

import { toast } from "react-toastify";
import { EditOutlined } from "@ant-design/icons";

import { getEventBookedServices, updateVendorsStatusEvent } from "../api/api";
import { useAuth } from "../api/AuthContextRedux";

const VendorRequests = () => {
  const { profileData } = useAuth();
  console.log("inside vendor");
  const [nameFilter, setNameFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState();

  const [selectedFilters, setSelectedFilters] = useState({});

  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedOption, setSelectedOption] = useState();
  const [remarks, setRemarks] = useState("");

  const [bookedServiceList, setBookedServicesList] = useState([]);

  const openEditModal = (record) => {
    setSelectedRow(record);
    setSelectedOption("");
    setRemarks("");
    setIsModalOpenEdit(true);
  };

  const handleSave = async () => {
    try {
      const response = await updateVendorsStatusEvent(
        selectedRow?.event_service_id,
        {
          event_service_status_vendor: selectedOption,
          event_service_remarks_vendor: remarks,
        }
      );
      toast.success(response?.message);
      handleEventBookedServices();
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

  const handleSearch = () => {
    setSelectedFilters({
      vendor_business_name: nameFilter || "",
      vendor_business_service_category: serviceFilter || "",
    });
  };

  const handleEventBookedServices = async () => {
    try {
      const response = await getEventBookedServices({
        vendor_id: profileData?.user?.user_id,
      });
      setBookedServicesList(response?.eventServices);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleEventBookedServices();
  }, [selectedFilters]);

  const handleReset = () => {
    setNameFilter("");
    setServiceFilter("");
    setSelectedFilters({});
  };

  const handleServiceCancel = () => {
    setIsModalOpenEdit(false);
    setSelectedRow(null);
  };

  const serviceColumns = [
    {
      title: "Vendor Business Category",
      dataIndex: "event_service_id",
      key: "event_service_id",
      render: (_, record) =>
        record?.vendorBusiness?.vendor_business_service_category || "-",
    },
    {
      title: "Vendor Business Name",
      dataIndex: "vendor_id",
      key: "vendor_id",
      render: (_, record) =>
        record?.vendorBusiness?.vendor_business_name || "-",
    },
    {
      title: "Vendor Business Email",
      key: "vendorEmail",
      dataIndex: "vendorEmail",
      render: (_, record) =>
        record?.vendorBusiness?.vendor_business_email || "-",
    },

    {
      title: "Organization Status",
      key: "event_service_status_organizer",
      dataIndex: "event_service_status_organizer",
      render: (event_service_status_organizer) => {
        let color = "default";
        if (event_service_status_organizer === "CONFIRMED") {
          color = "green";
        } else if (event_service_status_organizer === "PENDING") {
          color = "orange";
        } else if (event_service_status_organizer === "CANCELLED") {
          color = "red";
        }
        return <Tag color={color}>{event_service_status_organizer}</Tag>;
      },
    },
    {
      title: "Organization Remarks",
      dataIndex: "event_service_remarks_organizer",
      key: "event_service_remarks_organizer",
    },
    {
      title: "Vendor Status",
      key: "event_service_status_vendor",
      dataIndex: "event_service_status_vendor",
      render: (event_service_status_vendor) => {
        let color = "default";
        if (event_service_status_vendor === "CONFIRMED") {
          color = "green";
        } else if (event_service_status_vendor === "PENDING") {
          color = "orange";
        } else if (event_service_status_vendor === "CANCELLED") {
          color = "red";
        }
        return <Tag color={color}>{event_service_status_vendor}</Tag>;
      },
    },

    {
      title: "Vendor Remarks",
      key: "event_service_remarks_vendor",
      dataIndex: "event_service_remarks_vendor",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          icon={<EditOutlined />}
          className="text-orange-500"
          onClick={() => openEditModal(record)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="space-y-4 mx-10 my-10">
        <div className="flex justify-between items-center">
          <h1 className="text-orange-500 text-2xl font-bold">
            Services Requests
          </h1>
        </div>

        <div>
          <Table
            columns={serviceColumns}
            dataSource={bookedServiceList} // Array of booked users
            pagination={false} // Optional: turn off pagination
            rowKey="booking_id"
            scroll={{ x: 800 }} // Allow horizontal scrolling on small screens
          />
        </div>
      </div>
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
                  value: "CONFIRMED",
                  label: "CONFIRMED",
                },
                {
                  value: "DISCUSSION",
                  label: "DISCUSSION",
                },
                {
                  value: "IN PROGRESS",
                  label: "IN PROGRESS",
                },
                {
                  value: "CANCELLED",
                  label: "CANCELLED",
                },
                {
                  value: "COMPLETED",
                  label: "COMPLETED",
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

      <Modal
        title={`Edit Service`}
        open={isModalOpenEdit}
        onCancel={handleServiceCancel}
        footer={[
          <Button key="cancel" onClick={handleServiceCancel}>
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
                selectedRow?.event_service_status_organizer ||
                undefined
              }
              onChange={(value) => setSelectedOption(value)}
              options={[
                {
                  value: "CONFIRMED",
                  label: "CONFIRMED",
                },
                {
                  value: "DISCUSSION",
                  label: "DISCUSSION",
                },
                {
                  value: "IN PROGRESS",
                  label: "IN PROGRESS",
                },
                {
                  value: "CANCELLED",
                  label: "CANCELLED",
                },
                {
                  value: "COMPLETED",
                  label: "COMPLETED",
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

export default VendorRequests;
