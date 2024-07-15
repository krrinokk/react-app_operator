const puppeteer = require("puppeteer")

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

async function testCaseClient() {
  console.log("Запуск браузера.")
  const browser = await puppeteer.launch({ headless: false, slowMo: 100 })

  console.log("Создание новой вкладки в браузере.")
  const page = await browser.newPage()

  console.log("Переход на страницу тарифов.")
  await page.goto("http://localhost:3001/%D1%82%D0%B0%D1%80%D0%B8%D1%84s")
  await page.setViewport({ width: 1080, height: 1024 })

  console.log("Поиск элемента и ввод названия тарифа.")
  const searchField = await page.$("#root > section > section > section > main > div > div > span > input")
  await searchField.type("Black")


  await delay(5000)

  console.log("Поиск элемента с названием 'Результаты поиска'.")
  const resultContent = await page.$("#root > section > section > section > main > div > form > div > div > div > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(4)")

  if (!resultContent) {
    console.log("Тарифы не найдены!")
  }
  if (resultContent) {
    console.log("Тарифы найдены!")
  }
 
 
  await browser.close()
}

testCaseClient()
