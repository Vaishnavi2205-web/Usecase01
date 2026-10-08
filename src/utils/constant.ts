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
