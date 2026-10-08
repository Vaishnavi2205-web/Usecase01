Feature: Verify Cleveland Clinic application

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

  @run
  Scenario: Verify social media links in footer
    Given Launch Cleveland Clinic application
    When User scrolls to the footer
    Then User verifies "Facebook" social media link with URL "https://www.facebook.com/ClevelandClinic"
    And User verifies "X" social media link with URL "https://twitter.com/clevelandclinic"
    And User verifies "YouTube" social media link with URL "https://www.youtube.com/user/clevelandclinic"
    And User verifies "Instagram" social media link with URL "https://www.instagram.com/clevelandclinic/"
    And User verifies "LinkedIn" social media link with URL "https://www.linkedin.com/company/cleveland-clinic"
