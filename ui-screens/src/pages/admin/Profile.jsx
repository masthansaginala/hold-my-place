import { useEffect, useState } from "react";
import {
  Card,
  Input,
  Button,
  DatePicker,
  Form,
  Avatar,
  Divider,
  Row,
  Col,
} from "antd";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import moment from "moment";
import { toast } from "react-toastify";
import { getUsers, updateProfile } from "../api/api";
import { useAuth } from "../api/AuthContextRedux";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { profileData } = useAuth();

  const [user, setUser] = useState({
    user_id: 3,
    user_first_name: "John",
    user_last_name: "Doe",
    user_date_of_birth: "1990-05-15T00:00:00.000Z",
    user_gender: "Male",
    user_email: "holdmyplaceinfo@gmail.com",
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
      const response = await getUsers({ user_id: profileData?.user_id });
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
      await updateProfile();
      toast.success("Your profile details have been successfully updated.");
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
              disabled
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
          <di className="text-left">
            <h2 className="text-3xl font-semibold text-gray-800">{`${user.user_first_name} ${user.user_last_name}`}</h2>
            <p className="text-lg text-gray-500">{user.user_email}</p>
            <p className="text-sm text-gray-400">{user.user_phone_number}</p>
          </di>
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
                  disabled
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
                  disabled
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
                  disabled={!isEditing}
                  className="rounded-md h-10 "
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Date of Birth">
                <DatePicker
                  value={moment(user.user_date_of_birth)}
                  onChange={(date) =>
                    handleFieldChange(
                      "user_date_of_birth",
                      date ? date.toISOString() : null
                    )
                  }
                  disabled={!isEditing}
                  format="YYYY-MM-DD"
                  className="w-full h-10"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Gender">
                <Input
                  value={user.user_gender}
                  onChange={(e) =>
                    handleFieldChange("user_gender", e.target.value)
                  }
                  disabled={!isEditing}
                  className="rounded-md h-10 "
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

export default ProfilePage;
