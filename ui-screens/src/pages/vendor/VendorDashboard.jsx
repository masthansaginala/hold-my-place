import { useState, useEffect } from "react";
import {
  Input,
  Select,
  Button,
  Card,
  Space,
  Row,
  Col,
  Empty,
  Collapse,
  Tag,
} from "antd";
import { Modal, DatePicker } from "antd";
import { toast } from "react-toastify";

const { Option } = Select;
const { Panel } = Collapse;

import { services, vendorProofTypes } from "../../utilities/Constant";
import {
  getVendorsBusiness,
  registerVendorBusiness,
  uploadImage,
} from "../api/api";
import { useAuth } from "../api/AuthContextRedux";

const VendorDashboard = () => {
  const { profileData } = useAuth();
  console.log("inside vendor");
  const [nameFilter, setNameFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState();
  const [data, setData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({});
  };

  const handleFinish = (values) => {
    console.log("Form Values:", values);
    setIsModalOpen(false);
  };

  const handleSearch = () => {
    setSelectedFilters({
      vendor_business_name: nameFilter || "",
      vendor_business_service_category: serviceFilter || "",
    });
  };

  const handleGetVendorBusiness = async () => {
    try {
      const response = await getVendorsBusiness({
        vendor_id: profileData?.user?.user_id,
        ...selectedFilters,
      });
      setData(response?.vendorBusinesses);
    } catch (e) {
      console.log(e);
    }
  };

  const handleRegisterVendorBusiness = async () => {
    try {
      const response = await registerVendorBusiness({
        ...formData,
        vendor_id: profileData?.user?.user_id,
        vendor_business_status: "NEW",
      });
      handleGetVendorBusiness();
      setFormData({});
      toast.success(response?.message);
      setIsModalOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetVendorBusiness();
  }, [selectedFilters]);

  const handleReset = () => {
    setNameFilter("");
    setServiceFilter("");
    setSelectedFilters({});
  };

  const sendImage = async (file, key) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await uploadImage(formData);
      setFormData((prev) => ({ ...prev, [key]: response?.imageUrl }));
    } catch (e) {
      console.log("first", e);
    }
  };
  return (
    <div>
      <div className="space-y-4 mx-10 my-10">
        <div className="flex justify-between items-center">
          <h1 className="text-orange-500 text-2xl font-bold">Services</h1>
          <button
            className="rounded-lg bg-orange-500 text-white px-6 py-3"
            onClick={handleOpenModal}
          >
            Add Services
          </button>
        </div>

        <Card bordered className="p-4">
          <Space direction="vertical" size="large" className="w-full text-left">
            {/* Event Name */}
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Enter name"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  className="w-full h-11"
                />
              </Col>

              {/* Event Category */}
              <Col span={6}>
                <label className="block text-sm font-medium text-gray-700">
                  Service Type
                </label>
                <Select
                  id="service"
                  placeholder="Select a service"
                  value={serviceFilter}
                  onChange={(value) => setServiceFilter(value)}
                  className="w-full h-11"
                  allowClear
                  showSearch
                  optionFilterProp="children"
                >
                  {services.map((service, index) => (
                    <Option key={index} value={service}>
                      {service}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={6} className="flex items-end ">
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
              </Col>
            </Row>

            {/* Search Button */}
          </Space>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Loop through the service data and display each service */}
          {data?.length ? (
            data?.map((business) => (
              <Card
                key={business.vendor_business_id}
                title={business.vendor_business_name}
                extra={
                  <Tag color="orange">
                    {business.vendor_business_service_category}
                  </Tag>
                }
                hoverable
                className=" border-orange-500 text-left"
              >
                <div className="mb-4">
                  <img
                    src={business.vendor_business_image_url}
                    alt={business.vendor_business_name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                {/* Proof Section */}
                <div className="mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-1/3">
                      <img
                        src={business.vendor_business_proof_image_url}
                        alt="Proof Image"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </div>
                    <div className="w-2/3">
                      <p>
                        <strong>Proof Type:</strong>{" "}
                        {business.vendor_business_proof_type}
                      </p>
                    </div>
                  </div>
                </div>

                <Collapse defaultActiveKey={["1"]}>
                  <Panel
                    header="Business Details"
                    key="1"
                    className="text-left"
                  >
                    <p>
                      <strong>License Number:</strong>{" "}
                      {business.vendor_business_license_number}
                    </p>
                    <p>
                      <strong>Phone:</strong>{" "}
                      {business.vendor_business_primary_phone_number}
                    </p>
                    <p>
                      <strong>Email:</strong> {business.vendor_business_email}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {business.vendor_business_description}
                    </p>
                  </Panel>
                  <Panel
                    header="Address & Contact"
                    key="2"
                    className="text-left"
                  >
                    <p>
                      <strong>Address:</strong>{" "}
                      {business.vendor_business_address_line_one},{" "}
                      {business.vendor_business_address_line_two}
                    </p>
                    <p>
                      <strong>City:</strong> {business.vendor_business_city}
                    </p>
                    <p>
                      <strong>State:</strong> {business.vendor_business_state}
                    </p>
                    <p>
                      <strong>Zip Code:</strong>{" "}
                      {business.vendor_business_zipcode}
                    </p>
                  </Panel>
                </Collapse>
              </Card>
            ))
          ) : (
            <Empty description="No Data Available" />
          )}
        </div>
      </div>

      <Modal
        title="Vendor Details"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        destroyOnClose
        width="1000px"
      >
        <div className="space-y-4 mt-10">
          <Row gutter={16}>
            <Col span={8}>
              <input
                className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100 text-black focus:border-black"
                type="text"
                placeholder="Vendor Business Name"
                value={formData?.vendor_business_name || ""}
                onChange={handleChange}
                name="vendor_business_name"
              />
            </Col>
            <Col span={8}>
              <input
                className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100 text-black focus:border-black"
                type="email"
                placeholder="Business Email"
                value={formData?.vendor_business_email || ""}
                onChange={handleChange}
                name="vendor_business_email"
              />
            </Col>
            <Col span={8}>
              <Select
                id="service"
                placeholder="Select a service"
                value={formData?.vendor_business_service_category}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    vendor_business_service_category: value,
                  }))
                }
                className="w-full h-11"
                allowClear
                showSearch
                optionFilterProp="children"
              >
                {services.map((service, index) => (
                  <Option key={index} value={service}>
                    {service}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <textarea
                className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100 text-black focus:border-black"
                placeholder="Business Description"
                value={formData?.vendor_business_description || ""}
                onChange={handleChange}
                name="vendor_business_description"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <input
                className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100 text-black focus:border-black"
                type="text"
                placeholder="License Number"
                value={formData?.vendor_business_license_number || ""}
                onChange={handleChange}
                name="vendor_business_license_number"
              />
            </Col>
            <Col span={8}>
              <Select
                className="w-full h-12"
                value={formData?.vendor_business_proof_type}
                onChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    vendor_business_proof_type: value,
                  }));
                }}
                placeholder="Select a proof type"
                style={{ width: "100%" }}
              >
                {vendorProofTypes.map((proof) => (
                  <Option key={proof.value} value={proof.value}>
                    {proof.label}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={8}>
              <DatePicker
                className={`w-full uppercase px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
                onChange={(date) => {
                  setFormData((prev) => ({
                    ...prev,
                    vendor_business_date_of_establishment: date,
                  }));
                }}
                placeholder="Date of Establishment"
                value={formData?.vendor_business_date_of_establishment || ""}
                format="DD-MM-YYYY"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              {" "}
              <input
                className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100 text-black focus:border-black"
                type="tel"
                placeholder="Primary Phone Number"
                value={formData?.vendor_business_primary_phone_number || ""}
                onChange={handleChange}
                name="vendor_business_primary_phone_number"
              />
            </Col>
            <Col span={8}>
              {" "}
              <input
                className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100 text-black focus:border-black"
                type="tel"
                placeholder="Secondary Phone Number"
                value={formData?.vendor_business_secondary_phone_number || ""}
                onChange={handleChange}
                name="vendor_business_secondary_phone_number"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              {" "}
              <input
                className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100 text-black focus:border-black"
                type="text"
                placeholder="Address Line 1"
                value={formData?.vendor_business_address_line_one || ""}
                onChange={handleChange}
                name="vendor_business_address_line_one"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              {" "}
              <input
                className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100 text-black focus:border-black"
                type="text"
                placeholder="Address Line 2"
                value={formData?.vendor_business_address_line_two || ""}
                onChange={handleChange}
                name="vendor_business_address_line_two"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              {" "}
              <input
                className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100 text-black focus:border-black"
                type="text"
                placeholder="City"
                value={formData?.vendor_business_city || ""}
                onChange={handleChange}
                name="vendor_business_city"
              />
            </Col>
            <Col span={8}>
              <input
                className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100 text-black focus:border-black"
                type="text"
                placeholder="State"
                value={formData?.vendor_business_state || ""}
                onChange={handleChange}
                name="vendor_business_state"
              />
            </Col>
            <Col span={8}>
              {" "}
              <input
                className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100 text-black focus:border-black"
                type="text"
                placeholder="Country"
                value={formData?.vendor_business_country || ""}
                onChange={handleChange}
                name="vendor_business_country"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              {" "}
              <input
                className="w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100 text-black focus:border-black"
                type="text"
                placeholder="Zipcode"
                value={formData?.vendor_business_zipcode || ""}
                onChange={handleChange}
                name="vendor_business_zipcode"
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <label className="font-medium">Proof Image</label>
              <input
                className="w-full px-5 py-2 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100 text-black focus:border-black"
                type="file"
                placeholder="Proof Image URL"
                onChange={(e) => {
                  sendImage(
                    e.target.files[0],
                    "vendor_business_proof_image_url"
                  );
                }}
                name="vendor_business_proof_image_url"
              />
            </Col>

            <Col span={8}>
              <label className="font-medium">Business Image</label>
              <input
                className="w-full px-5 py-2 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100 text-black focus:border-black"
                type="file"
                placeholder="Business Image URL"
                onChange={(e) => {
                  sendImage(e.target.files[0], "vendor_business_image_url");
                }}
                name="vendor_business_image_url"
              />
            </Col>
          </Row>

          <div className="flex justify-end">
            <button
              className="bg-gray-300 px-6 py-3 rounded-lg font-semibold text-white ml-2"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              className="ml-2 bg-orange-400 px-6 py-3 rounded-lg font-semibold text-white"
              onClick={handleRegisterVendorBusiness}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VendorDashboard;
