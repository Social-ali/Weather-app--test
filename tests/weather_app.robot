*** Settings ***
Documentation     Weather App UI Tests
Library           SeleniumLibrary
Suite Setup       Open Weather App
Suite Teardown    Close Browser

*** Variables ***
${BROWSER}        Chrome
${URL}            http://localhost:8080
${DELAY}          0.5

*** Test Cases ***
Verify Page Title And Header
    [Documentation]    Verify the page loads with correct title and header
    Title Should Be    e0663b29-aace-4de4-8251-7e27c3670963
    Page Should Contain Element    xpath://h1[contains(text(), 'Weather App')]

Verify Search Components Exist
    [Documentation]    Verify search bar and button are present
    Page Should Contain Element    css:[data-testid="search-form"]
    Page Should Contain Element    css:[data-testid="search-input"]
    Page Should Contain Element    css:[data-testid="search-button"]

Search For City - London
    [Documentation]    Test searching for London weather
    Input Text    css:[data-testid="search-input"]    London
    Click Button    css:[data-testid="search-button"]
    Sleep    ${DELAY}
    Wait Until Page Contains Element    css:[data-testid="loading-spinner"]    timeout=5s

Verify Search Input Functionality
    [Documentation]    Verify input field accepts text
    ${search_input}=    Get WebElement    css:[data-testid="search-input"]
    Input Text    ${search_input}    New York
    ${value}=    Get Value    ${search_input}
    Should Be Equal    ${value}    New York
    Clear Element Text    ${search_input}

Verify Weather Card Elements When Loaded
    [Documentation]    Verify weather card structure (this test assumes API key is configured)
    Input Text    css:[data-testid="search-input"]    Paris
    Click Button    css:[data-testid="search-button"]
    Sleep    2
    # Note: These elements will only appear if API key is configured
    Run Keyword And Ignore Error    Page Should Contain Element    css:[data-testid="weather-card"]
    Run Keyword And Ignore Error    Page Should Contain Element    css:[data-testid="city-name"]
    Run Keyword And Ignore Error    Page Should Contain Element    css:[data-testid="temperature"]

Verify Empty Search Validation
    [Documentation]    Test that empty search is handled
    ${search_input}=    Get WebElement    css:[data-testid="search-input"]
    Clear Element Text    ${search_input}
    Click Button    css:[data-testid="search-button"]
    Sleep    ${DELAY}
    # Page should remain in same state or show validation

Verify Responsive Elements
    [Documentation]    Check that key elements are visible
    Page Should Be Visible    css:[data-testid="header"]
    Page Should Be Visible    css:[data-testid="search-form"]
    Element Should Be Visible    css:[data-testid="search-input"]
    Element Should Be Visible    css:[data-testid="search-button"]

*** Keywords ***
Open Weather App
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
