const puppeteer = require("puppeteer")

async function testIspu() {
  console.log("Запустить браузер")
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
  })

  console.log("Открыть вкладку браузера")
  const page = await browser.newPage()

  console.log("Открыть страницу")
  await page.goto("http://localhost:3001/%D1%82%D0%B0%D1%80%D0%B8%D1%84s")

  console.log("Задать разрешение страницы")
  await page.setViewport({ width: 1080, height: 1024 })

  await page.screenshot({ path: "scrin_Tarifs.png" })

  console.log("Закрыть браузер")
  await browser.close()
}

scrin_Clients()
