import { DatePicker, Select } from "antd";
import { uploadImage } from "../api/api";

const OrganizerRegistration = ({ formData, setFormData, handleChange }) => {
  const options = [
    "Passport",
    "National ID Card (e.g., SSN, National Insurance Number, Aadhar Card)",
    "Driving License",
    "Voter ID Card (specific to democratic countries like India)",
    "Tax Identification Number (TIN) (e.g., PAN in India, ITIN in the USA, UTR in the UK)",
    "Residency Permit",
    "Work Permit",
    "Utility Bill (for address proof, such as electricity, gas, or water bill)",
    "Bank Statement (as proof of identity and address)",
    "Birth Certificate (if required for specific registrations)",
  ];

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
    <>
      {" "}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="text"
          placeholder="First name"
          name="organizer_first_name"
          value={formData?.organizer_first_name || ""}
          onChange={handleChange}
        />
        <input
          className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="text"
          placeholder="Last name"
          name="organizer_last_name"
          value={formData?.organizer_last_name || ""}
          onChange={handleChange}
        />
      </div>
      <input
        className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
        type="email"
        placeholder="Email"
        name="organizer_email"
        value={formData?.organizer_email || ""}
        onChange={handleChange}
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

            setFormData((prev) => ({ ...prev, organizer_gender: value }));
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
            setFormData((prev) => ({ ...prev, organizer_date_of_birth: date }));
          }}
          value={formData?.organizer_date_of_birth || ""}
          placeholder="Date of Birth"
        />
        <input
          className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="tel"
          placeholder="Phone number"
          name="organizer_primary_phone_number"
          value={formData?.organizer_primary_phone_number || ""}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="tel"
          placeholder="Secondary Phone number"
          name="organizer_secondary_phone_number"
          value={formData?.organizer_secondary_phone_number || ""}
          onChange={handleChange}
        />
        <input
          className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="password"
          placeholder="Password"
          name="organizer_password"
          value={formData?.organizer_password || ""}
          onChange={handleChange}
        />
      </div>
      <p className="font-semibold text-left">Address</p>
      <input
        className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
        placeholder="Address line one"
        type="text"
        name="organizer_address_line_one"
        value={formData?.organizer_address_line_one || ""}
        onChange={handleChange}
      />
      <input
        className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
        placeholder="Address line two"
        type="text"
        name="organizer_address_line_two"
        value={formData?.organizer_address_line_two || ""}
        onChange={handleChange}
      />
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="text"
          placeholder="City"
          value={formData?.organizer_city || ""}
          onChange={handleChange}
          name="organizer_city"
        />
        <input
          className={`w-full  px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="text"
          placeholder="State"
          name="organizer_state"
          value={formData?.organizer_state || ""}
          onChange={handleChange}
        />
        <input
          className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="text"
          placeholder="Country"
          value={formData?.organizer_country || ""}
          onChange={handleChange}
          name="organizer_country"
        />
      </div>
      <input
        className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
        type="text"
        placeholder="Zipcode"
        name="organizer_zipcode"
        value={formData?.organizer_zipcode || ""}
        onChange={handleChange}
      />
      <p className="font-semibold text-left">Identification Proof one</p>
      <div className="mb-4 text-left w-full">
        <Select
          className={`rounded-lg  font-medium  border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          style={{
            width: "100%",
            height: 50,
          }}
          placeholder="-- Select an Identification Proof --"
          optionFilterProp="label"
          onChange={(value) => {
            console.log("value->", value);

            setFormData((prev) => ({
              ...prev,
              organizer_identification_number_type_one: value,
            }));
          }}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={options.map((option) => ({
            value: option,
            label: option,
          }))}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="text"
          placeholder="Identification Number"
          name="organizer_identification_number_one"
          value={formData?.organizer_identification_number_one || ""}
          onChange={handleChange}
        />
        <input
          className={`w-full  px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="file"
          accept="image/*"
          onChange={(e) => {
            sendImage(
              e.target.files[0],
              "organizer_identification_proof_image_url_one"
            );
          }}
        />
      </div>
      <p className="font-semibold text-left">Identification Proof Two</p>
      <div className="mb-4 text-left w-full">
        <Select
          className={`rounded-lg  font-medium  border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          style={{
            width: "100%",
            height: 50,
          }}
          placeholder="-- Select an Identification Proof --"
          optionFilterProp="label"
          onChange={(value) => {
            console.log("value->", value);

            setFormData((prev) => ({
              ...prev,
              organizer_identification_number_type_two: value,
            }));
          }}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={options.map((option) => ({
            value: option,
            label: option,
          }))}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="text"
          placeholder="Identification Number"
          name="organizer_identification_number_two"
          value={formData?.organizer_identification_number_two || ""}
          onChange={handleChange}
        />
        <input
          className={`w-full  px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="file"
          accept="image/*"
          onChange={(e) => {
            sendImage(
              e.target.files[0],
              "organizer_identification_proof_image_url_two"
            );
          }}
        />
      </div>
    </>
  );
};

export default OrganizerRegistration;
