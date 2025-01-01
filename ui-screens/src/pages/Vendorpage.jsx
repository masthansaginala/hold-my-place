import { useNavigate } from "react-router-dom";
import Vendor1 from "../assets/VendorPage-S-1.png";
import Vendor3 from "../assets/VendorPage-S-3.png";
import Profile1 from "../assets/profile1.jpg";
import Profile2 from "../assets/profile2.jpg";
import {
  AppleOutlined,
  HighlightOutlined,
  SoundOutlined,
  BulbOutlined,
} from "@ant-design/icons";

const VendorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 py-12 px-6">
      {/* Section 1: Introduction */}
      <section className="bg-gray-100 py-10 px-5 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <img
            src={Vendor1}
            alt="Benefits of Blood Donation"
            className="md:w-1/2 w-full rounded-lg shadow-lg mb-6 md:mb-0 md:mr-8"
          />
          <div className="md:w-1/2 w-full text-left">
            <h2 className="text-4xl font-semibold text-orange-600">
              Showcase Your Services on HoldMyPlace
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Connect with organizers and become part of unforgettable events.
              Promote your services and grow your business.
            </p>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="mt-6 px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-500"
            >
              Join as a Vendor
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Vendor Benefits */}
      <section className="py-16 bg-orange-100">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            What You Get as a Vendor
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Feature your services to a broad audience, get hired for events
            quickly, and track your engagements to build lasting partnerships.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          {/* Catering */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-orange-200 flex items-center justify-center rounded-full">
              <AppleOutlined className="text-orange-600 text-3xl" />
            </div>
            <p className="mt-2 text-center text-lg text-gray-800">Catering</p>
          </div>
          {/* Decoration */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-200 flex items-center justify-center rounded-full">
              <HighlightOutlined className="text-green-600 text-3xl" />
            </div>
            <p className="mt-2 text-center text-lg text-gray-800">Decoration</p>
          </div>
          {/* Sound */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-200 flex items-center justify-center rounded-full">
              <SoundOutlined className="text-blue-600 text-3xl" />
            </div>
            <p className="mt-2 text-center text-lg text-gray-800">Sound</p>
          </div>
          {/* Lighting */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-yellow-200 flex items-center justify-center rounded-full">
              <BulbOutlined className="text-yellow-600 text-3xl" />
            </div>
            <p className="mt-2 text-center text-lg text-gray-800">Lighting</p>
          </div>
        </div>
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="mt-6 px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-500"
        >
          Learn More
        </button>
      </section>

      {/* Section 3: Testimonials */}
      <section className="py-16">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Vendors Love HoldMyPlace
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from vendors who’ve benefited from partnering with HoldMyPlace.
            Our platform helps you succeed in the event industry!
          </p>
        </div>
        <div className="flex justify-center space-x-12 mt-8">
          <div className="w-80 p-6 bg-white shadow-lg rounded-lg">
            <img
              src={Profile1}
              alt="Vendor testimonial"
              className="w-full h-48 object-cover rounded-lg"
            />
            <p className="mt-4 text-gray-600">
              &quot;HoldMyPlace has helped me connect with more clients and
              expand my business. The process is so seamless!&quot;
            </p>
            <p className="mt-2 text-gray-800 font-semibold">
              John Doe, Catering Service
            </p>
          </div>
          <div className="w-80 p-6 bg-white shadow-lg rounded-lg">
            <img
              src={Profile2}
              alt="Vendor testimonial"
              className="w-full h-48 object-cover rounded-lg"
            />
            <p className="mt-4 text-gray-600">
              &quot;A great platform to showcase my services to a broad
              audience. I&apos;m booked for multiple events now!&quot;
            </p>
            <p className="mt-2 text-gray-800 font-semibold">
              Jane Smith, Event Planner
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="mt-6 px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-500"
        >
          Join Today
        </button>
      </section>

      {/* Section 4: Call-to-Action */}
      <section className="py-16 bg-orange-100 text-center">
        <h2 className="text-4xl font-semibold text-gray-800">
          Let’s Grow Your Business Together
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Sign up and start showcasing your services to event organizers today.
          Expand your reach and grow your business!
        </p>
        <img
          src={Vendor3}
          alt="Vendor catalog"
          className="w-full max-w-3xl mx-auto mt-8"
        />
        <button
          onClick={() => {
            navigate("/signup");
          }}
          className="mt-6 px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-500"
        >
          Register Now
        </button>
      </section>
    </div>
  );
};

export default VendorPage;
