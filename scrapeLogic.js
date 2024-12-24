const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  try {
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
    await page.waitForSelector(".view-chapter");
    const images = await page.evaluate(() => {
      const thumbnails = document.querySelectorAll('.view-chapter');
      const imgSrcs = [];
      thumbnails.forEach(thumbnail => {
        const imgs = thumbnail.querySelectorAll('img');
        imgs.forEach((img, index) => {
          const imageAtb = img.getAttribute('src')
          if (imageAtb == "https://vivicomi.live/wp-content/uploads/2024/11/10916059-copy-scaled.webp" ||
            imageAtb == 'https://vivicomi.live/wp-content/uploads/2024/11/10916059-copy-1-scaled.webp') {
            return
          }
          imgSrcs.push(imageAtb);
        });
      });
      return imgSrcs;
    });
    await browser.close();
    console.log(imgSrcs);
    return imgSrcs
  } catch (err) {
    return console.log({ "error getImageVycomic": err })
  }

};

module.exports = { scrapeLogic };
