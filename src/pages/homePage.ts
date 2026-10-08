import { Page, expect } from "@playwright/test";

import {
  TextValues,
  DataTestIdValues,
  FilterTabValue,
  baseURl,
} from "../utils/constant";
import { HomePageLocators } from "../utils/locator";
import { BasePage } from "./basePage";

let doctorName = "";
let doctorRating = "";
export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async verifyLogo() {
    await expect(this.page.locator(HomePageLocators.logo)).toBeVisible();
  }

  public async verifySearchResults(keyword: string) {
    await expect(
      this.page.locator(HomePageLocators.searchResultList).first(),
    ).toBeVisible();
    await this.page.locator(HomePageLocators.searchResultList).first().click();
    await this.verifyPageTitle(keyword);
  }

  public async verifyRespiratoryPageTab() {
    await expect(
      this.page.locator(HomePageLocators.tabLink).first(),
    ).toBeVisible();
    const tabs = this.page.locator(HomePageLocators.tabLink);
    await this.page.waitForLoadState();
    const count = await tabs.count();
    for (let i = 1; i < count; i++) {
      let tabName = await this.page
        .locator(HomePageLocators.tabLink)
        .nth(i)
        .innerText();
      await this.page.locator(HomePageLocators.tabLink).nth(i).click();
      expect(
        await this.page.locator(HomePageLocators.header).nth(i).innerText(),
      ).toBe(tabName);
    }
  }

  public async verifyOurDoctorsPage(specialist: string) {
    await this.page.getByText(TextValues.ourDoctor).click();
    const matchingProvider = this.page
      .getByTestId(DataTestIdValues.providerCard)
      .filter({ hasText: specialist });
    await expect(matchingProvider.first()).toBeVisible();
  }

  public async verifySpecialistFilter(specialist: string) {
    await this.page.waitForLoadState();
    await this.page
      .locator(HomePageLocators.filterTab(FilterTabValue.specialties))
      .click();
    await this.page
      .getByTestId(DataTestIdValues.specialistShowMoreButton)
      .click();
    const testId = `facet-${specialist
      .toLowerCase()
      .replace(/\s+/g, "-")}-provider-specialties-name`;
    await this.page.getByTestId(testId).click();
    await expect(
      this.page
        .getByRole("button", {
          name: new RegExp(specialist),
        })
        .first(),
    ).toBeVisible();
  }

  public async clickDoctorProfile() {
    await this.page.waitForLoadState();
    doctorName = await this.page
      .locator(HomePageLocators.doctorsList)
      .first()
      .innerText();
    doctorRating = await this.page
      .locator(HomePageLocators.doctorsRating(doctorName))
      .first()
      .innerText();
    await this.page.locator(HomePageLocators.doctorsList).first().click();
  }

  public async verifyDoctorProfile() {
    await expect(
      this.page.locator(HomePageLocators.providerName),
    ).toBeVisible();
    await this.verifyPageTitle(doctorName);
    await expect(this.page.locator(HomePageLocators.providerName)).toHaveText(
      doctorName,
    );
    await expect(
      this.page.locator(HomePageLocators.providerRating).first(),
    ).toHaveText(doctorRating);
    await this.takeScreenshot(this.page, doctorName);
  }
  public async clickNavigate(title: string): Promise<Page> {
    const newPage = await this.handleNewPage(
      HomePageLocators.titleClick(title),
    );
    return newPage;
  }

  public async clickAppointmentButton() {
    await this.page.locator(HomePageLocators.appointmentButton).click();
  }

  public async verifyHealthLibrary() {
    const healthLibrary = this.page
      .locator(HomePageLocators.healthLibrary)
      .last();

    await healthLibrary.scrollIntoViewIfNeeded();
    await expect(healthLibrary).toBeVisible();
    await healthLibrary.click();
  }
  public async verifyHealthLibraryLink(
    linkName: string,
    endpoint: string,
    expectedTitle: string,
  ) {
    await this.page
      .getByRole("link", { name: linkName, exact: true })
      .first()
      .click();

    await expect(this.page).toHaveURL(new RegExp(endpoint));

    await this.verifyPageTitle(expectedTitle);
  }

  public async navigateBackToHealthLibrary() {
    await this.launchURL();
    await this.verifyHealthLibrary();
  }

  public async scrollToFooter(): Promise<void> {
    const footer = this.page.locator("footer");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();
  }

  public async verifySocialMediaLink(
    mediaName: string,
    expectedUrl: string,
  ): Promise<void> {
    const socialMediaLink = this.page
      .locator(HomePageLocators.socialMediaLocator(mediaName))
      .first();
    await socialMediaLink.scrollIntoViewIfNeeded();
    await expect(socialMediaLink).toBeVisible();
    const newPage = await this.handleNewPage(
      HomePageLocators.socialMediaLocator(mediaName),
    );
    console.log("New Page URL:", newPage.url());
    console.log("New Page Title:", await newPage.title());

    await expect(newPage).toHaveURL(expectedUrl);
    await newPage.close();
  }

  private escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
}
