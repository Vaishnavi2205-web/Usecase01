import { Page, expect } from "@playwright/test";

import {
  TextValues,
  DataTestIdValues,
  FilterTabValue,
  actionsLinks,
  baseURl,
} from "../utils/constant";
import { HomePageLocators } from "../utils/locator";
import { BasePage } from "./basePage";

let doctorName = "";
let doctorRating = "";
let newPage: Page;
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
    newPage = await this.handleNewPage(HomePageLocators.titleClick(title));
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

  public async verifySocialMediaLink(
    mediaName: string,
    expectedUrl: string,
  ): Promise<void> {
    const socialMediaLink = this.page
      .locator(HomePageLocators.socialMediaLocator(mediaName))
      .first();
    await socialMediaLink.scrollIntoViewIfNeeded();
    await expect(socialMediaLink).toBeVisible();
    newPage = await this.handleNewPage(
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

  public async verifyActionsSectionDisplayed(): Promise<void> {
    try {
      const actionsSection = this.page.getByText("Actions", { exact: true });

      await actionsSection.scrollIntoViewIfNeeded();
      await expect(actionsSection).toBeVisible();

      console.log("Actions section is displayed successfully");
    } catch (error) {
      console.error("Actions section is not displayed", error);
      throw error;
    }
  }

  public async verifyActionsFooterLinks(): Promise<void> {
    try {
      for (const link of actionsLinks) {
        const element = this.page
          .getByRole("link", { name: link.linkName, exact: true })
          .last();
        // Verify link is displayed
        await expect(element).toBeVisible();
        // Verify correct link text
        await expect(element).toHaveText(link.linkName);
        if (link.newPage) {
          // Handle Events Calendar new window
          const newPagePromise = this.page.context().waitForEvent("page");
          await element.click();
          newPage = await newPagePromise;
          await newPage.waitForLoadState();
          await expect(newPage).toHaveURL(link.expectedUrl);
          await newPage.close();
        } else {
          // Normal link navigation
          await element.click();
          await this.page.waitForLoadState();
          await expect(this.page).toHaveURL(link.expectedUrl);
          // Navigate back to homepage
          await this.page.goBack();
          await this.page.waitForLoadState();
          // Scroll back to footer for next link
          await this.page.locator("footer").scrollIntoViewIfNeeded();
        }
      }
      console.log("All Actions footer links verified successfully");
    } catch (error) {
      console.error("Actions footer link verification failed", error);
      throw error;
    }
  }

  public async clickFeaturedDepartment(linkName: string) {
    try {
      const element = this.page.getByRole("link", { name: linkName }).first();
      await element.scrollIntoViewIfNeeded();
      await element.click();
    } catch (error) {
      throw error;
    }
  }

  public async verifyTitle(expectedTitle: string, back?: string) {
    try {
      await expect(this.page).toHaveTitle(new RegExp(expectedTitle, "i"));
      if (back) {
        await this.page.goBack();
      }
    } catch (error) {
      throw error;
    }
  }

  public async clickContactUs() {
    try {
      await this.page.getByRole("link", { name: "Contact Us" }).first().click();
    } catch (error) {
      throw error;
    }
  }

  public async captureScreenshot(name: string) {
    try {
      await this.page.screenshot({
        path: `screenshots/${name}.png`,
        fullPage: true,
      });
    } catch (error) {
      throw error;
    }
  }

  public async clickTakeSurvey() {
    try {
      const element = this.page.getByRole("link", { name: "Take the Survey" });
      await element.scrollIntoViewIfNeeded();
      await element.click();
    } catch (error) {
      throw error;
    }
  }

  public async clickNeedHelp() {
    try {
      await this.page.getByText("Need Help?").click();
    } catch (error) {
      throw error;
    }
  }

  public async clickMedicalProfessional(linkName: string) {
    await this.page.getByText(linkName).first().click();
  }

  public async clickLink(linkName: string, back?: string) {
    try {
      const element = this.page.getByRole("link", { name: linkName }).first();
      await element.scrollIntoViewIfNeeded();
      await element.click();
      if (back) {
        await this.page.goBack();
      }
    } catch (error) {
      throw error;
    }
  }

  public async clickResourcesProviderDropdown(dropdown: string) {
    const element = this.page
      .locator(HomePageLocators.resourcesProviderDropdown(dropdown))
      .first();

    await element.scrollIntoViewIfNeeded();
    await expect(element).toBeVisible();

    const newPagePromise = this.page
      .waitForEvent("popup", { timeout: 5000 })
      .catch(() => null);

    await element.click();

    const newPage = await newPagePromise;

    if (newPage) {
      await newPage.waitForLoadState("domcontentloaded");
      console.log("NewPage");
      return newPage; // New tab
    } else {
      await this.page.waitForLoadState("domcontentloaded");
      return this.page; // Same tab
    }
  }

  public async openResourcesProviderLink(linkName: string): Promise<Page> {
    const element = this.page
      .locator(HomePageLocators.healthLibraryLink(linkName))
      .first();

    await element.scrollIntoViewIfNeeded();
    await expect(element).toBeVisible();

    const newPagePromise = this.page
      .waitForEvent("popup", { timeout: 5000 })
      .catch(() => null);

    await element.click();

    const newPage = await newPagePromise;

    if (newPage) {
      await newPage.waitForLoadState("domcontentloaded");
      console.log("NewPage");
      return newPage; // New tab
    } else {
      await this.page.waitForLoadState("domcontentloaded");
      return this.page; // Same tab
    }
  }

  public async verifyResourcesProviderTitle(
    expectedTitle: string,
    newPage: Page,
  ) {
    await this.verifyPageTitle(expectedTitle, newPage);
  }

  public async returnToHomePage() {
    await this.page.goto(baseURl);
    await this.page.waitForLoadState("domcontentloaded");
  }
}
