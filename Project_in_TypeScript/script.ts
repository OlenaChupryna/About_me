"use strict";

class Switcher {
	constructor (){}
	static turn(state: boolean): boolean {
		if (state == true) {
		return false;
		} 
		return true;		
	}
}

class WarningMaker {
	constructor (){}
	static alarm (alarmText: string): void {
		alert(alarmText);
	}
}

abstract class SimpleEquipment {
	public _name: string;
	public _OnOffState: boolean;
		
	constructor (name: string){
		this._name = name;
		this._OnOffState = false;			
	}
	
	public changeState(): void {
		this._OnOffState = Switcher.turn(this._OnOffState);		
	}	
}

class Lamp extends SimpleEquipment {}

class Chandelier extends SimpleEquipment {
	public _currentVolume: string;
	public maxVolume: string;
	public minVolume: string;
	public step: string;	
	
	constructor (name: string){
		super(name);		
		this._currentVolume = "50";
		this.maxVolume = "100";
		this.minVolume = "0";
		this.step = "10";		
	}
	
	public setLightVolume(newVolume: string): void {
		if (this._OnOffState == true) {
			this._currentVolume = newVolume;
		} else {
			WarningMaker.alarm("Turn me on!");
		}
	}		
}

class Washer extends SimpleEquipment {
	public pattern: string;	
	public programmeState: string;	
	public programmesqueezingSpeed: string;	
	public programmeName: string;	
	public programmeTemperature: string;
	public programmeWashingTime: number;
	public programmesqueezingTime: number;
	public timeLost: string;
	public programmes: Array<{programmeName: string, programmeTemperature: string, squeezingSpeed: string, programmeWashingTime: number, programmesqueezingTime: number}>;
	
	constructor (name: string){
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
		this.programmeName = "Cotton";
		this.programmeTemperature = "40";
		this.programmesqueezingSpeed = "1000";	
		this.programmeWashingTime = 4000;
		this.programmesqueezingTime = 3000;
		this.timeLost = "" + ((this.programmeWashingTime + this.programmesqueezingTime) / 1000);
	}

	public selectProgramme(chosenProgramme: {programmeName: string, programmeTemperature: string, squeezingSpeed: string, programmeWashingTime: number, programmesqueezingTime: number}): void {
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
	
	public changeProgrammeState(newState: string): void {
		this.programmeState = newState;
	}	
	
	private _washing(washingTime: number, squeezingTime: number): Promise<number> {
		return new Promise((resolve) => {
			this.changeProgrammeState("washing");
			setTimeout( 
				() => resolve(squeezingTime),
				washingTime
			);
		});
	}
		
	private _squeezing(squeezingTime: number): Promise<undefined> {
		return new Promise((resolve) => {
			this.changeProgrammeState("squeezing");
			setTimeout(
				() => resolve(),
				squeezingTime
			);
		});
	}
	
	private _autoOff(): Promise<void> {
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

	public runProgramme(): void {		
		const run = async (): Promise<void>  => {
			let squeezingTimeRes = await this._washing(this.programmeWashingTime, this.programmesqueezingTime); 
			await this._squeezing(squeezingTimeRes);
			await this._autoOff();		
		};
		run();						
	}	
}

abstract class HtmlSimpleEquipment <T extends SimpleEquipment>{
	protected object: T; 
	protected pattern: string;
	public htmlEquipment: HTMLDivElement;
	public htmlSwitcher: HTMLInputElement;
	public htmlRemuveButton: HTMLButtonElement;
	constructor (object: T){
		this.object = object;
		this.pattern = "";
		this.htmlEquipment = {} as HTMLDivElement;
		this.htmlSwitcher = {} as HTMLInputElement;
		this.htmlRemuveButton = {} as HTMLButtonElement;
	}
	
	public createHtmlItem(): void {
		this.htmlEquipment = document.getElementById(this.pattern)!.cloneNode(true) as HTMLDivElement;
		this.htmlEquipment.id = this.object._name;
		this.htmlEquipment.style.display = "block";
		this.htmlEquipment.children[1].innerHTML = this.object._name;
		
		this.htmlRemuveButton = this.htmlEquipment.children[0] as HTMLButtonElement;
		this.htmlRemuveButton.onclick = () => {
			this.removeHtmlItem();
		}
		
		document.body.appendChild(this.htmlEquipment);
		
		this.htmlSwitcher = this.htmlEquipment.children[2].children[0] as HTMLInputElement;
		this.htmlSwitcher.onchange = () => {		
			this.object.changeState();
			this.createSwitcherHtmlEffect();
		}
	}
	
	public removeHtmlItem(): void {		
		this.htmlEquipment.remove();
		//this.object = null;
	}
	
	public createSwitcherHtmlEffect(): void {}			
}

class HtmlLamp extends HtmlSimpleEquipment<Lamp> {
	constructor(object: Lamp) {
		super(object);		
		this.pattern = "lampPattern";
	}
	
	public createSwitcherHtmlEffect(): void {
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

class HtmlChandelier extends HtmlSimpleEquipment<Chandelier> {
	public htmlRegulator: HTMLInputElement;
	
	constructor (object: Chandelier){
		super(object);
		this.pattern = "chandelierPattern";	
		this.htmlRegulator = {} as HTMLInputElement;		
	}	
	
	public createHtmlItem() {
		super.createHtmlItem();
		this.htmlRegulator = this.htmlEquipment.children[3].children[0] as HTMLInputElement;
		this.htmlRegulator.min = this.object.minVolume;
		this.htmlRegulator.max = this.object.maxVolume;
		this.htmlRegulator.step = this.object.step;
		this.htmlRegulator.value = this.object._currentVolume;
		this.htmlRegulator.onchange = (): void => {
			this.object.setLightVolume(this.htmlRegulator.value);
			let spanVolume = this.htmlRegulator.nextElementSibling!.children[0] as HTMLSpanElement;
			spanVolume.innerText = this.object._currentVolume;
		}
		document.body.appendChild(this.htmlEquipment);
	}
	
	public createSwitcherHtmlEffect(): void {
		if (this.object._OnOffState == true) {
			this.htmlSwitcher.nextElementSibling!.innerHTML = "light is on";
		} else {
			this.htmlSwitcher.nextElementSibling!.innerHTML = "light is off";
		}
	}	
}

class HtmlWasher extends HtmlSimpleEquipment<Washer> {
	public htmlProgrammesList: HTMLCollection;
	public htmlStartButton: HTMLInputElement;
	public htmlTablo: HTMLDivElement;
	constructor (object: Washer){
		super(object);
		this.pattern = "washerPattern";			
		this.htmlProgrammesList = {} as HTMLCollection;
		this.htmlStartButton = {} as HTMLInputElement;
		this.htmlTablo = {} as HTMLDivElement;
	}	
	
	public createHtmlItem(): void {
		super.createHtmlItem();	
		this.htmlProgrammesList = this.htmlEquipment.children[3].children[0].children[1].children[0].children as HTMLCollection;
		for (let i = 0; i < this.htmlProgrammesList.length; i++) {
			(this.htmlProgrammesList[i] as HTMLElement).onchange = (): void => {
				this.object.selectProgramme(this.object.programmes[i]);
				tabloTimerFunc();
			}
		}
		
		this.htmlStartButton = this.htmlEquipment.children[4].children[0] as HTMLInputElement;
		
		this.htmlTablo = this.htmlEquipment.children[5] as HTMLDivElement;
		
		let tabloTimerFunc = (): void => {
			this.htmlTablo.children[0].children[0].innerHTML = this.object.programmeName;
			this.htmlTablo.children[1].children[0].innerHTML = this.object.programmeState;
			this.htmlTablo.children[2].children[0].innerHTML = this.object.programmeTemperature;
			this.htmlTablo.children[3].children[0].innerHTML = this.object.programmesqueezingSpeed;
			this.htmlTablo.children[4].children[0].innerHTML = this.object.timeLost;
		} 
		
		let tick = (): void => {
			if(this.object._OnOffState === true) {
				this.createSwitcherHtmlEffect();
				tabloTimerFunc();
				setTimeout(tick, 1000);				
			} else {
				this.createSwitcherHtmlEffect();
			}						
		}
		
		this.htmlStartButton.onclick = (): void => {
			if (this.object._OnOffState == true) {
				tabloTimerFunc();
				this.object.runProgramme();
				setTimeout(tick, 1000);				
			} 			
		}		
	}
	
	public createSwitcherHtmlEffect(): void {
		if (this.object._OnOffState == true) {
			this.htmlSwitcher.nextElementSibling!.innerHTML = "Washer is on";
			this.htmlTablo.style.display = "block";
			this.htmlSwitcher.checked = true;
		} else {
			this.htmlSwitcher.nextElementSibling!.innerHTML = "Washer is off";
			this.htmlTablo.style.display = "none";
			this.htmlSwitcher.checked = false;
		}
	}		
}


let lamp: Array<Lamp> = [];
let htmlLamp: Array<HtmlLamp> = [];
let lampCounter: number = 0;
function createLamps(): void{
 	lamp[lampCounter] = new Lamp(`lamp ${(lampCounter + 1)}`);
	htmlLamp[lampCounter] = new HtmlLamp (lamp[lampCounter]); 
	htmlLamp[lampCounter].createHtmlItem();
	lampCounter++;
};

let chandelier: Array<Chandelier> = [];
let htmlChandelier: Array<HtmlChandelier> = [];
let ChandelierCounter: number = 0;
function createChandeliers(): void{
 	chandelier[ChandelierCounter] = new Chandelier(`chandelier ${(ChandelierCounter + 1)}`);
	htmlChandelier[ChandelierCounter] = new HtmlChandelier(chandelier[ChandelierCounter]);
	htmlChandelier[ChandelierCounter].createHtmlItem();
	ChandelierCounter++;
};

let washer: Array<Washer> = [];
let htmlWasher: Array<HtmlWasher> = [];
let washerCounter: number = 0;
function createWashers(): void {
 	washer[washerCounter] = new Washer(`washer ${(washerCounter + 1)}`);
	htmlWasher[washerCounter] = new HtmlWasher(washer[washerCounter]);
	htmlWasher[washerCounter].createHtmlItem();
	washerCounter++;
};	