import {
  Card,
  Col,
  Row,
  Badge,
  Typography,
  Tag,
  Divider,
  Carousel,
  Table,
} from "antd";
import Land from "../../assets/land.jpg";
import About from "../../assets/about.jpg";
import EventPla from "../../assets/eventplan.jpg";
import { useLocation } from "react-router-dom";
import { getEventBookedServices, getEventBookedUsers } from "../api/api";
import { useEffect, useState } from "react";
import moment from "moment";
const { Title, Text } = Typography;

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
    render: (_, record) => record?.vendorBusiness?.vendor_business_name || "-",
  },
  {
    title: "Vendor Business Email",
    key: "vendorEmail",
    dataIndex: "vendorEmail",
    render: (_, record) => record?.vendorBusiness?.vendor_business_email || "-",
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
];

const columns = [
  {
    title: "Booking Id",
    dataIndex: "booking_id",
    key: "booking_id",
  },
  {
    title: "Name",
    dataIndex: "user",
    key: "user_id",
    className: "w-min-10",
    render: (_, record) =>
      `${record?.user?.user_first_name} ${record?.user?.user_last_name}`,
  },
  {
    title: "Email",
    dataIndex: "user",
    key: "email",
    render: (_, record) => `${record?.user?.user_email}`,
  },
  {
    title: "Phone Number",
    dataIndex: "user",
    key: "phone",
    render: (_, record) => `${record?.user?.user_phone_number}`,
  },
  {
    title: "Tickets Count",
    dataIndex: "booking_ticket_count",
    key: "booking_ticket_count",
  },
  {
    title: "Price",
    key: "booking_price",
    dataIndex: "booking_price",
  },
  {
    title: "Booked Date",
    key: "booking_event_date",
    dataIndex: "booking_event_date",
    render: (value, record) =>
      value ? moment(value).format("DD/MM/YYYY") : "-",
  },
  {
    title: "Status",
    key: "booking_status",
    dataIndex: "booking_status",
    render: (status) => {
      let color = "default";
      if (status === "CONFIRMED") {
        color = "green";
      } else if (status === "PENDING") {
        color = "orange";
      } else if (status === "CANCELLED") {
        color = "red";
      }
      return <Tag color={color}>{status}</Tag>;
    },
  },
];

const AdminEventDetails = () => {
  const location = useLocation();
  const event = location.state;
  console.log("eventdata->", event);
  const [bookedUsersList, setBookedUsersList] = useState([]);
  const [bookedServiceList, setBookedServicesList] = useState([]);

  const handleEventBookedUsers = async () => {
    try {
      const response = await getEventBookedUsers({ event_id: event?.event_id });
      setBookedUsersList(response?.bookings);
    } catch (e) {
      console.log(e);
    }
  };

  const handleEventBookedServices = async () => {
    try {
      const response = await getEventBookedServices({
        event_id: event?.event_id,
      });
      setBookedServicesList(response?.eventServices);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleEventBookedUsers();
    handleEventBookedServices();
  }, [event]);
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-6xl mx-auto my-6">
      <Card
        hoverable
        style={{
          borderColor: "#fa8c16",
          marginBottom: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        bodyStyle={{ padding: "20px" }}
      >
        {/* Event Title and Status Badge */}
        <Row justify="space-between" align="middle">
          <Title level={3} style={{ color: "#fa8c16" }}>
            {event.event_name}
          </Title>
          <Badge
            count={event.event_status}
            style={{
              backgroundColor:
                event.event_status === "ACTIVE" ? "#52c41a" : "#f5222d",
              fontSize: "14px",
              fontWeight: "600",
              borderRadius: "5px",
              padding: "0 10px",
            }}
          />
        </Row>

        {/* Carousel for Event Images */}
        <Carousel
          autoplay
          dots={true}
          style={{
            borderRadius: "10px",
            overflow: "hidden",
            marginBottom: "20px",
          }}
        >
          <div>
            <img
              src={Land}
              alt="Event"
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
          <div>
            <img
              src={About}
              alt="Event"
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
          <div>
            <img
              src={EventPla}
              alt="Event"
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
        </Carousel>

        {/* Event Description */}
        <Text type="secondary">{event.event_description}</Text>
        <div className="mt-4">
          <Tag color="volcano">{event.event_category}</Tag>
          <Tag color="orange">{event.event_type}</Tag>
          <Tag color="gold">{event.event_age_limit}</Tag>
        </div>

        <Divider />

        {/* Event Additional Details */}
        <Row gutter={[16, 16]} className="mt-4 text-left md:pl-10">
          <Col xs={24} md={8}>
            <Text strong>Category:</Text> {event.event_category}
          </Col>
          <Col xs={24} md={8}>
            <Text strong>Type:</Text> {event.event_type}
          </Col>
          <Col xs={24} md={8}>
            <Text strong>Guests:</Text> {event.event_guests}
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="mt-2 text-left md:pl-10">
          <Col xs={24} md={8}>
            <Text strong>Language:</Text> {event.event_delivery_language}
          </Col>
          <Col xs={24} md={8}>
            <Text strong>Age Limit:</Text> {event.event_age_limit}
          </Col>
          <Col xs={24} md={8}>
            <Text strong>Ticket Price:</Text> ${event.event_ticket_price}
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="mt-2 text-left md:pl-10">
          <Col xs={24} md={8}>
            <Text strong>Discount:</Text> {event.event_discount}
          </Col>
        </Row>

        <Divider />

        {/* Event Date and Location */}
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Text strong>Location:</Text>{" "}
            {`${event.event_city}, ${event.event_state}, ${event.event_country}`}
          </Col>
        </Row>
        <div className="mt-2">
          <Text strong>Date/Time:</Text>{" "}
          {event.event_days_type === "single_day"
            ? `${event.event_date} at ${event.event_time}`
            : `${event.event_start_date} to ${event.event_end_date}, ${event.event_timings}`}
        </div>

        <Divider />

        {/* Additional Event Details */}
        <Row gutter={[16, 16]} className="mt-2 text-left md:pl-10">
          <Col xs={24} md={8}>
            <Text strong>Seats Left:</Text> {event.event_seats_left}/
            {event.event_total_seats}
          </Col>
          <Col xs={24} md={8}>
            <Text strong>Food:</Text> {event.event_food}
          </Col>
          <Col xs={24} md={8}>
            <Text strong>Accommodation:</Text> {event.event_accommodation}
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="mt-2 text-left md:pl-10">
          <Col xs={24} md={8}>
            <Text strong>Ticket Filling Status:</Text>{" "}
            {event.event_ticket_filling_status}
          </Col>
          <Col xs={24} md={16}>
            <Text strong>Early Bird Offer:</Text> {event.event_early_bird_offer}
          </Col>
        </Row>

        <Divider />

        {/* Address Details */}
        <Row gutter={[16, 16]} className="mt-2 text-left md:pl-10">
          <Col xs={24}>
            <Text strong>Address:</Text>{" "}
            {`${event.event_address_line_one}, ${event.event_address_line_two}, ${event.event_city}, ${event.event_state}, ${event.event_zipcode}`}
          </Col>
        </Row>
        <Divider />
        <Title level={4}>Booked Users</Title>
        <Table
          columns={columns}
          dataSource={bookedUsersList} // Array of booked users
          pagination={false} // Optional: turn off pagination
          rowKey="booking_id"
          scroll={{ x: 800 }} // Allow horizontal scrolling on small screens
        />

        <Divider />
        <Title level={4}>Booked Services</Title>
        <Table
          columns={serviceColumns}
          dataSource={bookedServiceList} // Array of booked users
          pagination={false} // Optional: turn off pagination
          rowKey="booking_id"
          scroll={{ x: 800 }} // Allow horizontal scrolling on small screens
        />
      </Card>
    </div>
  );
};

export default AdminEventDetails;
