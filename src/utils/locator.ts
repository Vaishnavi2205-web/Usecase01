export const HomePageLocators = {
  logo: '[data-identity="logo"]',
  searchIcon: '[data-identity="search-icon"]',
  searchID: '[id="search-input"]',
  searchCount: '[class*="search-facets-title"]',
  searchResultList: ".list-item-article a",
  tabLink: '[role="tablist"] a',
  filterTab: (name: string) =>
    `//*[text()="${name}"]/ancestor::div[@role="button"]`,
  doctorsList:
    '[data-testid="ProviderCard"] [class^="ProviderCard--info"] [id^="view-details-"]',
  providerName: '[id="provider-name-header"]',
  doctorsRating: (doctorsName: string) =>
    `//*[text()="${doctorsName}"]/ancestor::div[contains(@class,"ProviderCard")]/following-sibling::div[@data-testid="ProviderRating"]/descendant::span[contains(@id,"rating-stars")]`,
  providerRating: '[data-testid="ratings-and-reviews-header"] span',
  header: "div h2",
  selectSpecialist: (specialist: string) =>
    `//span[text()="${specialist}"]/parent::label`,
  titleClick: (titleName: string) =>
    `//*[@data-identity="desktop-primary-nav"]/descendant::a[@data-identity="ss-link"][text()="${titleName}"]`,
  locationVerify: (location: String) => `//*[contains(@href,"${location}")]`,
  locationTypeDropdown: (filetrTypes: string) => `[id='${filetrTypes}_chosen']`,
  locationTypeOption: (filetrTypes: string) =>
    `[id='${filetrTypes}_chosen'] .chosen-results li`,
  healthCenterResult: ".list-item-location__title a",
  directionsButton:
    '//div[contains(@class,"--desktop")]/a[text()="Directions"]',
  appointmentButton: '//*[@data-identity="link-button"][text()="Appointments"]',
  requestAppointment: (respect: string) =>
    `//*[contains(text(),"${respect}")]/ancestor::a`,
  getId: (id: string) => `[id="${id}"]`,
  getButtonWithText: (buttonName: string) => `//button[text()="${buttonName}"]`,
  getStarted: '//a[text()="Get Started"]',
  providerSearchResult: (searchKey: string) => `[content*="${searchKey}"]`,
  logInButton: '//*[@data-identity="button-list"]/a[text()="Log In"]',
  navigationLink: '[data-identity="static-nav-links"]',
  healthLibrary: '//button/span[text()="Health Library"]',
  healthLibraryLink: (text: string) => `a:has-text("${text}")`,
  footer: "footer",
  socialMediaLocator: (mediaName: string) => `[alt*="${mediaName}"]`,
  webAppointment: '[href="/webappointment"]',
};
