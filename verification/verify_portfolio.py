from playwright.sync_api import sync_playwright
import time

def verify_portfolio():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the page
        page.goto("http://localhost:3000")

        # Wait for animations to settle
        time.sleep(3)

        # Take a full page screenshot
        page.screenshot(path="verification/portfolio_full.png", full_page=True)

        # Verify Hero section
        hero_heading = page.wait_for_selector("h1")
        print(f"Hero heading found: {hero_heading.inner_text()}")

        # Verify About section
        about_section = page.wait_for_selector("#about")
        print("About section found")

        # Verify Projects Grid
        projects_grid = page.wait_for_selector("#projects")
        print("Projects section found")

        # Verify Skills
        skills_section = page.wait_for_selector("#skills")
        print("Skills section found")

        # Verify Contact
        contact_section = page.wait_for_selector("#contact")
        print("Contact section found")

        # Verify Footer
        footer = page.wait_for_selector("footer")
        print("Footer found")

        # Verify Theme Toggle
        theme_toggle = page.wait_for_selector("button[aria-label='Toggle theme']")
        print("Theme toggle found")

        # Test Project Modal Opening
        first_project = page.wait_for_selector(".project-card")
        first_project.click()
        time.sleep(1) # Wait for modal animation

        modal = page.wait_for_selector("[role='dialog']")
        if modal.is_visible():
            print("Project modal opened successfully")
            page.screenshot(path="verification/project_modal.png")

            # Close modal
            close_btn = page.wait_for_selector("[aria-label='Close modal']")
            close_btn.click()
            time.sleep(1)

        # Test Skills Hover
        skill_card = page.wait_for_selector(".skill-card")
        skill_card.hover()
        time.sleep(0.5)
        page.screenshot(path="verification/skill_hover.png")
        print("Skill hover interaction captured")

        browser.close()

if __name__ == "__main__":
    verify_portfolio()
