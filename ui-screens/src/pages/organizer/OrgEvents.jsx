import { Button, Modal } from "antd";
import EventList from "../user/EventsList";
import { useEffect, useState } from "react";
import EventSingleday from "./EventSingleDay";
import EventMultipledays from "./EventMultipleDays";
import { useNavigate } from "react-router-dom";
import { getEvents, registerEvent } from "../api/api";
import { useAuth } from "../api/AuthContextRedux";
import { toast } from "react-toastify";

const OrgEvents = () => {
  const { profileData } = useAuth();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [role, setRole] = useState("");
  const [eventsList, setEventsList] = useState([]);
  const [filters, setFilters] = useState({});
  const [activeFilters, setActiveFilters] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (role) {
      setFormData({});
    }
  }, [role]);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleClick = (data) => {
    navigate("/organizer/event-details", { state: data });
  };

  const handleEventsList = async () => {
    try {
      const response = await getEvents({
        ...activeFilters,
        organizer_id: profileData?.user?.user_id,
      });
      setEventsList(response?.events);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreateEvent = async () => {
    try {
      const response = await registerEvent({
        ...formData,
        organizer_id: profileData?.user?.user_id,
        event_status: "ACTIVE",
        event_days_type: role,
      });
      toast.success(response?.message);
      handleEventsList();
      setFormData({});
      setRole();
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleOk = () => {
    handleCreateEvent();
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

  const handleChangeEvent = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
    <div>
      {" "}
      <div className="px-5 mt-5  flex items-center justify-between">
        <h1 className="font-bold text-2xl text-orange-500 text-left">
          Events List
        </h1>
        <button
          className="bg-orange-400 text-white px-6 py-2 text-sm rounded-full font-light font-outfit  hidden md:block "
          onClick={showModal}
        >
          Add Event
        </button>
      </div>
      <EventList
        handleClick={handleClick}
        events={eventsList}
        filters={filters}
        handleChange={handleChange}
        handleReset={handleReset}
        handleSearch={handleSearch}
        setFilters={setFilters}
      />
      {open && (
        <>
          <Modal
            title="Add Event"
            open={open}
            width={1000}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button
                key="back"
                onClick={handleCancel}
                className="px-8 py-5 mt-5"
              >
                Cancel
              </Button>,

              <button
                key="submit"
                onClick={handleOk}
                className="bg-orange-400 hover:bg-orange-600 text-white px-10 py-2 ml-2 rounded mt-5"
              >
                Add
              </button>,
            ]}
          >
            <div className="flex flex-col justify-center items-center w-full h-[100%]  px-5 mt-10">
              <div
                className={`xl:max-w-3xl ${"bg-white"} shadow-lg border  w-full p-5 sm:p-10 rounded-md`}
              >
                <div className="w-full mt-8">
                  <div className="w-full flex flex-col gap-4">
                    <div className="mb-4 text-left w-full">
                      <label className="block text-sm font-medium mb-2">
                        Please select a role first for the registration
                      </label>
                      <select
                        value={role || ""}
                        onChange={(e) => setRole(e.target.value)}
                        // className="w-full p-3 border border-gray-300 rounded-lg"
                        className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
                      >
                        <option value="" disabled>
                          -- Select Days --
                        </option>
                        <option value="single_day">Single Day</option>
                        <option value="multi_day">Multiple Days</option>
                      </select>
                    </div>

                    {role === "single_day" && (
                      <EventSingleday
                        formData={formData}
                        setFormData={setFormData}
                        handleChange={handleChangeEvent}
                      />
                    )}
                    {role === "multi_day" && (
                      <EventMultipledays
                        formData={formData}
                        setFormData={setFormData}
                        handleChange={handleChangeEvent}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default OrgEvents;
