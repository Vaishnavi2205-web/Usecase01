import { Page, expect } from "@playwright/test";

import { TextValues, DataTestIdValues } from "../utils/constant";
import { HomePageLocators } from "../utils/locator";
import { BasePage } from "./basePage";

let doctorName = "";
let doctorRating = "";
export class LocationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async navigateFindLocationPage() {
    const title = await this.page.title();
    expect(title).toBe(TextValues.findLocation);
  }

  public async verifyLocationPageSearch(location: string) {
    const search = this.page.locator(HomePageLocators.searchID);
    await search.fill(location);
    await search.press("Enter");
    await expect(
      this.page.locator(HomePageLocators.locationVerify(location)).first(),
    ).toBeVisible();
    const elements = await this.page.locator(
      HomePageLocators.locationVerify(location),
    );
    const count = await elements.count();
    expect(count).toBeGreaterThan(0);
  }
  public async selectLocationPageFilter(
    filterType: string,
    locationType: string,
  ) {
    await this.page
      .locator(HomePageLocators.locationTypeDropdown(filterType))
      .click();
    await this.page
      .locator(HomePageLocators.locationTypeOption(filterType))
      .filter({ hasText: locationType })
      .click();
    if (locationType === "types") {
      const result = this.page
        .locator(HomePageLocators.healthCenterResult)
        .first();
      await expect(result).toContainText(
        locationType.endsWith("s") ? locationType.slice(0, -1) : locationType,
      );
    }
    await expect(this.page.locator("#stats")).toContainText(/\d+\s+Location?/);
  }

  public async verifyDirectionsButton() {
    const newPage = await this.handleNewPage(HomePageLocators.directionsButton);
    await expect(newPage).toHaveURL(/maps/i);
    await this.takeScreenshot(newPage, TextValues.directions);
  }
}
