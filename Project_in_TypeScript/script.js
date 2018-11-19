"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Switcher = /** @class */ (function () {
    function Switcher() {
    }
    Switcher.turn = function (state) {
        if (state == true) {
            return false;
        }
        return true;
    };
    return Switcher;
}());
var WarningMaker = /** @class */ (function () {
    function WarningMaker() {
    }
    WarningMaker.alarm = function (alarmText) {
        alert(alarmText);
    };
    return WarningMaker;
}());
var SimpleEquipment = /** @class */ (function () {
    function SimpleEquipment(name) {
        this._name = name;
        this._OnOffState = false;
    }
    SimpleEquipment.prototype.changeState = function () {
        this._OnOffState = Switcher.turn(this._OnOffState);
    };
    return SimpleEquipment;
}());
var Lamp = /** @class */ (function (_super) {
    __extends(Lamp, _super);
    function Lamp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Lamp;
}(SimpleEquipment));
var Chandelier = /** @class */ (function (_super) {
    __extends(Chandelier, _super);
    function Chandelier(name) {
        var _this = _super.call(this, name) || this;
        _this._currentVolume = "50";
        _this.maxVolume = "100";
        _this.minVolume = "0";
        _this.step = "10";
        return _this;
    }
    Chandelier.prototype.setLightVolume = function (newVolume) {
        if (this._OnOffState == true) {
            this._currentVolume = newVolume;
        }
        else {
            WarningMaker.alarm("Turn me on!");
        }
    };
    return Chandelier;
}(SimpleEquipment));
var Washer = /** @class */ (function (_super) {
    __extends(Washer, _super);
    function Washer(name) {
        var _this = _super.call(this, name) || this;
        _this.pattern = "washerPattern";
        _this.programmes = [
            {
                programmeName: "Cotton",
                programmeTemperature: "40",
                squeezingSpeed: "1000",
                programmeWashingTime: 4000,
                programmesqueezingTime: 3000
            },
            {
                programmeName: "Synthetic",
                programmeTemperature: "30",
                squeezingSpeed: "800",
                programmeWashingTime: 3000,
                programmesqueezingTime: 2000
            }
        ];
        _this.programmeState = "waiting";
        _this.programmeName = "Cotton";
        _this.programmeTemperature = "40";
        _this.programmesqueezingSpeed = "1000";
        _this.programmeWashingTime = 4000;
        _this.programmesqueezingTime = 3000;
        _this.timeLost = "" + ((_this.programmeWashingTime + _this.programmesqueezingTime) / 1000);
        return _this;
    }
    Washer.prototype.selectProgramme = function (chosenProgramme) {
        this.programmeName = chosenProgramme.programmeName;
        this.programmeTemperature = chosenProgramme.programmeTemperature;
        this.programmeWashingTime = chosenProgramme.programmeWashingTime;
        this.programmesqueezingTime = chosenProgramme.programmesqueezingTime;
        this.programmesqueezingSpeed = chosenProgramme.squeezingSpeed;
        this.timeLost = "" + ((this.programmeWashingTime + this.programmesqueezingTime) / 1000);
    };
    Washer.prototype.changeProgrammeState = function (newState) {
        this.programmeState = newState;
    };
    Washer.prototype._washing = function (washingTime, squeezingTime) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.changeProgrammeState("washing");
            setTimeout(function () { return resolve(squeezingTime); }, washingTime);
        });
    };
    Washer.prototype._squeezing = function (squeezingTime) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.changeProgrammeState("squeezing");
            setTimeout(function () { return resolve(); }, squeezingTime);
        });
    };
    Washer.prototype._autoOff = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.changeProgrammeState("finished");
            setTimeout(function () {
                _this.changeProgrammeState("waiting");
                _this.changeState();
            }, 1000);
        });
    };
    Washer.prototype.runProgramme = function () {
        var _this = this;
        var run = function () { return __awaiter(_this, void 0, void 0, function () {
            var squeezingTimeRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._washing(this.programmeWashingTime, this.programmesqueezingTime)];
                    case 1:
                        squeezingTimeRes = _a.sent();
                        return [4 /*yield*/, this._squeezing(squeezingTimeRes)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this._autoOff()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        run();
    };
    return Washer;
}(SimpleEquipment));
var HtmlSimpleEquipment = /** @class */ (function () {
    function HtmlSimpleEquipment(object) {
        this.object = object;
        this.pattern = "";
        this.htmlEquipment = {};
        this.htmlSwitcher = {};
        this.htmlRemuveButton = {};
    }
    HtmlSimpleEquipment.prototype.createHtmlItem = function () {
        var _this = this;
        this.htmlEquipment = document.getElementById(this.pattern).cloneNode(true);
        this.htmlEquipment.id = this.object._name;
        this.htmlEquipment.style.display = "block";
        this.htmlEquipment.children[1].innerHTML = this.object._name;
        this.htmlRemuveButton = this.htmlEquipment.children[0];
        this.htmlRemuveButton.onclick = function () {
            _this.removeHtmlItem();
        };
        document.body.appendChild(this.htmlEquipment);
        this.htmlSwitcher = this.htmlEquipment.children[2].children[0];
        this.htmlSwitcher.onchange = function () {
            _this.object.changeState();
            _this.createSwitcherHtmlEffect();
        };
    };
    HtmlSimpleEquipment.prototype.removeHtmlItem = function () {
        this.htmlEquipment.remove();
        //this.object = null;
    };
    HtmlSimpleEquipment.prototype.createSwitcherHtmlEffect = function () { };
    return HtmlSimpleEquipment;
}());
var HtmlLamp = /** @class */ (function (_super) {
    __extends(HtmlLamp, _super);
    function HtmlLamp(object) {
        var _this = _super.call(this, object) || this;
        _this.pattern = "lampPattern";
        return _this;
    }
    HtmlLamp.prototype.createSwitcherHtmlEffect = function () {
        var lampImg = this.htmlEquipment.getElementsByTagName("img")[0];
        if (this.object._OnOffState == true) {
            lampImg.setAttribute("src", "./images/lamp_on.jpg");
            lampImg.setAttribute("alt", "Lamp is on");
        }
        else {
            lampImg.setAttribute("src", "./images/lamp_off.jpg");
            lampImg.setAttribute("alt", "Lamp is off");
        }
    };
    return HtmlLamp;
}(HtmlSimpleEquipment));
var HtmlChandelier = /** @class */ (function (_super) {
    __extends(HtmlChandelier, _super);
    function HtmlChandelier(object) {
        var _this = _super.call(this, object) || this;
        _this.pattern = "chandelierPattern";
        _this.htmlRegulator = {};
        return _this;
    }
    HtmlChandelier.prototype.createHtmlItem = function () {
        var _this = this;
        _super.prototype.createHtmlItem.call(this);
        this.htmlRegulator = this.htmlEquipment.children[3].children[0];
        this.htmlRegulator.min = this.object.minVolume;
        this.htmlRegulator.max = this.object.maxVolume;
        this.htmlRegulator.step = this.object.step;
        this.htmlRegulator.value = this.object._currentVolume;
        this.htmlRegulator.onchange = function () {
            _this.object.setLightVolume(_this.htmlRegulator.value);
            var spanVolume = _this.htmlRegulator.nextElementSibling.children[0];
            spanVolume.innerText = _this.object._currentVolume;
        };
        document.body.appendChild(this.htmlEquipment);
    };
    HtmlChandelier.prototype.createSwitcherHtmlEffect = function () {
        if (this.object._OnOffState == true) {
            this.htmlSwitcher.nextElementSibling.innerHTML = "light is on";
        }
        else {
            this.htmlSwitcher.nextElementSibling.innerHTML = "light is off";
        }
    };
    return HtmlChandelier;
}(HtmlSimpleEquipment));
var HtmlWasher = /** @class */ (function (_super) {
    __extends(HtmlWasher, _super);
    function HtmlWasher(object) {
        var _this = _super.call(this, object) || this;
        _this.pattern = "washerPattern";
        _this.htmlProgrammesList = {};
        _this.htmlStartButton = {};
        _this.htmlTablo = {};
        return _this;
    }
    HtmlWasher.prototype.createHtmlItem = function () {
        var _this = this;
        _super.prototype.createHtmlItem.call(this);
        this.htmlProgrammesList = this.htmlEquipment.children[3].children[0].children[1].children[0].children;
        var _loop_1 = function (i) {
            this_1.htmlProgrammesList[i].onchange = function () {
                _this.object.selectProgramme(_this.object.programmes[i]);
                tabloTimerFunc();
            };
        };
        var this_1 = this;
        for (var i = 0; i < this.htmlProgrammesList.length; i++) {
            _loop_1(i);
        }
        this.htmlStartButton = this.htmlEquipment.children[4].children[0];
        this.htmlTablo = this.htmlEquipment.children[5];
        var tabloTimerFunc = function () {
            _this.htmlTablo.children[0].children[0].innerHTML = _this.object.programmeName;
            _this.htmlTablo.children[1].children[0].innerHTML = _this.object.programmeState;
            _this.htmlTablo.children[2].children[0].innerHTML = _this.object.programmeTemperature;
            _this.htmlTablo.children[3].children[0].innerHTML = _this.object.programmesqueezingSpeed;
            _this.htmlTablo.children[4].children[0].innerHTML = _this.object.timeLost;
            console.log(_this.object.timeLost);
        };
        var tick = function () {
            if (_this.object._OnOffState === true) {
                _this.createSwitcherHtmlEffect();
                tabloTimerFunc();
                setTimeout(tick, 1000);
            }
            else {
                _this.createSwitcherHtmlEffect();
            }
        };
        this.htmlStartButton.onclick = function () {
            if (_this.object._OnOffState == true) {
                tabloTimerFunc();
                _this.object.runProgramme();
                setTimeout(tick, 1000);
            }
        };
    };
    HtmlWasher.prototype.createSwitcherHtmlEffect = function () {
        if (this.object._OnOffState == true) {
            this.htmlSwitcher.nextElementSibling.innerHTML = "Washer is on";
            this.htmlTablo.style.display = "block";
            this.htmlSwitcher.checked = true;
        }
        else {
            this.htmlSwitcher.nextElementSibling.innerHTML = "Washer is off";
            this.htmlTablo.style.display = "none";
            this.htmlSwitcher.checked = false;
        }
    };
    return HtmlWasher;
}(HtmlSimpleEquipment));
var lamp = [];
var htmlLamp = [];
var lampCounter = 0;
function createLamps() {
    lamp[lampCounter] = new Lamp("lamp " + (lampCounter + 1));
    htmlLamp[lampCounter] = new HtmlLamp(lamp[lampCounter]);
    htmlLamp[lampCounter].createHtmlItem();
    lampCounter++;
}
;
var chandelier = [];
var htmlChandelier = [];
var ChandelierCounter = 0;
function createChandeliers() {
    chandelier[ChandelierCounter] = new Chandelier("chandelier " + (ChandelierCounter + 1));
    htmlChandelier[ChandelierCounter] = new HtmlChandelier(chandelier[ChandelierCounter]);
    htmlChandelier[ChandelierCounter].createHtmlItem();
    ChandelierCounter++;
}
;
var washer = [];
var htmlWasher = [];
var washerCounter = 0;
function createWashers() {
    washer[washerCounter] = new Washer("washer " + (washerCounter + 1));
    htmlWasher[washerCounter] = new HtmlWasher(washer[washerCounter]);
    htmlWasher[washerCounter].createHtmlItem();
    washerCounter++;
}
;
