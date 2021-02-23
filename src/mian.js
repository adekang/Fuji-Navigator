// 增加网站
const $siteList = $(".siteList")
const $lastLi = $siteList.find("li.last")
const x = localStorage.getItem("x")
// 变对象
const xObjext = JSON.parse(x)

const hashMap = xObjext || [
	{
		logo: "A",
		url: "https://www.acfun.cn",
	},
	{
		logo: "B",
		url: "https://www.bilibili.com",
	},
]

const simplifyUrl = (url) => {
	return url
		.replace("https://", "")
		.replace("http://", "")
		.replace("www.", "")
		.replace(/\/.*/, "") //删除\开头的内容
}

const render = () => {
	$siteList.find("li:not(.last)").remove()
	hashMap.forEach((node, index) => {
		const $li = $(`
                <li>
									<div class="site">
										<div class="logo">${node.logo[0]}</div>
										<div class="link">${simplifyUrl(node.url)} </div>
										<div class="close" >
											<svg class="icon" >
												<use xlink:href="#icon-baseline-close-px"></use>
											</svg>
										</div>
									</div>
                </li>	
    `).insertBefore($lastLi)
		$li.on("click", () => {
			window.open(node.url)
		})
		$li.on("click", ".close", (e) => {
			console.log("点击了")
			e.stopPropagation()
			hashMap.splice(index, 1)
			render()
		})
	})
}

render()

$(".addButton").on("click", () => {
	let url = window.prompt("请问你添加的网址是：")
	if (url.indexOf("http") !== 0) {
		url = "https://" + url
		// alert("请输入http开头的网址");
		console.log(url)
		hashMap.push({
			logo: simplifyUrl(url)[0].toUpperCase(),
			logoType: "text",
			url: url,
		})
	}
	render()
})

//自动保存在历史记录里面
window.onbeforeunload = () => {
	console.log("页面关闭了")
	// 变字符串
	const string = JSON.stringify(hashMap)
	localStorage.setItem("x", string)
}

// 键盘事件
$(document).on("keypress", (e) => {
	// const key = e.key
	const { key } = e

	for (let i = 0; i < hashMap.length; i++) {
		if (hashMap[i].logo.toLowerCase() === key) {
			window.open(hashMap[i].url)
		}
	}
})
