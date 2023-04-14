const { chromium } = require("playwright");
//page.screenshot({ path: `example.png` });
const shops = [
  {
    name: "Microsoft",
    url: "https://www.xbox.com/en-us/games/forza-horizon-5",
    checkStock: async ({ page }) => {
      const content = await page.textContent(
        '[aria-label="GET IT NOW, Jump to purchase section"]'
      );
      const hasStock = content.includes("GET IT NOW") === true;
      return hasStock;
    },
  },
  {
    name: "Amazon",
    url: "https://www.amazon.com/Chromebook-convertible-Pantalla-pulgadas-CP314-1H-P9G7/dp/B09R5WWXZG/ref=sr_1_12_sspa?__mk_es_US=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1BLGC434WO2XX&keywords=asus%2Bzenbook%2Bfold&qid=1681421234&sprefix=asus%2Bzenbook%2Bfol%2Caps%2C174&sr=8-12-spons&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUExT1ZLRkVaUzZTT0xSJmVuY3J5cHRlZElkPUEwNDA2NDY3M0pIN1VDS0c4VEhQMiZlbmNyeXB0ZWRBZElkPUEwODA0ODgzMVowQlM1MkNHMTFKViZ3aWRnZXROYW1lPXNwX210ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU&th=1",
    checkStock: async ({ page }) => {
      const content = await page.textContent("#availability");
      const hasStock = content.includes("In Stock") === true;
      return hasStock;
    },
  },
];
(async () => {
  const browser = await chromium.launch({ headless: false });
  for (const shop of shops) {
    const { name, url, checkStock } = shop;

    const page = await browser.newPage();
    await page.goto(url);

    const hasStock = await checkStock({ page });
    console.log(`${name} has stock: ${hasStock ? "Yes" : "No"}`);
    await page.screenshot({ path: `.screenshots/${name}.png` });
    await page.close();
  }
  await browser.close();
})();
