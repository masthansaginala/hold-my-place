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
import { getUsers, updateProfile } from "../api/api";
import { useAuth } from "../api/AuthContextRedux";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { profileData } = useAuth();

  const [user, setUser] = useState({
    user_id: 3,
    user_first_name: "John",
    user_last_name: "Doe",
    user_date_of_birth: "1990-05-15T00:00:00.000Z",
    user_gender: "Male",
    user_email: "monkollasandeep000999@gmail.com",
    user_phone_number: "+1234567890",
    user_address_line_one: "123 Main Street",
    user_address_line_two: "Apt 4B",
    user_city: "New York",
    user_state: "New York",
    user_country: "USA",
    user_zipcode: "10001",
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleGetUser = async () => {
    try {
      const response = await getUsers({ user_id: profileData?.user?.user_id });
      setUser(response?.users?.[0]);
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
        user_first_name: user?.user_first_name,
        user_last_name: user?.user_last_name,
        user_date_of_birth: user?.user_date_of_birth,
        user_gender: user?.user_gender,
        user_phone_number: user?.user_phone_number,
        user_address_line_one: user?.user_address_line_one,
        user_address_line_two: user?.user_address_line_two,
        user_city: user?.user_city,
        user_state: user?.user_state,
        user_country: user?.user_country,
        user_zipcode: user?.user_zipcode,
        // user_password: user,
      };
      await updateProfile(
        `/users/update-profile/${profileData?.user?.user_id}`,
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
              {`${user.user_first_name} ${user.user_last_name}`}
            </h2>

            {/* Email */}
            <p className="text-lg text-gray-500 flex items-center">
              <MailOutlined className="mr-2 text-orange-500 text-lg" />
              {user.user_email}
            </p>

            {/* Phone */}
            <p className="text-sm text-gray-400 flex items-center">
              <PhoneOutlined className="mr-2 text-orange-500 text-lg" />
              {user.user_phone_number}
            </p>
          </div>
        </div>

        <Divider />

        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="First Name">
                <Input
                  value={user.user_first_name}
                  onChange={(e) =>
                    handleFieldChange("user_first_name", e.target.value)
                  }
                  disabled={!isEditing}
                  className="rounded-md h-10 "
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Last Name">
                <Input
                  value={user.user_last_name}
                  onChange={(e) =>
                    handleFieldChange("user_last_name", e.target.value)
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
                  value={user.user_email}
                  onChange={(e) =>
                    handleFieldChange("user_email", e.target.value)
                  }
                  disabled
                  className="rounded-md h-10 "
                />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Date of Birth">
                <input
                  type="date"
                  className={`w-full h-10 disabled:background-gray-300 disabled:text-gray-400 uppercase px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100 text-black focus:border-black`}
                  onChange={(date) => {
                    handleFieldChange("user_date_of_birth", date);
                  }}
                  value={
                    user?.user_date_of_birth
                      ? moment(user?.user_date_of_birth).format("YYYY-MM-DD")
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
                  value={user?.user_gender}
                  disabled={!isEditing}
                  placeholder="Select gender"
                  optionFilterProp="label"
                  onChange={(value) => {
                    handleFieldChange("user_gender", value);
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
                  value={user.user_phone_number}
                  onChange={(e) =>
                    handleFieldChange("user_phone_number", e.target.value)
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
                  value={user.user_address_line_one}
                  onChange={(e) =>
                    handleFieldChange("user_address_line_one", e.target.value)
                  }
                  disabled={!isEditing}
                  className="rounded-md h-10 "
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Address Line 2">
                <Input
                  value={user.user_address_line_two}
                  onChange={(e) =>
                    handleFieldChange("user_address_line_two", e.target.value)
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
                  value={user.user_city}
                  onChange={(e) =>
                    handleFieldChange("user_city", e.target.value)
                  }
                  disabled={!isEditing}
                  className="rounded-md h-10 "
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="State">
                <Input
                  value={user.user_state}
                  onChange={(e) =>
                    handleFieldChange("user_state", e.target.value)
                  }
                  disabled={!isEditing}
                  className="rounded-md h-10 "
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Country">
                <Input
                  value={user.user_country}
                  onChange={(e) =>
                    handleFieldChange("user_country", e.target.value)
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
                  value={user.user_zipcode}
                  onChange={(e) =>
                    handleFieldChange("user_zipcode", e.target.value)
                  }
                  disabled={!isEditing}
                  className="rounded-md h-10 "
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default UserProfile;
