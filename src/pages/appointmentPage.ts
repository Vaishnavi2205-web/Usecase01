import { Page, expect } from "@playwright/test";
import { HomePageLocators } from "../utils/locator";
import { getExcelData } from "../pages/excelReader";
import { FileDetails, TextValues } from "../utils/constant";
import { BasePage } from "./basePage";

export class AppointmentPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async clickRequestAppointment(): Promise<void> {
    try {
      const requestAppointment = this.page.locator(
        HomePageLocators.requestAppointment(TextValues.appointmentRequest),
      );

      await requestAppointment.scrollIntoViewIfNeeded();
      await expect(requestAppointment).toBeVisible();
      await requestAppointment.click();

      await this.takeScreenshot(this.page, TextValues.getStarted);
    } catch (error) {
      console.log("Request Appointment failed. Clicking Get Started instead.");

      const getStarted = this.page.locator(HomePageLocators.getStarted);

      await getStarted.scrollIntoViewIfNeeded();
      await expect(getStarted).toBeVisible();
      await getStarted.click();
    }
  }

  public async clickGetStarted(header: string, buttonName: string) {
    await expect(this.page.getByText(header)).toBeVisible();
    await this.page
      .locator(HomePageLocators.getButtonWithText(buttonName))
      .click();
  }

  public async fillPersonalDetails(
    header: string,
    filePath: string,
    sheetName: string,
    buttonName?: string,
    excelHeader?: string[],
  ) {
    await expect(this.page.getByText(header)).toBeVisible();
    if (excelHeader) {
      for (let i = 0; i < excelHeader.length; i++) {
        const data = getExcelData(filePath, sheetName, 2, excelHeader[i]);
        try {
          await this.page
            .locator(HomePageLocators.getId(excelHeader[i]))
            .fill(data);
        } catch {
          await this.page
            .locator(HomePageLocators.getId(excelHeader[i]))
            .selectOption(data);
        }
      }
      if (buttonName) {
        await this.page.getByText(buttonName).click();
      }
      await this.takeScreenshot(this.page, FileDetails.sheetName);
    }
  }
}
