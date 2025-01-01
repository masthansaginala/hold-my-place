import { useEffect, useState } from "react";
import UserRegistration from "./registration/UserRegistration";
import OrganizerRegistration from "./registration/OrganizerRegistration";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./api/api";
import { toast } from "react-toastify";
import VendorRegistration from "./registration/VendorRegidtration";

const FormRegistration = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (role) {
      setFormData({});
    }
  }, [role]);

  const handleSubmit = async () => {
    try {
      const payload = { ...formData };
      let url = "/users/register";
      if (role === "Vendor") {
        url = "/vendors/register";
        payload.vendor_role = "VENDOR";
        payload.vendor_status = "NEW";
      } else if (role === "Organizer") {
        url = "/organizers/register";
        payload.organizer_role = "ORGANIZER";
        payload.organizer_status = "NEW";
      } else {
        payload.user_role = "USER";
        payload.user_status = "ACTIVE";
      }
      const response = await registerUser(url, payload);
      toast.success(response?.message);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  console.log("formData->", formData);

  return (
    <div className="flex flex-col justify-center items-center w-full h-[100%]  px-5 mt-10">
      <div
        className={`xl:max-w-3xl ${"bg-white"} shadow-lg border  w-full p-5 sm:p-10 rounded-md`}
      >
        <h1
          className={`text-center text-xl sm:text-3xl font-semibold ${"text-black"}`}
        >
          Create an <span className="text-orange-500">account</span>
        </h1>
        <div className="w-full mt-8">
          <div className="w-full flex flex-col gap-4">
            <div className="mb-4 text-left w-full">
              <label className="block text-sm font-medium mb-2">
                Please select a role first for the registration
              </label>
              <select
                value={role || ""}
                onChange={(e) => setRole(e.target.value)}
                className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
              >
                <option value="" disabled>
                  -- Select Role --
                </option>
                <option value="User">User</option>
                <option value="Organizer">Organizer</option>
                <option value="Vendor">Vendor</option>
              </select>
            </div>

            {role === "User" && (
              <>
                <p className="text-left font-semibold">User Details</p>
                <UserRegistration
                  setFormData={setFormData}
                  formData={formData}
                  handleChange={handleChange}
                />
              </>
            )}
            {["Organizer"].includes(role) && (
              <>
                <p className="text-left font-semibold">{role} Details</p>
                <OrganizerRegistration
                  setFormData={setFormData}
                  formData={formData}
                  handleChange={handleChange}
                />
              </>
            )}
            {["Vendor"].includes(role) && (
              <>
                <p className="text-left font-semibold">{role} Details</p>
                <VendorRegistration
                  setFormData={setFormData}
                  formData={formData}
                  handleChange={handleChange}
                />
              </>
            )}
            <button
              onClick={handleSubmit}
              className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              <svg
                className="w-6 h-6 -ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <path d="M20 8v6M23 11h-6" />
              </svg>
              <span className="ml-3">Register</span>
            </button>
            <p className="mt-6 text-xs text-gray-600 text-center">
              Already have an account?{" "}
              <a href="">
                <span className="text-[#E9522C] font-semibold">Login</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormRegistration;
