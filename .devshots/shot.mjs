// Screenshot harness: real-time waits so heavy GLB parses finish before the shot.
// usage: node shot.mjs <url> <outfile> [waitMs] [clickText]
import puppeteer from "puppeteer-core";

const [url, out, waitMs = "9000", clickText] = process.argv.slice(2);

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--hide-scrollbars", "--window-size=1440,1600"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1600 });
page.on("console", (m) => {
  const t = m.text();
  if (/fieldtrip|error|fail|warn/i.test(t) && !/DevTools|deprecat/i.test(t)) console.log("[console]", t.slice(0, 300));
});
page.on("pageerror", (e) => console.log("[pageerror]", e.message.slice(0, 300)));
await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, Number(waitMs)));
if (clickText) {
  const clicked = await page.evaluate((label) => {
    const b = [...document.querySelectorAll("button")].find((x) => x.textContent.trim() === label);
    if (b) { b.click(); return true; }
    return false;
  }, clickText);
  console.log("[click]", clickText, clicked ? "ok" : "NOT FOUND");
  await new Promise((r) => setTimeout(r, 7000));
}
await page.screenshot({ path: out });
await browser.close();
console.log("[shot]", out);
