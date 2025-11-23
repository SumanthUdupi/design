
import sys
import time
from playwright.sync_api import sync_playwright

def verify_visuals():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # Navigate to the local server
            print("Navigating to http://localhost:3000/design...")
            page.goto("http://localhost:3000/design")
            page.wait_for_load_state("networkidle")

            # Wait for animations to settle (Hero staggered text + blobs)
            print("Waiting for animations to settle...")
            time.sleep(2)

            # Screenshot of Hero Section
            print("Capturing Hero section...")
            page.screenshot(path="verification/hero_screenshot.png", clip={"x":0, "y":0, "width": 1200, "height": 600})

            # Hover over a project card and screenshot
            print("Hovering over project card and capturing...")
            card = page.locator(".project-card").first
            if card.count() > 0:
                card.hover()
                time.sleep(1) # Wait for hover animation
                page.screenshot(path="verification/card_hover_screenshot.png", clip={"x":0, "y":600, "width": 1200, "height": 600})
            else:
                print("Warning: No project cards found.")

            # Hover over theme toggle
            print("Hovering over theme toggle...")
            toggle = page.locator(".theme-toggle")
            if toggle.count() > 0:
                toggle.hover()
                time.sleep(0.5)
                toggle.screenshot(path="verification/theme_toggle_screenshot.png")

                # Click toggle to see transition
                toggle.click()
                time.sleep(0.5) # Wait for transition
                toggle.screenshot(path="verification/theme_toggled_screenshot.png")
            else:
                print("Warning: Theme toggle not found.")

            print("Verification screenshots captured.")

        except Exception as e:
            print(f"Verification failed: {e}")
            sys.exit(1)
        finally:
            browser.close()

if __name__ == "__main__":
    verify_visuals()
