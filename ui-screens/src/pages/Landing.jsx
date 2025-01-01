import Land from "../assets/land.jpg";
import ContactUs from "./ContactHeader";
import HowWorks from "./HowWorks";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full flex flex-row justify-center items-center">
        <div className="w-4/5 flex flex-row justify-center items-center">
          <div className="w-1/2 flex flex-col items-start  gap-3 py-10 m-auto md:py-[10vw] md:mb-[-30px] text-left">
            <p className="text-lg font-medium flex items-center">
              <hr className="border-orange-400 w-5" />{" "}
              <span className="pl-2">The Best Event Booking Platform</span>
            </p>
            <p className="text-3xl md:text-4xl lg:text-5xl  font-bold leading-tight mb-5">
              The Ultimate{" "}
              <span className="text-orange-500">Event Booking</span> Experience
            </p>
            <div className="flex flex-col md:flex-row items-center  text-sm font-medium">
              <ul className="list-disc list-inside pl-5">
                <li>Safe, Secure, Reailable Ticketing</li>
                <li>Your Ticket to Live Entertainment</li>
              </ul>
            </div>
            <button
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition duration-300 "
              onClick={() => {
                navigate("/Events");
              }}
            >
              Explore Events
            </button>
          </div>
          <div className="w-1/2 ">
            <img
              className=" inset-0  object-cover rounded-lg"
              src={Land}
              alt="hero-img"
            />
          </div>
        </div>
      </div>
      <HowWorks />
      <ContactUs />

      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 ">
            What Our <span className="text-orange-500">Users Say</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border rounded shadow hover:shadow-lg transition">
              <p className="italic mb-4">
                &quot;Booking events has never been easier. Highly
                recommended!&quot;
              </p>
              <h4 className="font-semibold text-orange-500 text-right">
                - Jane Doe
              </h4>
            </div>
            <div className="p-6 border rounded shadow hover:shadow-lg transition">
              <p className="italic mb-4">
                &quot;I love the variety of events available. Something for
                everyone.&quot;
              </p>
              <h4 className="font-semibold text-orange-500 text-right">
                - John Smith
              </h4>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-orange-500 text-white text-center mt-14">
        <h2 className="text-3xl font-bold mb-6">
          Don’t Miss Out on Amazing Events
        </h2>
        <p className="text-lg mb-8">
          Book your tickets now and create unforgettable memories!
        </p>
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="bg-white text-orange-500 py-3 px-6 rounded hover:bg-gray-100 transition"
        >
          Get Started
        </button>
      </section>
    </>
  );
};

export default Landing;
