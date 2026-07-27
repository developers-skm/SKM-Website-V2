const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
  const page = await context.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForSelector('a[href="/quality_food_safety_traceability"]', { timeout: 15000, state: 'visible' });
  await page.click('a[href="/quality_food_safety_traceability"]');
  await page.waitForSelector('text=Can this supplier consistently deliver', { timeout: 15000 });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'C:/Users/it-web1/AppData/Local/Temp/claude/d--PROJECTS-skm-website-v3---Rework/62a85b96-e3df-4bea-9354-f387d197d565/scratchpad/q-hero.png' });

  await page.locator('#quality-gates').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'C:/Users/it-web1/AppData/Local/Temp/claude/d--PROJECTS-skm-website-v3---Rework/62a85b96-e3df-4bea-9354-f387d197d565/scratchpad/q-gates.png' });

  await page.locator('#laboratory-capabilities').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'C:/Users/it-web1/AppData/Local/Temp/claude/d--PROJECTS-skm-website-v3---Rework/62a85b96-e3df-4bea-9354-f387d197d565/scratchpad/q-lab.png' });

  await page.locator('#certifications-approvals').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'C:/Users/it-web1/AppData/Local/Temp/claude/d--PROJECTS-skm-website-v3---Rework/62a85b96-e3df-4bea-9354-f387d197d565/scratchpad/q-certs.png' });

  await browser.close();
  process.exit(0);
})();
