const puppeteer = require("puppeteer")

async function 
scrin_Clients() {
  console.log("Запустить браузер")
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
  })

  console.log("Открыть вкладку браузера")
  const page = await browser.newPage()

  console.log("Открыть страницу")
  await page.goto("http://localhost:3001/%D0%BA%D0%BB%D0%B8%D0%B5%D0%BD%D1%82s")

  console.log("Задать разрешение страницы")
  await page.setViewport({ width: 1080, height: 1024 })

  await page.screenshot({ path: "scrin_Clients.png" })

  console.log("Закрыть браузер")
  await browser.close()
}

scrin_Clients()
