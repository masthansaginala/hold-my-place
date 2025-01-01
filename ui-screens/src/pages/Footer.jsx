const Footer = () => {
  return (
    <div className="bg-black text-white">
      <div className="md:mx-10 ">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 text-sm pt-5">
          <div className="text-left">
            <p className="text-xl font-medium mb-5 w-40 text-orange-500">
              Hold My Place
            </p>
            <p className="text-gray-400">
              Your trusted platform for unforgettable experiences. EventEase
              connects you to exciting events, making booking seamless and
              enjoyable. Join us in creating memorable moments and bringing
              people together. Together, we can make every event an experience
              to remember.
            </p>
          </div>
          <div>
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className="flex flex-col  gap-2  text-gray-400">
              <li>Home</li>
              <li>Contact Us</li>
              <li>About Us</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
            <ul className="flex flex-col gap-2 text-gray-400">
              <li>+123 1233 1235</li>
              <li>holdmyplaceinfo@gmail.com</li>
            </ul>
          </div>
        </div>
        <div>
          <hr />
          <p className="py-5 text-sm text-center">
            Copyright 2024@hold my place
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
