import { useEffect, useState } from "react";
import {
  Card,
  Input,
  Button,
  Form,
  Avatar,
  Divider,
  Row,
  Col,
  Select,
} from "antd";
import {
  EditOutlined,
  SaveOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { toast } from "react-toastify";
import { getVendors, updateProfile } from "../api/api";
import { useAuth } from "../api/AuthContextRedux";

const VendorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { profileData } = useAuth();

  const [user, setUser] = useState({});

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleGetUser = async () => {
    try {
      const response = await getVendors({
        vendor_id: profileData?.user?.user_id,
      });
      setUser(response?.vendors?.[0]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  const handleSaveClick = async () => {
    setIsEditing(false);

    // Preparing data for the API call

    try {
      const payload = {
        vendor_first_name: user?.vendor_first_name,
        vendor_last_name: user?.vendor_last_name,
        vendor_date_of_birth: user?.vendor_date_of_birth,
        vendor_gender: user?.vendor_gender,
        vendor_primary_phone_number: user?.vendor_primary_phone_number,

        vendor_address_line_one: user?.vendor_address_line_one,
        vendor_address_line_two: user?.vendor_address_line_two,
        vendor_city: user?.vendor_city,
        vendor_state: user?.vendor_state,
        vendor_country: user?.vendor_country,
        vendor_zipcode: user?.vendor_zipcode,
        // user_password: user,
      };
      await updateProfile(
        `/vendors/update-profile/${profileData?.user?.user_id}`,
        { ...payload }
      );
      toast.success("Your profile details have been successfully updated.");
      handleGetUser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFieldChange = (field, value) => {
    setUser({
      ...user,
      [field]: value,
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <Card
        title="Profile"
        className="shadow-xl border border-orange-400 bg-white rounded-xl text-left"
        extra={
          isEditing ? (
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSaveClick}
              className="bg-orange-500 border-orange-500 hover:bg-orange-600 text-white"
            >
              Save
            </Button>
          ) : (
            <Button
              icon={<EditOutlined />}
              onClick={handleEditClick}
              className="bg-orange-500 border-orange-500 hover:bg-orange-600 text-white"
            >
              Edit
            </Button>
          )
        }
      >
        <div className="flex items-center space-x-8 mb-8">
          <Avatar
            size={120}
            src="https://www.w3schools.com/w3images/avatar2.png"
            className="border-4 border-orange-500"
          />
          <div className="text-left">
            {/* Name */}
            <h2 className="text-3xl font-semibold text-gray-800 flex items-center">
              <UserOutlined className="mr-2 text-orange-500 text-lg" />
              {`${user.vendor_first_name} ${user.vendor_last_name}`}
            </h2>

            {/* Email */}
            <p className="text-lg text-gray-500 flex items-center">
              <MailOutlined className="mr-2 text-orange-500 text-lg" />
              {user.vendor_email}
            </p>

            {/* Phone */}
            <p className="text-sm text-gray-400 flex items-center">
              <PhoneOutlined className="mr-2 text-orange-500 text-lg" />
              {user.vendor_primary_phone_number}
            </p>
          </div>
        </div>

        <Divider />

        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="First Name">
                <Input
                  value={user.vendor_first_name}
                  onChange={(e) =>
                    handleFieldChange("vendor_first_name", e.target.value)
                  }
                  disabled={!isEditing}
                  className="rounded-md h-10 "
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Last Name">
                <Input
                  value={user.vendor_last_name}
                  onChange={(e) =>
                    handleFieldChange("vendor_last_name", e.target.value)
                  }
                  disabled={!isEditing}
                  className="rounded-md h-10 "
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Email">
                <Input
                  value={user?.vendor_email}
                  onChange={(e) =>
                    handleFieldChange("vendor_email", e.target.value)
                  }
                  disabled
                  className="rounded-md h-10 "
                />
              </Form.Item>
            </Col>
          </Row>
          {/* <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="New Password">
                <Input
                  value={user?.user_password}
                  onChange={(e) =>
                    handleFieldChange("user_password", e.target.value)
                  }
                  disabled={!isEditing}
                  className="rounded-md h-10 "
                />
              </Form.Item>
            </Col>
          </Row> */}

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Date of Birth">
                <input
                  type="date"
                  className={`w-full h-10 disabled:background-gray-300 disabled:text-gray-400 uppercase px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100 text-black focus:border-black`}
                  onChange={(date) => {
                    handleFieldChange("vendor_date_of_birth", date);
                  }}
                  value={
                    user?.vendor_date_of_birth
                      ? moment(user?.vendor_date_of_birth).format("YYYY-MM-DD")
                      : null
                  }
                  placeholder="Date of Birth"
                  disabled={!isEditing}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Gender">
                <Select
                  className={`rounded-lg  font-medium  border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
                  style={{
                    width: "100%",
                    height: 42,
                  }}
                  value={user?.vendor_gender}
                  disabled={!isEditing}
                  placeholder="Select gender"
                  optionFilterProp="label"
                  onChange={(value) => {
                    handleFieldChange("vendor_gender", value);
                  }}
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={[
                    {
                      value: "Male",
                      label: "Male",
                    },
                    {
                      value: "Female",
                      label: "Female",
                    },
                    {
                      value: "Other",
                      label: "Other",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Phone Number">
                <Input
                  value={user.vendor_primary_phone_number}
                  onChange={(e) =>
                    handleFieldChange(
                      "vendor_primary_phone_number",
                      e.target.value
                    )
                  }
                  disabled={!isEditing}
                  className="rounded-md h-10 "
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Address Line 1">
                <Input
                  value={user.vendor_address_line_one}
                  onChange={(e) =>
                    handleFieldChange("vendor_address_line_one", e.target.value)
                  }
                  disabled={!isEditing}
                  className="rounded-md h-10 "
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Address Line 2">
                <Input
                  value={user.vendor_address_line_two}
                  onChange={(e) =>
                    handleFieldChange("vendor_address_line_two", e.target.value)
                  }
                  disabled={!isEditing}
                  className="rounded-md h-10 "
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="City">
                <Input
                  value={user.vendor_city}
                  onChange={(e) =>
                    handleFieldChange("vendor_city", e.target.value)
                  }
                  disabled={!isEditing}
                  className="rounded-md h-10 "
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="State">
                <Input
                  value={user.vendor_state}
                  onChange={(e) =>
                    handleFieldChange("vendor_state", e.target.value)
                  }
                  disabled={!isEditing}
                  className="rounded-md h-10 "
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Country">
                <Input
                  value={user.vendor_country}
                  onChange={(e) =>
                    handleFieldChange("vendor_country", e.target.value)
                  }
                  disabled={!isEditing}
                  className="rounded-md h-10 "
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Zip Code">
                <Input
                  value={user.vendor_zipcode}
                  onChange={(e) =>
                    handleFieldChange("vendor_zipcode", e.target.value)
                  }
                  disabled={!isEditing}
                  className="rounded-md h-10 "
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <div className=" gap-4">
          {user?.vendor_identification_number_type_one && (
            <div className="relative ">
              <p>
                Type :{" "}
                <span className="text-orange-500">
                  {user?.vendor_identification_number_type_one}
                </span>{" "}
                - {user?.vendor_identification_number_one}
              </p>
              <img
                src={user?.vendor_identification_proof_image_url_one}
                alt="image1"
                className="w-40 object-cover"
              />
            </div>
          )}

          {/* Image 3 */}
          {user?.vendor_identification_number_type_two && (
            <div className="relative mt-10">
              <p>
                Type :{" "}
                <span className="text-orange-500">
                  {user?.vendor_identification_number_type_two}
                </span>{" "}
                - {user?.vendor_identification_number_two}
              </p>

              <img
                src={user?.vendor_identification_proof_image_url_two}
                alt="image3"
                className="w-40  object-cover"
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default VendorProfile;
