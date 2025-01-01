import Aboute from "../assets/aboutl.jpg";

const About = () => {
  return (
    <div className="mx-14">
      <div>
        <div className="flex mt-20 w-full justify-center ">
          <div className=" ">
            <img
              src={Aboute}
              alt="About"
              //   style={styles.aboutimage}
              className="w-full  h-screen"
            />
          </div>

          <div className=" min-h-screen flex text-left flex-col items-center py-10  pt-0 ">
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 pb-5 pt-0">
              {/* Header Section */}
              <div className="text-center mb-5">
                <h1 className="text-3xl font-bold text-orange-600 mb-4">
                  About Us
                </h1>
                <p className="text-base text-gray-700">
                  Welcome to <span className="font-semibold">HoldMyPlace</span>{" "}
                  - Your one-stop solution for seamless event booking and
                  management.
                </p>
              </div>

              {/* Mission Section */}
              <section className="mb-5">
                <h2 className="text-2xl font-semibold text-orange-500 mb-4">
                  Our Mission
                </h2>
                <p className="text-base text-gray-700 leading-relaxed">
                  At EventEase, we strive to provide you with the most efficient
                  and stress-free way to book events. Whether it&apos;s a
                  wedding, conference, or private gathering, our platform
                  connects you with the best venues and service providers to
                  ensure your event is a success. We aim to simplify event
                  planning, allowing you to focus on what matters the most –
                  enjoying your event.
                </p>
              </section>

              {/* Why Choose Us Section */}
              <section className="mb-2">
                <h2 className="text-2xl font-semibold text-orange-500 mb-4">
                  Why Choose Us?
                </h2>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-orange-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 0v4m0-4h4m-4 0H8"
                      ></path>
                    </svg>
                    <p className="text-base text-gray-700">
                      Wide range of venues and events to choose from.
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-orange-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12H8m4-4v8"
                      ></path>
                    </svg>
                    <p className="text-base text-gray-700">
                      Simple, fast, and secure booking process.
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-orange-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 0v4m0-4h4m-4 0H8"
                      ></path>
                    </svg>
                    <p className="text-base text-gray-700">
                      24/7 customer support to assist you every step of the way.
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-orange-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 0v4m0-4h4m-4 0H8"
                      ></path>
                    </svg>
                    <p className="text-base text-gray-700">
                      Exclusive offers and discounts for repeat customers.
                    </p>
                  </div>
                </div>
              </section>

              {/* Our Values Section */}
              <section className="mb-5">
                <h2 className="text-2xl font-semibold text-orange-500 mb-4">
                  Our Values
                </h2>
                <ul className="list-disc list-inside text-base text-gray-700 space-y-2">
                  <li>
                    <span className="font-semibold">Transparency:</span> Clear
                    pricing and booking terms.
                  </li>
                  <li>
                    <span className="font-semibold">Quality:</span> Partnering
                    with top-tier venues and vendors.
                  </li>
                  <li>
                    <span className="font-semibold">Customer-centricity:</span>{" "}
                    We prioritize your needs and satisfaction.
                  </li>
                  <li>
                    <span className="font-semibold">Innovation:</span>{" "}
                    Continuously improving our services for you.
                  </li>
                </ul>
              </section>

              {/* Contact CTA */}
              <div className="text-center">
                <button className="bg-orange-600 text-white py-2 px-6 rounded-lg hover:bg-orange-700 transition duration-300">
                  Let&apos;s Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
