import {
  Card,
  Col,
  Row,
  Typography,
  Tag,
  Divider,
  Carousel,
  Table,
  Space,
  Button,
  Modal,
  Popconfirm,
  Checkbox,
  Input,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import {
  addServiceEvent,
  changeUserCheckIn,
  deleteEvent,
  editEvent,
  getBookinList,
  getEventBookedServices,
  getEventBookedUsers,
  getVendorsBusiness,
  updateVendorsBusinessStatusEvent,
  uploadeCertificateEvent,
  uploadImage,
} from "../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EditOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import EventSingleday from "./EventSingleDay";
import EventMultipledays from "./EventMultipleDays";
const { Title, Text } = Typography;

const OrgEventDetails = () => {
  const location = useLocation();
  const eventDetails = location.state;
  const [event, setEvent] = useState(eventDetails || {});
  const navigate = useNavigate();
  console.log("eventdata->", event);
  const [bookedUsersList, setBookedUsersList] = useState([]);
  const [bookedServiceList, setBookedServicesList] = useState([]);
  const [formData, setFormData] = useState({});
  const [open, setOpen] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const [fileList, setFileList] = useState([]); // State to track uploaded files
  const [uploadCertificateId, setUploadCertificateId] = useState(null);
  const [vendorBusinesses, setVendorBusiness] = useState([]);

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
      const response = await updateVendorsBusinessStatusEvent(
        selectedRow?.event_service_id,
        {
          event_service_status_organizer: selectedOption,
          event_service_remarks_organizer: remarks,
        }
      );
      toast.success(response?.message);
      handleEventBookedServices();
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

  const handleServiceCancel = () => {
    setIsModalOpenEdit(false);
    setSelectedRow(null);
  };

  const handleEventCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  // Show the modal
  const showModal = (record) => {
    setIsModalVisible(true);
    setUploadCertificateId(record);
  };

  const handleCheckIn = async (record) => {
    try {
      const response = await changeUserCheckIn({
        booking_id: record?.booking_id,
        booking_checkin: "Checked In",
      });
      toast.success(response?.message);
      handleEventBookedUsers();
    } catch (e) {
      console.log(e);
    }
  };

  const handleVendorBusiness = async () => {
    try {
      const response = await getVendorsBusiness();
      setVendorBusiness(response?.vendorBusinesses);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDownloadBookingList = async () => {
    try {
      const response = await getBookinList({
        organizer_id: event?.organizer_id,
        event_id: event?.event_id,
        responseType: "blob", // Ensure the responseType is explicitly set
      });

      // Ensure response data is a Blob
      const blob = new Blob([response], { type: "text/csv" });

      // Create a link to download the file
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "booking_data.csv"; // Filename for the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("CSV file downloaded successfully.");
    } catch (error) {
      console.error("Error downloading the CSV file:", error.message);
      toast.error("Failed to download CSV file.");
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const response = await deleteEvent(event?.event_id);
      toast.success(response?.message);
      navigate("/organizer/events");
    } catch (e) {
      console.log(e);
    }
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
    {
      title: "Action",
      key: "action",
      className: "text-orange-500 hover:text-orange-400",

      render: (_, record) => (
        <Space size="middle" className="flex justify-between">
          {record?.booking_checkin ? (
            <span className="text-green-600 w-8">
              {record?.booking_checkin}
            </span>
          ) : (
            <Popconfirm
              title="Are you sure ?"
              onConfirm={() => handleCheckIn(record)}
              okText="Yes"
              cancelText="No"
              disabled={!!record?.booking_checkin}
            >
              <Button type="link" className="text-red-500">
                Check In
              </Button>
            </Popconfirm>
          )}

          {record?.booking_event_certificate_image_url ? (
            <a
              href={record?.booking_event_certificate_image_url}
              className="text-green-500 d"
            >
              Download Certificate
            </a>
          ) : (
            <Button
              type="link"
              className="text-red-500"
              onClick={() => {
                showModal(record);
              }}
            >
              Upload Certificate
            </Button>
          )}
        </Space>
      ),
    },
  ];

  // Close the modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setUploadCertificateId(null);
  };

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

  const sendImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await uploadImage(formData);

      const responses = await uploadeCertificateEvent({
        booking_id: uploadCertificateId?.booking_id,
        booking_event_certificate_image_url: response?.imageUrl,
      });
      toast.success(responses?.message);
      handleEventBookedUsers();
      handleCancel();
      // setFormData((prev) => ({ ...prev, [key]: response?.imageUrl }));
    } catch (e) {
      console.log("first", e);
    }
  };

  useEffect(() => {
    handleEventBookedUsers();
    handleEventBookedServices();
    setEvent(eventDetails);
    handleVendorBusiness();
  }, [eventDetails]);

  const handleChangeEvent = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateEvent = async () => {
    try {
      let payload = {};
      if (event?.event_days_type === "single_day") {
        const {
          event_start_date,
          event_end_date,
          deleted_at,
          createdAt,
          created_at,
          event_timings,
          updatedAt,
          updated_at,
          organizer_id,
          deletedAt,
          event_id,
          event_name,
          event_days_type,
          event_category,
          event_type,
          ...rest
        } = formData;
        payload = { ...rest };
      } else {
        const {
          event_date,
          deleted_at,
          createdAt,
          created_at,
          event_time,
          updatedAt,
          updated_at,
          organizer_id,
          deletedAt,
          event_id,
          event_name,
          event_days_type,
          event_category,
          event_type,
          ...rest
        } = formData;
        payload = { ...rest };
      }
      const response = await editEvent(event?.event_id, {
        ...payload,
      });
      toast.success(response?.message);
      setFormData({});
      setOpen(false);
      setEvent((prev) => ({ ...prev, ...payload }));
    } catch (e) {
      console.log(e);
    }
  };

  const handleOk = () => {
    handleCreateEvent();
  };

  const [isServiceModalVisible, setIsServiceModalVisible] = useState(false);
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);

  // Handle the OK button action
  const handleServiceModalOk = async () => {
    try {
      const response = await addServiceEvent({
        event_id: event?.event_id,
        organizer_id: event?.organizer_id,
        vendor_id: selectedServiceIds?.vendor_id,
        vendor_business_id: selectedServiceIds?.vendor_business_id,
        event_service_status_vendor: "NEW",
        event_service_status_organizer: "NEW",
      });
      toast.success(response?.message);
      handleEventBookedServices();
      setSelectedServiceIds([]);
      setIsServiceModalVisible(false);
    } catch (e) {
      console.log(e);
    }
    console.log("Selected Services:", selectedServiceIds);
  };

  // Handle the Cancel button action
  const handleServiceModalCancel = () => {
    setIsServiceModalVisible(false);
  };

  // Handle checkbox selection
  const handleServiceCheckboxChange = (service) => {
    setSelectedServiceIds(service);
  };

  return (
    <div className="mb-10">
      <div className="mx-4 md:mx-16 lg:mx-40 mt-14 flex flex-col md:flex-row gap-10">
        {/* Image Section */}
        <div className="w-full md:w-[65%] text-left">
          <Carousel autoplay>
            <div>
              <img
                src={event?.event_image_url_one} // Replace this with your image sources or URLs
                alt="Ikigai Event"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div>
              <img
                src={event?.event_image_url_two} // Replace with another image
                alt="Ikigai Event"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div>
              <img
                src={event?.event_image_url_three} // Replace with another image
                alt="Ikigai Event"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </Carousel>
        </div>

        {/* Card Section */}

        <div className="w-full md:w-[35%]">
          <Card
            // sx={{ maxWidth: 545 }}
            style={{ color: "gray" }}
            className="text-left rounded-lg shadow-lg w-full"
          >
            <Card.Meta
              title={<Title level={5}>{event?.event_name}</Title>}
              description={
                <div>
                  {/* Location */}
                  <div className="flex items-center text-sm text-gray-500 mt-2 mb-2">
                    <EnvironmentOutlined
                      style={{ color: "#FF7A45", marginRight: 8 }}
                    />
                    {`${event?.event_address_line_one}, ${event?.event_address_line_two}, ${event?.event_city}, ${event?.event_state}, ${event?.event_country}, ${event?.event_zipcode}`}
                  </div>

                  {/* Ticket Price */}
                  <Text strong style={{ color: "#FF7A45", fontSize: "1.1rem" }}>
                    ${event?.event_ticket_price}{" "}
                  </Text>
                  <Text type="secondary">/person</Text>

                  {/* Seats and Calendar */}
                  <div className="flex items-center space-x-2 text-gray-600 mt-2">
                    <ClockCircleOutlined style={{ color: "#FF7A45" }} />
                    <Text className="text-sm text-gray-500">
                      <span className="text-orange-500 text-lg font-semibold">
                        {event?.event_total_seats - event?.event_seats_left}{" "}
                      </span>
                      /{event?.event_total_seats} seats booked
                    </Text>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2 text-gray-600">
                      {/* Calendar Icon */}
                      <CalendarOutlined style={{ color: "#FF7A45" }} />
                      <Text>
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
                      </Text>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-600 mt-2">
                      {/* Time Icon */}
                      <ClockCircleOutlined style={{ color: "#FF7A45" }} />
                      <Text>{event?.event_time || event?.event_timings}</Text>
                    </div>
                  </div>
                </div>
              }
            />
            <Divider />
            <div className="flex justify-between items-center">
              <Popconfirm
                title="Are you sure ?"
                onConfirm={handleDeleteEvent}
                okText="Yes"
                cancelText="No"
              >
                <button
                  type="default"
                  className="bg-gray-400 py-4  px-8 rounded-lg text-white"
                >
                  Delete Event
                </button>
              </Popconfirm>

              <button
                className="bg-orange-400 py-4 px-8 rounded-lg text-white"
                onClick={() => {
                  setFormData(event);
                  setOpen(true);
                }}
              >
                Edit Event
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* About Event Section */}
      <div className="mx-4 md:mx-16 lg:mx-48 mt-14 text-left">
        <h1 className="mt-20 font-semibold text-3xl mb-4 text-gray-800">
          About the Event
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed">
          {event?.event_description}
        </p>
        <div className="mt-4">
          <Tag color="volcano">{event?.event_category}</Tag>
          <Tag color="orange">{event?.event_type}</Tag>
          <Tag color="gold">{event?.event_age_limit}</Tag>
        </div>
        <Divider />
        <Row gutter={[16, 16]} className="mt-4 text-left md:pl-10">
          <Col xs={24} md={8}>
            <Text strong>Category: </Text>
            {event?.event_category}
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

        {/* Event Date and Location */}
        <div className=" md:pl-10">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Text strong>Location:</Text>{" "}
              {`${event?.event_city}, ${event?.event_state}, ${event?.event_country}`}
            </Col>
          </Row>
          <div className="mt-2">
            <Text strong>Date/Time:</Text>{" "}
            <span className="text-sm">
              {event?.event_days_type === "single_day"
                ? `${moment(event?.event_date).format("DD/MM/YYYY")} at ${
                    event?.event_time
                  }`
                : `${moment(event?.event_start_date).format(
                    "DD/MM/YYYY"
                  )} to ${moment(event?.event_end_date).format(
                    "DD/MM/YYYY"
                  )}, ${event?.event_timings}`}
            </span>
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
        <Divider />

        {/* Services Section */}
        <div>
          <div className="flex justify-between items-center">
            <p className="text-orange-500 font-semibold mt-10 mb-5">Services</p>
            <button
              className="bg-orange-500 text-white px-5 py-2 text-sm rounded-full font-light font-outfit  hidden md:block "
              onClick={() => {
                setIsServiceModalVisible(true);
              }}
            >
              Add Services
            </button>
          </div>

          <Table
            columns={serviceColumns}
            dataSource={bookedServiceList} // Array of booked users
            pagination={false} // Optional: turn off pagination
            rowKey="booking_id"
            scroll={{ x: 800 }} // Allow horizontal scrolling on small screens
          />
        </div>
        <Divider />
        {/* Registered Users Section */}
        <div>
          <div className="flex justify-between items-center">
            <p className="text-orange-500 font-semibold mt-10 mb-5">
              Registered Users
            </p>
            <button
              className="bg-orange-500 text-white px-5 py-2 text-sm rounded-full font-light font-outfit  hidden md:block "
              onClick={handleDownloadBookingList}
            >
              Download List
            </button>
          </div>

          <Table
            columns={columns}
            dataSource={bookedUsersList} // Array of booked users
            pagination={false} // Optional: turn off pagination
            rowKey="booking_id"
            scroll={{ x: 800 }} // Allow horizontal scrolling on small screens
          />
        </div>
      </div>

      <Modal
        title="Upload Files"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            disabled={fileList?.length === 0} // Disable submit button if no file is selected
            onClick={() => sendImage(fileList)} // Upload the first file
          >
            Upload Certificate
          </Button>,
        ]}
      >
        <input
          className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="file"
          accept="image/*"
          onChange={(e) => {
            setFileList(e.target.files[0]);
          }}
        />
      </Modal>

      {open && (
        <>
          <Modal
            title="Edit Event"
            open={open}
            width={1000}
            onOk={handleOk}
            onCancel={handleEventCancel}
            footer={[
              <Button
                key="back"
                onClick={handleEventCancel}
                className="px-8 py-5 mt-5"
              >
                Cancel
              </Button>,

              <button
                key="submit"
                onClick={handleOk}
                className="bg-orange-400 hover:bg-orange-600 text-white px-10 py-2 ml-2 rounded mt-5"
              >
                Save
              </button>,
            ]}
          >
            <div className="flex flex-col justify-center items-center w-full h-[100%]  px-5 mt-10">
              <div
                className={`xl:max-w-3xl ${"bg-white"} shadow-lg border  w-full p-5 sm:p-10 rounded-md`}
              >
                <div className="w-full mt-8">
                  <div className="w-full flex flex-col gap-4">
                    {event?.event_days_type === "single_day" && (
                      <EventSingleday
                        formData={{
                          ...formData,
                          event_date: moment(event.event_date),
                        }}
                        setFormData={setFormData}
                        handleChange={handleChangeEvent}
                        type="edit"
                      />
                    )}
                    {event?.event_days_type === "multi_day" && (
                      <EventMultipledays
                        formData={{
                          ...formData,
                          event_start_date: moment(event.event_start_date),
                          event_end_date: moment(event.event_end_date),
                        }}
                        setFormData={setFormData}
                        handleChange={handleChangeEvent}
                        type="edit"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </>
      )}
      <Modal
        title="Select Services"
        open={isServiceModalVisible}
        onOk={handleServiceModalOk}
        onCancel={handleServiceModalCancel}
        width={1000}
      >
        <div className="space-y-4">
          {/* Loop through the service data and display each service */}
          {vendorBusinesses?.length &&
            vendorBusinesses?.map((service) => (
              <div
                key={service.vendor_business_id}
                className="border rounded-lg p-4 flex items-start gap-4 shadow-md"
              >
                {/* Business image */}
                <img
                  src={service.vendor_business_image_url}
                  alt={service.vendor_business_name}
                  className="w-40 h-40 object-cover rounded-md"
                />

                {/* Business details */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {service.vendor_business_name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {service.vendor_business_description}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Category: {service.vendor_business_service_category}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Location: {service.vendor_business_city},{" "}
                    {service.vendor_business_state}
                  </p>
                </div>

                {/* Checkbox to select the service */}
                <Checkbox
                  className="mt-2"
                  onChange={() => handleServiceCheckboxChange(service)}
                  checked={
                    selectedServiceIds?.vendor_business_id ===
                    service.vendor_business_id
                  }
                >
                  Select
                </Checkbox>
              </div>
            ))}
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

export default OrgEventDetails;
