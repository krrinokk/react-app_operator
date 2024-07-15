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

  console.log("Переход на страницу клиентов.")
  await page.goto("http://localhost:3001/%D0%BA%D0%BB%D0%B8%D0%B5%D0%BD%D1%82s")
  await page.setViewport({ width: 1080, height: 1024 })

  const loginButtonSelector = "#root > section > header > ul > li:nth-child(1)";
  await page.waitForSelector(loginButtonSelector);
  await page.click(loginButtonSelector);

  
  const emailInputSelector = "#basic_email";
  const passwordInputSelector = "#basic_password";
  await page.waitForSelector(emailInputSelector);
  await page.waitForSelector(passwordInputSelector);

  
  await page.type(emailInputSelector, "operatorKE@gmail.com");
  await page.type(passwordInputSelector, "Aa123456!");

  console.log("Заходим в аккаунт оператора.")
  const submitButtonSelector = "#basic > div:nth-child(4) > div > div > div > div > button";
  await page.click(submitButtonSelector);
  await delay(4000)
  const buttonClient = "#root > section > section > aside > div > ul > li:nth-child(3)";
  await page.waitForSelector(buttonClient);
  await page.click(buttonClient);

  console.log("Поиск элемента и ввод ФИО клиента.")
  const searchField = await page.$("#root > section > section > section > main > div > div.filters > span > input")
  await searchField.type("Иванов")


  await delay(5000)

  console.log("Поиск элемента с названием 'Результаты поиска'.")
  const resultContent = await page.$("#root > section > section > section > main > div > div.ant-table-wrapper.css-dev-only-do-not-override-htwhyh > div > div > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2)")

  if (!resultContent) {
    console.log("Клиенты не найдены!")
  }
  if (resultContent) {
    console.log("Клиенты найдены!")
  }
 
 const buttonSelector = "#root > section > section > section > main > button";
 await page.waitForSelector(buttonSelector);
 await page.click(buttonSelector);

 console.log("Добавляем нового клиента.")
 const modalSelector = "body > div:nth-child(3) > div > div.ant-modal-wrap";
 await page.waitForSelector(modalSelector);

 console.log("Вводим данные нового клиента.")
 await page.type("body > div:nth-child(3) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-body > input:nth-child(2)", "33");
 await page.type("body > div:nth-child(3) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-body > input:nth-child(5)", "100");
 await page.type("body > div:nth-child(3) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-body > input:nth-child(8)", "Фомин Ф.Ф.");

 console.log("Подтверждаем сохранение.")
 const okButtonSelector = "body > div:nth-child(3) > div > div.ant-modal-wrap > div > div.ant-modal-content > div.ant-modal-footer > button.ant-btn.css-dev-only-do-not-override-htwhyh.ant-btn-primary";
 await page.click(okButtonSelector);

 await delay(4000)

  await browser.close()
}

testCaseClient()
