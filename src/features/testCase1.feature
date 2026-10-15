Feature: Verify Cleveland Clinic application

  @run
  Scenario: Verify Respiratory Search
    Given Launch Cleveland Clinic application
    Then Verify Cleveland Clinic logo
    When Search for "Respiratory"
    And Click on first search result on "Respiratory" 
    Then Verify Respiratory page tabs
    Then Click on Our Doctors tab and verify "Cardiology"    
    When Apply Specialist filter as "Cardiology" and verify the filter results
    Then Click on first Doctors profile on specialist list
    Then Verify Doctors profile details

  Scenario: Verify Location and Direction page
    Given Launch Cleveland Clinic application
    Then Verify Cleveland Clinic logo
    When click on "Locations and Directions" button on home page
    Then Verify Navigated to Location page
    And Verify Location Search bar with Location "Ohio"
    And Identify "types" filter in location Page and select "Health Centers" in the filter
    And Identify "specialties" filter in location Page and select "Asthma" in the filter
    And Identify "services" filter in location Page and select "Emergency Services" in the filter
    Then verify Google map is open when click on Directions button and take screenshot of the page 

  Scenario: Verify Appointment page
    Given Launch Cleveland Clinic application
    Then Verify Cleveland Clinic logo
    When click on Appointment button on home page
    Then click on request appointment button on Appointment Page
    And verify "Request an Appointment" page loads and click on "Get Started"
    And verify "Who is this request for?" page loads and click on "Me"
    And verify "Have you received care at Cleveland Clinic within the last three years?" page loads and click on "Not sure"
    And verify "Please help us get to know you better." page loads and fill the personal details and click "Next"
    And verify "How can we contact you about your appointment?" page loads and fill the contact details and click "Next"
    And verify "Tell us about your appointment needs." page loads and fill the reason and click "Next"
    Then verify "Tell us about your appointment needs (cont.)." page loads and take screenshot

  Scenario: Verify Find a Provider page
    Given Launch Cleveland Clinic application
    Then Verify Cleveland Clinic logo
    When Navigate to "Find a Provider" button on home page
    When Search for "Heart" in Provider Search bar
    Then click location filter and select "East Cleveland, OH" Location
    And click Language filter and select as "English"
    When Apply Specialist filter as "Cardiac Surgery" and verify the filter results
    Then Click on first Doctors profile on specialist list
    Then Verify Doctors profile details
    When Click on Request for Appointment in the Doctors Profile
    Then Verify Virtual visit page loads and click on Access on Your Computer button it Navigate to MyChart login Page 

Scenario: Verify Health Library links
  Given Launch Cleveland Clinic application
  Then Verify Health Library section
  When Click "Diseases & Conditions" and verify "/health/diseases" with title "Diseases & Conditions"
  And Navigate back to Health Library
  When Click "Diagnostics & Testing" and verify "/health/diagnostics" with title "Diagnostics & Testing"
  And Navigate back to Health Library
  When Click "Medical Treatments" and verify "/health/treatments" with title "Treatments"
  And Navigate back to Health Library
  When Click "Body Systems & Organs" and verify "/health/body" with title "Body Systems & Organs"
  And Navigate back to Health Library
  When Click "Drugs, Devices & Supplements" and verify "/health/drugs" with title "Drugs, Devices & Supplements"

  Scenario: Verify social media links in footer
    Given Launch Cleveland Clinic application
    When User scrolls to the footer
    Then User verifies "Facebook" social media link with URL "https://www.facebook.com/ClevelandClinic"
    And User verifies "X" social media link with URL "https://twitter.com/clevelandclinic"
    And User verifies "YouTube" social media link with URL "https://www.youtube.com/user/clevelandclinic"
    And User verifies "Instagram" social media link with URL "https://www.instagram.com/clevelandclinic/"
    And User verifies "LinkedIn" social media link with URL "https://www.linkedin.com/company/cleveland-clinic"

  Scenario: Verify all links under Actions section
    Given Launch Cleveland Clinic application
    When User scrolls to the footer
    Then Actions section should be displayed
    And user verifies all Actions footer links


  Scenario: Verify Red Eye possible causes
  Given Launch Cleveland Clinic application
  Then Verify Health Library section

  When Click "Body Systems & Organs" and verify "/health/body" with title "Body Systems & Organs"

  When user searches for "Eyes" search results should display and click on "Eyes" 

  Then user clicks "Red eye" and verifies page title "Red eye"

  Then user clicks "Allergies" and verifies new page title "Allergies"
  Then user clicks "Blepharitis" and verifies new page title "Blepharitis"
  Then user clicks "Pink eye (conjunctivitis)" and verifies new page title "Pink Eye"
  Then user clicks "Dry eye" and verifies new page title "Dry Eye"
  Then user clicks "Eye injury" and verifies new page title "Eye Injury"
  Then user clicks "Glaucoma" and verifies new page title "Glaucoma"

Scenario: Verify Institutes Departments, Blood Management, Pharmacy and Need Help navigation
  Given Launch Cleveland Clinic application
  Then click on "Medical Professionals" in header
  When user clicks on "Institutes & Departments"
  Then user verifies page title "Institutes & Departments"
  When user clicks on "Blood Management"
  Then user verifies page title "Blood Management"
  When user clicks on "Contact Us" and click "Back"
  Then user captures screenshot "BloodManagementContact" 
  When user clicks on "Pharmacy"
  Then user verifies page title "Pharmacy" and click "Back"
  When user clicks on "Take the Survey"   
  Then click on "Need help?" in header
  When user clicks on "Parking"
  Then user verifies page title "Parking"
  When user clicks on "Travel Assistance"
  When user clicks on "Global Patient Services"
  When user clicks on "Virtual Second Opinions"
  Then user verifies page title "Get a Virtual Second Opinion"
  When user clicks on "Get Started"
  Then user captures screenshot "CreateAccount"

Scenario: Verify Resources for Providers links
  Given Launch Cleveland Clinic application
  When user clicks on "Careers" dropdown
  Then user verifies the redirected page title as "Careers"
  And user returns to homepage
  When user clicks on "Refer a Patient" dropdown
  And user opens "Referring Physician Form" link
  Then user verifies the redirected page title as "Medical Professionals Referring Physician Form"
  And user returns to homepage
  When user clicks on "Consult QD" dropdown
  Then user verifies the redirected page title as "site for physicians and healthcare professionals"
  And user returns to homepage
  When user clicks on "Resources for Medical Professionals" dropdown
  And user opens "Education" link
  #Then user verifies the redirected page title as "Education"
  And user opens "Research" link
  #Then user verifies the redirected page title as "Medical Professionals Research"
  And user returns to homepage