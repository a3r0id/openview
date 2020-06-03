# openview-chrome-extension
- A Geo-IP extension for Chrome Browser.
- Beta Version, [0.] 1.1.0.0 (development).


### V1.1 Release Notes:
- Added Custom Search + Custom NMAP!
- Added UI Audio.
- Added UI custom UI settings(savable).

### Other Notes:
- Incorporating Three.js MouseFollower soon. Doesn't function yet :/
- JQuery Version: 3.5.1.
- NMAP API has a usage limit of 25 daily.

### Known Bugs:
- Audio toggle preferance [UI Settings] saves in `LocalStorage` but doesn't update during load.

### How To Install (For Development):
- Open Chrome Browser and head to `chrome://extensions`.
- From your Extensions menu, enable developer mode in the right-hand corner.
- Select "Load Unpacked" then, in your file browser, select our repo directory. (`.../openview-chrome-extension/src/`)
- Viola! You are now running OpenView!

### How To Use:
- **Geo-IP**: Simply click our Extension's icon in your browser to view insights about your current window and the server thats hosting it.
- **NMAP**: Just click the "NMAP" button to run a quick NMAP scan. Scans common ports and returns port-service plus rdns records and latency.
- Adding more features soon!

![](https://cdn.discordapp.com/attachments/635539301790384171/716817305811550248/asdfasadgfhfasf.png)
