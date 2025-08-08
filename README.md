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

## How to Use
1. Make sure Godzamok is slotted in the Temple.
2. Adjust settings via the GodzamokXtreme menu:
   - Choose which buildings will be sold.
   - Choose sell mode (percentage or fixed count).
   - Set the buyback mode (by default: rebuy full sold amount).
   - Activate Calculate Safe Sell to determine the maximum number of buildings you can sell without going into a loss or cancelling the active Devastation buff.
3. Activate:
   - Click the main button near the Big Cookie **or**
   - Press the hotkey (default: G) **or**
   - Use Loop Mode

## Features

- Adds a main activation button near the Big Cookie
- Optionally adds a second button inside the Temple interface
- Loop Mode — a activation mode that continuously runs the sell/rebuy cycle (simulates holding the G hotkey)
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
- Show Debug Info — displays how many of each building were sold and rebought (in-game option labeled "Show debug info")
- Calculate Safe Sell — automatically determines the maximum safe number of buildings for the sale/purchase cycle so as not to lose the accumulated cookies

<img width="753" height="1057" alt="image" src="https://github.com/user-attachments/assets/67481181-a878-41eb-af8d-6edc58bbe578" />

<img width="322" height="322" alt="Снимок экрана 2025-08-06 081229" src="https://github.com/user-attachments/assets/7374ddd5-2de3-4864-b16a-875bb9f8c7d2" />

## License

This project is licensed under the MIT [License](./LICENSE).  
You are free to use, modify, and distribute the code with attribution.
