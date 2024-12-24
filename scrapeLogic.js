const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  try {
    console.log(0);
    const url = "https://vivicomi.life/hy-vong-ve-tuong-lai-cua-be-con-that-u-am-chap-5/"
    const browser = await puppeteer.launch({
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    });


    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    console.log(2);

    const asd = await page.waitForSelector(".view-chapter");
    const imageSrc = []
    console.log(asd);
    const images = await page.evaluate(() => {
      console.log(123);

      const thumbnails = document.querySelectorAll('.view-chapter');
      console.log(4);

      thumbnails.forEach(thumbnail => {
        const imgs = thumbnail.querySelectorAll('img');
        console.log(imgs);
      });
    });
    await browser.close();
    return 0

  } catch (err) {
    return console.log({ "error getImageVycomic": err })
  }

};

module.exports = { scrapeLogic };
