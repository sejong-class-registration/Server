const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const axios = require("axios");

async function crawling (id,pw){
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  // private
  
  await page.setViewport({
    width: 1366,
    height: 768
  });
  page.on("dialog", async (dialog) => {
    console.log(dialog.type(), dialog.message());
    await dialog.dismiss();
  });

  await page.goto("https://sjpt.sejong.ac.kr/main/view/Login/doSsoLogin.do?p=");

  await page.evaluate(
    (id, pw) => {
      document.querySelector("#id").value = id;
      document.querySelector("#password").value = pw;
    },
    id,
    pw
  );

  await page.click("#loginBtn");

  await page.waitForNavigation();
  if(page.url()==="https://sjpt.sejong.ac.kr/main/view/Login/doSsoLogin.do?p="){
    console.log('성공');
    await browser.close();
    return(1);
  }
  else if(page.url()==="https://portal.sejong.ac.kr/jsp/login/login_action.jsp"){
    console.log('실패');
    await browser.close();
    return(0);

  }
  /*await page.waitForSelector("#mf_wfrLeftTreeMenu_treLeftMenu_label_22");
  await page.waitForFunction(() => {
    return (
      document.querySelector("#mf_wfrLeftTreeMenu_treLeftMenu_label_22")
        .textContent.length > 0
    );
  });

  // await page.click("#mf_wfrLeftTreeMenu_treLeftMenu_label_23");
  // await page.click("#mf_wfrLeftTreeMenu_treLeftMenu_label_25");

  await page.evaluate(() => {
    document.querySelector("#mf_wfrLeftTreeMenu_treLeftMenu_label_22").click();
    document.querySelector("#mf_wfrLeftTreeMenu_treLeftMenu_label_23").click();
    document.querySelector("#mf_wfrLeftTreeMenu_treLeftMenu_label_25").click();
  });

  await page.waitForFunction(() => {
    return (
      document.querySelector("#___processbar2").getAttribute("tabindex") ===
      "-1"
      // html 태그 속성 값은 문자열이라 "-1"
    );
  });

  // evaluate는 page(브라우저) 에서 js코드를 실행시켜주는 함수.  console.log가 터미널에 안찍히는 이유는
  // 브라우저의 콘솔에 찍히기 때문이다. page 객체에서 실행되는 js이기 때문.

  await page.evaluate(() => {
    document
      .querySelector(
        "#mf_tabMainCon_contents_SELF_STUDSELF_SUB_30SELF_MENU_10SueOpenTimeQ_body_btn_saerch"
      )
      .click();
  });
  setTimeout(async () => {
    const content = await page.content();
    const $ = cheerio.load(content);

    const data = $("nobr");
    data.each((i, el) => {
      console.log($(el).text());
    });
  }, 2000);*/
}

module.exports=crawling;