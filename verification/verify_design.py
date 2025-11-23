from playwright.sync_api import sync_playwright

def verify_frontend():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to homepage with correct basePath
        try:
            page.goto("http://localhost:3000/design/")
            page.wait_for_load_state("networkidle")

            # 1. Take screenshot of Hero and About section
            page.screenshot(path="verification/1_hero_about.png")
            print("Hero/About screenshot taken")

            # 2. Scroll to Skills and take screenshot
            page.locator("#skills").scroll_into_view_if_needed()
            page.wait_for_timeout(1000) # Wait for animations
            page.screenshot(path="verification/2_skills.png")
            print("Skills screenshot taken")

            # 3. Click a skill to open modal
            page.get_by_text("React").first.click()
            page.wait_for_timeout(500)
            page.screenshot(path="verification/3_skill_modal.png")
            print("Skill modal screenshot taken")

            # Close modal
            page.keyboard.press("Escape")
            page.wait_for_timeout(500)

            # 4. Scroll to Projects and open one
            page.locator("#projects").scroll_into_view_if_needed()
            page.wait_for_timeout(500)
            page.get_by_text("Forest Almanac").click()
            page.wait_for_timeout(1000)
            page.screenshot(path="verification/4_project_modal.png")
            print("Project modal screenshot taken")

            # 5. Type 'story' to reveal easter egg
            page.keyboard.type("story")
            page.wait_for_timeout(1000)
            page.screenshot(path="verification/5_project_easter_egg.png")
            print("Project easter egg screenshot taken")

            # Close modal
            page.keyboard.press("Escape")
            page.wait_for_timeout(500)

            # 6. Scroll to Contact
            page.locator("#contact").scroll_into_view_if_needed()
            page.wait_for_timeout(500)
            page.screenshot(path="verification/6_contact.png")
            print("Contact screenshot taken")

            # 7. Fill contact form and submit
            page.fill("#email", "test@test.com")
            page.fill("#message", "Hello there!")
            page.click("button[type=submit]")
            page.wait_for_timeout(2000) # Wait for simulation
            page.screenshot(path="verification/7_contact_success.png")
            print("Contact success screenshot taken")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")

        finally:
            browser.close()

if __name__ == "__main__":
    verify_frontend()
