(function(f, h) {
    var a = {};
    $.extend(!0, a, {
        weatherAnimationView: null,
        isShowWeatherAnimationView: function(a) {
            return ! 0
        },
        clearWeatherAnimation: function(e) {
            var c = {
                callback: e
            };
            $.isEmptyObject(a.weatherAnimationView) || a.weatherAnimationView.fadeOut(1E3,
            function() {
                a.weatherAnimationView.remove();
                c.callback && c.callback()
            })
        },
        onWeatherLoaded: function(a, c, b) {
            var e = this;
            e._iframe = a;
            e.weather = c;
            e.callback = b;
            e.run = function() {
                e._iframe.contentWindow.init && e._iframe.contentWindow.init();
                $(e._iframe).animate({
                    opacity: .5
                },
                400).animate({
                    opacity: 1
                },
                400);
                MyLocalStore.saveWeatherAnimation(e.weather);
                $.isEmptyObject(e.callback) || e.callback()
            }
        },
        initWeatherAnimation: function(e, c) {
            if (a.isShowWeatherAnimationView(e)) {
                var b = serverURI + "/front/animation/" + e,
                g = document.createElement("iframe");
                g.id = "weather-animation-view";
                g.style.zIndex = -9;
                g.style.opacity = 0;
                var l = new a.onWeatherLoaded(g, e, c);
                g.attachEvent ? g.attachEvent("onload",
                function() {
                    g.detachEvent("onload", null);
                    l.run()
                }) : g.onload = function() {
                    g.onload = null;
                    l.run()
                };
                $.isEmptyObject(a.weatherAnimationView) || a.weatherAnimationView.remove();
                document.body.appendChild(g);
                a.weatherAnimationView = $(g);
                g.src = b
            }
        },
        getWeather: function(e) {
            $.ajax({
                url: serverURI + "/front/animation/weather",
                type: "get",
                async: !0,
                timeout: 0,
                data: {
                    _rd: (new Date).getTime()
                },
                dataType: "json",
                success: function(c) {
                    0 != c.success && (c = c.weather, $.isEmptyObject(c) || a.initWeatherAnimation(c, e))
                }
            })
        }
    });
    f.MyAnimation = a
})(window, void 0); (function(f, h) {
    var a = {};
    $.extend(!0, a, {
        gifLoadingView: null,
        initGifLoadingView: function() {
            var a = document.createElement("div");
            a.style.position = "fixed";
            a.style.left = "50%";
            a.style.top = "50%";
            a.style.width = "32px";
            a.style.height = "32px";
            a.style.marginTop = "-32px";
            a.style.display = "none";
            a.style.zIndex = 99999;
            var c = document.createElement("img");
            a.style.margin = "0 auto";
            a.style.position = "relative";
            a.style.display = "block";
            a.style.position = "fixed";
            c.style.width = "32px";
            c.style.height = "32px";
            c.src = staticServerURI + "../static/img/loading.gif";
            a.appendChild(c);
            document.body.appendChild(a);
            MyLoading.gifLoadingView = $(a)
        },
        show: function() {
            $.isEmptyObject(MyLoading.gifLoadingView) && MyLoading.initGifLoadingView();
            MyLoading.gifLoadingView.show()
        },
        hide: function() {
            $.isEmptyObject(MyLoading.gifLoadingView) && MyLoading.initGifLoadingView();
            MyLoading.gifLoadingView.hide()
        }
    });
    f.MyLoading = a
})(window, void 0); (function(f, h) {
    var a = {};
    $.extend(!0, a, {
        checkLocalStorage: function() {
            var a = f.localStorage;
            return a && (a.setItem("test", "123"), "123" == String(a.getItem("test"))) ? !0 : !1
        },
        getValue: function(e) {
            try {
                var c = f.localStorage,
                b = null;
                b = a.checkLocalStorage() ? c.getItem(e) : $.cookie(e);
                return decodeURIComponent(b)
            } catch(g) {}
            return null
        },
        setValue: function(e, c) {
            try {
                var b = f.localStorage;
                a.checkLocalStorage() ? b.setItem(e, String(encodeURIComponent(c))) : $.cookie(e, escape(c), {
                    expires: 365,
                    path: "/"
                })
            } catch(g) {}
        },
        saveNavBgId: function(e) {
            a.setValue("NAVBG", e)
        },
        getNavBgId: function() {
            return a.getValue("NAVBG")
        },
        saveMetaSearchState: function(e) {
            a.setValue("META_SEARCH", e)
        },
        getMetaSearchState: function() {
            return a.getValue("META_SEARCH")
        },
        saveSiteListForm: function(e) {
            a.setValue("SITE_LIST_FORM", e)
        },
        getSiteListForm: function() {
            return a.getValue("SITE_LIST_FORM")
        },
        saveSearchType: function(e) {
            a.setValue("SEARCH_TYPE", e)
        },
        getSearchType: function() {
            return a.getValue("SEARCH_TYPE")
        },
        saveWeatherAnimation: function(e) {
            e = {
                w: e,
                lt: (new Date).getTime()
            };
            a.setValue("WEATHER_ANIMATION", _MyJS.Object.obj2string(e))
        },
        getWeatherAnimation: function() {
            return a.getValue("WEATHER_ANIMATION")
        }
    });
    f.MyLocalStore = a
})(window, void 0);
var searchEngineLogoBox = $(".search-engine .search-logo"),
searchEngineLogo = $(".search-engine .search-logo img:last"),
searchEngineLogoPath = staticServerURI + "../static/img/"; (function(f, h) {
    var a = {},
    e = $("#search-engine"),
    c = e.find("#engine-logo"),
    b = e.find("#search-box"),
    g = b.find("#search-suggest"),
    l = b.find("#search-from"),
    m = l.find("#search-input-box"),
    k = m.find("#search-input"),
    p = m.find("#change-search-mode"),
    n = p.find("img:first"),
    u = l.find("#search-button-box"),
    q = u.find("#search-button");
    $.extend(!0, a, {
        view: e,
        engineLogoView: c,
        searchBoxView: b,
        suggestView: g,
        searchForm: l,
        searchInputBoxView: m,
        changeSearchModeBoxView: p,
        changeSearchModeImgView: n,
        searchInputView: k,
        searchButtonBoxView: u,
        searchButtonView: q,
        metaSearchUrl: "search/",
        logos: {
            google: staticServerURI + "../static/img/google.png",
            baidu: staticServerURI + "../static/img/baidu.png"
        },
        types: {
            baidu: "baidu",
            google: "google"
        },
        isMetaSearch: 0,
        isOverInSearchBtn: !1,
        isOverInMetaSearchBtn: !1,
        isOverInSearchLogo: !1,
        isOverInSuggest: !1,
        searchInputViewFocus: !1,
        searchInputViewFocus_isSys: !1,
        searchInputShakeing: !1,
        search_type: "",
        search_hint_callback_count: 0,
        baidu_search_url: baidu_search_url,
        baidu_search_hint_url: baidu_search_hint_url,
        haosou_search_url: haosou_search_url,
        haosou_search_hint_url: haosou_search_hint_url,
        bing_search_url: bing_search_url,
        bing_search_hint_url: bing_search_hint_url,
        google_search_url: google_search_url,
        google_search_hint_url: google_search_hint_url,
        sogou_search_url: sogou_search_url,
        sogou_search_hint_url: sogou_search_hint_url,
        search_keyword: "",
        search_input_old_value: "",
        search_hint_current_item: null,
        search_hint_current_index: -1,
        searchInputViewBlur: function() {
            a.isOverInSearchBtn = !1;
            a.isOverInMetaSearchBtn = !1;
            a.isOverInSearchLogo = !1;
            a.isOverInSuggest = !1;
            a.searchInputView.blur()
        },
        get_search_hint_list: function(d) {
            switch (a.search_type) {
            case "baidu":
                var b = a.baidu_search_hint_url;
                a.get_baidu_search_hint_list(b, d);
                break;
            case "haosou":
                b = a.haosou_search_hint_url;
                a.get_haosou_search_hint_list(b, d);
                break;
            case "bing":
                b = a.bing_search_hint_url;
                a.get_bing_search_hint_list(b, d);
                break;
            case "google":
                b = a.google_search_hint_url,
                a.get_google_search_hint_list(b, d, "firefox")
            }
        },
        get_baidu_search_hint_list: function(d, b) {
            var sugurl = "http://suggestion.baidu.com/su?wd=" + b;

                //定义回调函数
                window.baidu = {
                    sug: function(d) {
                         a.handle_search_hint_list(d.s)
                    }
                }

                //动态添加JS脚本
                var script = document.createElement("script");
                script.src = sugurl;
                document.getElementsByTagName("head")[0].appendChild(script);

        },
        get_haosou_search_hint_list: function(d, b) {
            a.search_keyword = b;
            var c = {
                encodein: "utf-8",
                encodeout: "utf-8",
                word: b,
                format: "json",
                fields: "word",
                callback: a.gen_search_hint_callback()
            };
            jQuery.ajax({
                url: d,
                type: "post",
                async: !1,
                timeout: 2E3,
                data: c,
                dataType: "jsonp",
                jsonpCallback: "",
                complete: function(a, d) {
                    "timeout" != d && "404" != d || alert("\u65e0\u6cd5\u8bbf\u95ee\u5230 360,\u8bf7\u68c0\u67e5\u7f51\u7edc\uff01")
                }
            })
        },
        get_haosou_search_hint_list_callback: function(d) {
            d = eval(d);
            "undefined" == typeof d && (d = {
                result: []
            });
            d.s = [];
            for (var b = 0,
            c = d.result.length; b < c; b++) d.s[b] = d.result[b].word;
            a.handle_search_hint_list(d.s)
        },
        get_sougou_search_hint_list: function(d, b) {
            a.search_keyword = b;
            var c = {
                encodein: "utf-8",
                encodeout: "utf-8",
                word: b,
                format: "json",
                fields: "word",
                callback: a.gen_search_hint_callback()
            };
            jQuery.ajax({
                url: d,
                type: "post",
                async: !1,
                timeout: 2E3,
                data: c,
                dataType: "jsonp",
                jsonpCallback: "",
                complete: function(a, d) {
                    "timeout" != d && "404" != d || alert("\u65e0\u6cd5\u8bbf\u95ee\u5230360,\u8bf7\u68c0\u67e5\u7f51\u7edc\uff01")
                }
            })
        },
        get_sougou_search_hint_list_callback: function(d) {
            d = eval(d);
            "undefined" == typeof d && (d = {
                result: []
            });
            d.s = [];
            for (var b = 0,
            c = d.result.length; b < c; b++) d.s[b] = d.result[b].word;
            a.handle_search_hint_list(d.s)
        },
        get_bing_search_hint_list: function(d, b) {
            a.search_keyword = b;
            jQuery.ajax({
                url: d,
                type: "post",
                async: !1,
                timeout: 2E3,
                data: {
                    type: "cb",
                    q: b,
                    cb: a.gen_search_hint_callback()
                },
                dataType: "jsonp",
                jsonpCallback: "",
                complete: function(a, d) {
                    "timeout" != d && "404" != d || alert("\u65e0\u6cd5\u8bbf\u95ee\u5230bing,\u8bf7\u68c0\u67e5\u7f51\u7edc\uff01")
                }
            })
        },
        get_bing_search_hint_list_callback: function(d) {
            d = eval(d);
            "undefined" == typeof d && (d = {
                AS: {
                    Results: [{
                        Suggests: []
                    }]
                }
            });
            "undefined" == typeof d.AS.Results && (d.AS.Results = [{
                Suggests: []
            }]);
            d.s = [];
            var b = d.AS.Results[0].Suggests,
            c;
            for (c in b) d.s[c] = b[c].Txt;
            a.handle_search_hint_list(d.s)
        },
        get_google_search_hint_list: function(d, b, c) {
            a.search_keyword = b;
            jQuery.ajax({
                url: d,
                type: "post",
                async: !1,
                timeout: 2E3,
                data: {
                    q: b,
                    client: c,
                    callback: a.gen_search_hint_callback()
                },
                dataType: "jsonp",
                jsonpCallback: "",
                complete: function(a, d) {
                    "timeout" != d && "404" != d || alert("\u65e0\u6cd5\u8bbf\u95ee\u5230Google,\u8bf7\u68c0\u67e5\u7f51\u7edc\uff01")
                }
            })
        },
        get_google_search_hint_list_callback: function(d) {
            d = eval(d);
            "undefined" == typeof d && (d = ["", []]);
            a.handle_search_hint_list(d[1])
        },
        handle_search_hint_list: function(d) {
            a.clear_hint_list();
            var b = document.createDocumentFragment(),
            c;
            for (c in d) {
                if (10 == c) return;
                var e = document.createElement("div"),
                n = document.createElement("span"),
                l = "suggest-item";
                c == d.length - 1 && (l += " suggest-item-end");
                e.className = l;
                n.className = "suggest-keyword";
                n.innerHTML = d[c];
                e.appendChild(n);
                b.appendChild(e)
            }
            a.suggestView.append(b);
            a.onSuggestListChange()
        },
        search_hint_show: function() {
            a.suggestView.show(0, a.onSearchHintShow)
        },
        search_hint_hide: function() {
            a.suggestView.hide(0, a.onSearchHintHide)
        },
        onSearchHintShow: function() {
            a.searchInputBoxView.addClass("search-input-halfradius");
            a.searchButtonBoxView.addClass("search-button-halfradius")
        },
        onSearchHintHide: function() {
            a.searchInputBoxView.removeClass("search-input-halfradius");
            a.searchButtonBoxView.removeClass("search-button-halfradius");
            $.isEmptyObject(a.search_hint_current_item) || a.search_hint_current_item.removeClass("suggest-item-current");
            a.isOverInSuggest = !1;
            a.search_hint_current_item = null;
            a.search_hint_current_index = -1
        },
        onSuggestListChange: function() {
            var d = a.suggestView.find(".suggest-item"); ! $.isEmptyObject(d) && 0 >= d.length ? a.search_hint_hide() : $.isEmptyObject(d) || (a.search_hint_show(), d.on("mouseover mouseout click",
            function(d) {
                "click" == d.type ? (a.searchInputView.val($($(this).find("span").get(0)).text()), a.search_hint_hide(), a.isOverInSuggest = !1, a.searchForm.submit()) : "mouseover" == d.type ? (a.search_hint_current_item = jQuery(this), a.search_hint_current_item.addClass("suggest-item-current"), a.isOverInSuggest = !0) : "mouseout" == d.type && ($.isEmptyObject(a.search_hint_current_item) || a.search_hint_current_item.removeClass("suggest-item-current"), a.search_hint_current_item = null, a.isOverInSuggest = !1)
            }))
        },
        gen_search_hint_callback: function() {
            a["search_hint_callback" + a.search_hint_callback_count] = function() {};
            a.search_hint_callback_count++;
            var d = "search_hint_callback" + a.search_hint_callback_count;
            a[d] = a["get_" + a.search_type + "_search_hint_list_callback"];
            return "Search_Engine." + d
        },
        clear_hint_list: function() {
            var d = a.suggestView;
            d.hide();
            d.empty()
        },
        change2Google: function(d) {
            a.search_type = a.types.google;
            MyLocalStore.saveSearchType(a.types.google);
            searchEngineLogoBox.removeClass("search-logo-transform360");
            searchEngineLogoBox.addClass("search-logo-transform0");
            setTimeout(function() {
                searchEngineLogo.attr("src", searchEngineLogoPath + "blank.png")
            },
            70);
            setTimeout(function() {
                searchEngineLogo.attr("src", searchEngineLogoPath + "google.png")
            },
            180);
            setTimeout(function(a) {
                $.isEmptyObject(a) || a()
            },
            300, d)
        },
        change2Baidu: function(d) {
            a.search_type = a.types.baidu;
            MyLocalStore.saveSearchType(a.types.baidu);
            searchEngineLogoBox.removeClass("search-logo-transform0");
            searchEngineLogoBox.addClass("search-logo-transform360");
            setTimeout(function() {
                searchEngineLogo.attr("src", searchEngineLogoPath + "blank.png")
            },
            70);
            setTimeout(function() {
                searchEngineLogo.attr("src", searchEngineLogoPath + "baidu.png")
            },
            180);
            setTimeout(function(a) {
                $.isEmptyObject(a) || a()
            },
            300, d)
        },
        change2MetaSearch: function(d) {
            d = d ? d = "mata-search-on.png": "mata-search-off.png";
            a.changeSearchModeImgView.attr("src", staticServerURI + "../static/img/" + d)
        },
        searchInutViewShake: function() {
            a.searchInputShakeing = !0;
            a.searchBoxView.animate({
                left: "-10px"
            },
            50).animate({
                left: "10px"
            },
            100).animate({
                left: "-10px"
            },
            100).animate({
                left: "10px"
            },
            100).animate({
                left: "0px"
            },
            50,
            function() {
                a.searchInputShakeing = !1
            })
        }
    });
    k.on("click focus blur enter input propertychange keydown",
    function(d) {
        if ("click" != d.type || a.searchInputViewFocus) if ("focus" == d.type) {
            if (a.searchInputViewFocus || a.searchInputViewFocus_isSys) return ! 1;
            a.searchInputViewFocus = !0;
            a.searchInputBoxView.addClass("search-input-box-foucs");
            $("#home-mask").fadeIn(200);
            NavSite.view.is(":hidden") || (NavSite.lockView(), NavSite.view.hide(0));
            0 < a.suggestView.children("div").length && a.search_input_old_value == a.searchInputView.val() && a.search_hint_show()
        } else if ("blur" == d.type) {
            if (a.isOverInSearchLogo || a.isOverInSearchBtn || a.isOverInSuggest || a.isOverInMetaSearchBtn) return a.searchInputView.focus(),
            !1;
            if (a.searchInputViewFocus_isSys) return ! 1;
            a.searchInputBoxView.removeClass("search-input-box-foucs");
            a.searchInputViewFocus = !1;
            a.search_hint_hide();
            $("#home-mask").hide();
            NavSite.isLocked() && (NavSite.unLockView(), NavSite.show())
        } else "input" == d.type || "propertychange" == d.type ? (d = a.searchInputView.val(), d != a.search_input_old_value && (a.search_input_old_value = d, a.get_search_hint_list(d))) : 13 == d.keyCode ? a.searchForm.submit() : "keydown" == d.type && ($.isEmptyObject(a.search_hint_current_item) || a.search_hint_current_item.removeClass("suggest-item-current"), 38 == d.keyCode ? ( - 1 == a.search_hint_current_index ? (a.search_hint_current_index = a.suggestView.children("div").length - 1, a.search_hint_current_item = $(a.suggestView.children("div").get(a.search_hint_current_index)), a.search_hint_current_item.addClass("suggest-item-current")) : (a.search_hint_current_index--, -1 != a.search_hint_current_index ? (a.search_hint_current_item = $(a.suggestView.children("div").get(a.search_hint_current_index)), a.search_hint_current_item.addClass("suggest-item-current")) : a.search_hint_current_item = null), d.preventDefault()) : 40 == d.keyCode && (a.search_hint_current_index++, a.search_hint_current_index == a.suggestView.children("div").length ? (a.search_hint_current_index = -1, a.search_hint_current_item = null) : (a.search_hint_current_item = $(a.suggestView.children("div").get(a.search_hint_current_index)), a.search_hint_current_item.addClass("suggest-item-current"))), 38 == d.keyCode || 40 == d.keyCode) && ($.isEmptyObject(a.search_hint_current_item) ? a.searchInputView.val(a.search_keyword) : a.searchInputView.val(a.search_hint_current_item.find("span").text()));
        else a.searchInputViewFocus_isSys && (a.searchInputViewFocus_isSys = !1),
        a.searchInputView.focus()
    });
    q.on("mouseover mouseout",
    function(d) {
        "mouseover" == d.type ? a.isOverInSearchBtn = !0 : "mouseout" == d.type && (a.isOverInSearchBtn = !1)
    });
    c.on("mouseover mouseout",
    function(d) {
        "mouseover" == d.type ? a.isOverInSearchLogo = !0 : "mouseout" == d.type && (a.isOverInSearchLogo = !1)
    });
    l.on("submit",
    function(d) {
        if ("submit" == d.type) {
            d = k.val();
            if ("" != d) {
                var b = a.search_type,
                c = a.baidu_search_url,
                e = "q";
                b == a.types.baidu ? (c = a.baidu_search_url, e = "wd") : b == a.types.google && (c = a.google_search_url);
                a.isMetaSearch && b != a.types.google ? (d = a.metaSearchUrl + "?q=" + encodeURIComponent(d) + "&t=" + b, f.location.href = d) : (f.open(c + "?" + e + "=" + d), a.searchInputViewBlur())
            } else a.searchInputShakeing || a.searchInutViewShake();
            return ! 1
        }
    });
    searchEngineLogoBox.on("click mouseover mouseout",
    function(d) {
        "click" == d.type ? a.search_type == a.types.baidu ? (a.search_type = a.types.google, MyLocalStore.saveSearchType(a.types.google), searchEngineLogoBox.removeClass("search-logo-transform360"), searchEngineLogoBox.addClass("search-logo-transform0"), setTimeout(function() {
            searchEngineLogo.attr("src", searchEngineLogoPath + "blank.png")
        },
        70), setTimeout(function() {
            searchEngineLogo.attr("src", searchEngineLogoPath + "google.png")
        },
        180)) : a.search_type == a.types.google && (a.search_type = a.types.baidu, MyLocalStore.saveSearchType(a.types.baidu), searchEngineLogoBox.removeClass("search-logo-transform0"), searchEngineLogoBox.addClass("search-logo-transform360"), setTimeout(function() {
            searchEngineLogo.attr("src", searchEngineLogoPath + "blank.png")
        },
        70), setTimeout(function() {
            searchEngineLogo.attr("src", searchEngineLogoPath + "baidu.png")
        },
        180)) : "mouseover" == d.type ? searchEngineLogo.addClass("background") : "mouseout" == d.type && searchEngineLogo.removeClass("background")
    });
    p.on("click mouseover mouseout",
    function(d) {
        "click" == d.type ? (d = a.isMetaSearch, a.isMetaSearch = !a.isMetaSearch, a.change2MetaSearch(a.isMetaSearch), MyLocalStore.saveMetaSearchState(a.isMetaSearch), d ? _MyJS.toast("\u5df2\u5207\u6362\u5230\u5355\u5f15\u64ce\u641c\u7d22\uff01") : _MyJS.toast("\u5df2\u5207\u6362\u5230\u591a\u5f15\u64ce\u641c\u7d22\uff01")) : "mouseover" == d.type ? (a.changeSearchModeImgView.addClass("Rotation"), a.isOverInMetaSearchBtn = !0) : "mouseout" == d.type && (a.changeSearchModeImgView.removeClass("Rotation"), a.isOverInMetaSearchBtn = !1)
    });
    f.Search_Engine = a
})(window, void 0); (function(f, h) {
    var a = {},
    e = $("#web-site"),
    c = $("#web-site-header"),
    b = e.find("#site-class-group"),
    g = c.find("#site_list_type"),
    l = e.find("#site-class-group-body"),
    m = b.find("#site-class-group-left-btn"),
    k = b.find("#site-class-group-right-btn");
    e = e.find("#web-site-body");
    var p = e.find(".web-group");
    $.extend(!0, a, {
        view: $("#web-site"),
        webSiteHeader: c,
        classGroupView: b,
        classGroupLeftBtnView: m,
        classGroupRightBtnView: k,
        siteListTypeView: g,
        siteListTypeSwitchBtn: null,
        siteListForm: -1,
        siteListFormCutIng: !1,
        classGroupBodyView: l,
        contentView: e,
        siteGroupView: p,
        currentClass: null,
        queryClassCount: 0,
        querySiteCout: 0,
        initialised: !1,
        currentPage: 1,
        cutClassPageing: !1,
        siteClasseMap: $.parseJSON(siteClasses),
        pageSize: 6,
        siteClasses: [],
        locked: !1,
        visible: !1,
        initView: function(b) {
            a.lockView();
            var c = a.view;
            c.css("top", 200);
            c.show();
            c.animate({
                top: 0
            },
            200,
            function() {
                a.visible = !0;
                a.unLockView();
                b && b();
                a.initialised = !0
            })
        },
        lockView: function() {
            a.locked = !0
        },
        unLockView: function() {
            a.locked = !1
        },
        isLocked: function() {
            return a.locked
        },
        isShow: function() {
            return a.visible
        },
        show: function(b) {
            a.isLocked() || (a.lockView(), a.view.show(), a.visible = !0, a.unLockView(), !$.isEmptyObject(b) && b.callback && b.callback())
        },
        hide: function(b) {
            if (!a.isLocked() || b !== h && (b.isSys === h || b.isSys)) {
                a.lockView();
                var c = a.view,
                e = $(f).height();
                c.animate({
                    top: e + "px"
                },
                500,
                function() {
                    c.hide();
                    c.animate({
                        top: "0px"
                    },
                    0,
                    function() {
                        a.unLockView();
                        a.visible = !1; ! $.isEmptyObject(b) && b.callback && b.callback()
                    })
                })
            }
        },
        curReqMark: null,
        loadSiteClass: function(b) {
            for (var c = [], e, d, l, g, m = 0, k = b.length; m < k; m++) {
                var n = b[m];
                $.isEmptyObject(n) || (e = a.pageSize, d = String(Number(c.length) / Number(e)), l = document.createElement("div"), g = "navi-btn-item site-class-item", l.id = "bg-navi-btn-" + n.id, l.title = n.className, 1 <= c.length / e && (l.style.display = "none"), 0 != m && -1 != d.indexOf(".") || m == b.length - 1 ? m == b.length - 1 || -1 == d.indexOf(".") || "8" == d.substr(d.indexOf(".") + 1, 1) ? (g += " navi-btn-item-end", "2" == d.substr(d.indexOf(".") + 1, 1) && m == b.length - 1 && (g += " navi-btn-item-one")) : g += " navi-btn-item-middle": g += " navi-btn-item-start", l.className = g, e = document.createElement("span"), e.innerHTML = n.className, l.appendChild(e), c.push(l))
            }
            a.classGroupBodyView.empty();
            a.currentPage = 1;
            a.siteClasses = c;
            a.classGroupBodyView.append(c);
            a.onClassChange()
        },
        getSiteList: function(b) {
            a.curReqMark = (new Date).format("ddhhmmss");
            $.ajax({
                url: serverURI + "/front/site/list",
                type: "post",
                async: !0,
                timeout: 0,
                dataType: "json",
                data: {
                    classId: b,
                    curReqMark: a.curReqMark
                },
                success: function(b) {
                    $("#web-site-body").empty();
                        b.curReqMark == a.curReqMark && (b = b.dataResult, $.isEmptyObject(b) || (a.loadSite(b), a.querySiteCout++))
                        for (var i = 0; i < b.dataResult.length; i++) {
                            var str = "";
                            str += "<div class='web-group web-group-couple site-list-item-transform0' id='web-group-" + b.dataResult[i].id + "'>";
                            str += "<div class='web-group-head'> <span class='title-font'>" + b.dataResult[i].className + "</span> </div>";
                            str += "<div class=\"web-group-item web-group-item-head\"></div>";
                            for(var j=0; j<b.dataResult[i].siteVos.length;j++) {
                                str += "<a class='web-group-item' target='_blank' href=" + b.dataResult[i].siteVos[j].siteUrl + " title=" +  b.dataResult[i].siteVos[j].siteName + ">"
                                + "<div class='web-group-icon' style='background-image: url(&quot;/media/" + b.dataResult[i].siteVos[j].logoResourceId + "&quot;);'></div>"
                                + "<span class='web-group-name'>" + b.dataResult[i].siteVos[j].siteName + "</span> </a>";
                            }

                            str += "</div>"
                            $("#web-site-body").append(str);
                        }
                },
                error: function() {}
            })
        },
        loadSite: function(b) {
            for (var c = a.siteGroupView,
            e = 0,
            d = c.length; e < d; e++) {
                var l = b[e] || {
                    siteVos: []
                },
                g = $(c.get(e));
                g.attr("id", "web-group-" + (l.id || e));
                g.find(".web-group-head").find(".title-font").text(l.className || "");
                g = g.find(".web-group-item");
                l = l.siteVos;
                for (var m = 1,
                k = g.length; m < k; m++) {
                    var n = l[m - 1] || {},
                    f = $(g.get(m));
                    f.attr("title", n.siteName || "");
                    f.attr("href", n.siteUrl || "javascript:void(0);");
                    f.prop("rel", n.nofollow || "");
                    var h = f.find(".web-group-icon"),
                    p = null,
                    t = !0;
                    $.isEmptyObject(n.logoResourceId) || (p = staticServerAPIURI + "/" + n.logoResourceId, t = !1); ! _MyJS.browser.isIE || 8 < _MyJS.browser.ieVersion ? h.css("background-image", t ? "": "url('" + p + "')") : h.css("filter", t ? "": "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + p + "',sizingMethod='scale')");
                    f.find(".web-group-name").text(n.siteName || "")
                }
            }
            a.onSiteChange()
        },
        onClassChange: function() {
            var b = a.classGroupBodyView,
            c = a.siteClasses;
            $.each(c,
            function() {
                $(this).on("click mouseover mouseout",
                function(c) {
                    if ("click" == c.type) {
                        c = $(this);
                        var d = a.currentClass;
                        if (!$.isEmptyObject(d) && c.attr("id") === d.attr("id")) return ! 1;
                        b.find(".navi-btn-item").removeClass("navi-btn-item-current");
                        c.addClass("navi-btn-item-current");
                        a.getSiteList(c.attr("id").substr(12));
                        a.currentClass = c
                    } else "mouseout" == c.type ? $(this).removeClass("navi-btn-item-over") : "mouseover" == c.type && $(this).addClass("navi-btn-item-over")
                })
            });
            $(c[0]).click()
        },
        onSiteChange: function() {
            a.contentView.find(".web-group-item").on("mouseover mouseout",
            function(a) {
                var b = $(this).find(".web-group-icon");
                "mouseover" == a.type ? b.addClass("web-group-icon-hover") : "mouseout" == a.type && b.removeClass("web-group-icon-hover")
            })
        },
        classNextPage: function() {
            if (a.cutClassPageing) return ! 1;
            a.cutClassPageing = !0;
            var b = a.currentPage + 1;
            if (b <= Math.ceil(a.siteClasses.length / a.pageSize)) {
                var c = (a.currentPage - 1) * a.pageSize;
                a.hideClasses(c, a.pageSize)
            } else c = (a.currentPage - 1) * a.pageSize,
            a.hideClasses(c, a.pageSize),
            b = 1;
            c = (b - 1) * a.pageSize;
            a.showClasses(c, a.pageSize);
            a.currentPage = b;
            a.cutClassPageing = !1
        },
        classPrevPage: function() {
            if (a.cutClassPageing) return ! 1;
            a.cutClassPageing = !0;
            var b = a.currentPage - 1;
            if (1 <= b) var c = (a.currentPage - 1) * a.pageSize;
            else b = Math.ceil(a.siteClasses.length / a.pageSize),
            c = (a.currentPage - 1) * a.pageSize;
            a.hideClasses(c, a.pageSize);
            c = (b - 1) * a.pageSize;
            a.showClasses(c, a.pageSize);
            a.currentPage = b;
            a.cutClassPageing = !1
        },
        hideClasses: function(b, c) {
            $.each(a.siteClasses.slice(b, b + c),
            function() {
                $(this).hide(0)
            })
        },
        showClasses: function(b, c) {
            $.each(a.siteClasses.slice(b, b + c),
            function() {
                $(this).show(0)
            })
        },
        siteListRotateX: function(b) {
            a.view.css("background-color", "transparent");
            var c = a.contentView.find(".web-group");
            c.removeClass("site-list-item-transform0");
            c.addClass("site-list-item-transform90");
            setTimeout(function() {
                c.hide();
                c.removeClass("site-list-item-transform90");
                c.addClass("site-list-item-transform270")
            },
            300);
            setTimeout(function() {
                c.show();
                c.removeClass("site-list-item-transform270");
                c.addClass("site-list-item-transform360")
            },
            500);
            setTimeout(function() {
                c.removeClass("site-list-item-transform360");
                c.addClass("site-list-item-transform0");
                a.view.css("background-color", "");
                b && b()
            },
            800)
        },
        siteListTypeChange: function(b, c) {
            a.initialised && a.siteListRotateX(c);
            b ? (a.loadSiteClass(a.siteClasseMap.innerClasses), a.initialised && Search_Engine.search_type != Search_Engine.types.baidu && Search_Engine.change2Baidu(), a.siteListForm = 0, MyLocalStore.saveSiteListForm(0)) : (a.loadSiteClass(a.siteClasseMap.outerClasses), a.initialised && Search_Engine.search_type != Search_Engine.types.google && Search_Engine.change2Google(), a.siteListForm = 1, MyLocalStore.saveSiteListForm(1))
        }
    });
    c.on("mouseover mouseout",
    function(a) {
        "mouseover" == a.type ? (m.css("visibility", "visible"), k.css("visibility", "visible")) : "mouseout" == a.type && (m.css("visibility", "collapse"), k.css("visibility", "collapse"))
    });
    m.on("click mouseover mouseout",
    function(b) {
        var c = m.find("span");
        "click" == b.type ? a.classPrevPage() : "mouseover" == b.type ? c.addClass("hover") : "mouseout" == b.type && c.removeClass("hover")
    });
    k.on("click mouseover mouseout",
    function(b) {
        var c = k.find("span");
        "click" == b.type ? a.classNextPage() : "mouseover" == b.type ? c.addClass("hover") : "mouseout" == b.type && c.removeClass("hover")
    });
    f.NavSite = a
})(window, void 0); (function(f, h) {
    var a = {},
    e = $("#menu-group"),
    c = e.find(".head-nav-item");
    $.extend(!0, a, {
        menuGroupView: e,
        menuViews: c
    });
    c.on("click mouseover mouseout",
    function(a) {
        var b = $(this),
        c = b.find("img:first"),
        e = staticServerURI + "../static/img/",
        k = "";
        if ("click" == a.type) if ("share-website" == b.attr("id"))(b = document.getElementById("bd-share")) && b.click();
        else {
            if (MySetting !== h && null !== MySetting.onHeaderMenuClick) return MySetting.onHeaderMenuClick(b)
        } else "mouseover" == a.type ? "change-bg" == b.attr("id") ? k = "chbg_dark.png": "rand-bg" == b.attr("id") ? k = "change_dark.png": "share-website" == b.attr("id") ? k = "share_dark.png": "free-proxy" == b.attr("id") ? k = "out_of_wall_dark.png": "user-center" == b.attr("id") ? k = "user_dark.png": "goup" == b.attr("id") ? k = "goup_dark.png": "help-info" == b.attr("id") && (k = "info_dark.png") : "mouseout" == a.type && ("change-bg" == b.attr("id") ? k = "chbg_light.png": "rand-bg" == b.attr("id") ? k = "change_white.png": "share-website" == b.attr("id") ? k = "share_light.png": "free-proxy" == b.attr("id") ? k = "out_of_wall_light.png": "user-center" == b.attr("id") ? k = "user_light.png": "goup" == b.attr("id") ? k = "goup_light.png": "help-info" == b.attr("id") && (k = "info_light.png"));
        $.isEmptyObject(c) || "" == k || "mouseover" != a.type && "mouseout" != a.type || c.attr("src", e + k)
    });
    f.HeaderMenu = a
})(window, void 0); (function(f, h) {
    var a = {},
    e = $("#header");
    $.extend(!0, a, {
        headerView: e,
        currentAlfa: .1,
        headerBreathUp: function() {
            a.currentAlfa += .01;
            a.headerView.css("background-color", "rgba(15,25,50," + a.currentAlfa + ")");.4 <= a.currentAlfa ? setTimeout(function() {
                a.headerBreathDown()
            },
            300) : setTimeout(function() {
                a.headerBreathUp()
            },
            100)
        },
        headerBreathDown: function() {
            a.currentAlfa -= .01;
            a.headerView.css("background-color", "rgba(15,25,50," + a.currentAlfa + ")");.1 >= a.currentAlfa ? setTimeout(function() {
                a.headerBreathUp()
            },
            500) : setTimeout(function() {
                a.headerBreathDown()
            },
            100)
        }
    });
    e.on("click",
    function() {
        $.isEmptyObject(MySetting.currentView) || MySetting.slideDiv()
    });
    f.MyHeader = a
})(window, void 0); (function(f, h) {
    var a = {},
    e = $("#bg-setting"),
    c = e.find("#bg-class-group"),
    b = e.find("#bg-content"),
    g = b.find("#bg-group");
    $.extend(!0, a, {
        view: e,
        classGroupView: c,
        contentView: b,
        contentGroupView: g,
        classQueryCount: 0,
        lazyload_img: function() {
            function b(a) {
                setTimeout(function() {
                    var b = new Image;
                    b.style.display = "none";
                    b.onload = function() {
                        a.src = b.src;
                        $(this).remove()
                    };
                    b.onerror = function() {
                        $(this).remove()
                    };
                    b.src = staticServerAPIURI + "/" + a.getAttribute("my-bgimg-preview-resource-id");
                    try {
                        $(a).parent().append(b)
                    } catch(v) {}
                },
                200)
            }
            function c(a, b) {
                var c = parseInt(b / 4);
                return 0 >= c ? a.offsetTop: $(a).parent().parent().outerHeight() * c
            }
            var e = a.contentView,
            g = a.contentGroupView.find("img.bg-img"),
            f = g.length,
            h = 0,
            q = e.outerHeight();
            e = e.scrollTop();
            for (var d = h; d < f; d++) {
                var r = g[d];
                c(r, d) < q + e && ( - 1 < String(r.src).indexOf("default_bgimg_preview") && b(r), h += 1)
            }
        },
        getClassList: function() {
            $.ajax({
                url: serverURI + "/front/bg_class/list",
                type: "post",
                async: !0,
                dataType: "json",
                success: function(b) {
                    var c = a.classGroupView;
                    c.empty();
                    if ("undefined" != typeof b) {
                        var e = document.createDocumentFragment(),
                        l;
                        for (l in b) {
                            var g = b[l];
                            if ("object" == typeof g) {
                                var f = document.createElement("div");
                                f.id = "bg-navi-btn-" + g.id;
                                var h = "navi-btn-item";
                                h = 0 == l ? h + " navi-btn-item-start": l != b.length - 1 ? h + " navi-btn-item-middle": h + " navi-btn-item-end";
                                f.className = h;
                                h = document.createElement("span");
                                h.innerHTML = g.className;
                                f.appendChild(h);
                                e.appendChild(f)
                            }
                        }
                        c.append(e);
                        a.onClassChange()
                    }
                },
                error: function() {}
            })
        },
        getImgList: function(b) {
            var c = a.contentGroupView;
            $.ajax({
                url: serverURI + "/front/bgimg/list/" + b,
                type: "post",
                dataType: "json",
                async: !0,
                beforeSend: function() {
                    MyLoading.show();
                    c.hide()
                },
                success: function(b) {
                    a.contentView.animate({
                        scrollTop: 0
                    },
                    0,
                    function() {
                        c.empty();
                        if ("undefined" == typeof b || 0 >= b.length) MyLoading.hide();
                        else {
                            var e = MyLocalStore.getNavBgId(),
                            l = document.createDocumentFragment(),
                            g;
                            for (g in b) {
                                var m = b[g];
                                if (!$.isEmptyObject(m)) {
                                    var d = document.createElement("div");
                                    d.className = "bg-item";
                                    l.appendChild(d);
                                    var f = document.createElement("div"),
                                    k = "bg-body";
                                    String(e) == String(m.id) && (k += " current");
                                    f.className = k;
                                    d.appendChild(f);
                                    d = new Image;
                                    d.className = "bg-img";
                                    d.alt = m.bgName;
                                    d.id = "bgimg-" + m.id;
                                    d.style.backgroundColor = "rgba(" + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + ",0.35)";
                                    d.src = staticServerURI + "media/" + m.previewResourceId;
                                    d.setAttribute("my-bgimg-id", m.id);
                                    d.setAttribute("my-bgimg-preview-resource-id", "media/" + m.previewResourceId);
                                    f.appendChild(d);
                                    d = document.createElement("h3");
                                    d.className = "bg-title";
                                    d.innerHTML = m.bgName;
                                    f.appendChild(d)
                                }
                            }
                            c.append(l);
                            a.contentGroupView.find(".bg-item .bg-img").on("click",
                            function(b) {
                                a.cutBGImg($(this).first("img"))
                            });
                            MyLoading.hide();
                            c.show();
                            a.lazyload_img();
                            a.classQueryCount++
                        }
                    })
                },
                error: function() {
                    MyLoading.hide()
                }
            })
        },
        onClassChange: function() {
            var b = a.classGroupView.find(".navi-btn-item");
            b.on("click mouseover mouseout",
            function(c) {
                if ("click" == c.type) {
                    if ($(this).hasClass("navi-btn-item-current")) return ! 1;
                    MyLoading.hide();
                    b.removeClass("navi-btn-item-current");
                    $(this).addClass("navi-btn-item-current");
                    a.getImgList(String($(this).attr("id")).substr(12))
                } else "mouseout" == c.type ? $(this).removeClass("navi-btn-item-over") : "mouseover" == c.type && $(this).addClass("navi-btn-item-over")
            });
            var c = $(b[0]);
            $.isEmptyObject(c) || c.click()
        },
        randBgs: [],
        cutBGImging: !1,
        randBgLoading: function(b) {
            var c = staticServerURI + "../static/img/",
            e = $("#rand-bg > img");
            a.cutBGImging ? (4 < b && (b = 1), e.attr("title", "\u52a0\u8f7d\u4e2d..."), e.attr("src", c + "changing_" + b + ".png"), b++, setTimeout(function() {
                a.randBgLoading(b)
            },
            2)) : (e.attr("title", "\u968f\u673a\u80cc\u666f"), e.attr("src", c + "change_white.png"))
        },
        randBg: function() {
            a.cutBGImging || (a.cutBGImging = !0, a.randBgLoading(1), 0 < a.randBgs.length ? a.randCutBGImg() : $.ajax({
                url: serverURI + "/front/nav/bgimg/random",
                type: "post",
                async: !0,
                timeout: 0,
                dataType: "json",
                success: function(b) {
                    $.isEmptyObject(b) || (a.randBgs = b, a.randCutBGImg(a.randBgs[0]))
                },
                error: function() {
                    a.cutBGImging = !1;
                    alert("\u7f51\u7edc\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5\uff01")
                }
            }))
        },
        randCutBGImg: function() {
            var b = new Image;
            b.onload = function() {
                $(document.body).css("background-image", "url('" + b.src + "')");
                var c = a.randBgs[0];
                a.selectBGById(c);
                MyLocalStore.saveNavBgId(c);
                a.randBgs.splice(0, 1);
                a.cutBGImging = !1;
                MyAnimation.clearWeatherAnimation()
            };
            b.onerror = function() {
                a.cutBGImging = !1;
                MyAnimation.clearWeatherAnimation()
            };
            b.src = serverURI + "/front/nav/bgimg/" + a.randBgs[0]
        },
        cutBGImg: function(b) {
            var c = b.attr("my-bgimg-id");
            $.isEmptyObject(c) || (a.cutBGImging = !0, a.randBgLoading(1), a.applyBGImg(c,
            function() {
                a.removeSelectBG();
                b.parent().addClass("current");
                MyLocalStore.saveNavBgId(c);
                a.cutBGImging = !1;
                MyAnimation.clearWeatherAnimation();
                setTimeout(function() {
                    MySetting.settingViewHide2()
                },
                400)
            }))
        },
        applyBGImg: function(a, b) {
            $.ajax({
                url: serverURI + "/front/bgimg/" + a,
                type: "post",
                async: !0,
                dataType: "text",
                complete: function(a, c) {
                    if (1 == a.getResponseHeader("-My-Bg-Type")) {
                        var e = document.getElementById("bg-iframe");
                        $.isEmptyObject(e) && (e = $('<iframe id="bg-iframe" style="z-index:-10;width:100%;height:100%;" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes""/>'), e = e[0], $(document.body).append(e));
                        e.src = a.responseText
                    } else $(document.body).css("background-image", "url('" + a.responseText + "')"),
                    $(document.getElementById("bg-iframe")).remove();
                    b && b()
                }
            })
        },
        removeSelectBG: function() {
            a.contentGroupView.find(".bg-item .bg-body").removeClass("current")
        },
        selectBGById: function(b) {
            a.removeSelectBG();
            a.contentGroupView.find(".bg-item .bg-body .bg-img").each(function(a) {
                a = $(this);
                var c = a.attr("bgimg-id");
                String(c) == String(b) && a.parent().addClass("current")
            })
        },
        getBGImgFromPreviewPath: function(a) {
            return String(a).replace(/\_preview/i, "")
        }
    });
    b.on("scroll",
    function() {
        a.lazyload_img()
    });
    $(function() {
        a.contentView.bind("resize",
        function() {
            0 < a.classQueryCount && a.lazyload_img()
        })
    });
    f.BGSetting = a
})(window, void 0); (function(f, h) {
    var a = {};
    $.extend(!0, a, {
        currentView: null,
        viewSlideIng: !1,
        onHeaderMenuClick: function(e) {
            e = e.attr("id");
            var c = h;
            switch (e) {
            case "rand-bg":
                return BGSetting.randBg(),
                !1;
            case "change-bg":
                a.currentView = BGSetting.view;
                c = function() {};
                0 == BGSetting.classQueryCount && (BGSetting.getClassList(), c = function() {
                    if (0 >= BGSetting.classQueryCount) {
                        var a = BGSetting.classGroupView.find(".navi-btn-item").get(0);
                        $.isEmptyObject(a) && a.click()
                    }
                });
                break;
            case "user-center":
                a.currentView = MyUserCenter.view;
                c = function() {
                    MyUserCenter.init()
                };
                break;
            case "free-proxy":
                MyFreeProxy.isLoadPic || MyFreeProxy.loadIcons();
                a.currentView = MyFreeProxy.view;
                c = function() {};
                break;
            case "help-info":
                a.currentView = MyHelpInfo.view;
                c = function() {
                    MyHelpInfo.helpPicLoaded || $("#help-info-pic").attr("src", staticServerURI + "../static/img/function.png");
                    MyHelpInfo.helpPicLoaded = !0;
                    MyApplication.widowResize()
                };
                break;
            case "goup":
                if (a.isGoUpLocked || a.viewSlideIng) return ! 1;
                a.isGoUpLocked = !0;
                break;
            default:
                return ! 1
            }
            if (null === a.currentView || a.currentView === h || a.viewSlideIng) return ! 1;
            a.slideDiv(c);
            return ! 1
        },
        slideDiv: function(e) {
            var c = a.currentView;
            if (c === h && null === c) return null;
            c.is(":visible") ? a.settingViewHide() : a.settingViewShow(e)
        },
        settingViewShow: function(e) {
            var c = a.currentView;
            if (c !== h || null !== c) a.viewSlideIng = !0,
            MyLoading.hide(),
            jQuery(document.body).css("overflow-y", "hidden"),
            $(".head-nav-item").hide(),
            $("#goup").show(),
            c.css("top", "-" + $(f).height() + "px"),
            c.show(),
            c.animate({
                top: "40px"
            },
            500,
            function() {
                a.viewSlideIng = !1;
                e && e()
            })
        },
        settingViewHide: function() {
            var e = a.currentView;
            if (e === h && null === e) return null;
            a.viewSlideIng = !0;
            MyLoading.hide();
            e.animate({
                top: "-" + $(f).height() + "px"
            },
            500,
            function() {
                HeaderMenu.menuViews.show();
                $("#goup").hide();
                e.hide();
                a.currentView = null;
                a.isGoUpLocked = !1;
                a.viewSlideIng = !1;
                $(document.body).css("overflow-y", "scroll")
            })
        },
        settingViewHide2: function() {
            var e = a.currentView;
            if ($.isEmptyObject(e)) return null;
            a.viewSlideIng = !0;
            MyLoading.hide();
            e.fadeOut(400,
            function() {
                HeaderMenu.menuViews.show();
                $("#goup").hide();
                a.currentView = null;
                a.isGoUpLocked = !1;
                a.viewSlideIng = !1;
                jQuery(document.body).css("overflow-y", "scroll")
            })
        }
    });
    f.MySetting = a
})(window, void 0); (function(f, h) {
    var a = {};
    $.extend(!0, a, {
        switchBtnObj: function(a, c) {
            var b = this;
            b.view = a;
            b.locked = !1;
            b.callback = c;
            b.toggleBtn = b.view.find(".toggle-btn");
            b.textSwitch = b.view.find(".text-switch");
            b.checkedSwitch = b.view.find(".checked-switch");
            b.isChecked = b.checkedSwitch.is(":checked");
            b.setChecked = function(a) {
                b.isChecked = a
            };
            b.check = function() {
                b.isChecked = !0;
                b.checkedSwitch.prop("checked", !0);
                b.toggleBtn.addClass("toggle-btn-checked");
                b.textSwitch.addClass("text-switch-checked text-switch-after");
                b.textSwitch.removeClass("text-switch-before");
                b.textSwitch.html(b.textSwitch.attr("data-yes"))
            };
            b.uncheck = function() {
                b.isChecked = !1;
                b.checkedSwitch.prop("checked", !1);
                b.textSwitch.addClass("text-switch-before");
                b.toggleBtn.removeClass("toggle-btn-checked");
                b.textSwitch.removeClass("text-switch-checked text-switch-after");
                b.textSwitch.html(b.textSwitch.attr("data-no"))
            };
            b.init = function() {
                b.isChecked ? b.check() : b.uncheck();
                b.callback && b.callback(b.isChecked);
                b.view.on("click mouseover mouseout",
                function(a) {
                    if ("click" == a.type) {
                        if (b.locked) return ! 0;
                        b.locked = !0;
                        b.isChecked ? b.uncheck() : b.check();
                        b.callback ? b.callback(b.isChecked,
                        function() {
                            b.locked = !1
                        }) : b.locked = !1
                    } else "mouseover" == a.type ? b.toggleBtn.css("background-color", "#AEAEAE") : "mouseout" == a.type && b.toggleBtn.css("background-color", "")
                })
            }
        },
        createSwitchBtn: function(e, c) {
            if (!$.isEmptyObject(e)) return new a.switchBtnObj(e, c)
        }
    });
    f.MySwitchBtn = a
})(window, void 0); (function(f, h) {
    var a = {},
    e = $("#user-center-panel");
    $.extend(!0, a, {
        view: e,
        userInfo: {
            inckName: null,
            sex: 0
        },
        initd: !1,
        sex: 0,
        hobbyCheckboxGroup: {},
        init: function() {
            MyUserCenter.initd || (MyUserCenter.getHobbyList(), MyUserCenter.getJobList(function(a) {
                console.log(a)
            }), $("#user-sex").jRadio({
                completeFunction: function(a) {
                    MyUserCenter.userInfo.sex = a;
                    a = $(".custom-info .hobby-info #user-hobby > ul li");
                    if ("undefined" !== typeof a) for (var b = 1,
                    c = 0,
                    e = a.length; c < e; c++) {
                        var f = $(a[c]);
                        if ("undefined" !== typeof f) {
                            var k = String(f.attr("name"));
                            "0" == k || k == String(MyUserCenter.userInfo.sex) ? (6 == b ? (b = 0, f.addClass("hobby-item-end")) : f.removeClass("hobby-item-end"), f.show(), b++) : f.hide()
                        }
                    }
                }
            }), MyUserCenter.initd = !0)
        },
        getHobbyList: function() {
            $.ajax({
                url: serverURI + "/front/hobby/list",
                type: "get",
                dataType: "json",
                async: !0,
                data: {
                    _dt: (new Date).getMonth()
                },
                success: function(a) {
                    MyUserCenter.renderHobbyCheckboxs(a)
                },
                error: function() {}
            })
        },
        getJobList: function(a) {
            $.ajax({
                url: serverURI + "/front/hobby/list",
                type: "get",
                dataType: "json",
                async: !0,
                data: {
                    _dt: (new Date).getMonth()
                },
                success: function(b) {
                    a(b)
                },
                error: function() {}
            })
        },
        renderHobbyCheckboxs: function(a) {
            if ("undefined" !== typeof a) {
                var b = $(".custom-info .hobby-info #user-hobby > ul");
                b.empty();
                for (var c = [], e = 1, f = 1;;) {
                    for (var k in a) {
                        var h = a[k];
                        String(h.sex) == String(f) && (h = MyUserCenter.createHobbyChechboxItemEl(h, e), e = h[0], c.push(h[1]))
                    }
                    if (1 == f) f = 2;
                    else if (2 == f) f = 0;
                    else break
                }
                b.append(c.join(""));
                MyUserCenter.hobbyCheckboxGroup = $("#user-hobby").jCheckBox({
                    maxNum: 10
                })
            }
        },
        createHobbyChechboxItemEl: function(a, b) {
            var c = MyUserCenter.userInfo.sex,
            e = "";
            "0" != String(c) ? "0" != String(a.sex) && String(a.sex) != String(c) && (e = "display:none;") : "0" != String(a.sex) && "1" != String(a.sex) && (e = "display:none;");
            c = [b, '<li name="' + a.sex + '"style="' + e + '" class="hobby-item' + (6 == b ? " hobby-item-end": "") + '"><input type="hidden" class="checkbox-value" value="' + a.id + '"/><i calss="checkbox-icon"></i>' + a.hobbyName + "</li>"];
            6 == b && (b = 0);
            "" == e && (c[0] = ++b);
            return c
        }
    });
    f.MyUserCenter = a
})(window, void 0); (function(f, h) {
    var a = {},
    e = $("#help-info-panel"),
    c = e.find("#help-info-content"),
    b = c.find("#suggestion-box"),
    g = b.find("#suggestion-submit-btn"),
    l = b.find("#suggestion-submit-content");
    $.extend(!0, a, {
        view: e,
        contentView: c,
        helpPicLoaded: !1,
        sendMail: function(a) {
            if (! ("" == $.trim(a) || 15 > $.trim(a).length)) try {
                $.ajax({
                    url: serverURI + "/front/suggestion/",
                    type: "post",
                    async: !0,
                    data: {
                        content: a
                    }
                })
            } catch(k) {
                alert(k)
            }
        }
    });
    g.on("click",
    function() {
        var b = l.val();
        try {
            b = $.trim(b),
            "" == b ? _MyJS.toast("\u8bf7\u8f93\u5165\uff01", 2E3, "red", "5px") : 15 > b.length ? _MyJS.toast("\u4e0d\u53ef\u4f4e\u4e8e15\u4e2a\u5b57\uff01", 2E3, "red", "5px") : (a.sendMail(b), l.val(""), _MyJS.toast("\u6211\u4eec\u5df2\u6536\u5230\u60a8\u7684\u53cd\u9988\uff01", 2E3, null, "5px"))
        } catch(k) {}
    });
    f.MyHelpInfo = a
})(window, void 0); (function(f, h) {
    var a = {},
    e = $("#free-proxy-panel"),
    c = e.find("#free-proxy-content");
    $.extend(!0, a, {
        view: e,
        contentView: c,
        isLoadPic: !1,
        loadIcons: function() {
            a.isLoadPic = !0;
            var b = staticServerURI + "../static/img/";
            $("#free-proexy-for-mac").find("img").attr("src", b + "folder_apple.svg");
            $("#free-proexy-for-windows").find("img").attr("src", b + "folder_windows.svg");
            $("#free-proexy-for-android").find("img").attr("src", b + "folder_android.svg");
            $("#free-proexy-for-ubuntu").find("img").attr("src", b + "folder_ubuntu.svg")
        }
    });
    f.MyFreeProxy = a
})(window, void 0); (function(f, h) {
    var a = {},
    e = $("#main");
    $.extend(!0, a, {
        view: e,
        init: function() {
            switch (MyLocalStore.getSearchType()) {
            case Search_Engine.types.google:
                Search_Engine.search_type = Search_Engine.types.google;
                searchEngineLogo.attr("src", Search_Engine.logos.google);
                break;
            default:
            case Search_Engine.types.baidu:
                Search_Engine.search_type = Search_Engine.types.baidu,
                searchEngineLogo.attr("src", Search_Engine.logos.baidu)
            }
            a.view.fadeIn(100,
            function() {
                Search_Engine.searchInputViewFocus_isSys = !0;
                Search_Engine.searchInputView.focus();
                NavSite.siteListTypeSwitchBtn = MySwitchBtn.createSwitchBtn(NavSite.siteListTypeView, NavSite.siteListTypeChange);
                var a = MyLocalStore.getSiteListForm();
                $.isEmptyObject(__sys_t) ? 1 == a ? NavSite.siteListTypeSwitchBtn.setChecked(!1) : NavSite.siteListTypeSwitchBtn.setChecked(!0) : "i" == __sys_t ? NavSite.siteListTypeSwitchBtn.setChecked(!0) : NavSite.siteListTypeSwitchBtn.setChecked(!1);
                NavSite.siteListTypeSwitchBtn.init();
                NavSite.initView(function() {
                    var a = MyLocalStore.getMetaSearchState();
                    "null" != String(a) && "" != a && "undefined" != String(a) && (a = "true" == a ? !0 : !1, a || (Search_Engine.isMetaSearch = a, Search_Engine.change2MetaSearch(a)));
                    MySetting.currentView || jQuery(document.body).css("overflow-y", "scroll");
                    setTimeout(function() {
                        NavSite.siteListTypeView.addClass("tada animated infinite");
                        setTimeout(function() {
                            NavSite.siteListTypeView.removeClass("tada");
                            NavSite.siteListTypeView.removeClass("animated");
                            NavSite.siteListTypeView.removeClass("infinite")
                        },
                        1E3)
                    },
                    3E3);
                    setTimeout(function() {
                        try {
                            MyAnimation.getWeather()
                        } catch(l) {}
                    },
                    5E3);
                    var c = !1;
                    $(f).scroll(function(a) {
                        c = 0 >= $(this).scrollTop() ? !0 : !1
                    });
                    0 >= $(f).scrollTop() && (c = !0);
                    $(document.body).on("mousewheel DOMMouseScroll",
                    function(a) {
                        if (NavSite.isLocked() || Search_Engine.searchInputViewFocus) return ! 1;
                        if ($.isEmptyObject(MySetting.currentView)) if (a = a.originalEvent.wheelDelta && (0 < a.originalEvent.wheelDelta ? 1 : -1) || a.originalEvent.detail && (0 < a.originalEvent.detail ? -1 : 1), 0 < a) c && NavSite.isShow() && NavSite.hide();
                        else if (0 > a && !NavSite.isShow()) return NavSite.show(),
                        !1
                    });
                    $(f).on("keydown",
                    function(a) {
                        83 == a.keyCode && a.ctrlKey ? a.preventDefault() : 27 == a.keyCode && Search_Engine.searchInputViewBlur()
                    })
                })
            })
        },
        widowResize: function() {
            var a = $(f).height(),
            b = String(BGSetting.view.css("top") || "").replace("px", "");
            BGSetting.contentView.css("height", Number(a - (Number(b) + 55)) / Number(a) * 100 + "%");
            b = String(MyHelpInfo.view.css("top") || "").replace("px", "");
            MyHelpInfo.contentView.css("height", Number(a - Number(b) - 99) / Number(a) * 100 + "%")
        }
    });
    f.MyApplication = a
})(window, void 0);
_MyJS.browser.isIE && 8 >= _MyJS.browser.ieVersion && $("#ie-low").show();
$("body,html").animate({
    scrollTop: 0
},
0);
$(window).on("resize",
function() {
    MyApplication.widowResize()
});
$(window).on("resize",
function() {
    var f = $(window).height();
    f = parseInt(f - 95) / parseInt(f) * 100;
    $("#user-center-panel").find(".setting-body").css("height", f + "%")
});
$(function() {
    MyApplication.widowResize();
    var f = MyLocalStore.getNavBgId();
    if ($.isEmptyObject(f) || "null" == String(f) || "undefined" == String(f)) f = "105";
    BGSetting.applyBGImg(f,
    function(f) {
        $.isEmptyObject(f) || $(document.body).css("background-image", "url('" + f + "')");
        setTimeout(function() {
            MyApplication.init()
        },
        200)
    })
});