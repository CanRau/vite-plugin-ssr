import { autoRetry, fetchHtml, page, run, urlBase } from "../../tests/setup";

run("npm run start");

test("page content is rendered to HTML", async () => {
  const html = await fetchHtml("/");
  expect(html).toContain("<h1>Redux-Controlled Counter</h1>");
  expect(html).toContain("Count: <!-- -->0<!-- -->.");
  expect(html).toContain("pageProps: {PRELOADED_STATE:{value:0}");
});

test("page content is rendered to DOM", async () => {
  page.goto(`${urlBase}/`);
  expect(await page.textContent("body")).toContain("Count: 0.");
  // `autoRetry` because browser-side code may not be loaded yet
  await autoRetry(async () => {
    await page.click("button");
    expect(await page.textContent("body")).toContain("Count: 1.");
  });
});
