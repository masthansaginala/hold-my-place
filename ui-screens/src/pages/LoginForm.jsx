import { Button, Modal, Select } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi, recoveryPassword, recoveryPin } from "./api/api";
import { toast } from "react-toastify";
import { useAuth } from "./api/AuthContextRedux";
import LoginImg from "../assets/HomePage-S-3.png";

const LoginWithGoogleButton = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);

  const [formaData, setFormData] = useState({});
  const [pinFormData, setPinFormData] = useState({});
  const [passFormData, setPassFormData] = useState({});

  const showModal = (type) => {
    setOpen({ isOpen: true, type });
  };
  const handleOk = () => {
    handlePin();
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    setOpenPassword(false);
    setPassFormData({});
    setPinFormData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePin = (e) => {
    const { name, value } = e.target;
    setPinFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePass = (e) => {
    const { name, value } = e.target;
    setPassFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      let url = "/admin/login";
      if (formaData?.role === "USER") {
        url = "/users/login";
      } else if (formaData?.role === "ORGANIZER") {
        url = "/organizers/login";
      } else if (formaData?.role === "VENDOR") {
        url = "/vendors/login";
      }
      const userData = await loginApi(url, formaData);
      localStorage.setItem("authToken", userData.token);
      const updatedUser = { ...userData };
      const id = userData?.[`${formaData?.role?.toLowerCase()}_id`];
      console.log(
        "userData?.[`${formaData?.role?.toLowerCase()}_id`]->",
        id,
        userData,
        `${formaData?.role?.toLowerCase()}_id`
      );
      if (!userData?.user) {
        updatedUser.user = {
          user_id:
            userData?.[formaData?.role?.toLowerCase()]?.[
              `${formaData?.role?.toLowerCase()}_id`
            ],
          user_email:
            userData?.[formaData?.role?.toLowerCase()]?.[
              `${formaData?.role?.toLowerCase()}_email`
            ],
          user_role:
            userData?.[formaData?.role?.toLowerCase()]?.[
              `${formaData?.role?.toLowerCase()}_role`
            ],
        };
      }
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Login successfull");
      login();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const handlePin = async () => {
    try {
      let url = "";
      if (pinFormData?.role === "USER") {
        url = "/users/recover-pin";
      } else if (pinFormData?.role === "ORGANIZER") {
        url = "/organizers/recover-pin";
      } else if (pinFormData?.role === "VENDOR") {
        url = "/vendors/recover-pin";
      }
      const response = await recoveryPin(url, pinFormData);
      console.log(response);

      toast.success(response?.message || "Updated successfully");
      setPinFormData({});
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePass = async () => {
    try {
      let url = "";
      if (passFormData?.role === "USER") {
        url = "/users/recover-password";
      } else if (passFormData?.role === "ORGANIZER") {
        url = "/organizers/recover-password";
      } else if (passFormData?.role === "VENDOR") {
        url = "/vendors/recover-password";
      }
      const response = await recoveryPassword(url, passFormData);
      console.log(response);

      toast.success(response?.message || "Updated successfully");
      setPassFormData({});
      setOpenPassword(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
      <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
        <div
          className="hidden md:block lg:w-1/2 bg-cover bg-orange-700"
          style={{
            backgroundImage: `url(${LoginImg})`,
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <p className="text-xl text-gray-600 text-center">
            <span className="text-orange-600">Welcome</span> back!
          </p>
          <div className="mt-4 text-left">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-orange-500"
              type="email"
              required
              onChange={handleChange}
              value={formaData?.email || ""}
              name="email"
            />
          </div>
          <div className="mt-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
            </div>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-orange-500"
              type="password"
              onChange={handleChange}
              value={formaData?.password || ""}
              name="password"
            />
          </div>
          <div className="flex gap-4">
            <div className="mt-4 text-left w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Pin
              </label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-orange-500"
                type="otp"
                required
                onChange={handleChange}
                value={formaData?.pin || ""}
                name="pin"
              />
            </div>
            <div className="mt-4 text-left w-full">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Role
              </label>
              <Select
                className={`rounded-lg  font-medium border-gray-300  border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
                style={{
                  width: "100%",
                  height: 40,
                }}
                placeholder="Select role"
                optionFilterProp="label"
                onChange={(value) => {
                  console.log("value->", value);
                  setFormData((prev) => ({ ...prev, role: value }));
                }}
                options={[
                  {
                    value: "USER",
                    label: "User",
                  },
                  {
                    value: "ORGANIZER",
                    label: "Organizer",
                  },
                  {
                    value: "VENDOR",
                    label: "Vendor",
                  },
                  {
                    value: "ADMIN",
                    label: "Admin",
                  },
                ]}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <span
              onClick={() => {
                showModal("Pin");
              }}
              className="text-xs text-gray-500 hover:text-gray-900 text-left w-full mt-2"
            >
              Forget Pin?
            </span>
            <span
              onClick={() => {
                setOpenPassword({ isOpen: true, type: "Password" });
              }}
              className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
            >
              Forget Password?
            </span>
          </div>

          <div className="mt-8">
            <button
              className="bg-orange-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-orange-600"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>

          <div className="mt-4 flex items-center w-full text-center">
            <Link
              to="/signup"
              className="text-xs text-gray-500 capitalize text-center w-full"
            >
              Don&apos;t have any account yet?
              <span className="text-blue-700"> Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
      {openPassword?.isOpen && openPassword?.type === "Password" && (
        <>
          <Modal
            title="Forgot Password"
            open={openPassword?.isOpen}
            onOk={handlePass}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>,

              <button
                key="submit"
                onClick={handlePass}
                className="bg-orange-400 hover:bg-orange-600 text-white px-5 ml-2 py-1 rounded"
              >
                Send
              </button>,
            ]}
          >
            <div className="w-full p-8 ">
              <div className="mt-4 text-left">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-orange-500"
                  type="email"
                  required
                  onChange={handleChangePass}
                  value={passFormData?.email || ""}
                  name="email"
                />
              </div>
              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    New Password
                  </label>
                </div>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-orange-500"
                  type="password"
                  onChange={handleChangePass}
                  value={passFormData?.new_password || ""}
                  name="new_password"
                />
              </div>
              <div className="flex gap-4">
                <div className="mt-4 text-left w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Pin
                  </label>
                  <input
                    className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-orange-500"
                    type="otp"
                    required
                    onChange={handleChangePass}
                    value={passFormData?.pin || ""}
                    name="pin"
                  />
                </div>
                <div className="mt-4 text-left w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Role
                  </label>
                  <Select
                    className={`rounded-lg  font-medium border-gray-300  border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
                    style={{
                      width: "100%",
                      height: 45,
                    }}
                    placeholder="Select role"
                    optionFilterProp="label"
                    onChange={(value) => {
                      console.log("value->", value);
                      setPassFormData((prev) => ({ ...prev, role: value }));
                    }}
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={[
                      {
                        value: "USER",
                        label: "User",
                      },
                      {
                        value: "ORGANIZER",
                        label: "Organizer",
                      },
                      {
                        value: "VENDOR",
                        label: "Vendor",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </Modal>
        </>
      )}

      {open?.isOpen && open?.type === "Pin" && (
        <>
          <Modal
            title="Forgot Pin"
            open={open?.isOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>,

              <button
                key="submit"
                onClick={handleOk}
                className="bg-orange-400 hover:bg-orange-600 text-white px-5 ml-2 py-1 rounded"
              >
                Send
              </button>,
            ]}
          >
            <div className="w-full p-8 ">
              <div className="mt-4 text-left">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-orange-500"
                  type="email"
                  required
                  onChange={handleChangePin}
                  value={pinFormData?.email || ""}
                  name="email"
                />
              </div>
              <div className="mt-4 flex flex-col justify-between">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                </div>
                <input
                  className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-orange-500"
                  type="password"
                  onChange={handleChangePin}
                  value={pinFormData?.password || ""}
                  name="password"
                />
              </div>
              <div className="flex gap-4">
                <div className="mt-4 text-left w-full">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Role
                  </label>
                  <Select
                    className={`rounded-lg  font-medium border-gray-300  border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
                    style={{
                      width: "100%",
                      height: 45,
                    }}
                    placeholder="Select role"
                    optionFilterProp="label"
                    onChange={(value) => {
                      console.log("value->", value);
                      setPinFormData((prev) => ({ ...prev, role: value }));
                    }}
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={[
                      {
                        value: "USER",
                        label: "User",
                      },
                      {
                        value: "ORGANIZER",
                        label: "Organizer",
                      },
                      {
                        value: "VENDOR",
                        label: "Vendor",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};
export default LoginWithGoogleButton;
