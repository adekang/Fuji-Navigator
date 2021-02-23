// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"CuZ1":[function(require,module,exports) {
// 增加网站
var $siteList = $(".siteList");
var $lastLi = $siteList.find("li.last");
var x = localStorage.getItem("x"); // 变对象

var xObjext = JSON.parse(x);
var hashMap = xObjext || [{
  logo: "A",
  url: "https://www.acfun.cn"
}, {
  logo: "B",
  url: "https://www.bilibili.com"
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace("https://", "").replace("http://", "").replace("www.", "").replace(/\/.*/, ""); //删除\开头的内容
};

var render = function render() {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach(function (node, index) {
    var $li = $("\n                <li>\n\t\t\t\t\t\t\t\t\t<div class=\"site\">\n\t\t\t\t\t\t\t\t\t\t<div class=\"logo\">".concat(node.logo[0], "</div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"link\">").concat(simplifyUrl(node.url), " </div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"close\" >\n\t\t\t\t\t\t\t\t\t\t\t<svg class=\"icon\" >\n\t\t\t\t\t\t\t\t\t\t\t\t<use xlink:href=\"#icon-baseline-close-px\"></use>\n\t\t\t\t\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n                </li>\t\n    ")).insertBefore($lastLi);
    $li.on("click", function () {
      window.open(node.url);
    });
    $li.on("click", ".close", function (e) {
      console.log("点击了");
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();
$(".addButton").on("click", function () {
  var url = window.prompt("请问你添加的网址是：");

  if (url.indexOf("http") !== 0) {
    url = "https://" + url; // alert("请输入http开头的网址");

    console.log(url);
    hashMap.push({
      logo: simplifyUrl(url)[0].toUpperCase(),
      logoType: "text",
      url: url
    });
  }

  render();
}); //自动保存在历史记录里面

window.onbeforeunload = function () {
  console.log("页面关闭了"); // 变字符串

  var string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
}; // 键盘事件


$(document).on("keypress", function (e) {
  // const key = e.key
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
},{}]},{},["CuZ1"], null)
//# sourceMappingURL=mian.28197b21.js.map