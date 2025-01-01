import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents } from "./api/api";
import EventList from "./user/EventsList";

const Events = () => {
  const navigate = useNavigate();

  const [eventsList, setEventsList] = useState([]);
  const [filters, setFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState({});

  const handleClick = () => {
    navigate("/login");
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

export default Events;
