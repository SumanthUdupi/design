from playwright.sync_api import sync_playwright
import time

def verify_design_system():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Wait for server to start
        try:
            page.goto("http://localhost:3000", timeout=30000)
        except Exception as e:
            print(f"Error navigating to page: {e}")
            return

        # Wait for fonts to load (approximate)
        time.sleep(2)

        # Take screenshot of the entire page
        page.screenshot(path="verification/home_page.png", full_page=True)

        # Verify theme toggle
        page.click(".theme-toggle")
        time.sleep(1)
        page.screenshot(path="verification/dark_mode.png", full_page=True)

        page.click(".theme-toggle")
        time.sleep(1)
        page.click(".theme-toggle") # Twilight
        time.sleep(1)
        page.screenshot(path="verification/twilight_mode.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    verify_design_system()
