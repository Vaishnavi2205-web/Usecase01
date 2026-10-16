Feature: Verify Cleveland Clinic Application

  Background:
    Given Launch Cleveland Clinic application


  @Respiratory
  Scenario: Verify Respiratory search and doctor profile
    Then Verify Cleveland Clinic logo
    When Search for "Respiratory"
    And Click on first search result on "Respiratory"
    Then Verify Respiratory page tabs
    When Click on "Our Doctors" tab
    And Apply Specialist filter as "Cardiology"
    Then Verify specialist filter results for "Cardiology"
    When Click on first Doctors profile on specialist list
    Then Verify Doctors profile details


  @Location
  Scenario: Verify Location and Directions page
    Then Verify Cleveland Clinic logo
    When Click on "Locations and Directions" button on home page
    Then Verify Location page is displayed
    When Search location as "Ohio"
    And Select "Health Centers" from "types" filter
    And Select "Asthma" from "specialties" filter
    And Select "Emergency Services" from "services" filter
    And Click on Directions button
    Then Verify Google Maps is opened
    And Capture screenshot "LocationDirections"


  @Appointment
  Scenario: Verify Request Appointment flow
    Then Verify Cleveland Clinic logo
    When Click on Appointment button on home page
    And Click on Request Appointment button
    Then Verify "Request an Appointment" page
    When Click on "Get Started"
    Then Verify "Who is this request for?" page
    When Click on "Me"
    Then Verify care history question is displayed
    When Select "Not sure"
    Then Verify personal details page is displayed
    When Fill personal details and click "Next"
    Then Verify contact details page is displayed
    When Fill contact details and click "Next"
    Then Verify appointment needs page is displayed
    When Fill appointment reason and click "Next"
    Then Verify appointment needs continuation page
    And Capture screenshot "AppointmentNeeds"


  @Provider
  Scenario: Verify Find a Provider
    Then Verify Cleveland Clinic logo
    When Navigate to "Find a Provider" from home page
    And Search for "Heart" in Provider Search bar
    And Select "East Cleveland, OH" from Location filter
    And Select "English" from Language filter
    And Apply Specialist filter as "Cardiac Surgery"
    Then Verify specialist filter results for "Cardiac Surgery"
    When Click on first Doctors profile on specialist list
    Then Verify Doctors profile details
    When Click on Request Appointment in Doctors Profile
    Then Verify Virtual Visit page
    When Click on "Access on Your Computer"
    Then Verify MyChart login page is displayed


  @HealthLibrary
  Scenario: Verify Health Library links
    Then Verify Health Library section
    When Click "Diseases & Conditions"
    Then Verify URL contains "/health/diseases" and title "Diseases & Conditions"
    And Navigate back to Health Library
    When Click "Diagnostics & Testing"
    Then Verify URL contains "/health/diagnostics" and title "Diagnostics & Testing"
    And Navigate back to Health Library
    When Click "Medical Treatments"
    Then Verify URL contains "/health/treatments" and title "Treatments"
    And Navigate back to Health Library
    When Click "Body Systems & Organs"
    Then Verify URL contains "/health/body" and title "Body Systems & Organs"
    And Navigate back to Health Library
    When Click "Drugs, Devices & Supplements"
    Then Verify URL contains "/health/drugs" and title "Drugs, Devices & Supplements"


  @SocialMedia
  Scenario: Verify social media links in footer
    When User scrolls to the footer
    Then User verifies "Facebook" social media link with URL "https://www.facebook.com/ClevelandClinic"
    And User verifies "X" social media link with URL "https://twitter.com/clevelandclinic"
    And User verifies "YouTube" social media link with URL "https://www.youtube.com/user/clevelandclinic"
    And User verifies "Instagram" social media link with URL "https://www.instagram.com/clevelandclinic/"
    And User verifies "LinkedIn" social media link with URL "https://www.linkedin.com/company/cleveland-clinic"


  @Actions
  Scenario: Verify Actions footer links
    When User scrolls to the footer
    Then Actions section should be displayed
    And User verifies all Actions footer links


  @RedEye
  Scenario: Verify Red Eye possible causes
    Then Verify Health Library section
    When Click "Body Systems & Organs"
    Then Verify URL contains "/health/body" and title "Body Systems & Organs"
    When Search for "Eyes" and click on "Eyes"
    And Click on "Red eye"
    Then Verify page title "Red eye"
    When Click on "Allergies"
    Then Verify page title "Allergies"
    When Click on "Blepharitis"
    Then Verify page title "Blepharitis"
    When Click on "Pink eye (conjunctivitis)"
    Then Verify page title "Pink Eye"
    When Click on "Dry eye"
    Then Verify page title "Dry Eye"
    When Click on "Eye injury"
    Then Verify page title "Eye Injury"
    When Click on "Glaucoma"
    Then Verify page title "Glaucoma"


  @MedicalProfessionals
  Scenario: Verify Medical Professionals and Need Help navigation
    When Click on "Medical Professionals" in header
    And Click on "Institutes & Departments"
    Then Verify page title "Institutes & Departments"
    When Click on "Blood Management"
    Then Verify page title "Blood Management"
    When Click on "Contact Us"
    And Navigate back
    Then Capture screenshot "BloodManagementContact"
    When Click on "Pharmacy"
    Then Verify page title "Pharmacy"
    And Navigate back
    When Click on "Take the Survey"
    And Click on "Need help?" in header
    And Click on "Parking"
    Then Verify page title "Parking"
    When Click on "Travel Assistance"
    And Click on "Global Patient Services"
    And Click on "Virtual Second Opinions"
    Then Verify page title "Get a Virtual Second Opinion"
    When Click on "Get Started"
    Then Capture screenshot "CreateAccount"


  @Resources
  Scenario: Verify Resources for Providers links
    When Click on "Careers" dropdown
    Then Verify redirected page title "Careers"
    And Return to homepage
    When Click on "Refer a Patient" dropdown
    And Open "Referring Physician Form" link
    Then Verify redirected page title "Medical Professionals Referring Physician Form"
    And Return to homepage
  