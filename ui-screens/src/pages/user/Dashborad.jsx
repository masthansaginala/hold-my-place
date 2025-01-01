import { useEffect, useState } from "react";
import EventList from "./EventsList";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../api/api";
import BookingConfirmed from "./BookingConfirmed";

const Dashborad = () => {
  const [activeStatus, setActiveStatus] = useState("");
  const navigate = useNavigate();

  const [eventsList, setEventsList] = useState([]);
  const [filters, setFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState({});

  const handleClick = (data) => {
    navigate("/user-dashboard/event-details", { state: data });
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
              activeStatus === "CONFIRMED" && "text-orange-400"
            }`}
            onClick={() => {
              setActiveStatus("CONFIRMED");
            }}
          >
            Booked Events
          </span>
        </li>
        <li>
          <span
            className={`cursor-pointer ${
              activeStatus === "COMPLETED" && "text-orange-400"
            }`}
            onClick={() => {
              setActiveStatus("COMPLETED");
            }}
          >
            Past Events
          </span>
        </li>
        <li>
          <span
            onClick={() => {
              setActiveStatus("CANCELLED");
            }}
            className={`cursor-pointer ${
              activeStatus === "CANCELLED" && "text-orange-400"
            }`}
          >
            Cancelled Events
          </span>
        </li>
      </ul>{" "}
      {!activeStatus && (
        <EventList
          handleClick={handleClick}
          events={eventsList}
          filters={filters}
          handleChange={handleChange}
          handleReset={handleReset}
          handleSearch={handleSearch}
        />
      )}
      {["CONFIRMED", "CANCELLED", "COMPLETED"].includes(activeStatus) && (
        <BookingConfirmed activeStatus={activeStatus} />
      )}
    </div>
  );
};

export default Dashborad;
