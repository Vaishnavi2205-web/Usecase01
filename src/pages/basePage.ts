import { Page, expect } from "@playwright/test";
import { baseURl, TextValues } from "../utils/constant";
import { HomePageLocators } from "../utils/locator";

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async launchURL() {
    await this.page.goto(baseURl);
  }

  public async verifyURL(textData: string, endpoint: string) {
    await this.page.getByText(textData).click();
    await expect(this.page).toHaveURL(baseURl + endpoint);
  }

  public async verifyTitle(textData: string, title: string) {
    await this.page.getByText(textData, { exact: true }).click();
    await expect(this.page).toHaveTitle(title);
  }

  public async clickSearchIcon(keyword: string, homePage?: true) {
    await this.page.locator(HomePageLocators.searchIcon).last().click();
    await this.page.reload();
    const search = this.page.getByPlaceholder(TextValues.findHelpSearch);
    await search.fill(keyword);
    await search.press("Enter");
    const keywordLink = this.page.getByRole("link", {
      name: keyword,
      exact: true,
    });
    await expect(keywordLink).toBeVisible();
    await expect(this.page.locator("#site-stats-main")).toContainText(
      /\d+\s+Results?/,
    );
  }

  public async takeScreenshot(page: Page, testName: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `${testName}_${timestamp}.png`;
    await page.screenshot({
      path: `src/screenshot/${fileName}`,
      fullPage: true,
    });
  }

  public async verifyPageTitle(expectedTitle: string, page?: Page) {
    const currentPage = page ?? this.page;

    await expect(currentPage).toHaveTitle(new RegExp(expectedTitle, "i"));
  }

  public async handleNewPage(locator: string): Promise<Page> {
    const newPagePromise = this.page.context().waitForEvent("page");
    await this.page.locator(locator).first().click();
    const newPage = await newPagePromise;
    await newPage.waitForLoadState("domcontentloaded");
    return newPage;
  }
}
