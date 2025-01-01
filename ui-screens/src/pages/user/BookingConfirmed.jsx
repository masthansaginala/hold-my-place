import { Button, Popconfirm, Space, Table } from "antd";
import moment from "moment";
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import { cancelBooking, getEventBookedUsers } from "../api/api";
import { toast } from "react-toastify";
import { useAuth } from "../api/AuthContextRedux";

const BookingConfirmed = ({ activeStatus }) => {
  const { profileData } = useAuth();
  const initialData = [];

  const [dataSource, setDataSource] = useState(initialData);

  const handleBookingList = async () => {
    try {
      const response = await getEventBookedUsers({
        user_id: profileData?.user?.user_id,
        booking_status: activeStatus || "CONFIRMED",
      });
      setDataSource(
        response?.bookings?.length ? response?.bookings : initialData
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleBookingList();
  }, [activeStatus]);
  // Handle search

  // Handle delete action
  const handleDelete = async (record) => {
    try {
      const response = await cancelBooking(record?.booking_id);
      toast.success(response?.message);
      handleBookingList();
    } catch (e) {
      console.log(e);
    }
  };

  // Table columns definition
  const columns = [
    {
      title: "Event Name",
      dataIndex: "booking_id",
      key: "event",
      className: "text-orange-500",
      render: (value, record) => record?.event?.event_name,
    },
    {
      title: "Event Category",
      dataIndex: "event_id",
      key: "event_id",
      className: "text-orange-500",
      render: (value, record) => record?.event?.event_category,
    },
    {
      title: "Event Type",
      dataIndex: "event_id",
      key: "event_id",
      className: "text-orange-500",
      render: (value, record) => record?.event?.event_type,
    },
    {
      title: "Event Date",
      dataIndex: "event_id",
      key: "event_id",
      className: "text-orange-500",
      render: (value, record) =>
        record?.booking_event_date
          ? moment(record?.booking_event_date).format("DD/MM/YYYY")
          : "-",
    },
    {
      title: "Tickets",
      dataIndex: "booking_ticket_count",
      key: "booking_ticket_count",
      className: "text-orange-500",
    },
    {
      title: "Price",
      dataIndex: "booking_price",
      key: "booking_price",
      className: "text-orange-500",
    },

    {
      title: "Status",
      dataIndex: "booking_status",
      key: "booking_status",
      className: "text-orange-500",
    },
    {
      title: "Check In",
      dataIndex: "booking_checkin",
      key: "booking_checkin",
      className: "text-orange-400",
      render: (value, record) => record?.booking_checkin || "-",
    },
  ];

  if (activeStatus === "COMPLETED") {
    columns.push({
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure you want to delete this record?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              href={record?.booking_event_certificate_image_url}
              icon={<DownloadOutlined />}
              className="text-red-500"
            >
              Download Certificate
            </Button>
          </Popconfirm>
        </Space>
      ),
    });
  }

  if (activeStatus === "CONFIRMED") {
    columns.push({
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure you want to delete this record?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              icon={<DeleteOutlined />}
              className="text-red-500"
            >
              Cancel
            </Button>
          </Popconfirm>
        </Space>
      ),
    });
  }

  return (
    <div className="container mx-auto p-4">
      {/* Table */}
      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 10 }}
          className="antd-table-custom min-w-[600px]"
        />
      </div>
    </div>
  );
};

export default BookingConfirmed;
