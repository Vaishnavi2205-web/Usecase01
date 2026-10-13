import { Page, expect } from "@playwright/test";

import { TextValues } from "../utils/constant";
import { HomePageLocators } from "../utils/locator";
import { BasePage } from "./basePage";

export class OrganSearchPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  private redEyePage!: Page;
  public async searchHealthTopic(searchText: string, labelName: string) {
    await this.page.waitForLoadState();
    const searchBox = this.page.getByRole("searchbox", {
      name: "Search diseases, treatments, etc.",
      exact: true,
    });

    await expect(searchBox).toBeVisible();
    await searchBox.clear();

    // Type character by character
    // await searchBox.pressSequentially(searchText, { delay: 100 });

    // // Verify text actually entered
    // await expect(searchBox).toHaveValue(searchText);
    await searchBox.fill(searchText);
    await expect(searchBox).toHaveValue(searchText);
    await searchBox.press("Enter");

    const resultLink = this.page
      .locator(HomePageLocators.requestAppointment(labelName))
      .first();

    await expect(resultLink).toBeVisible({ timeout: 15000 });

    await resultLink.click();
  }

  public async verifyRedEye(linkName: string, expectedTitle: string) {
    this.redEyePage = await this.handleNewPage(
      HomePageLocators.healthLibraryLink(linkName),
    );
    await this.redEyePage.waitForLoadState();
    await this.scrollToFooter(this.redEyePage);
    await expect(this.redEyePage).toHaveTitle(new RegExp(expectedTitle, "i"));
    return this.redEyePage;
  }

  public async verifyCauseLink(linkName: string, expectedTitle: string) {
    const link = this.redEyePage.locator(
      HomePageLocators.healthLibraryLink(linkName),
    );

    await link.scrollIntoViewIfNeeded();

    const causeLinkPage = await this.handleNewPage(
      HomePageLocators.healthLibraryLink(linkName),
      this.redEyePage,
    );
    await causeLinkPage.waitForLoadState();
    await this.scrollToFooter(causeLinkPage);
    await expect(causeLinkPage).toHaveTitle(new RegExp(expectedTitle, "i"));
    await causeLinkPage.close();
  }
}
