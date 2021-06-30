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
})({"epB2":[function(require,module,exports) {
$('.btn').on('click', function () {
  var add = 'https://www.baidu.com/s?wd=';
  var wd = $('.search> input').val();
  window.screen.width < 500 ? window.open(add + wd, '_self') : window.open(add + wd);
});
console.log(window.screen.width < 500);

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''); // 删除 / 开头的内容
};

var temp = localStorage.getItem('x');
var xObject = JSON.parse(temp);
var tabList = xObject || [{
  tab_url: 'https://www.acfun.cn',
  tab_icon: 'https://www.acfun.cn/favicon.ico',
  tab_name: 'A'
}, {
  tab_url: 'https://www.bilibili.com',
  tab_icon: 'https://www.bilibili.com/favicon.ico',
  tab_name: 'B'
}, {
  tab_url: 'https://www.baidu.com',
  tab_icon: 'https://www.baidu.com/favicon.ico',
  tab_name: 'C'
}];

var render_Tab = function render_Tab() {
  $('.tab_list').find('div:not(.add_tab)').remove();
  tabList.forEach(function (node, index) {
    var tab = $("\n      <div class=\"tab\">\n         <div class=\"imgBg\">\n            <img src=\"".concat(node.tab_icon, "\">\n         </div>\n         <div>").concat(node.tab_name.toUpperCase(), "</div>\n      </div>")).insertBefore($('.add_tab'));
    tab.on({
      touchstart: function touchstart(e) {
        // 长按事件触发    
        timeOutEvent = setTimeout(function () {
          timeOutEvent = 0;
          tabList.splice(index, 1);
          render_Tab();
        }, 400); //长按400毫秒     
        // e.preventDefault();      
      },
      touchmove: function touchmove() {
        clearTimeout(timeOutEvent);
        timeOutEvent = 0;
      },
      touchend: function touchend() {
        clearTimeout(timeOutEvent);

        if (timeOutEvent != 0) {
          window.open(node.tab_url, '_self');
        }

        return false;
      }
    });
    tab.on('click', function () {
      window.open(node.tab_url);
    });
    tab.mousedown(function (e) {
      if (e.which === 3) {
        e.preventDefault();
        console.log('111');
        tabList.splice(index, 1);
        render_Tab();
      }
    });
  });
};

render_Tab();
$('.add_tab').on('click', function () {
  var temp_url = window.prompt('输入需要添加的网站');

  if (temp_url.indexOf('http') !== 0) {
    temp_url = 'https://' + temp_url;
  }

  tabList.push({
    tab_url: temp_url,
    tab_icon: temp_url + '/favicon.ico',
    tab_name: simplifyUrl(temp_url)[0].toUpperCase()
  });
  render_Tab();
});

window.onbeforeunload = function () {
  var string = JSON.stringify(tabList);
  console.log(string);
  localStorage.setItem('x', string);
};

$('.search>input').on('keypress', function (e) {
  e.stopPropagation();
});
$(document).on('keypress', function (e) {
  var key = e.key;

  for (var i = 0; i < tabList.length; i++) {
    if (tabList[i].tab_name.toLowerCase() === key) {
      window.open(tabList[i].tab_url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.07a69ed9.js.map