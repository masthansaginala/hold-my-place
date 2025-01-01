import { DatePicker, Select } from "antd";
import { uploadImage } from "../api/api";
import { eventCategories } from "../../utilities/Constant";
import { useState } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";

const { Option } = Select;
// eslint-disable-next-line react/prop-types
const EventSingleday = ({ setFormData, handleChange, formData, type }) => {
  const [filteredTypes, setFilteredTypes] = useState([]);
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

  console.log("formData->", formData);

  return (
    <>
      {" "}
      <input
        className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
        type="text"
        placeholder="Event name"
        value={formData?.event_name || ""}
        onChange={handleChange}
        name="event_name"
        disabled={type === "edit"}
      />
      <textarea
        className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
        type="text-area"
        placeholder="Description"
        value={formData?.event_description || ""}
        onChange={handleChange}
        name="event_description"
      />
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="text"
          placeholder="Total Seats"
          value={formData?.event_total_seats || ""}
          onChange={handleChange}
          name="event_total_seats"
        />
        <input
          className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="tel"
          placeholder="Seats Left"
          value={formData?.event_seats_left || ""}
          onChange={handleChange}
          name="event_seats_left"
        />

        <DatePicker
          className={`w-full uppercase px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          onChange={(date) => {
            setFormData((prev) => ({ ...prev, event_date: date }));
          }}
          placeholder="Event Date"
          value={formData?.event_date || ""}
          format="DD-MM-YYYY"
        />
        <input
          className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="text"
          placeholder="Event Time"
          value={formData?.event_time || ""}
          onChange={handleChange}
          name="event_time"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Select
          className="w-full h-11"
          placeholder="Select a category"
          onChange={(value) => {
            setFormData((prev) => ({
              ...prev,
              event_category: value,
              event_type: null,
            }));
            const selected = eventCategories.find(
              (cat) => cat.category === value
            );
            console.log("selected->", selected);
            setFilteredTypes(selected ? selected?.types : []);
          }}
          value={formData?.event_category || undefined}
          disabled={type === "edit"}
        >
          {eventCategories.map((cat) => (
            <Option key={cat.category} value={cat.category}>
              {cat.category}
            </Option>
          ))}
        </Select>

        <Select
          className="w-full h-11"
          placeholder="Select a type"
          value={formData?.event_type || undefined}
          onChange={(value) => {
            setFormData((prev) => ({ ...prev, event_type: value }));
          }}
          disabled={type === "edit"}
        >
          {filteredTypes.map((cat) => (
            <Option key={cat} value={cat}>
              {cat}
            </Option>
          ))}
        </Select>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Select
          className="w-full mt-1 h-12"
          value={formData?.event_food}
          onChange={(value) => {
            setFormData((prev) => ({ ...prev, event_food: value }));
          }}
          placeholder="Select Food Option"
        >
          {["Included", "Not Included"].map((cat) => (
            <Option key={cat} value={cat}>
              {cat}
            </Option>
          ))}
        </Select>
        <Select
          className="w-full mt-1 h-12"
          value={formData?.event_transportation}
          onChange={(value) => {
            setFormData((prev) => ({ ...prev, event_transportation: value }));
          }}
          placeholder="Select Transportation Option"
        >
          {["Included", "Not Included"].map((cat) => (
            <Option key={cat} value={cat}>
              {cat}
            </Option>
          ))}
        </Select>
        <Select
          className="w-full mt-1 h-12"
          value={formData?.event_accommodation}
          onChange={(value) => {
            setFormData((prev) => ({ ...prev, event_accommodation: value }));
          }}
          placeholder="Select Accommodation"
        >
          {["Available", "Not Available"].map((cat) => (
            <Option key={cat} value={cat}>
              {cat}
            </Option>
          ))}
        </Select>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="text"
          placeholder="Ticket Price"
          value={formData?.event_ticket_price || ""}
          onChange={handleChange}
          name="event_ticket_price"
        />
        <input
          className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="text"
          placeholder="Event Delivery Language"
          value={formData?.event_delivery_language || ""}
          onChange={handleChange}
          name="event_delivery_language"
        />
        <input
          className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="text"
          placeholder="Event Age Limit"
          value={formData?.event_age_limit || ""}
          onChange={handleChange}
          name="event_age_limit"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="text"
          placeholder="Event Guests"
          value={formData?.event_guests || ""}
          onChange={handleChange}
          name="event_guests"
        />
        <input
          className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="text"
          placeholder="Event Discount"
          value={formData?.event_discount || ""}
          onChange={handleChange}
          name="event_discount"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="text"
          placeholder="Ticket Filling Status"
          value={formData?.event_ticket_filling_status || ""}
          onChange={handleChange}
          name="event_ticket_filling_status"
        />
        <input
          className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="text"
          placeholder="Early Bird Offer"
          value={formData?.event_early_bird_offer || ""}
          onChange={handleChange}
          name="event_early_bird_offer"
        />
      </div>
      <p className="font-semibold text-left">Address</p>
      <input
        className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
        placeholder="Address line one"
        type="text"
        value={formData?.event_address_line_one || ""}
        onChange={handleChange}
        name="event_address_line_one"
      />
      <input
        className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
        placeholder="Address line two"
        type="text"
        value={formData?.event_address_line_two || ""}
        onChange={handleChange}
        name="event_address_line_two"
      />
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="text"
          placeholder="City"
          value={formData?.event_city || ""}
          onChange={handleChange}
          name="event_city"
        />
        <input
          className={`w-full  px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="text"
          placeholder="State"
          value={formData?.event_state || ""}
          onChange={handleChange}
          name="event_state"
        />
        <input
          className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
          type="text"
          placeholder="Country"
          value={formData?.event_country || ""}
          onChange={handleChange}
          name="event_country"
        />
      </div>
      <input
        className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
        type="text"
        placeholder="Zipcode"
        value={formData?.event_zipcode || ""}
        onChange={handleChange}
        name="event_zipcode"
      />
      <p className="font-semibold text-left">Event Images</p>
      {type === "edit" && (
        <div className="flex gap-4">
          {formData?.event_image_url_one && (
            <div className="relative w-40">
              <img
                src={formData?.event_image_url_one}
                alt="image1"
                className="w-full h-full object-cover"
              />
              <CloseCircleOutlined
                className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-red-500 text-xl cursor-pointer"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    event_image_url_one: null,
                  }))
                }
              />
            </div>
          )}

          {/* Image 2 */}
          {formData?.event_image_url_two && (
            <div className="relative w-40">
              <img
                src={formData?.event_image_url_two}
                alt="image2"
                className="w-full h-full object-cover"
              />
              <CloseCircleOutlined
                className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-red-500 text-xl cursor-pointer"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    event_image_url_two: null,
                  }))
                }
              />
            </div>
          )}

          {/* Image 3 */}
          {formData?.event_image_url_three && (
            <div className="relative w-40">
              <img
                src={formData?.event_image_url_three}
                alt="image3"
                className="w-full h-full object-cover"
              />
              <CloseCircleOutlined
                className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-red-500 text-xl cursor-pointer"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    event_image_url_three: null,
                  }))
                }
              />
            </div>
          )}
        </div>
      )}
      <input
        className={`w-full px-5 py-3 rounded-lg font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
        type="file"
        accept="image/*"
        onChange={(e) => {
          sendImage(e.target.files[0], "event_image_url_one");
        }}
      />
      <input
        className={`w-full  px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
        type="file"
        accept="image/*"
        onChange={(e) => {
          sendImage(e.target.files[0], "event_image_url_two");
        }}
      />
      <input
        className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${"bg-gray-100 text-black focus:border-black"}`}
        type="file"
        accept="image/*"
        onChange={(e) => {
          sendImage(e.target.files[0], "event_image_url_three");
        }}
      />
    </>
  );
};

export default EventSingleday;
