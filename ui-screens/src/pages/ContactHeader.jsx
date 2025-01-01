import Land from "../assets/HomePage-S-3.png";

const ContactUs = () => {
  return (
    <div className="py-12 contact-us" id="contact">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          {/* Left Section */}
          <div className="w-full lg:w-1/2 flex items-center text-left">
            <div>
              <h6 className="text-lg text-orange-500 font-semibold">
                Hassle Free
              </h6>
              <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-4">
                Collaborate with Your Job Consultants
              </h2>
              <p className="text-gray-600 leading-relaxed ">
                Our intuitive platform lets you book tickets in just a few
                clicks—no long queues or complicated processes.
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/2">
            <div
              className="relative bg-cover bg-center rounded-lg h-80"
              style={{
                backgroundImage: `url(${Land})`,
              }}
            >
              <form
                id="contact-form"
                action=""
                method="post"
                className="absolute inset-0"
              ></form>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="contact-us section" id="contact">
    //   <div className="container">
    //     <div className="row">
    //       <div className="col-lg-6  align-self-center">
    //         <div className="section-heading">
    //           <h6>Hassle Free</h6>
    //           <h2>Collaborate with Your Job Consultants</h2>
    //           <p>
    //             Grant access to your job consultants or agencies to help you
    //             manage and track your job applications seamlessly. With shared
    //             access, your consultants can update your application statuses,
    //             provide valuable insights, and assist you in landing your dream
    //             job faster.
    //           </p>
    //         </div>
    //       </div>
    //       <div className="col-lg-6">
    //         <div
    //           className="contact-us-content-wrapper"
    //           style={{ backgroundImage: `url(${Land})` }}
    //         >
    //           <form id="contact-form" action="" method="post"></form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ContactUs;
