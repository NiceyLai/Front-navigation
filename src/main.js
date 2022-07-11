const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hasMap = xObject || [
  { logo: "J", url: "https://www.juejin.cn" },
  { logo: "B", url: "https://www.bilibili.com" },
  { logo: "M", url: "https://developer.mozilla.org" },
  { logo: "F", url: "https://www.figma.com" },
  { logo: "G", url: "https://github.com" },
];

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //  删除/开头的内容
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hasMap.forEach((node, index) => {
    const $li = $(`<li>
            <div class="site layout">
              <div class="logo layout">${node.logo}</div>
              <div class="link">${simplifyUrl(node.url)}</div>
              <div class="close"><svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-shanchu"></use>
                </svg>
              </div>
            </div>
          </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); //  阻止冒泡
      hasMap.splice(index, 1);
      render();
    });
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问您要添加的网址是？");
  console.log(url);
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hasMap.push({
    logo: url
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "")[0]
      .toUpperCase(),
    url: url,
  });
  render();
});

window.onbeforeunload = () => {
  console.log("页面要关闭了");
  // 将对象变成字符串才可以被存储
  const string = JSON.stringify(hasMap);
  console.log(string);
  localStorage.setItem("x", string);
};

$(document).on("keypress", (e) => {
  const { key } = e;
  for (let i = 0; i < hasMap.length; i++) {
    if (hasMap[i].logo.toLowerCase() === key) {
      window.open(hasMap[i].url);
    }
  }
});
