import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import EventList from "../user/EventsList";
import { getEvents } from "../api/api";

const AdminEvents = () => {
  const [activeStatus, setActiveStatus] = useState("");
  const [eventsList, setEventsList] = useState([]);
  const [filters, setFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState({});
  const navigate = useNavigate();

  const event = {
    event_id: 1,
    organizer_id: 3,
    event_name: "Tech Summit 2024",
    event_description:
      "A premier event for technology enthusiasts and professionals.",
    event_total_seats: 500,
    event_seats_left: 500,
    // event_days_type: "single_day",
    event_date: "2024-12-15",
    event_time: "9:00 AM",
    event_category: "Technology",
    event_type: "Conference",
    event_food: "Included",
    event_transportation: "Not Included",
    event_accommodation: "Available",
    event_ticket_price: 100,
    event_delivery_language: "English",
    event_age_limit: "18+",
    event_guests: "Industry Experts",
    event_discount: "10%",
    event_ticket_filling_status: "Available",
    event_status: "ACTIVE",
    event_early_bird_offer: "5% discount before December 1st",
    event_address_line_one: "123 Main Street",
    event_address_line_two: "Suite 400",
    event_city: "New York",
    event_state: "New York",
    event_country: "USA",
    event_zipcode: "10001",
    event_image_url_one: "https://example.com/image1.jpg",
    event_image_url_two: "https://example.com/image2.jpg",
    event_image_url_three: "https://example.com/image3.jpg",

    event_days_type: "multi_day",
    event_start_date: "2025-01-10",
    event_end_date: "2025-01-11",
    event_timings: "9:00 AM - 5:00 PM",
  };
  const handleClick = (data) => {
    navigate("/admin/events-details", { state: event || data });
  };

  const handleEventsList = async () => {
    try {
      const response = await getEvents({ ...activeFilters });
      setEventsList(response?.events);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleEventsList();
  }, [activeFilters]);

  const handleChange = (value, key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    setActiveFilters(filters);
  };
  const handleReset = () => {
    setActiveFilters({});
    setFilters({});
  };

  return (
    <div className="mb-10">
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
            Events
          </span>
        </li>
        <li>
          <span
            className={`cursor-pointer ${
              activeStatus === "InProgress" && "text-orange-400"
            }`}
            onClick={() => {
              setActiveStatus("InProgress");
            }}
          >
            Past Events
          </span>
        </li>
        <li>
          <span
            onClick={() => {
              setActiveStatus("Rejected");
            }}
            className={`cursor-pointer ${
              activeStatus === "Rejected" && "text-orange-400"
            }`}
          >
            Cancelled Events
          </span>
        </li>
      </ul>{" "}
      <EventList
        handleClick={handleClick}
        events={eventsList}
        filters={filters}
        handleChange={handleChange}
        handleReset={handleReset}
        handleSearch={handleSearch}
      />
    </div>
  );
};

export default AdminEvents;
