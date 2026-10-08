import { createBdd } from "playwright-bdd";

const { Given, When, Then } = createBdd();
import { HomePage } from "../pages/homePage";
import { LocationPage } from "../pages/locationPage";
import { AppointmentPage } from "../pages/appointmentPage";
import { ProviderSearchPage } from "../pages/providerSearchPage";
import { HomePageLocators } from "../utils/locator";
import {
  ContactDetailsHeader,
  FileDetails,
  PersonalDetailsHeader,
  Reason,
} from "../utils/constant";

let homePage: HomePage;
let locationPage: LocationPage;
let appointmentPage: AppointmentPage;
let providerSearchPage: ProviderSearchPage;

Given("Launch Cleveland Clinic application", async ({ page }) => {
  homePage = new HomePage(page);
  appointmentPage = new AppointmentPage(page);
  await homePage.launchURL();
});

Then("Verify Cleveland Clinic logo", async ({}) => {
  await homePage.verifyLogo();
});

When("Search for {string}", async ({}, searchKeyword: string) => {
  await homePage.clickSearchIcon(searchKeyword, true);
});

When(
  "Click on first search result on {string}",
  async ({}, searchKeyword: string) => {
    await homePage.verifySearchResults(searchKeyword);
  },
);

Then("Verify Respiratory page tabs", async ({}) => {
  await homePage.verifyRespiratoryPageTab();
});

Then(
  "Click on Our Doctors tab and verify {string}",
  async ({}, specialist: string) => {
    await homePage.verifyOurDoctorsPage(specialist);
  },
);

When(
  "Apply Specialist filter as {string} and verify the filter results",
  async ({}, specialist: string) => {
    await homePage.verifySpecialistFilter(specialist);
  },
);

Then("Click on first Doctors profile on specialist list", async ({}) => {
  await homePage.clickDoctorProfile();
});

Then("Verify Doctors profile details", async ({}) => {
  await homePage.verifyDoctorProfile();
});

When("click on {string} button on home page", async ({}, title: string) => {
  const newPage = await homePage.handleNewPage(
    HomePageLocators.titleClick(title),
  );
  locationPage = new LocationPage(newPage);
});

Then("Verify Navigated to Location page", async ({}) => {
  await locationPage.navigateFindLocationPage();
});

Then(
  "Verify Location Search bar with Location {string}",
  async ({}, location: string) => {
    await locationPage.verifyLocationPageSearch(location);
  },
);

Then(
  "Identify {string} filter in location Page and select {string} in the filter",
  async ({}, arg: string, arg1: string) => {
    await locationPage.selectLocationPageFilter(arg, arg1);
  },
);

Then(
  "verify Google map is open when click on Directions button and take screenshot of the page",
  async ({}) => {
    await locationPage.verifyDirectionsButton();
  },
);
When("click on Appointment button on home page", async ({}) => {
  await homePage.clickAppointmentButton();
});

Then("click on request appointment button on Appointment Page", async ({}) => {
  await appointmentPage.clickRequestAppointment();
});

Then(
  "verify {string} page loads and click on {string}",
  async ({}, arg: string, arg1: string) => {
    await appointmentPage.clickGetStarted(arg, arg1);
  },
);

Then(
  "verify {string} page loads and fill the personal details and click {string}",
  async ({}, header: string, nextButton: string) => {
    await appointmentPage.fillPersonalDetails(
      header,
      FileDetails.filePath,
      FileDetails.sheetName,
      nextButton,
      PersonalDetailsHeader,
    );
  },
);

Then(
  "verify {string} page loads and fill the contact details and click {string}",
  async ({}, header: string, nextButton: string) => {
    await appointmentPage.fillPersonalDetails(
      header,
      FileDetails.filePath,
      FileDetails.sheetName,
      nextButton,
      ContactDetailsHeader,
    );
  },
);

Then(
  "verify {string} page loads and fill the reason and click {string}",
  async ({}, header: string, nextButton: string) => {
    await appointmentPage.fillPersonalDetails(
      header,
      FileDetails.filePath,
      FileDetails.sheetName,
      nextButton,
      Reason,
    );
  },
);

Then(
  "verify {string} page loads and take screenshot",
  async ({}, header: string) => {
    await appointmentPage.fillPersonalDetails(
      header,
      FileDetails.filePath,
      FileDetails.sheetName,
    );
  },
);

When("Navigate to {string} button on home page", async ({}, title: string) => {
  const newPage = await homePage.handleNewPage(
    HomePageLocators.titleClick(title),
  );
  providerSearchPage = new ProviderSearchPage(newPage);
  homePage = new HomePage(newPage);
});

When(
  "Search for {string} in Provider Search bar",
  async ({}, searchKey: string) => {
    await providerSearchPage.providerSearch(searchKey);
  },
);

Then(
  "click location filter and select {string} Location",
  async ({}, location: string) => {
    await providerSearchPage.verifyLocationFilter(location);
  },
);

Then(
  "click Language filter and select as {string}",
  async ({}, language: string) => {
    await providerSearchPage.clickLanguageonFilter(language);
  },
);

When("Click on Request for Appointment in the Doctors Profile", async ({}) => {
  await providerSearchPage.clickRequestProvider();
});

Then(
  "Verify Virtual visit page loads and click on Access on Your Computer button it Navigate to MyChart login Page",
  async ({}) => {
    await providerSearchPage.submitRequestForm();
  },
);

Then("Verify Health Library section", async () => {
  await homePage.verifyHealthLibrary();
});

When(
  "Click {string} and verify {string} with title {string}",
  async ({}, linkName: string, expectedURL: string, expectedResult: string) => {
    await homePage.verifyHealthLibraryLink(
      linkName,
      expectedURL,
      expectedResult,
    );
  },
);

When("Navigate back to Health Library", async () => {
  await homePage.navigateBackToHealthLibrary();
});

When('User scrolls to the footer', async ({}) => {
  await homePage.scrollToFooter();
});

Then('User verifies {string} social media link with URL {string}', async ({}, mediaName: string, expectedURL: string) => {
  await homePage.verifySocialMediaLink(mediaName, expectedURL);
});
