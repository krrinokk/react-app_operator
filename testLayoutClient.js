const puppeteer = require("puppeteer")

async function testLayout() {
  console.log("Запустить браузер")
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
  })
  console.log("Открыть вкладку браузера")
  const page = await browser.newPage()

  console.log("Открыть страницу клиентской базы")
  await page.goto("http://localhost:3001/%D0%BA%D0%BB%D0%B8%D0%B5%D0%BD%D1%82s")



  const pagination = await page.$("#root > section > section > section > main > div > div.ant-table-wrapper.css-dev-only-do-not-override-htwhyh > div > div > ul")
  if (!pagination) {
    console.log("Не найдена пагинация!")
  }
  if (pagination) {
    console.log("Найдена пагинация!")
  }
  if (pagination) {
    // Используйте evaluate для выполнения кода в контексте браузера
    const lastPageNumber = await page.evaluate((pagination) => {
      // Извлеките число страниц из текста или атрибутов, аналогично предыдущему коду
      // Пример: извлечение числа из атрибута title
      const lastPageElement = pagination.querySelector(':last-child');
      return parseInt(lastPageElement.getAttribute('title'));
    }, pagination);

    console.log(`Номер последней страницы: ${lastPageNumber}`);
  } else {
    console.log('Элемент пагинации не найден');
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
  if (footer) {
    console.log("Найден footer!")
  }
  const menu = await page.$("#root > section > section > aside > div > ul")
  if (!menu) {
    console.log("Отсутствует меню переключения страниц!")
  }
  if (menu) {
    console.log("Найдено меню переключения страниц!")
  }
  
 
  const action = await page.$("#root > section > section > section > main > div > div.ant-table-wrapper.css-dev-only-do-not-override-htwhyh > div > div > div > div > div > table > thead > tr > th:nth-child(4)")
  if (!action) {
    console.log("Отсутствует пункт для действий с клиентами!")
  }
  if (action) {
    console.log("Найден пункт для действий с клиентами!")
  }
  
  const account = await page.$("#root > section > header > ul > li:nth-child(4)")
  if (!account) {
    console.log("Отсутствует кнопка просмотра аккаунта!")
  }
  if (account) {
    console.log("Найдена кнопка просмотра аккаунта!")
  }
  const filters = await page.$("#root > section > section > section > main > div > div.filters");

  if (!filters) {
    console.log("Отсутствуют фильтры для поиска!");
  } else {
    const searchFilterSpan = await filters.$("span");
    const block = await filters.$("div > label.ant-radio-button-wrapper.ant-radio-button-wrapper-checked.css-dev-only-do-not-override-htwhyh > span.ant-radio-button.ant-radio-button-checked");
    const active = await filters.$("div > label.ant-radio-button-wrapper.ant-radio-button-wrapper-checked.css-dev-only-do-not-override-htwhyh > span.ant-radio-button.ant-radio-button-checked");
    if (searchFilterSpan) {
      console.log("Среди фильтров есть фильтр поиска по ФИО клиента!");
    } else {
      console.log("В фильтрах отсутствует фильтр поиска по ФИО клиента!");
    }
    if (block) {
      console.log("Среди фильтров есть фильтр поиска заблокированных клиентов!");
    } else {
      console.log("В фильтрах отсутствует фильтр поиска заблокированных клиентов!");
    }
    if (active) {
      console.log("Среди фильтров есть фильтр поиска активных клиентов!");
    } else {
      console.log("В фильтрах отсутствует фильтр поиска активных клиентов!");
    }
  }

  console.log("Закрыть браузер")
  await browser.close()
}

testLayout()
