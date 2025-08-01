if (GodzamokXtreme === undefined) var GodzamokXtreme = {};
if (typeof CCSE == 'undefined') Game.LoadMod('https://klattmose.github.io/CookieClicker/CCSE.js');

GodzamokXtreme.name = 'GodzamokXtreme';
GodzamokXtreme.ID = 'godzamok_xtreme';
GodzamokXtreme.version = '1.0';
GodzamokXtreme.GameVersion = '2.053';

GodzamokXtreme.launch = function () {

	//***********************************
	//    CONFIGURATION DEFAULTS
	//***********************************

	GodzamokXtreme.defaultConfig = function () {
		const defaultBuildings = [3, 4, 5, 9, 12, 17];	// Default buildings enabled for selling
		return {
			showMainButton: 1,        // Show the main Godzamok button near the big cookie
			showTempleButton: 0,      // Show an additional button in the Temple minigame
			showLoopButton: 1,		  // Show "Loop" button to repeatedly sell/buy buildings in a loop
			loopModeEnabled: 0,		  // Whether Loop Mode is currently active (1 = active, 0 = off)
			hotkeyG: 1,               // Enable "G" hotkey to trigger script
			inputDelay: 0,            // Add delay between input events
			autoSwitchGods: 1,        // Automatically switch to Godzamok if not selected
			selectedSlot: 1,          // Temple slot where Godzamok will be placed
			buybackEnabled: 1,        // Enable automatic buyback of sold buildings
			buybackType: 1,           // Buyback strategy (0: with profit, 1: full amount, 2: percentage)
			buybackPercent: 90,       // Percentage for type 2 buyback
			showOnlyEnabled: 1,       // Show only enabled buildings in the UI
			hideEmptyBuildings: 0,    // Hide buildings with 0 owned units
			sellMode: 0,              // Sell mode: 0 = percent, 1 = units
			buildings: Game.ObjectsById.map((building) => ({
				enabled: defaultBuildings.includes(building.id) ? 1 : 0,
				sellPercent: 100,     // % to sell
				sellUnits: 0,         // units to sell if mode = units
			})),
		};
	};

	//***********************************
	//    ENUM OPTIONS
	//***********************************

	GodzamokXtreme.defaultDelay = 50;

	GodzamokXtreme.buybackOptions = [
		{ pref: 0, name: 'Use total gain' },
		{ pref: 1, name: 'Buy full amount' },
		{ pref: 2, name: 'Buy percentage' }
	];

	GodzamokXtreme.sellModeOptions = [
		{ pref: 0, name: 'Percent' },
		{ pref: 1, name: 'Units' }
	];

	//***********************************
	//    STYLE
	//***********************************

	GodzamokXtreme.injectStyles = function () {
		const styleContent = `
			.widthAuto > .smallFancyButton { width: auto !important; }
			.disable { opacity: 0.5; }
			.infoText { font-size: 12px; color: rgba(255,255,255,0.5) }
			a.option.purple{ color: #8e00d6; border-color: #8e00d6; }
			a.option.purple:hover{ color: #ba30ff; border-color: #ba30ff; }
			.godzamokXtremeWrapper {
				display: block;
				position: absolute;
				right: 6px;
				bottom: 28px;
				width: 48px;
				height: 48px;
				z-index: 100;
			}
			.godzamokXtremeWrapper#godzamokXtremeWrapper_temple {
				top: 6px;
				left: 6px;
			}
			.godzamokXtremeButton {
				position: absolute;
				width: 36px;
				height: 36px;
				background: url(img/icons.png);
				background-size: 1296px 1332px;
				background-position: 468px 684px;
				margin: 6px;
				cursor: pointer;
				z-index: 100;
			}
			.godzamokXtremeButton::before {
				content: "";
				position: absolute;
				width: 48px;
				height: 48px;
				background: url(img/upgradeFrame.png);
				background-size: 144px 96px;
				background-position: 96px 0px;
				top: -6px;
				left: -6px;
			}
			.godzamokXtremeButton:hover {
				background-color: rgba(160, 120, 0, 0.4);
			}
			.godzamokXtremeButton:hover::before {
				background-position: 0px 0px;
			}
			.godzamok-active .godzamokXtremeButton::before {
				background-position: 48px 0px;
			}
			.godzamokXtremeButton::after {
				content: "";
				position: absolute;
				width: 16px;
				height: 16px;
				opacity: 0;
				background: url(img/icons.png);
				background-size: 1152px 1184px;
				background-position: -736px -480px;
				filter: brightness(0.5);
				right: -2px;
				bottom: -2px;
			}
			.godzamokXtremeButton.diamond::after {
				opacity: 1;
				background-position: -736px -480px;
			}
			.godzamokXtremeButton.ruby::after {
				opacity: 1;
				background-position: -752px -480px;
			}
			.godzamokXtremeButton.jade::after {
				opacity: 1;
				background-position: -736px -496px;
			}
			.godzamokXtremeButton.emptySwaps::after {
				opacity: 1;
				background-size: 576px 592px;
				background-position: -16px -112px;
			}
			.godzamokXtremeButton:hover::after, 
			.godzamokXtremeWrapper.godzamok-active .godzamokXtremeButton::after {
				filter: brightness(1);
			}
			.godzamokXtremeShine {
				position: absolute;
				width: 68px;
				height: 68px;
				opacity: 0;
				background: url(img/shine.png) no-repeat center;
				background-size: 68px 68px;
				top: -10px;
				left: -10px;
				transition: opacity 0.3s ease;
				pointer-events: none;
				z-index: 50;
			}
			.godzamokXtremeWrapper:hover .godzamokXtremeShine {
				opacity: 0.5;
				animation: rotateShine 30s linear infinite;
			}
			.godzamokXtremeWrapper.godzamok-active .godzamokXtremeShine {
				background: url(img/shineGold.png) no-repeat center;
				background-size: 68px 68px;
				opacity: 1;
				animation: rotateShine 5s linear infinite;
			}
			.godzamokXtremeLoopButton {
				display: flex;
				position: absolute;
				width: 48px;
				height: 24px;
				bottom: 100%;
				align-items: center;
				justify-content: center;
				font-size: 12px;
				text-align: center;
				line-height: 20px;
				cursor: pointer;
				z-index: 99;
			}
			.godzamokXtremeLoopButton::before {
				content: "";
				position: absolute;
				width: 48px;
				height: 12px;
				background: url(img/upgradeFrame.png);
				background-size: 144px 96px;
				background-position: 96px 0px;
				top: 0px;
				left: 0px;
			}
			.godzamokXtremeLoopButton::after {
				content: "";
				position: absolute;
				width: 48px;
				height: 12px;
				background: url(img/upgradeFrame.png);
				background-size: 144px 96px;
				background-position: 96px 60px;
				left: 0px;
				bottom: 0px;
			}
			.godzamokXtremeLoopButton.loop-active {
				background-color: rgba(160, 120, 0, 0.2);
			}
			.godzamokXtremeLoopButton:hover {
				background-color: rgba(160, 120, 0, 0.4);
			}
			.godzamokXtremeLoopButton:hover::before {
				background-position: 0px 0px;
			}
			.godzamokXtremeLoopButton:hover::after {
				background-position: 0px 60px;
			}
			.godzamokXtremeLoopButton.loop-active::before{
				background-position: 0px 0px;
			}
			.godzamokXtremeLoopButton.loop-active::after{
				background-position: 0px 60px;
			}
			.godzamokXtremeWrapper#godzamokXtremeWrapper_temple > .godzamokXtremeLoopButton{
				top: 100%; 
			}
			@keyframes rotateShine {
				from { transform: rotate(0deg); }
				to { transform: rotate(360deg); }
			}`;

		const styleEl = document.createElement('style');
		styleEl.id = 'godzamokXtremeStyle';
		styleEl.textContent = styleContent;
		document.head.appendChild(styleEl);
	};

	//***********************************
	//    INIT
	//***********************************

	GodzamokXtreme.init = function () {
		GodzamokXtreme.isLoaded = true;
		GodzamokXtreme.config = GodzamokXtreme.defaultConfig();

		GodzamokXtreme.injectStyles();

		// Add settings and version info to the CCSE menu
		Game.customOptionsMenu.push(function () {
			CCSE.AppendCollapsibleOptionsMenu(GodzamokXtreme.name, GodzamokXtreme.getMenuString());
		});

		Game.customStatsMenu.push(function () {
			CCSE.AppendStatsVersionNumber(GodzamokXtreme.name, GodzamokXtreme.version);
		});

		GodzamokXtreme.addMainButtons();
		GodzamokXtreme.addKeyListener();
		GodzamokXtreme.monitorTempleSlotsAndSwaps();
		GodzamokXtreme.syncAllSellValues();

		// Setup core run logic (with throttling if enabled)
		GodzamokXtreme.updateRun();

		Game.Notify("GodzamokXtreme loaded!", "May Godzamok bless you with golden cookies.", [23, 18], 1);

	};

	//***********************************
	//    UI BUTTONS
	//***********************************

	GodzamokXtreme.addMainButtons = function () {
		if (!Game.Objects.Temple.minigameLoaded) return;

		GodzamokXtreme.addBuffUpdateHook(); // Activate buff-dependent shine

		if (GodzamokXtreme.config.showMainButton) {
			createUIButton('sectionLeft', 'godzamokXtremeWrapper_main');
		}

		if (GodzamokXtreme.config.showTempleButton) {
			createUIButton('row6', 'godzamokXtremeWrapper_temple');

		}

		// Creates a UI button wrapper and adds it to specified DOM container
		function createUIButton(containerId, wrapperId) {
			const container = document.getElementById(containerId);
			if (!container) {
				setTimeout(() => createUIButton(containerId, wrapperId), 500);
				return;
			}
			if (document.getElementById(wrapperId)) return;

			const wrapper = document.createElement('div');
			wrapper.id = wrapperId;
			wrapper.className = 'godzamokXtremeWrapper';

			const shine = document.createElement('div');
			shine.className = 'godzamokXtremeShine';

			const godSlotClass = GodzamokXtreme.getGodSlotVisualClass();
			const btn = document.createElement('div');
			btn.className = `godzamokXtremeButton ${godSlotClass}`;
			GodzamokXtreme.attachHoldToRun(btn);

			wrapper.appendChild(shine);
			wrapper.appendChild(btn);

			if (GodzamokXtreme.config.showLoopButton) {
				const loopBtn = document.createElement('div');
				loopBtn.className = `godzamokXtremeLoopButton titleFont`;
				loopBtn.textContent = 'Loop';
				loopBtn.onclick = () => GodzamokXtreme.toggleLoopMode();

				wrapper.appendChild(loopBtn);
			}

			container.appendChild(wrapper);
		}
	};

	//***********************************
	//    BUTTON PRESS SUPPORT
	//***********************************

	// Attaches mousedown-based hold behavior to a button element
	GodzamokXtreme.attachHoldToRun = function (btn) {
		let holdInterval = null;

		btn.addEventListener('mousedown', () => {
			GodzamokXtreme.run();

			const delay = GodzamokXtreme.config.inputDelay ? GodzamokXtreme.defaultDelay : 0;

			holdInterval = setInterval(() => {
				GodzamokXtreme.run();
			}, delay);
		});

		const clear = () => {
			if (holdInterval) {
				clearInterval(holdInterval);
				holdInterval = null;
			}
		};

		btn.addEventListener('mouseup', clear);
		btn.addEventListener('mouseleave', clear);
		btn.addEventListener('mouseout', clear); // optional: for safety
	};

	GodzamokXtreme.toggleLoopMode = function () {
		GodzamokXtreme.config.loopModeEnabled = GodzamokXtreme.config.loopModeEnabled ? 0 : 1;

		const loopButtonElems = document.getElementsByClassName('godzamokXtremeLoopButton');
		for (const btn of loopButtonElems) {
			btn.classList.toggle('loop-active', GodzamokXtreme.config.loopModeEnabled);
		}

		if (GodzamokXtreme.config.loopModeEnabled) {
			const delay = GodzamokXtreme.config.inputDelay ? GodzamokXtreme.defaultDelay : 0;
			GodzamokXtreme._loopInterval = setInterval(() => {
				GodzamokXtreme.run();
			}, delay);
		} else {
			clearInterval(GodzamokXtreme._loopInterval);
			GodzamokXtreme._loopInterval = null;
		}
	};

	//***********************************
	//    HOTKEY SUPPORT
	//***********************************

	// Adds 'G' hotkey listener to run the Godzamok script
	GodzamokXtreme.addKeyListener = function () {
		if (GodzamokXtreme._keyListenerAdded) return;
		GodzamokXtreme._keyListenerAdded = true;

		document.addEventListener('keydown', function (event) {
			if (event.code === 'KeyG' && GodzamokXtreme.config.hotkeyG) {
				GodzamokXtreme.run();
			}
		});
	};

	//***********************************
	//    BUFF VISUAL EFFECT
	//***********************************

	// Adds glow effect to UI button if Devastation buff is active
	GodzamokXtreme.addBuffUpdateHook = function () {
		let wasGodzamokActive = false;
		const originalUpdateBuffs = Game.updateBuffs;

		Game.updateBuffs = function () {
			originalUpdateBuffs.apply(this, arguments);
			const isActive = Game.buffs.Devastation !== undefined;

			if (isActive !== wasGodzamokActive) {
				wasGodzamokActive = isActive;

				['godzamokXtremeWrapper_main', 'godzamokXtremeWrapper_temple'].forEach(id => {
					const btn = document.getElementById(id);
					if (btn) btn.classList.toggle('godzamok-active', !!isActive);
				});
			}
		};
	};


	//***********************************
	//    SETTINGS MENU UI
	//***********************************

	GodzamokXtreme.getMenuString = function () {
		let menu = CCSE.MenuHelper;
		let str = '';

		function addClassToHtml(html, classToAdd) {
			const match = html.match(/class="([^"]*)"/);
			if (!match) {
				return html.replace(/<(\w+)/, `<$1 class="${classToAdd}"`);
			}
			const classes = match[1].split(' ');
			if (!classes.includes(classToAdd)) classes.push(classToAdd);
			return html.replace(/class="[^"]*"/, `class="${classes.join(' ')}"`);
		}

		try {
			//========== GENERAL ==========
			str += menu.Header('General');

			str += '<div class="listing">' +
				menu.ToggleButton(GodzamokXtreme.config, 'showMainButton',
					'GodzamokXtreme_MainButton',
					'Button near big cookie: ON',
					'Button near big cookie: OFF',
					"GodzamokXtreme.ToggleStartButton") +
				menu.ToggleButton(GodzamokXtreme.config, 'showTempleButton',
					'GodzamokXtreme_TempleButton',
					'Button in Temple: ON',
					'Button in Temple: OFF',
					"GodzamokXtreme.ToggleStartButton") +
				'<label>Display buttons for script activation</label>' +
				'</div>';

			str += '<div class="listing">' +
				menu.ToggleButton(GodzamokXtreme.config, 'showLoopButton',
					'GodzamokXtreme_ShowLoopButton',
					'Show Loop Button: ON',
					'Show Loop Button: OFF',
					"GodzamokXtreme.ToggleStartButton") +
				'<label>Display extra button for repeated script execution on hold</label>' +
				'</div>';

			str += '<div class="listing">' +
				menu.ToggleButton(GodzamokXtreme.config, 'hotkeyG',
					'GodzamokXtreme_HotkeyG',
					'Hotkey G: ON',
					'Hotkey G: OFF',
					"GodzamokXtreme.Toggle") +
				addClassToHtml(
					menu.ToggleButton(GodzamokXtreme.config, 'inputDelay',
						'GodzamokXtreme_InputDelay',
						'Input delay: ON',
						'Input delay: OFF',
						"GodzamokXtreme.ToggleInputDelay"),
					'neato') +
				`<label>Apply ${GodzamokXtreme.defaultDelay} ms delay between actions</label>` +
				'</div>';

			str += '<div class="listing">' +
				addClassToHtml(menu.ActionButton("GodzamokXtreme.confirmResetConfig();", 'Reset Config'), 'warning') +
				'</div>';

			str += '<br/>';

			//========== TEMPLE ==========
			str += menu.Header('Temple');

			// Auto-switch to Godzamok
			str += '<div class="listing widthAuto">' +
				addClassToHtml(
					menu.ToggleButton(
						GodzamokXtreme.config,
						'autoSwitchGods',
						'GodzamokXtreme_AutoSwitchGods',
						'Auto-switch to Godzamok: ON',
						'Auto-switch to Godzamok: OFF',
						"GodzamokXtreme.ToggleAutoSwitchGods"
					),
					'neato'
				) +
				'<label>Automatically assign Godzamok if not active</label>' +
				'</div>';

			// God slot selector (1, 2, 3)
			str += '<div class="listing widthAuto">';
			for (let i = 1; i <= 3; i++) {
				const isActive = GodzamokXtreme.config.selectedSlot === i;
				str += `<a class="smallFancyButton option purple ${isActive ? '' : 'off'}" 
						id="GodzamokXtreme_SelectedGodSlot_${i}" 
						onclick="GodzamokXtreme.ToggleGodSlot(${i})">
							${i}
					</a>`;
			}
			str += '<label>Temple slot where Godzamok will be placed</label>' +
				'</div>';

			str += '<br/>';

			//========== BUYBACK ==========
			str += menu.Header('Buyback');

			// Toggle auto-buyback
			str += '<div class="listing">' +
				addClassToHtml(
					menu.ToggleButton(
						GodzamokXtreme.config,
						'buybackEnabled',
						'GodzamokXtreme_BuybackEnabled',
						'Buyback: ON',
						'Buyback: OFF',
						"GodzamokXtreme.Toggle"
					),
					'neato'
				) +
				'<label>Instantly rebuy buildings after selling</label>' +
				'</div>';

			// Buyback strategy selection
			str += '<div class="listing">';
			for (let i = 0; i < GodzamokXtreme.buybackOptions.length; i++) {
				const isActive = GodzamokXtreme.config.buybackType === i;
				str += `<a class="smallFancyButton option ${isActive ? '' : 'off'}"
								id="GodzamokXtreme_BuybackType_${i}"
								onclick="GodzamokXtreme.ToggleBuybackType(${i})">
									${GodzamokXtreme.buybackOptions[i].name}
							</a>`;
			}
			str += '<label>Buyback strategy</label>' +
				'</div>';

			// Slider for percentage mode
			str += '<div class="listing">' +
				addClassToHtml(
					menu.Slider(
						'GodzamokXtreme_BuybackPercentSlider',
						'Buyback Percent',
						'[$]%',
						() => GodzamokXtreme.config.buybackPercent,
						'GodzamokXtreme.updateBuybackPercent(this.value);',
						0, 100, 5
					),
					GodzamokXtreme.config.buybackType === 2 ? '' : 'disable'
				) +
				'<label>Only used when "Buy percentage" strategy is selected</label>' +
				'</div>';

			str += '<br/>';

			//========== SELL ==========
			str += menu.Header('Sell');

			// Toggle filters
			str += '<div class="listing">' +
				addClassToHtml(
					menu.ToggleButton(
						GodzamokXtreme.config,
						'showOnlyEnabled',
						'GodzamokXtreme_ShowAll',
						'Show Only Enabled: ON',
						'Show Only Enabled: OFF',
						"GodzamokXtreme.Toggle"
					),
					'neato'
				) +
				addClassToHtml(
					menu.ToggleButton(
						GodzamokXtreme.config,
						'hideEmptyBuildings',
						'GodzamokXtreme_HideEmpty',
						'Hide Empty: ON',
						'Hide Empty: OFF',
						"GodzamokXtreme.Toggle"
					),
					'neato'
				) +
				'<label>Filters for the building list</label>' +
				'</div>';

			// Sell mode toggle (percent / units)
			str += '<div class="listing widthAuto">';
			for (let i = 0; i < GodzamokXtreme.sellModeOptions.length; i++) {
				const isActive = GodzamokXtreme.config.sellMode === i;
				str += `<a class="smallFancyButton option purple ${isActive ? '' : 'off'}" 
						id="GodzamokXtreme_SellMode_${i}" 
						onclick="GodzamokXtreme.ToggleSellMode(${i})">
						${GodzamokXtreme.sellModeOptions[i].name}
					</a>`;
			}
			str += '<label>Sell Mode</label>' +
				'</div>';

			// Preset buttons for % values
			str += '<div class="listing widthAuto">';
			const percentPreset = [0, 25, 50, 75, 100];
			percentPreset.map(val => {
				str += addClassToHtml(
					menu.ActionButton(`GodzamokXtreme.setSellPercentForAll(${val});`, `${val}%`),
					'purple'
				);
			});
			str += '<label>Preset % for all buildings</label>' +
				'</div>';

			// Preset buttons for unit values
			str += '<div class="listing widthAuto">' +
				addClassToHtml(menu.ActionButton(`GodzamokXtreme.resetSellUnits();`, `0`), 'purple') +
				addClassToHtml(menu.ActionButton(`GodzamokXtreme.addSellUnits(10);`, `+10`), 'purple') +
				addClassToHtml(menu.ActionButton(`GodzamokXtreme.addSellUnits(50);`, `+50`), 'purple') +
				addClassToHtml(menu.ActionButton(`GodzamokXtreme.addSellUnits(100);`, `+100`), 'purple') +
				'<label>Preset units to add per building</label>' +
				'</div>';

			//========== INDIVIDUAL BUILDING SETTINGS ==========
			for (let index = 0; index < Game.ObjectsById.length; index++) {
				const obj = Game.ObjectsById[index];
				const buildingCfg = GodzamokXtreme.config.buildings[index];
				const itemId = `GodzamokXtreme_Building_${index}`;

				// Skip based on filters
				if (GodzamokXtreme.config.showOnlyEnabled && !buildingCfg.enabled) continue;
				if (GodzamokXtreme.config.hideEmptyBuildings && obj.amount <= 0) continue;

				const sellPercent = buildingCfg.sellPercent || 0;
				const sellUnits = buildingCfg.sellUnits || 0;

				const isPercentMode = GodzamokXtreme.config.sellMode === 0;

				// Create UI block for each building
				str += `<div class="listing titleFont"> ` +
					menu.ToggleButton(
						GodzamokXtreme.config.buildings[index], 'enabled',
						itemId,
						`${obj.dname}: ON`,
						`${obj.dname}: OFF`,
						`GodzamokXtreme.ToggleBuilding(${index}); `,
					) +
					`<span style = "margin: 0 4px;"></span > ` +
					// Input: percent
					`Sell: <input class="input" type="number" min="0" max="100" value="${sellPercent}" style="width: 54px;" 
						${isPercentMode ? '' : 'disabled'} 
						onchange="GodzamokXtreme.config.buildings[${index}].sellPercent = parseInt(this.value)||0; GodzamokXtreme.syncSellValues(${index});">` +
					`<span class="infoText">%</span>` +
					`<span style="margin: 0 8px;">or</span> ` +
					// Input: units
					`<input class="input" type="number" min="0" max="1000" value="${sellUnits}" style="width: 54px;" 
						${isPercentMode ? 'disabled' : ''} 
						onchange="GodzamokXtreme.config.buildings[${index}].sellUnits = parseInt(this.value)||0; GodzamokXtreme.syncSellValues(${index});">` +
					`<span class="infoText">units</span>` +
					`</div>`;
			}

		} catch (e) {
			console.log(e);
			GodzamokXtreme.config = GodzamokXtreme.defaultConfig();
			str = GodzamokXtreme.getMenuString();
		}
		return str;
	};

	//***********************************
	//    MENU STATE TOGGLERS
	//***********************************

	// General-purpose toggle for binary config flags
	GodzamokXtreme.Toggle = function (prefName, button, on, off, invert) {
		let value = GodzamokXtreme.config[prefName];
		GodzamokXtreme.config[prefName] = value ? 0 : 1;

		const element = l(button);
		element.innerHTML = GodzamokXtreme.config[prefName] ? on : off;
		element.className = 'smallFancyButton prefButton option' +
			((GodzamokXtreme.config[prefName] ^ invert) ? '' : ' off');

		Game.UpdateMenu();
	};

	// Special toggle that also refreshes the start buttons (main/temple)
	GodzamokXtreme.ToggleStartButton = function (prefName, button, on, off, invert) {
		GodzamokXtreme.Toggle(prefName, button, on, off, invert);
		GodzamokXtreme.UpdateStartButton();
	};

	// Toggles the 'inputDelay' setting and rebinds the run function with or without throttling
	GodzamokXtreme.ToggleInputDelay = function (prefName, button, on, off, invert) {
		GodzamokXtreme.Toggle(prefName, button, on, off, invert);
		GodzamokXtreme.updateRun();
	};

	// Toggles auto-switch to Godzamok and updates the UI class of slot buttons
	GodzamokXtreme.ToggleAutoSwitchGods = function (prefName, button, on, off, invert) {
		GodzamokXtreme.Toggle(prefName, button, on, off, invert);
		GodzamokXtreme.updateGodSlotButtonClasses();
	}

	// Refreshes the large UI buttons after toggling
	GodzamokXtreme.UpdateStartButton = function () {
		const main = document.getElementById('godzamokXtremeWrapper_main');
		if (main) main.remove();

		const temple = document.getElementById('godzamokXtremeWrapper_temple');
		if (temple) temple.remove();

		GodzamokXtreme.addMainButtons();
	};

	//***********************************
	//    TEMPLE STATE HELPERS
	//***********************************

	// Returns true if Godzamok is currently active in any temple slot
	GodzamokXtreme.isGodzamokActivate = function () {
		if (!Game.Objects.Temple.minigameLoaded) return false;
		return Game.Objects.Temple.minigame.slot.includes(2);
	};

	// Returns all available slot name classes (diamond, ruby, jade)
	GodzamokXtreme.getAllSlotClasses = function () {
		if (!Game.Objects.Temple.minigameLoaded) return [];
		return Game.Objects.Temple.minigame.slotNames.map(name => name.toLowerCase());
	};

	// Gets the correct visual class for the UI button depending on Godzamok state
	GodzamokXtreme.getGodSlotVisualClass = function () {
		if (!Game.Objects.Temple.minigameLoaded) return '';

		if (Game.Objects.Temple.minigame.swaps < 1 && !GodzamokXtreme.isGodzamokActivate()) {
			return 'emptySwaps';
		}

		if (GodzamokXtreme.config.autoSwitchGods && !GodzamokXtreme.isGodzamokActivate()) {
			const allSlotClasses = GodzamokXtreme.getAllSlotClasses();
			return allSlotClasses[GodzamokXtreme.config.selectedSlot - 1] || '';
		}

		return '';
	};

	// Attempts to place Godzamok into the selected temple slot
	GodzamokXtreme.setGodzamok = function () {
		if (!Game.Objects.Temple.minigameLoaded) return;
		if (GodzamokXtreme.isGodzamokActivate()) return;

		if (!GodzamokXtreme.config.autoSwitchGods) {
			Game.Popup("Godzamok not selected");
			GodzamokXtreme.updateGodSlotButtonClasses();
			return;
		}

		if (Game.Objects.Temple.minigame.swaps < 1) {
			Game.Popup("Worship swaps: 0");
			GodzamokXtreme.updateGodSlotButtonClasses();
			return;
		}

		const godzamok = Game.Objects.Temple.minigame.godsById[2];  // Godzamok
		const slotIndex = GodzamokXtreme.config.selectedSlot - 1;

		Game.Objects.Temple.minigame.dragGod(godzamok);
		Game.Objects.Temple.minigame.hoverSlot(slotIndex);
		Game.Objects.Temple.minigame.dropGod();

		GodzamokXtreme.updateGodSlotButtonClasses();
	};


	// Updates the visual class on UI buttons based on slot state
	GodzamokXtreme.updateGodSlotButtonClasses = function () {
		const godSlotClass = GodzamokXtreme.getGodSlotVisualClass();
		const allSlotClasses = GodzamokXtreme.getAllSlotClasses();
		const btns = document.getElementsByClassName('godzamokXtremeButton');

		Array.from(btns).forEach(btn => {
			btn.classList.remove("emptySwaps");
			btn.classList.remove(...allSlotClasses);
			if (!GodzamokXtreme.isGodzamokActivate() && godSlotClass) {
				btn.classList.add(godSlotClass);
			}
		});
	};

	//***********************************
	//    TEMPLE WATCHDOG
	//***********************************

	// Monitors Temple swaps and slot changes to update UI dynamically
	GodzamokXtreme.monitorTempleSlotsAndSwaps = function () {
		let lastSwaps = Game.Objects.Temple.minigame.swaps;
		let lastSlots = [...Game.Objects.Temple.minigame.slot];

		function arraysEqual(a, b) {
			return a.length === b.length && a.every((v, i) => v === b[i]);
		}

		setInterval(() => {
			const currentSwaps = Game.Objects.Temple.minigame.swaps;
			const currentSlots = [...Game.Objects.Temple.minigame.slot];

			if (currentSwaps !== lastSwaps) {
				lastSwaps = currentSwaps;
				GodzamokXtreme.updateGodSlotButtonClasses();
			}

			if (!arraysEqual(currentSlots, lastSlots)) {
				lastSlots = [...currentSlots];
				GodzamokXtreme.updateGodSlotButtonClasses();
			}
		}, 3000); // check every 3 seconds
	};

	//***********************************
	//    TEMPLE LOGIC
	//***********************************

	// Updates selected temple slot and refreshes UI
	GodzamokXtreme.ToggleGodSlot = function (slot) {
		GodzamokXtreme.config.selectedSlot = slot;
		GodzamokXtreme.updateGodSlotButtonClasses();
		Game.UpdateMenu();
	};

	//***********************************
	//    BUYBACK LOGIC
	//***********************************

	// Toggles the current buyback strategy (gain-based, full, percentage)
	GodzamokXtreme.ToggleBuybackType = function (index) {
		GodzamokXtreme.buybackOptions.forEach(option => {
			const btn = l(`GodzamokXtreme_BuybackType_${option.pref}`);
			if (!btn) return;

			if (index == option.pref) {
				GodzamokXtreme.config.buybackType = option.pref;
				btn.innerHTML = option.name + ": ON";
			} else {
				btn.innerHTML = option.name + ": OFF";
			}
		});

		Game.UpdateMenu();
	};

	// Updates the % slider value used in percentage buyback mode
	GodzamokXtreme.updateBuybackPercent = function (val) {
		GodzamokXtreme.config.buybackPercent = parseInt(val);
		l('GodzamokXtreme_BuybackPercentSliderRightText').textContent = val + '%';
	};

	//***********************************
	//    BUILDING LOGIC 
	//***********************************

	// Enables/disables a specific building for selling
	GodzamokXtreme.ToggleBuilding = function (index) {
		const build = GodzamokXtreme.config.buildings[index];
		build.enabled = build.enabled ? 0 : 1;

		const button = l(`GodzamokXtreme_Building_${index}`);
		const obj = Game.ObjectsById[index];

		button.innerHTML = build.enabled ? `${obj.dname}: ON` : `${obj.dname}: OFF`;
		button.className = 'smallFancyButton prefButton option' + (build.enabled ? '' : ' off');
	};

	// Switches between percent mode and units mode
	GodzamokXtreme.ToggleSellMode = function (index) {
		GodzamokXtreme.config.sellMode = index;
		GodzamokXtreme.syncAllSellValues(); // recalculate other mode
		Game.UpdateMenu();
	};

	// Synchronizes sellPercent and sellUnits based on current sell mode
	GodzamokXtreme.syncSellValues = function (index, mode = -1, updateMenu = 1) {
		const building = GodzamokXtreme.config.buildings[index];
		const gameObj = Game.ObjectsById[index];

		const isPercentMode = (mode === -1)
			? (GodzamokXtreme.config.sellMode === 0)
			: (mode === 0);

		if (isPercentMode) {
			building.sellUnits = Math.floor(gameObj.amount * (building.sellPercent / 100));
		} else {
			building.sellPercent = (gameObj.amount > 0)
				? Math.floor((building.sellUnits / gameObj.amount) * 100)
				: 0;
		}
		if (updateMenu) Game.UpdateMenu();
	};

	// Applies syncSellValues to all buildings
	GodzamokXtreme.syncAllSellValues = function (mode) {
		GodzamokXtreme.config.buildings.forEach((_, index) => {
			GodzamokXtreme.syncSellValues(index, mode, 0);
		});
		Game.UpdateMenu();
	};

	// Sets the same percent for all enabled buildings
	GodzamokXtreme.setSellPercentForAll = function (value) {
		GodzamokXtreme.config.buildings.forEach((b) => {
			b.sellPercent = value;
		});
		GodzamokXtreme.syncAllSellValues(0); // sync units from %
		Game.UpdateMenu();
	};

	// Resets unit sell values to 0
	GodzamokXtreme.resetSellUnits = function () {
		GodzamokXtreme.config.buildings.forEach((building) => {
			building.sellUnits = 0;
		});
		GodzamokXtreme.syncAllSellValues(1); // sync % from 0 units
		Game.UpdateMenu();
	};

	// Adds specified number of units to each building (up to owned amount)
	GodzamokXtreme.addSellUnits = function (amount) {
		GodzamokXtreme.config.buildings.forEach((building, index) => {
			const obj = Game.ObjectsById[index];
			if (obj && obj.amount > 0) {
				building.sellUnits = Math.min(obj.amount, building.sellUnits + amount);
			}
		});
		GodzamokXtreme.syncAllSellValues(1); // sync % from units
		Game.UpdateMenu();
	};

	//***********************************
	//    SCRIPT EXECUTION
	//***********************************

	// Main logic that sells selected buildings and optionally buys them back
	GodzamokXtreme.runCore = function () {
		GodzamokXtreme.setGodzamok(); // Ensure Godzamok is active if autoSwitch is on

		if (!GodzamokXtreme.isGodzamokActivate()) return;

		Game.ObjectsById.forEach((building, i) => {
			const config = GodzamokXtreme.config.buildings[i];
			if (!config || !config.enabled) return;

			const sellPercent = Math.max(0, Math.min(config.sellPercent, 100));
			const amountToSell = Math.floor(building.amount * (sellPercent / 100));

			if (amountToSell <= 0) return;

			const totalGain = building.getReverseSumPrice(amountToSell); // simulate income from selling
			building.sell(amountToSell);  // perform the sale

			let boughtAmount = 0;

			if (GodzamokXtreme.config.buybackEnabled) {
				switch (GodzamokXtreme.config.buybackType) {
					case 0: // Buy back as much as totalGain allows
						while (true) {
							const price = building.getSumPrice(boughtAmount + 1);
							if (price > totalGain) break;
							boughtAmount++;
						}
						building.buy(boughtAmount);
						break;

					case 1: // Buy back full sold amount
						building.buy(amountToSell);
						boughtAmount = amountToSell;
						break;

					case 2: // Buy back fixed percent of sold
						const buybackPercent = Math.max(0, Math.min(GodzamokXtreme.config.buybackPercent, 100));
						boughtAmount = Math.floor(amountToSell * (buybackPercent / 100));
						building.buy(boughtAmount);
						break;
				}
			}
		});
	};

	// Updates wrapper function when delay setting is toggled
	GodzamokXtreme.updateRun = function () {
		GodzamokXtreme.run = GodzamokXtreme.config.inputDelay
			? throttle(GodzamokXtreme.runCore, GodzamokXtreme.defaultDelay)
			: GodzamokXtreme.runCore;
	};

	// Prevents function from being called more than once per delay interval
	function throttle(fn, delay) {
		let lastCall = 0;
		return function (...args) {
			const now = Date.now();
			if (now - lastCall >= delay) {
				lastCall = now;
				fn(...args);
			}
		};
	};


	//***********************************
	//    SAVE / LOAD / RESET CONFIG
	//***********************************

	// Serializes current config as a JSON string (used by CCSE)
	GodzamokXtreme.save = function () {
		return JSON.stringify(GodzamokXtreme.config);
	};

	// Deserializes JSON config and applies it
	GodzamokXtreme.load = function (str) {
		GodzamokXtreme.config = GodzamokXtreme.defaultConfig();

		try {
			const parsed = JSON.parse(str);
			if (parsed) {
				GodzamokXtreme.config = parsed;
				GodzamokXtreme.UpdateStartButton();  // restore buttons if needed
			}
		} catch (e) {
			console.error("Failed to load GodzamokXtreme config:", e);
		}
	};

	// Asks the player if they want to reset config
	GodzamokXtreme.confirmResetConfig = function () {
		Game.Prompt(`Reset ${GodzamokXtreme.name}'s config to the default settings?`,
			[
				[loc("Yes"), 'GodzamokXtreme.resetConfig();Game.ClosePrompt();', 'float:left'],
				[loc("No"), 0, 'float:right']
			]);
	};

	// Applies default config and updates UI
	GodzamokXtreme.resetConfig = function () {
		GodzamokXtreme.config = GodzamokXtreme.defaultConfig();
		GodzamokXtreme.UpdateStartButton();
		GodzamokXtreme.syncAllSellValues();
		GodzamokXtreme.save();
		Game.UpdateMenu();
		Game.Popup("GodzamokXtreme settings reset.");
	};

	//***********************************
	//    MOD REGISTRATION & CCSE LOADER
	//***********************************

	if (CCSE.ConfirmGameVersion(GodzamokXtreme.name, GodzamokXtreme.version, GodzamokXtreme.GameVersion)) {
		Game.registerMod(GodzamokXtreme.name, GodzamokXtreme);
	}

};

// Wait for CCSE to load, then launch the mod
if (!GodzamokXtreme.isLoaded) {
	if (CCSE && CCSE.isLoaded) {
		GodzamokXtreme.launch();
	} else {
		if (!CCSE) var CCSE = {};
		if (!CCSE.postLoadHooks) CCSE.postLoadHooks = [];
		CCSE.postLoadHooks.push(GodzamokXtreme.launch);
	}
};
