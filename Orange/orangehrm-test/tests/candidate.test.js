const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
const fs = require("fs");

describe("OrangeHRM Candidate Test", function () {
    this.timeout(40000);

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser("firefox").build();
        
        // Login dulu
        await driver.get("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        await driver.wait(until.elementLocated(By.xpath("//img[@alt='company-branding']")), 10000);
        await driver.findElement(By.xpath("//input[@placeholder='Username']")).sendKeys("Admin");
        await driver.findElement(By.xpath("//input[@placeholder='Password']")).sendKeys("admin123");
        await driver.findElement(By.xpath("//button[@type='submit']")).click();

        await driver.wait(until.elementLocated(By.xpath("//h6[normalize-space()='Dashboard']")), 10000);
    
    });

    after(async function () {
        await driver.quit();
    });

    it("should add new candidate successfully", async function () {
        // Masuk ke menu Recruitment
        await driver.findElement(By.xpath("//span[@class='oxd-text oxd-text--span oxd-main-menu-item--name'][normalize-space()='Recruitment']")).click();
        await driver.sleep(1000);

        // Click Add
        await driver.findElement(By.xpath("//button[normalize-space()='Add']")).click();
        await driver.sleep(1000);

        // Isi form
        await driver.wait(until.elementLocated(By.xpath("//h6[normalize-space()='Add Candidate']")), 10000);
        await driver.findElement(By.xpath("//input[@placeholder='First Name']")).sendKeys("John");
        await driver.findElement(By.xpath("//input[@placeholder='Last Name']")).sendKeys("Doe");
        await driver.findElement(By.xpath("(//input[@placeholder='Type here'])[1]")).sendKeys("johndoe@example.com");

        // Submit
        await driver.findElement(By.xpath("//button[@type='submit']")).click();

        // Tunggu notifikasi / table update
        await driver.sleep(2000);

        // Assertion: cek nama muncul di list
        let candidateName = await driver.wait(until.elementLocated(By.xpath("//a[normalize-space()='Candidates']")), 10000);
        assert.strictEqual(candidateName, "John Doe");
        await driver.sleep(2000);

        // Screenshot bukti
        let image = await driver.takeScreenshot();
        fs.writeFileSync("screenshots/candidate.png", image, "base64");
    });
});
