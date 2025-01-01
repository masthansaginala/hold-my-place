import {
  Card,
  Col,
  Row,
  Badge,
  Typography,
  Tag,
  Divider,
  Carousel,
  Button,
  InputNumber,
} from "antd";
import Land from "../../assets/land.jpg";
import About from "../../assets/about.jpg";
import EventPla from "../../assets/eventplan.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { bookEvent } from "../api/api";
import { useState } from "react";
import { useAuth } from "../api/AuthContextRedux";
import { toast } from "react-toastify";

const { Title, Text } = Typography;

const EventDetails = () => {
  const location = useLocation();
  const event = location.state;
  const { profileData } = useAuth();
  const navigate = useNavigate();
  const [ticketsCount, setTicketsCount] = useState(1);
  console.log("profile->", profileData);
  const handleBookEvents = async () => {
    try {
      const response = await bookEvent({
        user_id: profileData?.user?.user_id,
        event_id: event?.event_id,
        organizer_id: event?.organizer_id,
        booking_ticket_count: ticketsCount,
        booking_price: ticketsCount * Number(event?.event_ticket_price),
        user_email: profileData?.user?.user_email,
        booking_event_date: new Date(),
      });
      toast.success(response?.message);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  console.log("eventdata->", event);

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
            {event?.event_name}
          </Title>
          <Badge
            count={event?.event_status}
            style={{
              backgroundColor:
                event?.event_status === "ACTIVE" ? "#52c41a" : "#f5222d",
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
        <Text type="secondary">{event?.event_description}</Text>
        <div className="mt-4">
          <Tag color="volcano">{event?.event_category}</Tag>
          <Tag color="orange">{event?.event_type}</Tag>
          <Tag color="gold">{event?.event_age_limit}</Tag>
        </div>
        <Divider />

        <Row justify="end" align="middle" gutter={[16, 16]} className="mt-4">
          <Col>
            <Text strong style={{ fontSize: "16px" }}>
              Select Number of Tickets:
            </Text>
          </Col>
          <Col>
            <InputNumber
              min={1}
              max={event?.event_seats_left} // Limit to available seats
              defaultValue={1}
              onChange={(value) => setTicketsCount(value)}
              value={ticketsCount}
              style={{ width: "80px", borderRadius: "8px" }}
            />
          </Col>
          <Col>
            <Button
              type="primary"
              size="large"
              style={{
                backgroundColor: "#fa8c16",
                borderColor: "#fa8c16",
                borderRadius: "8px",
                padding: "0 40px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              onClick={handleBookEvents}
              disabled={event?.event_seats_left === 0} // Disable if no seats are left
            >
              Buy Tickets
            </Button>
          </Col>
        </Row>

        <Divider />

        {/* Event Additional Details */}
        <Row gutter={[16, 16]} className="mt-4 text-left md:pl-10">
          <Col xs={24} md={8}>
            <Text strong>Category:</Text> {event?.event_category}
          </Col>
          <Col xs={24} md={8}>
            <Text strong>Type:</Text> {event?.event_type}
          </Col>
          <Col xs={24} md={8}>
            <Text strong>Guests:</Text> {event?.event_guests}
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="mt-2 text-left md:pl-10">
          <Col xs={24} md={8}>
            <Text strong>Language:</Text> {event?.event_delivery_language}
          </Col>
          <Col xs={24} md={8}>
            <Text strong>Age Limit:</Text> {event?.event_age_limit}
          </Col>
          <Col xs={24} md={8}>
            <Text strong>Ticket Price:</Text> ${event?.event_ticket_price}
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="mt-2 text-left md:pl-10">
          <Col xs={24} md={8}>
            <Text strong>Discount:</Text> {event?.event_discount}
          </Col>
        </Row>

        <Divider />
        <div className="flex flex-col text-left justify-start items-center">
          {/* Event Date and Location */}
          <div className="text-left">
            <Text strong>Location:</Text>{" "}
            {`${event?.event_city}, ${event?.event_state}, ${event?.event_country}`}
          </div>
          <div className="mt-2 text-left">
            <Text strong>Date/Time:</Text>{" "}
            {event?.event_days_type === "single_day"
              ? `${event?.event_date} at ${event?.event_time}`
              : `${event?.event_start_date} to ${event?.event_end_date}, ${event?.event_timings}`}
          </div>
        </div>

        <Divider />

        {/* Additional Event Details */}
        <Row gutter={[16, 16]} className="mt-2 text-left md:pl-10">
          <Col xs={24} md={8}>
            <Text strong>Seats Left:</Text> {event?.event_seats_left}/
            {event?.event_total_seats}
          </Col>
          <Col xs={24} md={8}>
            <Text strong>Food:</Text> {event?.event_food}
          </Col>
          <Col xs={24} md={8}>
            <Text strong>Accommodation:</Text> {event?.event_accommodation}
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="mt-2 text-left md:pl-10">
          <Col xs={24} md={8}>
            <Text strong>Ticket Filling Status:</Text>{" "}
            {event?.event_ticket_filling_status}
          </Col>
          <Col xs={24} md={16}>
            <Text strong>Early Bird Offer:</Text>{" "}
            {event?.event_early_bird_offer}
          </Col>
        </Row>

        <Divider />

        {/* Address Details */}
        <Row gutter={[16, 16]} className="mt-2 text-left md:pl-10">
          <Col xs={24}>
            <Text strong>Address:</Text>{" "}
            {`${event?.event_address_line_one}, ${event?.event_address_line_two}, ${event?.event_city}, ${event?.event_state}, ${event?.event_zipcode}`}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default EventDetails;
