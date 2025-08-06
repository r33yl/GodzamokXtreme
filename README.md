# GodzamokXtreme

**GodzamokXtreme** is a mod for [Cookie Clicker](https://orteil.dashnet.org/cookieclicker/) that automates the building selling process for use with the **Godzamok** spirit in the Temple minigame. It allows players to efficiently trigger the **Devastation** buff by selling and optionally rebuying buildings, with full control over how the process works.

<img width="199" height="98" alt="Screenshot 2025-08-01 235102" src="https://github.com/user-attachments/assets/6afdc72c-183f-4a8d-82b2-27be72ef4230" />

In the screenshot, information about the current active buff is displayed using the [Quick Info](https://github.com/swbuwk/CC_QuickInfoMod) mod.

## How to Install

### Steam Version (Workshop):
1. Go to the [Steam Workshop page](https://steamcommunity.com/sharedfiles/filedetails/?id=3543119876).
2. Click **Subscribe**.
3. Launch Cookie Clicker via Steam — the mod will load automatically if you have **Mod Manager** enabled.

### Web Version:
1. Open the Cookie Clicker website: [orteil.dashnet.org/cookieclicker](https://orteil.dashnet.org/cookieclicker/)
2. Open the browser console (usually by pressing `F12`).
3. Paste the following code and press Enter:
   
```javascript
Game.LoadMod('https://r33yl.github.io/GodzamokXtreme/main.js');
```

## Requirements

This mod requires [CCSE (Cookie Clicker Script Extender)](https://klattmose.github.io/CookieClicker/CCSE.js).  
It must be loaded before this mod.

## Features

- Adds a main activation button near the Big Cookie
- Optionally adds a second button inside the Temple interface
- Optional Loop Mode: runs the sell/rebuy logic repeatedly while the button is held
- Supports a hotkey (G by default) to run the script
- Auto-switch to Godzamok if it's not currently active
- Supports two sell modes:
  - Sell by **percentage** of owned buildings
  - Sell by **fixed unit** count
- Configurable auto-buyback:
  - Rebuy full sold amount
  - Rebuy as much as possible based on profit
  - Rebuy a fixed percentage
- Settings menu integrated with CCSE:
  - Enable/disable specific buildings
  - Set sell values per building
  - Set global presets for sell amounts
  - Filter buildings (show only enabled or hide empty)

<img width="710" height="931" alt="Screenshot 2025-08-01 235301" src="https://github.com/user-attachments/assets/d907799c-b1d2-4ddc-8463-e14f0fe08176" />


## License

This project is licensed under the MIT [License](./LICENSE).  
You are free to use, modify, and distribute the code with attribution.
