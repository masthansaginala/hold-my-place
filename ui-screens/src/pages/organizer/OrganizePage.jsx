import { Link } from "react-router-dom";
import Org1 from "../../assets/OrganizerPage-S-1.png";
import Org2 from "../../assets/OrganizerPage-S-2.png";
import Org3 from "../../assets/OrganizerPage-S-3.png";

const OrganizerPage = () => {
  return (
    <div className="bg-gray-100 text-gray-900">
      {/* Section 1: Introduction */}
      <section className="bg-[#fdf7f3] py-10 px-5 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <img
            src={Org1}
            alt="Benefits of Blood Donation"
            className="w-full md:w-1/2  rounded-lg shadow-lg mb-6 md:mb-0 md:mr-8"
          />
          <div className="md:w-1/2 w-full text-left">
            <h2 className="text-4xl font-bold mb-4">
              Empower Your Events with HoldMyPlace
            </h2>
            <p className="text-lg mb-6 text-left">
              Plan, manage, and execute your events with tools designed for
              success. Collaborate seamlessly with vendors and track event
              performance.
            </p>
            <Link
              to="/login"
              className="inline-block  bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition duration-300"
            >
              Start Organizing
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white py-10 px-5 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 w-full md:mr-8">
            <h2 className="text-3xl font-bold text-left text-orange-600 mb-6">
              Tools for Organizers
            </h2>
            <div className="max-w-4xl mx-auto text-left">
              <p className="mb-4">Coordinate with vendors effortlessly.</p>
              <p className="mb-4">
                Manage ticket sales and attendee check-ins.
              </p>
              <p className="mb-4">
                Generate reports and upload certificates with ease.
              </p>
              <Link
                to="/login"
                className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition duration-300"
              >
                View Features
              </Link>
            </div>
          </div>
          <img
            src={Org2}
            alt="Quit Bad Habits"
            className="md:w-1/2 w-full rounded-lg shadow-lg mt-6 md:mt-0"
          />
        </div>
      </section>

      <section className="bg-gray-100 py-10 px-5 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <img
            src={Org3}
            alt="Benefits of Blood Donation"
            className="md:w-1/2 w-full rounded-lg shadow-lg mb-6 md:mb-0 md:mr-8"
          />
          <div className="md:w-1/2 w-full text-left">
            <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
              Organizers Who Trust HoldMyPlace
            </h2>
            <div className="max-w-4xl mx-auto text-left">
              <p className="mb-4">
                &quot;HoldMyPlace has completely transformed the way we organize
                our events!&quot; - Event Organizer
              </p>
              <p className="mb-4">
                &quot;The tools and features are incredibly user-friendly. It
                made managing our event seamless.&quot; - Organizer
              </p>
              <Link
                to="/login"
                className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition duration-300"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Get Started */}
      <section className="py-20 px-6 bg-orange-500 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">
          Your Event Management Journey Begins Here
        </h2>
        <p className="text-lg mb-6">
          Sign up and experience the power of efficient event management.
        </p>
        <Link
          to="/signup"
          className="inline-block bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition duration-300"
        >
          Sign Up as an Organizer
        </Link>
      </section>
    </div>
  );
};

export default OrganizerPage;
