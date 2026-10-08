import { Page, expect } from "@playwright/test";

import {
  TextValues,
  DataTestIdValues,
  PlaceHolderValue,
  FilterTabValue,
} from "../utils/constant";
import { HomePageLocators } from "../utils/locator";
import { BasePage } from "./basePage";

export class ProviderSearchPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async providerSearch(keyword: string) {
    await this.page.waitForLoadState();
    const searchBox = this.page.getByPlaceholder(TextValues.findHelpSearch);

    await expect(searchBox).toBeVisible();
    await searchBox.fill(keyword);
    await searchBox.press("Enter");

    await expect(
      this.page.getByRole("heading", { name: "Search results" }),
    ).toBeVisible();
  }

  public async verifyLocationFilter(location: string) {
    await this.page.waitForLoadState();
    await expect(
      this.page.locator(HomePageLocators.filterTab(FilterTabValue.location)),
    ).toBeVisible();
    await this.page
      .locator(HomePageLocators.filterTab(FilterTabValue.location))
      .click();
    const locationFilter = this.page.getByPlaceholder(
      PlaceHolderValue.cityState,
    );
    await locationFilter.click();
    await locationFilter.fill(location);
    await locationFilter.press("Enter");
  }

  public async clickLanguageonFilter(language: string) {
    await this.page
      .locator(HomePageLocators.filterTab(FilterTabValue.language))
      .click();
    const testId = `facet-${language
      .toLowerCase()
      .replace(/\s+/g, "-")}-provider-languages`;
    await this.page.getByTestId(testId).click();
  }

  public async clickRequestProvider() {
    await this.page.waitForLoadState();
    await expect(
      this.page.getByTestId(DataTestIdValues.providerBookingRequest),
    ).toBeVisible();
    await this.page
      .getByTestId(DataTestIdValues.providerBookingRequest)
      .click();
  }

  public async submitRequestForm() {
    const requestPage = await this.handleNewPage(
      HomePageLocators.requestAppointment(TextValues.submitAppointmentForm),
    );
    await requestPage.getByText(TextValues.virtualVisits).click();

    const accessPagePromise = requestPage.context().waitForEvent("page");

    const accessButton = requestPage.getByText(TextValues.accessOnComputer);

    const loginButton = requestPage.locator(HomePageLocators.logInButton);

    if (await accessButton.isVisible()) {
      await accessButton.click();
    } else {
      await loginButton.click();
    }

    const accessPage = await accessPagePromise;
    await accessPage.waitForLoadState();
    await expect(accessPage).toHaveURL(/Login/i);
    await this.takeScreenshot(accessPage, "AccessPage");
  }
}
