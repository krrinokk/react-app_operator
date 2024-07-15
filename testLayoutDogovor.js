const puppeteer = require("puppeteer")

async function testLayout() {
  console.log("Запустить браузер")
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
  })
  console.log("Открыть вкладку браузера")
  const page = await browser.newPage()

  console.log("Открыть страницу договоров")
  await page.goto("http://localhost:3001/dogovors")

  console.log("Задать разрешение страницы")
  await page.setViewport({ width: 1080, height: 1024 })

  const pagination = await page.$("#root > section > section > section > main > ul")
  if (!pagination) {
    console.log("Не найдена пагинация!")
  }
  if (pagination) {
    console.log("Найдена пагинация!")
  }

  const contentSelector = "#root > section > section > section > main";
  const h2Selector = `${contentSelector} > h2:nth-child(7)`;
  
 
  const home = await page.$("#root > section > section > section > nav > ol > a")
  if (!home) {
    console.log("Не найдена ссылка на главную страницу!")
  }
  if (home) {
    console.log("Найдена ссылка на главную страницу!")
  }

  const zagolovok = await page.$("#root > section > section > section > main > h2:nth-child(2)")
  if (!zagolovok) {
    console.log("Не найден заголовок у таблицы!");
  } else {
    const zagolovokText = await page.evaluate(element => element.textContent, zagolovok);
    console.log("Найден заголовок таблицы:", zagolovokText);
  }

  const contentElement = await page.$(contentSelector);
  if (!contentElement) {
    console.log("Контент не найден.");
  } else {
    const h2Element = await contentElement.$(h2Selector);
    if (!h2Element) {
      console.log(`Больше заголовков не присутствует ${contentSelector}`);
    } else {
      const h2Text = await page.evaluate(element => element.textContent, h2Element);
      console.log(`Внутри контента была найдена : ${h2Text}`);
    }
  }
  
  
  const button1Element = await page.$("#root > section > section > section > main > button:nth-child(9)");
  const button2Element = await page.$("#root > section > section > section > main > button:nth-child(10)");
  
  if (!button1Element) {
    console.log(`Не найдена кнопка.. ${button1Selector}`);
  } else {
    const button1Text = await page.evaluate(element => element.textContent, button1Element);
    console.log(`Была найдена кнопка "${button1Text}"`);
  }
  
  if (!button2Element) {
    console.log(`Не найдена кнопка.. ${button2Selector}`);
  } else {
    const button2Text = await page.evaluate(element => element.textContent, button2Element);
    console.log(`Была найдена кнопка "${button2Text}"`);
  }
  


  const header = await page.$("#root > section > header > ul")
  if (!header) {
    console.log("Не найден header!")
  }
  if (header) {
    console.log("Найден header!")
  }

  const footer = await page.$("#root > section > section > section > footer")
  if (!footer) {
    console.log("Не найден footer!")
  }
  const content = await page.$("#root > section > section > section > main")
  if (!content) {
    console.log("Не найден content!")
  }



  const menu = await page.$("#root > section > section > aside > div > ul")
  if (!menu) {
    console.log("Отсутствует меню переключения страниц!")
  }

  const account = await page.$("#root > section > header > ul > li:nth-child(4)")
  if (!account) {
    console.log("Отсутствует кнопка просмотра аккаунта! Пользователь не авторизован!")
  }





  console.log("Закрыть браузер")
  await browser.close()
}

testLayout()
