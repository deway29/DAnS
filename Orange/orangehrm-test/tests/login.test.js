const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
const fs = require("fs");

describe("OrangeHRM Login Test", function () {
    this.timeout(30000); // max 30 detik

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser("firefox").build();
    });

    after(async function () {
        await driver.quit();
    });

    it("should login successfully", async function () {
        await driver.get("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

        // Tunggu sampai dashboard muncul
        await driver.wait(until.elementLocated(By.xpath("//img[@alt='company-branding']")), 10000);

        // Input username & password
        await driver.findElement(By.xpath("//input[@placeholder='Username']")).sendKeys("Admin");
        await driver.findElement(By.xpath("//input[@placeholder='Password']")).sendKeys("admin123");

        // Click login
        await driver.findElement(By.xpath("//button[@type='submit']")).click();

        // Tunggu sampai dashboard muncul
        await driver.wait(until.elementLocated(By.xpath("//h6[normalize-space()='Dashboard']")), 10000);

        // Assertion: Dashboard muncul
        let dashboard = await driver.findElement(By.xpath("//h6[normalize-space()='Dashboard']")).getText();
        assert.strictEqual(dashboard, "Dashboard");

        // Screenshot bukti login
        let image = await driver.takeScreenshot();
        fs.writeFileSync("screenshots/login.png", image, "base64");
    });
});