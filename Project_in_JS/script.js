"use strict";
class Switcher {
	static turn(state) {
		if (state == true) {
		return false;
		} 
		return true;		
	}
}

class WarningMaker {
	static alarm (alarmText) {
		alert(alarmText);
	}
}

class SimpleEquipment {
	constructor (name){
		this._name = name;
		this._OnOffState = false;
	}
	
	changeState() {
		this._OnOffState = Switcher.turn(this._OnOffState);		
	}	
}

class Lamp extends SimpleEquipment {}

class Chandelier extends SimpleEquipment {
	constructor (name){
		super(name);
		this._currentVolume = 50;
		this.maxVolume = 100;
		this.minVolume = 0;
		this.step = 10;		
	}
	
	setLightVolume(newVolume) {
		if (this._OnOffState == true) {
			this._currentVolume = newVolume;
		} else {
			WarningMaker.alarm("Turn me on!");
		}
	}		
}

class Washer extends SimpleEquipment {
	constructor (name){
		super(name);
		this.pattern = "washerPattern";	
		this.programmes = [
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
		this.programmeState = "waiting";
		this.programmesqueezingSpeed = "1000";	
		this.selectProgramme(this.programmes[0]);			
	}

	selectProgramme(chosenProgramme) {
		if (this.programmeState == "waiting") {
			this.programmeName = chosenProgramme.programmeName;
			this.programmeTemperature = chosenProgramme.programmeTemperature;
			this.programmeWashingTime = chosenProgramme.programmeWashingTime;
			this.programmesqueezingTime = chosenProgramme.programmesqueezingTime;
			this.programmesqueezingSpeed = chosenProgramme.squeezingSpeed;		
			this.timeLost = "" + ((this.programmeWashingTime + this.programmesqueezingTime) / 1000);
		} else {
			alert("You cann't change the programme while Washer is working");
		}		
	}		
	
	changeProgrammeState(newState) {
		this.programmeState = newState;
	}
	
	_washing(washingTime, squeezingTime) {
		return new Promise((resolve) => {
			this.changeProgrammeState("washing");
			setTimeout( 
				() => resolve(squeezingTime),
				washingTime
			);
		});
	}
	
	_squeezing(squeezingTime) {
		return new Promise((resolve) => {
			this.changeProgrammeState("squeezing");
			setTimeout(resolve,	squeezingTime);
		});
	}

	_autoOff() {
		return new Promise((resolve) => {
			this.changeProgrammeState("finished");
			setTimeout(
				() => {
					this.changeProgrammeState("waiting");
					this.changeState(); 					
				},
				1000
			);
		});
	}	

	runProgramme() {		
		const run = async () => {
			let squeezingTimeRes = await this._washing(this.programmeWashingTime, this.programmesqueezingTime); 
			await this._squeezing(squeezingTimeRes);
			await this._autoOff();		
		};
		run();						
	}	
}


class HtmlSimpleEquipment {
	constructor (object){
		this.object = object;		
		this.pattern = "";
		this.htmlEquipment;
		this.htmlSwitcher;
	}
	
	createHtmlItem() {
		this.htmlEquipment = document.getElementById(this.pattern).cloneNode(true);
			console.log(this.pattern);
			console.log(this);
			console.log("htmlEquipment", this.htmlEquipment);
		this.htmlEquipment.id = this.object._name;
		this.htmlEquipment.style.display = "block";
		this.htmlEquipment.children[1].innerHTML = this.object._name;
		this.htmlEquipment.children[0].onclick = () => {
			this.removeHtmlItem();
		}
		
		document.body.appendChild(this.htmlEquipment);
		
		this.htmlSwitcher = this.htmlEquipment.children[2].children[0];
		console.log("htmlSwitcher", this.htmlSwitcher);
		this.htmlSwitcher.onchange = () => {		
			this.object.changeState();
			this.createSwitcherHtmlEffect();
		}
	}
	
	removeHtmlItem() {		
		this.htmlEquipment.remove();
		//this.object = null;
	}
	
	createSwitcherHtmlEffect() {}			
}

class HtmlLamp extends HtmlSimpleEquipment {
	constructor(object) {
		super(object);		
		this.pattern = "lampPattern";
	}

	createSwitcherHtmlEffect() {
		let lampImg = this.htmlEquipment.getElementsByTagName("img")[0];
		if (this.object._OnOffState == true) {
			lampImg.setAttribute("src", "./images/lamp_on.jpg");				
			lampImg.setAttribute("alt", "Lamp is on");
		} else {
			lampImg.setAttribute("src", "./images/lamp_off.jpg");				
			lampImg.setAttribute("alt", "Lamp is off");			
		}
	}
}

class HtmlChandelier extends HtmlSimpleEquipment {
	constructor (object){
		super(object);
		this.pattern = "chandelierPattern";			
		this.htmlRegulator;
	}	
	
	createHtmlItem() {
		super.createHtmlItem();
		this.htmlRegulator = this.htmlEquipment.children[3].children[0];
		this.htmlRegulator.min = this.object.minVolume;
		this.htmlRegulator.max = this.object.maxVolume;
		this.htmlRegulator.step = this.object.step;
		this.htmlRegulator.value = this.object._currentVolume;
		this.htmlRegulator.onchange = () => {
			this.object.setLightVolume(this.htmlRegulator.value);
			let spanVolume = this.htmlRegulator.nextElementSibling.children[0];
			spanVolume.innerText = this.object._currentVolume;
		}
		document.body.appendChild(this.htmlEquipment);
	}
	
	createSwitcherHtmlEffect() {
		if (this.object._OnOffState == true) {
			this.htmlSwitcher.nextElementSibling.innerHTML = "light is on";
		} else {
			this.htmlSwitcher.nextElementSibling.innerHTML = "light is off";
		}
	}	
}
	
class HtmlWasher extends HtmlSimpleEquipment {
	constructor (object){
		super(object);
		this.pattern = "washerPattern";		
		this.htmlProgrammesList = [];
		this.htmlStartButton;
		this.htmlTablo;
		this.tabloClock;
	}	
	
	createHtmlItem() {
		super.createHtmlItem();	
		this.htmlProgrammesList = this.htmlEquipment.children[3].children[0].children[1].children[0].children;
		console.log('htmlProgrammesList', this.htmlProgrammesList);		
		for (let i = 0; i < this.htmlProgrammesList.length; i++) {
			this.htmlProgrammesList[i].onchange = () => {
				this.object.selectProgramme(this.object.programmes[i]);
				tabloTimerFunc();
			}
		}
		
		this.htmlTablo = this.htmlEquipment.children[5];
				
		let tick = () => {
			if(this.object._OnOffState === true) {
				this.createSwitcherHtmlEffect();
				tabloTimerFunc();
				setTimeout(tick, 1000);				
			} else {
				this.createSwitcherHtmlEffect();
			}						
		}
		
		let tabloTimerFunc = () => {			
			this.htmlTablo.children[0].children[0].innerHTML = this.object.programmeName;
			this.htmlTablo.children[1].children[0].innerHTML = this.object.programmeState;
			this.htmlTablo.children[2].children[0].innerHTML = this.object.programmeTemperature;
			this.htmlTablo.children[3].children[0].innerHTML = this.object.programmesqueezingSpeed;
			this.htmlTablo.children[4].children[0].innerHTML = this.object.timeLost;
		} 
		
		this.htmlStartButton = this.htmlEquipment.children[4].children[0];
		this.htmlStartButton.onclick = () => {
			if (this.object._OnOffState == true) {
				tabloTimerFunc();
				this.object.runProgramme();
				setTimeout(tick, 1000);							
			} 			
		}		
	}
	
	createSwitcherHtmlEffect() {
		if (this.object._OnOffState == true) {
			this.htmlSwitcher.nextElementSibling.innerHTML = "Washer is on";
			this.htmlTablo.style.display = "block";
			this.htmlSwitcher.checked = true;
		} else {
			this.htmlSwitcher.nextElementSibling.innerHTML = "Washer is off";
			this.htmlTablo.style.display = "none";
			this.htmlSwitcher.checked = false;			
		}
	}		
}


let lamp = [];
let htmlLamp = [];
let lampCounter = 0;
function createLamps (){
 	lamp[lampCounter] = new Lamp(`lamp ${(lampCounter + 1)}`);
	htmlLamp[lampCounter] = new HtmlLamp (lamp[lampCounter]); 
	htmlLamp[lampCounter].createHtmlItem();
	lampCounter++;
}

let chandelier = [];
let htmlChandelier = [];
let ChandelierCounter = 0;
function createChandeliers (){
 	chandelier[ChandelierCounter] = new Chandelier(`chandelier ${(ChandelierCounter + 1)}`);
	htmlChandelier[ChandelierCounter] = new HtmlChandelier(chandelier[ChandelierCounter]);
	htmlChandelier[ChandelierCounter].createHtmlItem();
	ChandelierCounter++;
}

let washer = [];
let htmlWasher = [];
let washerCounter = 0;
function createWashers (){
 	washer[washerCounter] = new Washer(`washer ${(washerCounter + 1)}`);
	htmlWasher[washerCounter] = new HtmlWasher(washer[washerCounter]);
	htmlWasher[washerCounter].createHtmlItem();
	washerCounter++;
}