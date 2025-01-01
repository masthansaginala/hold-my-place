import moment from "moment";

import {
  Select,
  Col,
  Row,
  Input,
  DatePicker,
  Button,
  Space,
  Card,
  Empty,
} from "antd";
import { eventCategories } from "../../utilities/Constant";
import { useState } from "react";

const { Option } = Select;

const statusOptions = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
];
function EventList({
  handleClick,
  handleChange = () => {},
  filters,
  setFilters,
  handleSearch,
  handleReset,
  events,
}) {
  const [filteredTypes, setFilteredTypes] = useState([]);

  return (
    <div className="mb-10">
      <div className="p-6">
        {/* <h2 className="text-2xl font-semibold mb-4">Event Filters</h2> */}
        <Card bordered className="p-4 event-filter">
          <Space direction="vertical" size="large" className="w-full text-left">
            {/* Event Name */}
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <label className="block text-sm font-medium text-gray-700">
                  Event Name
                </label>
                <Input
                  className="w-full mt-1 h-12"
                  placeholder="Search Event"
                  value={filters?.event_name || ""}
                  onChange={(e) => handleChange(e.target.value, "event_name")}
                />
              </Col>

              {/* Event Category */}
              <Col span={6}>
                <label className="block text-sm font-medium text-gray-700">
                  Event Category
                </label>
                <Select
                  className="w-full h-12 mt-1"
                  placeholder="Select a category"
                  onChange={(value) => {
                    setFilters((prev) => ({
                      ...prev,
                      event_category: value,
                      event_type: null,
                    }));
                    const selected = eventCategories.find(
                      (cat) => cat.category === value
                    );
                    console.log("selected->", selected);
                    setFilteredTypes(selected ? selected?.types : []);
                  }}
                  value={filters?.event_category || undefined}
                >
                  {eventCategories.map((cat) => (
                    <Option key={cat.category} value={cat.category}>
                      {cat.category}
                    </Option>
                  ))}
                </Select>
              </Col>

              {/* Event Type */}
              <Col span={6}>
                <label className="block text-sm font-medium text-gray-700">
                  Event Type
                </label>
                <Select
                  className="mt-1 w-full h-12"
                  placeholder="Select a type"
                  value={filters?.event_type || undefined}
                  onChange={(value) => {
                    setFilters((prev) => ({ ...prev, event_type: value }));
                  }}
                >
                  {filteredTypes.map((cat) => (
                    <Option key={cat} value={cat}>
                      {cat}
                    </Option>
                  ))}
                </Select>
              </Col>

              {/* Event Status */}
              <Col span={6}>
                <label className="block text-sm font-medium text-gray-700">
                  Event Status
                </label>
                <Select
                  className="w-full mt-1 h-12"
                  value={filters?.event_status}
                  onChange={(value) => handleChange(value, "event_status")}
                  placeholder="Select Event Status"
                  options={statusOptions}
                />
              </Col>
            </Row>

            {/* Early Bird Offer */}
            <Row gutter={[16, 16]}>
              {/* Event Date */}
              <Col span={6}>
                <label className="block text-sm font-medium text-gray-700">
                  Event Date
                </label>
                <DatePicker
                  className="w-full mt-1 h-12"
                  value={
                    filters?.event_date ? moment(filters?.event_date) : null
                  }
                  onChange={(date) =>
                    handleChange(date?.format("YYYY-MM-DD"), "event_date")
                  }
                  placeholder="Select Event Date"
                />
              </Col>

              {/* Event City */}
              <Col span={6}>
                <label className="block text-sm font-medium text-gray-700">
                  Event City
                </label>
                <Input
                  className="w-full mt-1 h-12"
                  placeholder="Enter City"
                  value={filters?.event_city || ""}
                  onChange={(e) => handleChange(e.target.value, "event_city")}
                />
              </Col>
              {/* Event Age Limit */}
              <Col span={6}>
                <label className="block text-sm font-medium text-gray-700">
                  Event Age Limit
                </label>
                <Select
                  className="w-full mt-1 h-12"
                  value={filters?.event_age_limit}
                  onChange={(value) => handleChange(value, "event_age_limit")}
                  placeholder="Select Age Limit"
                  options={[
                    { value: "18+", label: "18+" },
                    { value: "21+", label: "21+" },
                    { value: "All Ages", label: "All Ages" },
                  ]}
                />
              </Col>
              {/* Event Days Type */}
              <Col span={6}>
                <label className="block text-sm font-medium text-gray-700">
                  Event Days Type
                </label>
                <Select
                  className="w-full mt-1 h-12"
                  value={filters?.event_days_type}
                  onChange={(value) => handleChange(value, "event_days_type")}
                  placeholder="Select Days Type"
                  options={[
                    { value: "single_day", label: "Single Day" },
                    { value: "multi_day", label: "Multi Day" },
                  ]}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              {/* Event Food */}
              <Col span={6}>
                <label className="block text-sm font-medium text-gray-700">
                  Event Food
                </label>
                <Select
                  className="w-full mt-1 h-12"
                  value={filters?.event_food}
                  onChange={(value) => handleChange(value, "event_food")}
                  placeholder="Select Food Option"
                  options={[
                    { value: "Included", label: "Included" },
                    { value: "Not Included", label: "Not Included" },
                  ]}
                />
              </Col>

              {/* Event Accommodation */}
              <Col span={6}>
                <label className="block text-sm font-medium text-gray-700">
                  Event Accommodation
                </label>
                <Select
                  className="w-full mt-1 h-12"
                  value={filters?.event_accommodation}
                  onChange={(value) =>
                    handleChange(value, "event_accommodation")
                  }
                  placeholder="Select Accommodation Option"
                  options={[
                    { value: "Available", label: "Available" },
                    { value: "Not Available", label: "Not Available" },
                  ]}
                />
              </Col>

              {/* Event Transportation */}
              <Col span={6}>
                <label className="block text-sm font-medium text-gray-700">
                  Event Transportation
                </label>
                <Select
                  className="w-full mt-1 h-12"
                  value={filters?.event_transportation}
                  onChange={(value) =>
                    handleChange(value, "event_transportation")
                  }
                  placeholder="Select Transportation Option"
                  options={[
                    { value: "Included", label: "Included" },
                    { value: "Not Included", label: "Not Included" },
                  ]}
                />
              </Col>
            </Row>

            {/* Search Button */}
            <div className="mt-4">
              <Button
                type="primary"
                onClick={handleSearch}
                className="bg-orange-400 font-semibold px-7 py-5"
              >
                Search
              </Button>
              <Button
                type="primary"
                onClick={handleReset}
                className="bg-gray-200 font-semibold ml-2 text-black px-7 py-5"
              >
                Reset
              </Button>
            </div>
          </Space>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-20">
        {events?.length ? (
          events?.map((event) => (
            <>
              <Card
                className="bg-white rounded-lg shadow-md overflow-hidden text-left cursor-pointer"
                onClick={() => {
                  handleClick(event);
                }}
                cover={
                  <img
                    alt={event?.title}
                    src={event?.event_image_url_one}
                    className="w-full h-48 sm:h-64 object-cover"
                  />
                }
              >
                {/* Event Details */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {event?.event_name}
                  </h2>

                  {/* Location */}
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <svg
                      className="w-6 h-6 mr-2 text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 3.636a7 7 0 019.9 0c2.066 2.047 2.06 5.303.02 7.41l-4.162 4.225a1.5 1.5 0 01-2.1 0l-4.163-4.225a5.5 5.5 0 01.005-7.41zm1.516 1.5a5 5 0 016.868 0 3.5 3.5 0 01-.003 5.274l-3.468 3.522a.5.5 0 01-.695 0L6.573 10.41a3.5 3.5 0 01-.006-5.274zM10 9a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm">
                      {`${event?.event_address_line_one}, ${event?.event_address_line_two}, ${event?.event_city}, ${event?.event_state}, ${event?.event_country}, ${event?.event_zipcode}`}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    <span className="text-orange-500 text-lg font-semibold">
                      ${event?.event_ticket_price}{" "}
                    </span>
                    /person
                  </p>

                  <hr className="mt-5 mb-2" />

                  {/* Date and Time */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-600">
                      {/* Calendar Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-orange-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 3v1.5m7.5-1.5v1.5M3.75 9h16.5m-16.5 0A2.25 2.25 0 016 6.75h12A2.25 2.25 0 0120.25 9m-16.5 0v9A2.25 2.25 0 006 20.25h12a2.25 2.25 0 002.25-2.25v-9m-12 4.5h3.75m-3.75 3.75h3.75m3.75-3.75h3.75m-3.75 3.75h3.75"
                        />
                      </svg>
                      <span className="font-medium text-sm">
                        {event?.event_start_date
                          ? moment(event?.event_start_date).format("DD MMM")
                          : ""}
                        {event?.event_date
                          ? moment(event?.event_date).format("DD MMM")
                          : ""}
                        {event?.event_end_date
                          ? ` - ${moment(event?.event_end_date).format(
                              "DD MMM"
                            )}`
                          : ""}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-600">
                      {/* Time Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-orange-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m5.25 0a9.75 9.75 0 11-19.5 0 9.75 9.75 0 0119.5 0z"
                        />
                      </svg>
                      <span className="font-medium text-sm">
                        {event?.event_time || event?.event_timings}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          ))
        ) : (
          <div className="flex justify-center">
            <Empty description="No Data Available" />
          </div>
        )}
      </div>
    </div>
  );
}

export default EventList;
