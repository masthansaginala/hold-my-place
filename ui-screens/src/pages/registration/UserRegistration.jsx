import { DatePicker, Select } from "antd";

// eslint-disable-next-line react/prop-types
const UserRegistration = ({ setFormData, handleChange, formData }) => {
  return (
    <>
      {" "}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="text"
          placeholder="First name"
          value={formData?.user_first_name || ""}
          onChange={handleChange}
          name="user_first_name"
        />
        <input
          className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="text"
          placeholder="Last name"
          value={formData?.user_last_name || ""}
          onChange={handleChange}
          name="user_last_name"
        />
      </div>
      <input
        className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
        type="email"
        placeholder="Email"
        value={formData?.user_email || ""}
        onChange={handleChange}
        name="user_email"
      />
      <div className="flex flex-col sm:flex-row gap-3">
        <Select
          className={`rounded-lg  font-medium  border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          style={{
            width: "100%",
            height: 50,
          }}
          placeholder="Select gender"
          optionFilterProp="label"
          onChange={(value) => {
            console.log("value->", value);
            setFormData((prev) => ({ ...prev, user_gender: value }));
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

        <DatePicker
          className={`w-full uppercase px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          onChange={(date) => {
            setFormData((prev) => ({ ...prev, user_date_of_birth: date }));
          }}
          value={formData?.user_date_of_birth || ""}
          placeholder="Date of Birth"
        />
        <input
          className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="tel"
          placeholder="Phone number"
          value={formData?.user_phone_number || ""}
          onChange={handleChange}
          name="user_phone_number"
        />
      </div>
      <input
        className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
        type="password"
        placeholder="Password"
        value={formData?.user_password || ""}
        onChange={handleChange}
        name="user_password"
      />
      <p className="font-semibold text-left">Address</p>
      <input
        className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
        placeholder="Address line one"
        type="text"
        value={formData?.user_address_line_one || ""}
        onChange={handleChange}
        name="user_address_line_one"
      />
      <input
        className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
        placeholder="Address line two"
        type="text"
        value={formData?.user_address_line_two || ""}
        onChange={handleChange}
        name="user_address_line_two"
      />
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="text"
          placeholder="City"
          value={formData?.user_city || ""}
          onChange={handleChange}
          name="user_city"
        />
        <input
          className={`w-full  px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="text"
          placeholder="State"
          value={formData?.user_state || ""}
          onChange={handleChange}
          name="user_state"
        />
        <input
          className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="text"
          placeholder="Country"
          value={formData?.user_country || ""}
          onChange={handleChange}
          name="user_country"
        />
      </div>
      <input
        className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
        type="text"
        placeholder="Zipcode"
        value={formData?.user_zipcode || ""}
        onChange={handleChange}
        name="user_zipcode"
      />
    </>
  );
};

export default UserRegistration;
