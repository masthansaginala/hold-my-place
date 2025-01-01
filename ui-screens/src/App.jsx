import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./pages/Footer";
import Landing from "./pages/Landing";
import LoginWithGoogleButton from "./pages/LoginForm";
import { ThreeDots } from "react-loader-spinner";

import NavBar from "./pages/Navbar";
import FormRegistration from "./pages/Registration";
import PublicRoute from "./pages/api/PublicRoute";
import PrivateRoute from "./pages/api/PrivateRoute";
import UserLayout from "./pages/Layout";
import Dashborad from "./pages/user/Dashborad";
import EventDetails from "./pages/user/EventDetails";
import OrgEvents from "./pages/organizer/OrgEvents";
import OrgEventDetails from "./pages/organizer/OrgEventDetails";
import About from "./pages/About";
import ContactPage from "./pages/Contact";
import OrganizerPage from "./pages/organizer/OrganizePage";
import VendorPage from "./pages/Vendorpage";
import AdminUsr from "./pages/admin/AdminUser";
import AdminOrg from "./pages/admin/Adminorg";
import AdminVendor from "./pages/admin/AdminVendor";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminSupport from "./pages/admin/AdminSupportTickets";
import AdminContact from "./pages/admin/AdminContact";
import AdminVendorBusiness from "./pages/admin/AdminVendorBusiness";
import AdminEventDetails from "./pages/admin/AdminEventDetails";
import ProfilePage from "./pages/admin/Profile";
import UserProfile from "./pages/user/UserProfile";
import OrgProfile from "./pages/organizer/OrgProfile";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import React from "react";
import GroupIcon from "./assets/botn.png";
import CloseIcon from "./assets/closeIcon.png";
import ChatBot from "react-chatbotify";
import "react-chatbot-kit/build/main.css";
import VendorRequests from "./pages/vendor/VendorRequests";
import Events from "./pages/Events";
import axiosInstance from "./pages/api/apiinstance";
import VendorProfile from "./pages/vendor/VendorProfile";

function App() {
  const [form, setForm] = React.useState({});

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    axiosInstance.interceptors.request.use(
      function (config) {
        setLoading(true);
        return config;
      },
      function (error) {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    axiosInstance.interceptors.response.use(
      function (response) {
        setLoading(false);
        return response;
      },
      function (error) {
        setLoading(false);
        console.log("intercept", error);
        return Promise.reject(error);
      }
    );
  }, []);
  const settings = {
    tooltip: {
      mode: "NEVER",
      text: "",
    },
    chatButton: {
      icon: GroupIcon,
    },
    header: {
      avatar: GroupIcon,
      closeChatIcon: CloseIcon,
    },
  };

  const styles = {
    headerStyle: {
      background: "#f97316",
      color: "#DC2626",
      padding: "10px",
    },
    chatWindowStyle: {
      backgroundColor: "#f97316",
    },
    notificationBadgeStyle: {
      display: "none",
    },
    botBubbleStyle: {
      textAlign: "left",
      border: 0,
      backgroundColor: "#fb923c",
      color: "white",
      padding: "10px 15px",
      maxWidth: "none",
      margin: 0,
      marginBottom: "5px",
      fontSize: "14px",
    },
    userBubbleStyle: {
      textAlign: "left",
      border: 0,
      backgroundColor: "#f3f4f6",
      color: "black",
      padding: "10px 15px",
      maxWidth: "none",
      margin: 0,
      fontSize: "14px",
      marginBottom: "8px",
    },
    botOptionStyle: {
      color: "#f97316",
      backgroundColor: "#fdf7f3",
      border: 0,
      fontSize: "12px",
      padding: "5px",
      paddingLeft: "15px",
      paddingRight: "15px",
      marginBottom: "8px",
    },
    botOptionHoveredStyle: {
      color: "white",
      // textDecoration: "underline",
      backgroundColor: "#fb923c",
      padding: "5px !important",
      border: 0,
      // transition: "none",
      fontSize: "12px",
    },
    chatInputContainerStyle: {
      borderTop: 0,
      // color: "black",
      backgroundColor: "transparent",
    },

    chatInputAreaStyle: {
      minHeight: 0,
      border: 0,
      padding: "8px 15px",
      backgroundColor: "black",
      color: "white",
      fontSize: "14px",
    },
    sendButtonStyle: {
      display: "none",
    },

    bodyStyle: {
      paddingBottom: 0,
      backgroundColor: "white",
    },
    tooltipStyle: {
      padding: "8px 12px",
      borderRadius: "15px",
      background: "geen",
      color: "rgba(255, 255, 255, 0.87)",
    },
    chatHistoryLineBreakStyle: {
      color: "rgba(255, 255, 255, 0.87)",
    },
    chatHistoryButtonStyle: {
      color: "rgba(255, 255, 255, 0.87)",
      backgroundColor: "#070707",
      border: 0,
    },
    chatHistoryButtonHoveredStyle: {
      color: "rgba(255, 255, 255, 0.87)",
      backgroundColor: "#070707",
      border: 0,
      textDecoration: "underline",
    },

    // ...other styles
  };

  const themes = [
    { id: "solid_purple_haze", version: "0.1.0" },
    { id: "simple_blue", version: "0.1.0" },
  ];

  const flow = {
    start: {
      message: "Welcome to HoldMyPlace Bot! How may I assist you today?",
      options: ["USER", "ORGANIZER", "VENDOR"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "USER") return "user_help";
        if (params.userInput === "ORGANIZER") return "organizer_help";
        if (params.userInput === "VENDOR") return "vendor_help";
      },
    },
    user_help: {
      message: "What do you need help with?",
      options: [
        "Book Events",
        "Find Events",
        "Booking History",
        "User FAQs",
        "Help Desk",
      ],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Book Events") return "user_book_events";
        if (params.userInput === "Find Events") return "user_find_events";
        if (params.userInput === "Booking History")
          return "user_booking_history";
        if (params.userInput === "User FAQs") return "user_faq_topics";
        if (params.userInput === "Help Desk") return "support_helpdesk";
      },
    },
    user_book_events: {
      message:
        "To book an event, visit the event page, select your tickets, and complete the process.",
      options: ["Back to User Options"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to User Options") return "user_help";
      },
    },
    user_find_events: {
      message:
        "You can find events by browsing through the 'Events' section. Use filters like category, location, or date to narrow your search.",
      options: ["Back to User Options"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to User Options") return "user_help";
      },
    },
    user_booking_history: {
      message:
        "To view your booking history, go to the 'My Bookings' section in your account. Here, you can see past and current bookings.",
      options: ["Back to User Options"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to User Options") return "user_help";
      },
    },
    user_faq_topics: {
      message: "Please choose a topic to find information.",
      options: [
        "Registration & Login",
        "Booking & Tickets",
        "Profile Management",
        "Support & Assistance",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "Registration & Login": "faq_registration_login",
          "Booking & Tickets": "faq_booking_tickets",
          "Profile Management": "faq_profile_management",
          "Support & Assistance": "faq_support_assistance",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_registration_login: {
      message: "Choose a question about Registration & Login:",
      options: [
        "How do I register?",
        "How do I log in?",
        "How do I recover my password?",
        "How do I recover my PIN?",
        "Back to Topics",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "How do I register?": "faq_answer_how_to_register",
          "How do I log in?": "faq_answer_how_to_login",
          "How do I recover my password?": "faq_answer_recover_password",
          "How do I recover my PIN?": "faq_answer_recover_pin",
          "Back to Topics": "user_faq_topics",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_answer_how_to_register: {
      message:
        "You can register by clicking the 'Sign Up' button on the home page and filling in your details.",
      options: ["Back to Questions", "Back to User Options"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_registration_login";
        if (params.userInput === "Back to User Options") return "user_help";
      },
    },
    faq_answer_how_to_login: {
      message:
        "To log in, enter your registered email, password, and PIN on the login page.",
      options: ["Back to Questions", "Back to User Options"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_registration_login";
        if (params.userInput === "Back to User Options") return "user_help";
      },
    },
    faq_answer_recover_password: {
      message:
        "Click 'Forgot Password' on the login page, enter your email, and follow the instructions sent to you.",
      options: ["Back to Questions", "Back to User Options"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_registration_login";
        if (params.userInput === "Back to User Options") return "user_help";
      },
    },
    faq_answer_recover_pin: {
      message:
        "To recover your PIN, log in with your email and password, then follow the steps to reset your PIN.",
      options: ["Back to Questions", "Back to User Options"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_registration_login";
        if (params.userInput === "Back to User Options") return "user_help";
      },
    },
    faq_booking_tickets: {
      message: "Choose a question about Booking & Tickets:",
      options: [
        "How do I book an event?",
        "Can I cancel my booking?",
        "How do I get a refund?",
        "Where can I find my booking history?",
        "Back to Topics",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "How do I book an event?": "faq_answer_how_to_book_event",
          "Can I cancel my booking?": "faq_answer_cancel_booking",
          "How do I get a refund?": "faq_answer_refund",
          "Where can I find my booking history?": "faq_answer_booking_history",
          "Back to Topics": "user_faq_topics",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_answer_how_to_book_event: {
      message:
        "Browse available events, select the desired event, choose tickets, and complete the process.",
      options: ["Back to Questions", "Back to User Options"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_booking_tickets";
        if (params.userInput === "Back to User Options") return "user_help";
      },
    },
    faq_answer_cancel_booking: {
      message:
        "Go to 'My Bookings', select the booking you want to cancel, and click 'Cancel Booking'.",
      options: ["Back to Questions", "Back to User Options"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_booking_tickets";
        if (params.userInput === "Back to User Options") return "user_help";
      },
    },
    faq_answer_refund: {
      message:
        "Refunds are processed based on the event's cancellation policy. Check your event details for specific terms.",
      options: ["Back to Questions", "Back to User Options"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_booking_tickets";
        if (params.userInput === "Back to User Options") return "user_help";
      },
    },
    faq_answer_booking_history: {
      message:
        "You can view your past and current bookings in the 'My Bookings' section under your account.",
      options: ["Back to Questions", "Back to User Options"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_booking_tickets";
        if (params.userInput === "Back to User Options") return "user_help";
      },
    },
    faq_profile_management: {
      message: "Choose a question about Profile Management:",
      options: [
        "How do I update my profile?",
        "Can I change my email or phone number?",
        "What happens if I delete my account?",
        "Back to Topics",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "How do I update my profile?": "faq_answer_update_profile",
          "Can I change my email or phone number?":
            "faq_answer_change_email_phone",
          "What happens if I delete my account?": "faq_answer_delete_account",
          "Back to Topics": "user_faq_topics",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_answer_update_profile: {
      message: "Go to 'My Profile', edit your details, and save the changes.",
      options: ["Back to Questions", "Back to User Options"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_profile_management";
        if (params.userInput === "Back to User Options") return "user_help";
      },
    },
    faq_answer_change_email_phone: {
      message:
        "Yes, you can update your email or phone number in the 'My Profile' section.",
      options: ["Back to Questions", "Back to User Options"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_profile_management";
        if (params.userInput === "Back to User Options") return "user_help";
      },
    },
    faq_answer_delete_account: {
      message:
        "Deleting your account will remove all your data permanently. Contact support for assistance.",
      options: ["Back to Questions", "Back to User Options"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_profile_management";
        if (params.userInput === "Back to User Options") return "user_help";
      },
    },
    faq_support_assistance: {
      message: "Choose a question about Support & Assistance:",
      options: [
        "How do I contact support?",
        "How do I raise a ticket?",
        "What is the response time for support?",
        "How can I check the status of my support ticket?",
        "Back to Topics",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "How do I contact support?": "faq_answer_contact_support",
          "How do I raise a ticket?": "faq_answer_raise_ticket",
          "What is the response time for support?": "faq_answer_response_time",
          "How can I check the status of my support ticket?":
            "faq_answer_check_ticket_status",
          "Back to Topics": "user_faq_topics",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_answer_contact_support: {
      message:
        "You can contact support through the 'Help Desk' in the application or via email.",
      options: ["Back to Questions", "Back to User Options"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_support_assistance";
        if (params.userInput === "Back to User Options") return "user_help";
      },
    },
    faq_answer_raise_ticket: {
      message:
        "Go to the 'Help Desk', select 'Raise a Ticket', and provide the required details to submit your query.",
      options: ["Back to Questions", "Back to User Options"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_support_assistance";
        if (params.userInput === "Back to User Options") return "user_help";
      },
    },
    faq_answer_response_time: {
      message: "Support queries are typically responded to within 24-48 hours.",
      options: ["Back to Questions", "Back to User Options"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_support_assistance";
        if (params.userInput === "Back to User Options") return "user_help";
      },
    },
    faq_answer_check_ticket_status: {
      message:
        "Use the bot -> Help Desk -> Ticket Status -> Enter Email and Ticket ID to check your ticket status.",
      options: ["Back to Questions", "Back to User Options"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_support_assistance";
        if (params.userInput === "Back to User Options") return "user_help";
      },
    },
    organizer_help: {
      message: "What do you need help with?",
      options: [
        "Organizer Registeration",
        "Creation Of Events",
        "Addition Of Event Services",
        "Organizer FAQs",
        "Help Desk",
      ],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Organizer Registeration")
          return "organizer_registeration";
        if (params.userInput === "Creation Of Events")
          return "creation_of_events";
        if (params.userInput === "Addition Of Event Services")
          return "addition_of_event_services";
        if (params.userInput === "Organizer FAQs")
          return "organizer_faq_topics";
        if (params.userInput === "Help Desk") return "support_helpdesk";
      },
    },
    organizer_registeration: {
      message: "Here is the information on Organizer Registration:",
      options: [
        "How do I register as an Organizer?",
        "What happens after registration?",
        "How do I log in as an Organizer?",
        "Back to Organizer Help",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "How do I register as an Organizer?": "faq_organizer_register",
          "What happens after registration?": "faq_organizer_after_registration",
          "How do I log in as an Organizer?": "faq_organizer_login",
          "Back to Organizer Help": "organizer_help",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_organizer_register: {
      message:
        "To register, click 'Sign Up' on the homepage, select 'Organizer', and fill in the required details.",
      options: ["Back to Questions", "Back to Organizer Help"],
      path: (params) => {
        if (params.userInput === "Back to Questions") return "organizer_registeration";
        if (params.userInput === "Back to Organizer Help") return "organizer_help";
      },
    },
    faq_organizer_after_registration: {
      message:
        "After registration, your account will be verified by admin, and you will receive an activation email with your login PIN.",
      options: ["Back to Questions", "Back to Organizer Help"],
      path: (params) => {
        if (params.userInput === "Back to Questions") return "organizer_registeration";
        if (params.userInput === "Back to Organizer Help") return "organizer_help";
      },
    },
    faq_organizer_login: {
      message:
        "To log in, use your registered email, password, and the PIN provided during activation.",
      options: ["Back to Questions", "Back to Organizer Help"],
      path: (params) => {
        if (params.userInput === "Back to Questions") return "organizer_registeration";
        if (params.userInput === "Back to Organizer Help") return "organizer_help";
      },
    },
    creation_of_events: {
      message: "Here is the information on Event Creation:",
      options: [
        "How do I create an event?",
        "Can I update an existing event?",
        "Can I delete an event?",
        "Back to Organizer Help",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "How do I create an event?": "faq_create_event",
          "Can I update an existing event?": "faq_update_event",
          "Can I delete an event?": "faq_delete_event",
          "Back to Organizer Help": "organizer_help",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_create_event: {
      message:
        "To create an event, navigate to 'My Events', click 'Create Event', and fill in the event details.",
      options: ["Back to Questions", "Back to Organizer Help"],
      path: (params) => {
        if (params.userInput === "Back to Questions") return "creation_of_events";
        if (params.userInput === "Back to Organizer Help") return "organizer_help";
      },
    },
    faq_update_event: {
      message:
        "To update an event, select the event in 'My Events', make the changes, and save.",
      options: ["Back to Questions", "Back to Organizer Help"],
      path: (params) => {
        if (params.userInput === "Back to Questions") return "creation_of_events";
        if (params.userInput === "Back to Organizer Help") return "organizer_help";
      },
    },
    faq_delete_event: {
      message:
        "To delete an event, select the event in 'My Events' and click 'Delete Event'. Confirm your action to proceed.",
      options: ["Back to Questions", "Back to Organizer Help"],
      path: (params) => {
        if (params.userInput === "Back to Questions") return "creation_of_events";
        if (params.userInput === "Back to Organizer Help") return "organizer_help";
      },
    },
    addition_of_event_services: {
      message: "Here is the information on Adding Event Services:",
      options: [
        "How do I add vendor services to my event?",
        "Can I update the status of vendor services?",
        "Where can I view vendor service status updates?",
        "Back to Organizer Help",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "How do I add vendor services to my event?": "faq_add_vendor_service",
          "Can I update the status of vendor services?": "faq_update_vendor_status",
          "Where can I view vendor service status updates?": "faq_view_vendor_status",
          "Back to Organizer Help": "organizer_help",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_add_vendor_service: {
      message:
        "To add vendor services, navigate to 'Event Services', select the event, and choose the required vendor services.",
      options: ["Back to Questions", "Back to Organizer Help"],
      path: (params) => {
        if (params.userInput === "Back to Questions") return "addition_of_event_services";
        if (params.userInput === "Back to Organizer Help") return "organizer_help";
      },
    },
    faq_update_vendor_status: {
      message:
        "To update vendor service status, go to 'Event Services', select the vendor service, and update the status or add remarks.",
      options: ["Back to Questions", "Back to Organizer Help"],
      path: (params) => {
        if (params.userInput === "Back to Questions") return "addition_of_event_services";
        if (params.userInput === "Back to Organizer Help") return "organizer_help";
      },
    },
    faq_view_vendor_status: {
      message:
        "Vendor service status updates can be viewed in the 'Event Services' section under each event.",
      options: ["Back to Questions", "Back to Organizer Help"],
      path: (params) => {
        if (params.userInput === "Back to Questions") return "addition_of_event_services";
        if (params.userInput === "Back to Organizer Help") return "organizer_help";
      },
    },    
    organizer_faq_topics: {
      message: "Please choose a topic to find information:",
      options: [
        "Registration & Login",
        "Event Management",
        "Vendor Services",
        "Bookings & Reports",
        "Profile & Support",
        "Back to Organizer Help",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "Registration & Login": "faq_registration_login",
          "Event Management": "faq_event_management",
          "Vendor Services": "faq_vendor_services",
          "Bookings & Reports": "faq_bookings_reports",
          "Profile & Support": "faq_profile_support",
          "Back to Organizer Help": "organizer_help",
        };
        return faqPaths[params.userInput];
      },
    },

    faq_organizer_account_activation: {
      message:
        "After registration, your account will be verified by admin, and you will receive an activation email with your login PIN.",
      options: ["Back to Questions", "Back to FAQ Topics"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_registration_login";
        if (params.userInput === "Back to FAQ Topics")
          return "organizer_faq_topics";
      },
    },

    faq_organizer_forgot_password: {
      message:
        "Click 'Forgot Password' on the login page, enter your email, and follow the instructions sent to you.",
      options: ["Back to Questions", "Back to FAQ Topics"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_registration_login";
        if (params.userInput === "Back to FAQ Topics")
          return "organizer_faq_topics";
      },
    },
    faq_organizer_recover_pin: {
      message:
        "To recover your PIN, log in with your email and password, then follow the steps to reset your PIN.",
      options: ["Back to Questions", "Back to FAQ Topics"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_registration_login";
        if (params.userInput === "Back to FAQ Topics")
          return "organizer_faq_topics";
      },
    },
    faq_event_management: {
      message: "Choose a question about Event Management:",
      options: [
        "How can I create an event?",
        "Can I update the details of an event after creating it?",
        "How do I delete an event?",
        "How can I add services for an event?",
        "Can I update the status of a vendor's event service?",
        "Back to FAQ Topics",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "How can I create an event?": "faq_create_event",
          "Can I update the details of an event after creating it?":
            "faq_update_event",
          "How do I delete an event?": "faq_delete_event",
          "How can I add services for an event?": "faq_add_services",
          "Can I update the status of a vendor's event service?":
            "faq_update_vendor_service_status",
          "Back to FAQ Topics": "organizer_faq_topics",
        };
        return faqPaths[params.userInput];
      },
    },

    faq_add_services: {
      message:
        "To add services for an event, navigate to 'Event Services', select the event, and choose the required vendor services.",
      options: ["Back to Questions", "Back to FAQ Topics"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_event_management";
        if (params.userInput === "Back to FAQ Topics")
          return "organizer_faq_topics";
      },
    },
    faq_update_vendor_service_status: {
      message:
        "To update the status of a vendor's event service, go to 'Event Services', select the vendor service, and update the status or add remarks.",
      options: ["Back to Questions", "Back to FAQ Topics"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_event_management";
        if (params.userInput === "Back to FAQ Topics")
          return "organizer_faq_topics";
      },
    },
    faq_bookings_reports: {
      message: "Choose a question about Bookings & Reports:",
      options: [
        "How can I view bookings made for my events?",
        "Can I download a report of the bookings?",
        "How do I perform attendee check-ins?",
        "Can I upload certificates for attendees?",
        "What information is included in the downloaded report?",
        "Back to FAQ Topics",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "How can I view bookings made for my events?": "faq_view_bookings",
          "Can I download a report of the bookings?":
            "faq_download_bookings_report",
          "How do I perform attendee check-ins?": "faq_attendee_checkins",
          "Can I upload certificates for attendees?": "faq_upload_certificates",
          "What information is included in the downloaded report?":
            "faq_report_info",
          "Back to FAQ Topics": "organizer_faq_topics",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_view_bookings: {
      message:
        "To view bookings made for your events, navigate to the 'Booking History' page under your account. You can see all past and current bookings here.",
      options: ["Back to Questions", "Back to FAQ Topics"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_bookings_reports";
        if (params.userInput === "Back to FAQ Topics")
          return "organizer_faq_topics";
      },
    },
    faq_download_bookings_report: {
      message:
        "To download a report of bookings, go to the 'Booking History' page and click on the 'Download Report' button. The report will be downloaded as a CSV file.",
      options: ["Back to Questions", "Back to FAQ Topics"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_bookings_reports";
        if (params.userInput === "Back to FAQ Topics")
          return "organizer_faq_topics";
      },
    },
    faq_attendee_checkins: {
      message:
        "To perform attendee check-ins, navigate to the 'Booking Page' of the respective event. Select the attendee and mark them as checked in.",
      options: ["Back to Questions", "Back to FAQ Topics"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_bookings_reports";
        if (params.userInput === "Back to FAQ Topics")
          return "organizer_faq_topics";
      },
    },
    faq_upload_certificates: {
      message:
        "To upload certificates for attendees, go to the 'Booking Page' of the respective event and select the attendee to upload the certificate.",
      options: ["Back to Questions", "Back to FAQ Topics"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_bookings_reports";
        if (params.userInput === "Back to FAQ Topics")
          return "organizer_faq_topics";
      },
    },
    faq_report_info: {
      message:
        "The downloaded report includes details such as Booking ID, Attendee Name, Ticket Count, Price, Booking Status, and Event Date.",
      options: ["Back to Questions", "Back to FAQ Topics"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_bookings_reports";
        if (params.userInput === "Back to FAQ Topics")
          return "organizer_faq_topics";
      },
    },
    faq_profile_support: {
      message: "Choose a question about Profile & Support:",
      options: [
        "How can I update my profile information?",
        "How do I raise a support ticket?",
        "Will I receive email notifications for event activities?",
        "How do I check the status of a support ticket?",
        "Can I directly contact the admin for urgent issues?",
        "Back to FAQ Topics",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "How can I update my profile information?": "faq_update_profile",
          "How do I raise a support ticket?": "faq_raise_support_ticket",
          "Will I receive email notifications for event activities?":
            "faq_email_notifications",
          "How do I check the status of a support ticket?":
            "faq_check_ticket_status",
          "Can I directly contact the admin for urgent issues?":
            "faq_contact_admin",
          "Back to FAQ Topics": "organizer_faq_topics",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_update_profile: {
      message:
        "To update your profile information, go to the 'Profile' section in your account, click 'Edit', make the necessary changes, and save them.",
      options: ["Back to Questions", "Back to FAQ Topics"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_profile_support";
        if (params.userInput === "Back to FAQ Topics")
          return "organizer_faq_topics";
      },
    },
    faq_raise_support_ticket: {
      message:
        "To raise a support ticket, use the HoldMyPlace BOT and navigate to 'Help Desk' > 'Raise a Ticket'. Provide the required details and submit your query.",
      options: ["Back to Questions", "Back to FAQ Topics"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_profile_support";
        if (params.userInput === "Back to FAQ Topics")
          return "organizer_faq_topics";
      },
    },
    faq_email_notifications: {
      message:
        "Yes, you will receive email notifications for important updates such as bookings, event services, and support tickets.",
      options: ["Back to Questions", "Back to FAQ Topics"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_profile_support";
        if (params.userInput === "Back to FAQ Topics")
          return "organizer_faq_topics";
      },
    },
    faq_check_ticket_status: {
      message:
        "You can check the status of your support ticket by using the bot: 'Help Desk' > 'Ticket Status'. Enter your email and ticket ID to view the status.",
      options: ["Back to Questions", "Back to FAQ Topics"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_profile_support";
        if (params.userInput === "Back to FAQ Topics")
          return "organizer_faq_topics";
      },
    },
    faq_contact_admin: {
      message:
        "For urgent issues, while the BOT is the primary support mode, you can email the admin team directly through the 'Contact Us' section on the website.",
      options: ["Back to Questions", "Back to FAQ Topics"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "faq_profile_support";
        if (params.userInput === "Back to FAQ Topics")
          return "organizer_faq_topics";
      },
    },
    vendor_help: {
      message: "What do you need help with?",
      options: [
        "Vendor Registration",
        "Vendor Business Registration",
        "Manage Event Service Requests",
        "Vendor FAQs",
        "Help Desk",
      ],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Vendor Registration")
          return "vendor_registration";
        if (params.userInput === "Vendor Business Registration")
          return "vendor_business_registration";
        if (params.userInput === "Manage Event Service Requests")
          return "manage_event_service_requests";
        if (params.userInput === "Vendor FAQs") return "vendor_faq_topics";
        if (params.userInput === "Help Desk") return "support_helpdesk";
      },
    },
    vendor_registration: {
      message: "Here is the information on Vendor Registration:",
      options: [
        "How do I register as a Vendor?",
        "How will I know if my account is activated?",
        "How can I log in as a Vendor?",
        "What should I do if I forget my password?",
        "How can I recover my PIN?",
        "Back to Vendor Help",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "How do I register as a Vendor?": "faq_vendor_register",
          "How will I know if my account is activated?":
            "faq_vendor_account_activation",
          "How can I log in as a Vendor?": "faq_vendor_login",
          "What should I do if I forget my password?":
            "faq_vendor_forgot_password",
          "How can I recover my PIN?": "faq_vendor_recover_pin",
          "Back to Vendor Help": "vendor_help",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_vendor_register: {
      message:
        "Click on the 'Register' button on the homepage, choose 'Vendor,' and fill in the required details. Submit the form for admin verification.",
      options: ["Back to Questions", "Back to Vendor Help"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "vendor_registration";
        if (params.userInput === "Back to Vendor Help") return "vendor_help";
      },
    },
    faq_vendor_account_activation: {
      message:
        "Once your account is verified, you will receive an email with your account activation confirmation and a unique PIN.",
      options: ["Back to Questions", "Back to Vendor Help"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "vendor_registration";
        if (params.userInput === "Back to Vendor Help") return "vendor_help";
      },
    },
    faq_vendor_login: {
      message:
        "Use your registered email, password, and PIN to log in to the platform from the login page.",
      options: ["Back to Questions", "Back to Vendor Help"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "vendor_registration";
        if (params.userInput === "Back to Vendor Help") return "vendor_help";
      },
    },
    faq_vendor_forgot_password: {
      message:
        "Click on 'Forgot Password' on the login page, enter your registered email, and follow the instructions to reset your password.",
      options: ["Back to Questions", "Back to Vendor Help"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "vendor_registration";
        if (params.userInput === "Back to Vendor Help") return "vendor_help";
      },
    },
    faq_vendor_recover_pin: {
      message:
        "Go to the 'Forgot PIN' section, enter your registered email and password, and a new PIN will be sent to your email.",
      options: ["Back to Questions", "Back to Vendor Help"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "vendor_registration";
        if (params.userInput === "Back to Vendor Help") return "vendor_help";
      },
    },
    vendor_business_registration: {
      message: "Here is the information on Vendor Business Registration:",
      options: [
        "How can I create a Vendor Business Event Service?",
        "Will I receive a notification when my service is activated?",
        "Can I update details of my Vendor Business Event Service?",
        "Can I delete a Vendor Business Event Service?",
        "How can I view requests from organizers for my services?",
        "Back to Vendor Help",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "How can I create a Vendor Business Event Service?":
            "faq_create_business_service",
          "Will I receive a notification when my service is activated?":
            "faq_service_activation_notification",
          "Can I update details of my Vendor Business Event Service?":
            "faq_update_business_service",
          "Can I delete a Vendor Business Event Service?":
            "faq_delete_business_service",
          "How can I view requests from organizers for my services?":
            "faq_view_service_requests",
          "Back to Vendor Help": "vendor_help",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_create_business_service: {
      message:
        "Navigate to the 'Business Services' section, click 'Create Service,' fill in the service details, and submit for admin verification.",
      options: ["Back to Questions", "Back to Vendor Help"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "vendor_business_registration";
        if (params.userInput === "Back to Vendor Help") return "vendor_help";
      },
    },
    faq_service_activation_notification: {
      message:
        "Yes, you will receive an email notification once your service is approved and activated by the admin.",
      options: ["Back to Questions", "Back to Vendor Help"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "vendor_business_registration";
        if (params.userInput === "Back to Vendor Help") return "vendor_help";
      },
    },
    faq_update_business_service: {
      message:
        "Go to the 'Manage Services' section, select the service you want to update, and make the necessary changes.",
      options: ["Back to Questions", "Back to Vendor Help"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "vendor_business_registration";
        if (params.userInput === "Back to Vendor Help") return "vendor_help";
      },
    },
    faq_delete_business_service: {
      message:
        "Select the service in 'Manage Services' and click 'Delete' to remove it from the platform.",
      options: ["Back to Questions", "Back to Vendor Help"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "vendor_business_registration";
        if (params.userInput === "Back to Vendor Help") return "vendor_help";
      },
    },
    faq_view_service_requests: {
      message:
        "Go to the 'Service Requests' section to view a list of organizer requests for your event services.",
      options: ["Back to Questions", "Back to Vendor Help"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "vendor_business_registration";
        if (params.userInput === "Back to Vendor Help") return "vendor_help";
      },
    },
    manage_event_service_requests: {
      message: "Here is the information on Managing Event Service Requests:",
      options: [
        "How can I update the status of an organizer’s request?",
        "How do I view the status or remarks updated by organizers?",
        "Will I get email notifications for updates?",
        "Can I respond to updates from organizers?",
        "What should I do if I do not receive email notifications?",
        "Back to Vendor Help",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "How can I update the status of an organizer’s request?":
            "faq_update_request_status",
          "How do I view the status or remarks updated by organizers?":
            "faq_view_organizer_updates",
          "Will I get email notifications for updates?":
            "faq_request_email_notifications",
          "Can I respond to updates from organizers?":
            "faq_respond_to_organizer_updates",
          "What should I do if I do not receive email notifications?":
            "faq_missing_notifications",
          "Back to Vendor Help": "vendor_help",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_update_request_status: {
      message:
        "Navigate to the 'Service Requests' section, select the request, and update the status and remarks as needed.",
      options: ["Back to Questions", "Back to Vendor Help"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "manage_event_service_requests";
        if (params.userInput === "Back to Vendor Help") return "vendor_help";
      },
    },
    faq_view_organizer_updates: {
      message:
        "In the 'Service Requests' section, you can see all status updates and remarks provided by organizers.",
      options: ["Back to Questions", "Back to Vendor Help"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "manage_event_service_requests";
        if (params.userInput === "Back to Vendor Help") return "vendor_help";
      },
    },
    faq_request_email_notifications: {
      message:
        "Yes, you will receive email notifications for important updates, including approvals, requests, and status changes.",
      options: ["Back to Questions", "Back to Vendor Help"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "manage_event_service_requests";
        if (params.userInput === "Back to Vendor Help") return "vendor_help";
      },
    },
    faq_respond_to_organizer_updates: {
      message:
        "While you cannot directly reply to emails, you can use the platform to update status and remarks for the organizer's requests.",
      options: ["Back to Questions", "Back to Vendor Help"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "manage_event_service_requests";
        if (params.userInput === "Back to Vendor Help") return "vendor_help";
      },
    },
    faq_missing_notifications: {
      message:
        "Check your email spam folder or ensure the registered email is correct. You can also raise a support ticket for assistance.",
      options: ["Back to Questions", "Back to Vendor Help"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "manage_event_service_requests";
        if (params.userInput === "Back to Vendor Help") return "vendor_help";
      },
    },
    vendor_faq_topics: {
      message: "Please choose a topic to find information:",
      options: [
        "Account Management",
        "Business and Event Services",
        "Managing Requests and Notifications",
        "Profile and Support",
        "Back to Vendor Help",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "Account Management": "vendor_registration",
          "Business and Event Services": "vendor_business_registration",
          "Managing Requests and Notifications":
            "manage_event_service_requests",
          "Profile and Support": "vendor_profile_support",
          "Back to Vendor Help": "vendor_help",
        };
        return faqPaths[params.userInput];
      },
    },
    vendor_profile_support: {
      message: "Choose a question about Profile and Support:",
      options: [
        "How can I update my profile information?",
        "How can I raise a support ticket?",
        "Will I get notifications for support ticket updates?",
        "How do I check the status of a support ticket?",
        "Can I contact the admin for urgent issues?",
        "Back to Vendor Help",
      ],
      chatDisabled: true,
      path: (params) => {
        const faqPaths = {
          "How can I update my profile information?":
            "faq_vendor_update_profile",
          "How can I raise a support ticket?": "faq_vendor_raise_ticket",
          "Will I get notifications for support ticket updates?":
            "faq_vendor_ticket_notifications",
          "How do I check the status of a support ticket?":
            "faq_vendor_check_ticket_status",
          "Can I contact the admin for urgent issues?":
            "faq_vendor_contact_admin",
          "Back to Vendor Help": "vendor_help",
        };
        return faqPaths[params.userInput];
      },
    },
    faq_vendor_update_profile: {
      message:
        "Go to the 'Profile' section, click 'Edit,' make the necessary changes, and save the updates.",
      options: ["Back to Questions", "Back to Vendor Help"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "vendor_profile_support";
        if (params.userInput === "Back to Vendor Help") return "vendor_help";
      },
    },
    faq_vendor_raise_ticket: {
      message:
        "Use the HoldMyPlace BOT to raise a support ticket. Provide the required details, and our support team will assist you.",
      options: ["Back to Questions", "Back to Vendor Help"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "vendor_profile_support";
        if (params.userInput === "Back to Vendor Help") return "vendor_help";
      },
    },
    faq_vendor_ticket_notifications: {
      message:
        "Yes, you will receive email notifications for any updates or resolutions regarding your support tickets.",
      options: ["Back to Questions", "Back to Vendor Help"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "vendor_profile_support";
        if (params.userInput === "Back to Vendor Help") return "vendor_help";
      },
    },
    faq_vendor_check_ticket_status: {
      message:
        "Vendor can check Ticket status using bot -> Help Desk -> Ticket Status -> Email input and Ticket ID input.",
      options: ["Back to Questions", "Back to Vendor Help"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "vendor_profile_support";
        if (params.userInput === "Back to Vendor Help") return "vendor_help";
      },
    },
    faq_vendor_contact_admin: {
      message:
        "While the BOT is the primary support method, you can email the admin team directly via the 'Contact Us' section for urgent matters.",
      options: ["Back to Questions", "Back to Vendor Help"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Back to Questions")
          return "vendor_profile_support";
        if (params.userInput === "Back to Vendor Help") return "vendor_help";
      },
    },
    support_helpdesk: {
      message: "What do you need help with?",
      options: ["Create Ticket", "Check Ticket Status"],
      chatDisabled: true,
      path: (params) => {
        if (params.userInput === "Create Ticket")
          return "support_create_ticket";
        if (params.userInput === "Check Ticket Status")
          return "check_ticket_email";
      },
    },
    support_create_ticket: {
      message: "Let's create a support ticket. What is your name?",
      function: (params) =>
        setForm((prevForm) => ({
          ...prevForm,
          support_name: params.userInput,
        })),
      path: "support_ticket_email",
    },
    support_ticket_email: {
      message: "What is your email address?",
      validateInput: (input) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input)) {
          return {
            success: false,
            promptContent: "Please enter a valid email address!",
            promptType: "error", // Ensures clear error type handling
          };
        }
        return { success: true };
      },
      function: (params) => {
        setForm((prevForm) => ({
          ...prevForm,
          support_email: params.userInput,
        }));
      },
      path: (params) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(params.userInput)) {
          return "support_ticket_email"; // Redirect to the same step on invalid input
        }
        return "support_ticket_phone";
      },
    },
    support_ticket_phone: {
      message: "What is your phone number?",
      function: (params) =>
        setForm((prevForm) => ({
          ...prevForm,
          support_phone_number: params.userInput,
        })),
      path: "support_ticket_type",
    },
    support_ticket_type: {
      message: "Are you User or Organizer, or Vendor?",
      options: ["USER", "ORGANIZER", "VENDOR"],
      chatDisabled: true,
      function: (params) =>
        setForm((prevForm) => ({
          ...prevForm,
          support_type: params.userInput,
        })),
      path: "support_ticket_subject",
    },
    support_ticket_subject: {
      message: "What is the subject of your request?",
      function: (params) =>
        setForm((prevForm) => ({
          ...prevForm,
          support_subject: params.userInput,
        })),
      path: "support_ticket_message",
    },
    support_ticket_message: {
      message: "Please describe your issue or request.",
      function: (params) =>
        setForm((prevForm) => ({
          ...prevForm,
          support_message: params.userInput,
        })),
      path: "support_submission",
    },
    support_submission: {
      message: async () => {
        try {
          const response = await fetch(
            "http://localhost:3001/api/app-support/create",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(form),
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            return `Error: ${errorData.error}. Please try again.`;
          }

          const { support } = await response.json();
          return `
            Support ticket created successfully!
            - Ticket ID: ${support.support_id}
            - Name: ${support.support_name}
            - Email: ${support.support_email}
          `;
        } catch (err) {
          console.log(err);
          return `An error occurred while submitting your ticket. Please try again.`;
        }
      },
      options: ["Back to Start"],
      chatDisabled: true,
      path: "start",
    },
    check_ticket_email: {
      message: "What is your email address used to register Ticket?",
      validateInput: (input) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input)) {
          return {
            success: false,
            promptContent: "Please enter a valid email address!",
            promptType: "error", // Ensure this matches your framework's expected error type
          };
        }
        return { success: true };
      },
      function: (params) => {
        setForm((prevForm) => ({
          ...prevForm,
          support_email: params.userInput,
        }));
      },
      path: (params) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(params.userInput)) {
          return "check_ticket_email"; // Retry the same step if validation fails
        }
        return "check_ticket_status";
      },
    },
    check_ticket_status: {
      message:
        "Please enter your Ticket ID. If you don’t remember it, you can find it in the email you used to raise the ticket.",
      validateInput: (input) => {
        return !isNaN(input)
          ? { success: true }
          : {
              success: false,
              promptContent: "Ticket ID must be a number!",
              promptType: "error",
            };
      },
      function: (params) =>
        setForm((prevForm) => ({ ...prevForm, support_id: params.userInput })),
      path: "ticket_status_response",
    },
    ticket_status_response: {
      message: async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/api/app-support/list?support_id=${form.support_id}&support_email=${form.support_email}`
          );

          if (!response.ok) {
            return "Unable to fetch ticket status. Please ensure the Ticket ID is correct.";
          }

          const data = await response.json();
          if (data.total === 0) {
            return "No ticket found with the provided ID.";
          }

          const ticket = data.supports[0];
          return `
            HoldMyPlace Support Ticket Details:
            - Ticket ID : ${ticket.support_id}
            - Name: ${ticket.support_name}
            - Email: ${ticket.support_email}
            - Subject: ${ticket.support_subject}
            - Status: ${ticket.support_status}
            - Remarks: ${ticket.support_remarks || "No remarks"}
          `;
        } catch (err) {
          console.log(err);
          return `An error occurred while fetching the ticket status. Please try again.`;
        }
      },
      options: ["Back to Start"],
      chatDisabled: true,
      path: "start",
    },
  };
  return (
    <div>
      <div>
        {loading && (
          <div className="loader-wrapper">
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              color="#F97316"
            />
          </div>
        )}
        <NavBar />

        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Landing />
              </PublicRoute>
            }
          />

          <Route
            path="/About"
            element={
              <PublicRoute>
                <About />
              </PublicRoute>
            }
          />
          <Route
            path="/Events"
            element={
              <PublicRoute>
                <Events />
              </PublicRoute>
            }
          />
          <Route
            path="/Contact"
            element={
              <PublicRoute>
                <ContactPage />
              </PublicRoute>
            }
          />
          <Route
            path="/Organizer-page"
            element={
              <PublicRoute>
                <OrganizerPage />
              </PublicRoute>
            }
          />

          <Route
            path="/Vendor-page"
            element={
              <PublicRoute>
                <VendorPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            exact
            element={
              <PublicRoute>
                <LoginWithGoogleButton />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            exact
            element={
              <PublicRoute>
                <FormRegistration />
              </PublicRoute>
            }
          />

          {/* User Routes */}
          <Route
            path="/user-dashboard"
            exact
            element={
              <PrivateRoute>
                <UserLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" />} />
            <Route
              path="/user-dashboard/dashboard"
              element={
                <PrivateRoute>
                  <Dashborad />
                </PrivateRoute>
              }
            />
            <Route
              path="/user-dashboard/event-details"
              element={
                <PrivateRoute>
                  <EventDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/user-dashboard/profile"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />
          </Route>

          {/* Organization routes */}
          <Route
            path="/organizer"
            exact
            element={
              <PrivateRoute>
                <UserLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="events" />} />
            <Route
              path="/organizer/events"
              element={
                <PrivateRoute>
                  <OrgEvents />
                </PrivateRoute>
              }
            />
            <Route
              path="/organizer/event-details"
              element={
                <PrivateRoute>
                  <OrgEventDetails />
                </PrivateRoute>
              }
            />

            <Route
              path="/organizer/profile"
              element={
                <PrivateRoute>
                  <OrgProfile />
                </PrivateRoute>
              }
            />
          </Route>

          {/* Vendor routes */}
          <Route
            path="/vendor"
            element={
              <PrivateRoute>
                <UserLayout />
              </PrivateRoute>
            }
          >
            {/* Default redirect to "services" */}
            <Route index element={<Navigate to="services" />} />

            {/* Nested route for services */}
            <Route
              path="/vendor/services"
              element={
                <PrivateRoute>
                  <VendorDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/vendor/requests"
              element={
                <PrivateRoute>
                  <VendorRequests />
                </PrivateRoute>
              }
            />
            <Route
              path="/vendor/profile"
              element={
                <PrivateRoute>
                  <VendorProfile />
                </PrivateRoute>
              }
            />
          </Route>

          {/* Admin routes */}
          <Route
            path="/admin"
            exact
            element={
              <PrivateRoute>
                <UserLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="users" />} />
            <Route
              path="/admin/users"
              element={
                <PrivateRoute>
                  <AdminUsr />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/organizers"
              element={
                <PrivateRoute>
                  <AdminOrg />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/vendors"
              element={
                <PrivateRoute>
                  <AdminVendor />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/vendors-business"
              element={
                <PrivateRoute>
                  <AdminVendorBusiness />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/events"
              element={
                <PrivateRoute>
                  <AdminEvents />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/events-details"
              element={
                <PrivateRoute>
                  <AdminEventDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/suport-tickets"
              element={
                <PrivateRoute>
                  <AdminSupport />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/contact-requests"
              element={
                <PrivateRoute>
                  <AdminContact />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </div>

      <Footer />
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <ChatBot
          flow={flow}
          themes={themes}
          styles={styles}
          settings={settings}
        />
      </div>
    </div>
  );
}

export default App;
