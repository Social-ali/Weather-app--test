# Robot Framework Tests for Weather App

This directory contains automated UI tests for the Weather App using Robot Framework and Selenium.

## Prerequisites

1. **Python 3.x** installed
2. **Robot Framework** and **SeleniumLibrary**:
   ```bash
   pip install robotframework
   pip install robotframework-seleniumlibrary
   ```
3. **WebDriver** for your browser:
   - Chrome: [ChromeDriver](https://chromedriver.chromium.org/)
   - Firefox: [GeckoDriver](https://github.com/mozilla/geckodriver)
   - Make sure the driver is in your system PATH

## Running the Tests

1. **Start the application**:
   ```bash
   npm run dev
   ```
   The app should be running on `http://localhost:8080`

2. **Run all tests**:
   ```bash
   robot tests/weather_app.robot
   ```

3. **Run specific test**:
   ```bash
   robot -t "Verify Page Title And Header" tests/weather_app.robot
   ```

4. **Run with different browser**:
   ```bash
   robot -v BROWSER:Firefox tests/weather_app.robot
   ```

## Test Reports

After running tests, Robot Framework generates:
- `report.html` - Detailed test execution report
- `log.html` - Detailed test execution log
- `output.xml` - Test results in XML format

## Test Cases Included

1. **Verify Page Title And Header** - Checks page loads correctly
2. **Verify Search Components Exist** - Validates UI elements presence
3. **Search For City - London** - Tests search functionality
4. **Verify Search Input Functionality** - Tests input field behavior
5. **Verify Weather Card Elements When Loaded** - Validates weather data display
6. **Verify Empty Search Validation** - Tests validation handling
7. **Verify Responsive Elements** - Checks element visibility

## Note on API Testing

Some tests check for weather data display, which requires a valid OpenWeatherMap API key configured in the app. Tests use `Run Keyword And Ignore Error` to gracefully handle cases where the API key is not configured.

## Customization

You can modify test variables in the `*** Variables ***` section:
- `${BROWSER}` - Change browser (Chrome, Firefox, Safari, etc.)
- `${URL}` - Change application URL
- `${DELAY}` - Adjust delay between actions

## Best Practices

1. Run tests against a stable environment
2. Ensure the app is fully loaded before running tests
3. Check test reports for detailed failure information
4. Keep test data-testids consistent with component changes
