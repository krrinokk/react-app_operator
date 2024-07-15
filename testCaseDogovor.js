const puppeteer = require("puppeteer")

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

async function testCaseDogovor() {
  console.log("Запуск браузера.")
  const browser = await puppeteer.launch({ headless: false, slowMo: 100 })

  console.log("Создание новой вкладки в браузере.")
  const page = await browser.newPage()

  console.log("Переход на страницу договоров.")
  await page.goto("http://localhost:3001/dogovors")
  await page.setViewport({ width: 1080, height: 1024 })



  console.log("Осуществляем пагинацию на 2-ую страницу.")
  const element2 = "#root > section > section > section > main > ul > li.ant-pagination-item.ant-pagination-item-2 > a";
  await page.waitForSelector(element2);
  await page.click(element2);
 
  console.log("Осуществляем пагинацию на 3-ую страницу.")
  const element3 = " #root > section > section > section > main > ul > li.ant-pagination-item.ant-pagination-item-3 > a";
  await page.waitForSelector(element3);
  await page.click(element3);
 
 
  console.log("Возвращаемся в начало пагинации.")
  const element1 = " #root > section > section > section > main > ul > li.ant-pagination-item.ant-pagination-item-1 > a";
  await page.waitForSelector(element1);
  await page.click(element1);
  // console.log("Осуществляем вывод самого популярного тарифа.")
  // const buttonTarif = "#root > section > section > section > main > button:nth-child(10)";
  // await page.waitForSelector(buttonTarif);
  // await page.click(buttonTarif);


  console.log("Закрываем браузер.")
  await browser.close()
}

testCaseDogovor()
