import Land from "../assets/HomePage-S-1.png";
import {
  UserAddOutlined,
  MessageOutlined,
  CalendarOutlined,
  ProfileOutlined,
  SearchOutlined,
  TagOutlined,
} from "@ant-design/icons";

const HowWorks = () => {
  const benefits = [
    {
      icon: <UserAddOutlined style={{ fontSize: "24px", color: "#1890FF" }} />,
      title: "Easy Registration Process",
      description:
        "Quickly sign up for events with a streamlined registration process.",
      bgColor: "#F0F5FF",
    },
    {
      icon: <MessageOutlined style={{ fontSize: "24px", color: "#FA541C" }} />,
      title: "Seamless Communication",
      description:
        "Stay updated with organizers and participants effortlessly.",
      bgColor: "#FFF2E8",
    },

    {
      icon: <CalendarOutlined style={{ fontSize: "24px", color: "#FAAD14" }} />,
      title: "Wide Event Selection",
      description:
        "Explore a vast range of events, from workshops to festivals.",
      bgColor: "#FFFBF0",
    },
  ];

  return (
    <>
      <div className="bg-[#F2F2F2] px-40 py-28">
        <div className="text-center">
          <p className="text-lg font-medium flex items-center justify-center">
            <hr className="border-orange-400 w-5" />
            <span className="pl-2">Benefits of our Event Booking</span>
          </p>
          <p className="text-4xl font-semibold">
            Our <span className="text-orange-500">Event Booking App</span>{" "}
            Benefits
          </p>
        </div>
        <div className="text-left flex flex-wrap mt-14">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-start w-1/3">
              <div
                className="w-24 h-16 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: benefit.bgColor }}
              >
                {benefit.icon}
              </div>
              <div>
                <p className="font-semibold text-2xl mt-4">{benefit.title}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-14">
        <p className="text-lg font-medium flex items-center justify-center">
          <hr className="border-orange-400 w-5 " />{" "}
          <span className="pl-2">How it Works</span>
        </p>
        <p className="text-4xl font-semibold mb-0">
          How It Works: <span className="text-orange-500">A Step-</span>
        </p>
        <p className="text-orange-500 text-4xl font-semibold">by-Step Guide</p>
      </div>
      <div className="flex mt-10 ">
        <div className="w-1/2 mt-3 p-5 pt-0 flex justify-center">
          <img src={Land} alt="hai" className="w-2/3 rounded-lg mt-2" />
        </div>
        <div className="w-1/2 text-left ">
          <div className="flex  mt-3">
            <div className="w-32 h-20 bg-[#fdf7f3] rounded-full flex items-center justify-center">
              {/* <span className="text-3xl font-semibold text-orange-500">S</span>
               */}
              <UserAddOutlined className="text-3xl font-semibold text-orange-500" />
            </div>
            <div className="ml-5">
              <p className="font-semibold text-2xl mb-1 ">Sign Up</p>
              <p className="text-gray-500 text-sm">
                Register now to access a world of exciting events near you.
                Unlock the opportunity to connect with organizers and
                participate with ease.
              </p>
            </div>
          </div>
          <div className="flex  mt-10">
            <div className="w-28 h-20 bg-[#fdf7f3] rounded-full flex items-center justify-center">
              {/* <span className="text-3xl font-semibold text-orange-500">C</span>
               */}
              <ProfileOutlined className="text-3xl font-semibold text-orange-500" />
            </div>
            <div className="ml-5">
              <p className="font-semibold text-2xl mb-1">Create Profile</p>
              <p className="text-gray-500 text-sm ">
                Personalize your experience by creating a profile that showcases
                your interests, making it easier to find events you&apos;ll
                love.
              </p>
            </div>
          </div>
          <div className="flex mt-10">
            <div className="w-32 h-20 bg-[#fdf7f3] rounded-full flex items-center justify-center">
              {/* <span className="text-3xl font-semibold text-orange-500">B</span> */}
              <SearchOutlined className="text-3xl font-semibold text-orange-500" />
            </div>
            <div className="ml-5">
              <p className="font-semibold text-2xl mb-1">
                Browse Nearby Events
              </p>
              <p className="text-gray-500 text-sm">
                Explore an array of events happening around you, from concerts
                to community gatherings. Filter by location or category to find
                your favorite events.
              </p>
            </div>
          </div>
          <div className="flex mt-10">
            <div className="w-32 h-20 bg-[#fdf7f3] rounded-full flex items-center justify-center">
              {/* <span className="text-3xl font-semibold text-orange-500">B</span> */}
              <TagOutlined className="text-3xl font-semibold text-orange-500" />
            </div>
            <div className="ml-5">
              <p className="font-semibold text-2xl mb-1">Book Event Ticket</p>
              <p className="text-gray-500 text-sm">
                Reserve your spot at popular events with our hassle-free booking
                system. Enjoy instant confirmation and stay updated with event
                details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowWorks;
