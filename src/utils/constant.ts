export const baseURl = "https://my.clevelandclinic.org/";

export enum TextValues {
  ourDoctor = "Our Doctors",
  vascularSurgery = "Vascular Surgery",
  cardiology = "Cardiology",
  findLocation = "Locations & Directions | Cleveland Clinic",
  directions = "Direction",
  getStarted = "Get Started",
  whoRequestFor = "Who is this request for?",
  appointmentRequest = "Request an Appointment",
  me = "Me",
  findHelpSearch = "What can we help you find?",
  submitAppointmentForm = "Submit appointment request form",
  virtualVisits = "Virtual Visits",
  accessOnComputer = "Access on Your Computer",
}

export enum DataTestIdValues {
  providerCard = "ProviderCard",
  providerList = "ProviderList",
  specialistShowMoreButton = "provider-specialties-name-facet-show-hide",
  specialistCardiology = "facet-cardiology-provider-specialties-name",
  providerBookingRequest = "provider-booking-button",
}

export const PersonalDetailsHeader = [
  "firstName",
  "lastName",
  "gender",
  "maritalStatus",
  "dob",
];

export const ContactDetailsHeader = [
  "address1",
  "city",
  "state",
  "zip",
  "email",
  "Phone number",
];

export const Reason = ["reason"];

export enum FileDetails {
  filePath = "src//testData//PersonalInformation.xlsx",
  sheetName = "PersonalDetails",
}

export enum PlaceHolderValue {
  cityState = "City, State or Zip",
}

export enum FilterTabValue {
  location = "Location",
  specialties = "Specialties",
  language = "Language",
}

export const actionsLinks = [
  {
    linkName: "Appointments & Access",
    expectedUrl: "https://my.clevelandclinic.org/patients/information/access",
    newPage: false,
  },
  {
    linkName: "Accepted Insurance",
    expectedUrl: "https://my.clevelandclinic.org/patients/accepted-insurance",
    newPage: false,
  },
  {
    linkName: "Events Calendar",
    expectedUrl: "https://events.clevelandclinic.org/",
    newPage: false,
  },
  {
    linkName: "Financial Assistance",
    expectedUrl:
      "https://my.clevelandclinic.org/patients/billing-finance/financial-assistance",
    newPage: false,
  },
  {
    linkName: "Give to Cleveland Clinic",
    expectedUrl: "https://my.clevelandclinic.org/giving",
    newPage: true,
  },
  {
    linkName: "Pay Your Bill Online",
    expectedUrl:
      "https://my.clevelandclinic.org/patients/billing-finance/payment-options",
    newPage: false,
  },
  {
    linkName: "Price Transparency",
    expectedUrl:
      "https://my.clevelandclinic.org/patients/billing-finance/comprehensive-hospital-charges",
    newPage: false,
  },
  {
    linkName: "Refer a Patient",
    expectedUrl: "https://my.clevelandclinic.org/professionals/referring",
    newPage: false,
  },
  {
    linkName: "Phone Directory",
    expectedUrl: "https://my.clevelandclinic.org/about/contact/phone-directory",
    newPage: false,
  },
  {
    linkName: "Virtual Second Opinions",
    expectedUrl:
      "https://my.clevelandclinic.org/online-services/virtual-second-opinions",
    newPage: false,
  },
  {
    linkName: "Virtual Visits",
    expectedUrl:
      "https://my.clevelandclinic.org/online-services/virtual-visits",
    newPage: false,
  },
];
