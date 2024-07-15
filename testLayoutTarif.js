const puppeteer = require("puppeteer")

async function testLayout() {
  console.log("Запустить браузер")
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
  })
  console.log("Открыть вкладку браузера")
  const page = await browser.newPage()

  console.log("Открыть страницу тарифных планов")
  await page.goto("http://localhost:3001/%D1%82%D0%B0%D1%80%D0%B8%D1%84s")

  console.log("Задать разрешение страницы")
  await page.setViewport({ width: 1080, height: 1024 })

  const pagination = await page.$("#root > section > section > section > main > div > form > div > div > div > ul")
  if (!pagination) {
    console.log("Не найдена пагинация!")
  }
  if (pagination) {
    console.log("Найдена пагинация!")
  }

  
  const home = await page.$("#root > section > section > section > nav > ol > a")
  if (!home) {
    console.log("Не найдена ссылка на главную страницу!")
  }
  if (home) {
    console.log("Найдена ссылка на главную страницу!")
  }

  const zagolovok = await page.$("#root > section > section > section > main > div > div > h2")
  if (!zagolovok) {
    console.log("Не найден заголовок у таблицы!");
  } else {
    const zagolovokText = await page.evaluate(element => element.textContent, zagolovok);
    console.log("Найден заголовок таблицы:", zagolovokText);
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

  const filters = await page.$("#root > section > section > section > main > div > div.filters");

  if (!filters) {
    console.log("Отсутствуют фильтры для поиска!");
  } else {
    const searchFilterSpan = await filters.$("span");
    const block = await filters.$("div > label.ant-radio-button-wrapper.ant-radio-button-wrapper-checked.css-dev-only-do-not-override-htwhyh > span.ant-radio-button.ant-radio-button-checked");
    const active = await filters.$("div > label.ant-radio-button-wrapper.ant-radio-button-wrapper-checked.css-dev-only-do-not-override-htwhyh > span.ant-radio-button.ant-radio-button-checked");
    if (searchFilterSpan) {
      console.log("Среди фильтров есть фильтр поиска по названию тарифа!");
    } else {
      console.log("В фильтрах отсутствует фильтр поиска по названию тарифа!");
    }
    if (block) {
      console.log("Среди фильтров есть фильтр поиска архивных тарифов!");
    } else {
      console.log("В фильтрах отсутствует фильтр поиска архивных тарифов!");
    }
    if (active) {
      console.log("Среди фильтров есть фильтр поиска активных тарифов!");
    } else {
      console.log("В фильтрах отсутствует фильтр поиска активных тарифов!");
    }
  }

  console.log("Закрыть браузер")
  await browser.close()
}

testLayout()
