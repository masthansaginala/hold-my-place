import { useState } from "react";
import { createContact } from "./api/api";
import { toast } from "react-toastify";

const ContactPage = () => {
  const [formData, setFormData] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await createContact(formData);
      console.log("response", response);
      setFormData({});

      toast.success(response?.message);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <section className="bg-white py-10 px-5 md:px-20 text-left">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Contact Us
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Have any questions? Feel free to reach out, and we’ll get back to
            you as soon as possible!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Details */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Get in Touch
              </h3>
              <p className="text-gray-600 mb-4">
                Have a question or need assistance? Contact us using the details
                below:
              </p>
              <ul className="text-gray-600 space-y-3">
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:support@bloodguard.com"
                    className="text-orange-500 hover:underline"
                  >
                    holdmyplaceinfo@gmail.com
                  </a>
                </li>
                <li>
                  <strong>Phone:</strong>{" "}
                  <a
                    href="tel:+18001234567"
                    className="text-orange-500 hover:underline"
                  >
                    +123 1233 1235
                  </a>
                </li>
                <li>
                  <strong>Address:</strong>
                  <p className="ml-4">
                    123 Lifeline Street, Event City, HC 12345
                  </p>
                </li>
              </ul>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Send Us a Message
              </h3>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="Your Name"
                    onChange={handleChange}
                    value={formData?.contact_name || ""}
                    name="contact_name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="Your Email"
                    onChange={handleChange}
                    value={formData?.contact_email || ""}
                    name="contact_email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="name"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="Your Name"
                    onChange={handleChange}
                    value={formData?.contact_phone_number || ""}
                    name="contact_phone_number"
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="Your Name"
                    onChange={handleChange}
                    value={formData?.contact_subject || ""}
                    name="contact_subject"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-medium"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                    placeholder="Your Message"
                    onChange={handleChange}
                    name="contact_message"
                    value={formData?.contact_message || ""}
                  ></textarea>
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={
                    !formData?.contact_email ||
                    !formData?.contact_message ||
                    !formData?.contact_name ||
                    !formData?.contact_phone_number ||
                    !formData?.contact_subject
                  }
                  className="w-full py-2 px-4 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white font-semibold rounded-md hover:bg-red-600 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
