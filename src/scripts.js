// 2020 - Made w/ <3 by A3R0
var thisHostname;
const defaultContext = "Welcome To OpenView!";
const table = document.getElementById('resulttable');
const resultWindow = document.getElementById('resultwindow');
const mainTitle = document.getElementById('maintitle');
const loading = document.getElementById('loading');
const nmapBtn = document.getElementById('portscanbtn');
const nmapBtn1 = document.getElementById('portscanbtn1');
const nmapRes = document.getElementById('nmapres');
const returnMain = document.getElementById('return');
const apiContext = document.getElementById('apitext');
const modal = document.getElementById("myModal");
const modalContent = document.getElementById("modal-content");
const btn = document.getElementById("myBtn");
const span = document.getElementsByClassName("close")[0];
const customsearchtable = document.getElementById("customsearchtable");
const customsearchtoggle = document.getElementById("customsearchtoggle");
const customsearchtitle = document.getElementById("customsearchtitle");
const customsearchsubmit = document.getElementById("customsearchbtn");
const toggleInfoBtn = document.getElementById("toggleinfo");
const userInput = document.getElementById("userinput");
const togglesearchtac = document.getElementById("togglesearchtac");
const toggleinfotac = document.getElementById("toggleinfotac");
const settingstoggle = document.getElementById("settingstoggle");

const tacbtnaudio = new Audio('ui/tacbtn.mp3');
const fmsynth = new Audio('ui/fm_synth.mp3');
const errorsynth = new Audio('ui/error.mp3');
const successsynth = new Audio('ui/success.mp3');

const audioToggle = document.getElementById('audiotoggle');

const mainflag = document.getElementById('mainflag');
const customflag = document.getElementById('customflag');

const settingsMenu = document.getElementById('settingsmenu');
const settingsMenuTac = document.getElementById('settingstac');

const bgcolorpicker = document.getElementById('bgcolorpicker');
const fgcolorpicker = document.getElementById('fgcolorpicker');
const textcolorpicker = document.getElementById('textcolorpicker');

const footerContext = document.getElementById('infofooterp');

const maintitleani = document.getElementById("maintitleani");

const alltacbtns = document.getElementsByClassName('tacbtns');


const gmapMain = document.getElementById('gmap_main');
const gmapMainFrame = document.getElementById('gmap_canvas');
const gmapCustom = document.getElementById('gmap_custom');
const gmapCustomFrame = document.getElementById('gmap_canvas1');

const gmapCanvasMacro = document.getElementsByClassName('gmap_canvas');

const gmapCanvasMacroOuter = document.getElementsByClassName('mapouter');



// ONLOAD - UI
for (var i = 0; i < alltacbtns.length; i++) {
  alltacbtns[i].style.display = "none";
}
resultWindow.style.display = "block";
loading.style.display = "block";

gmapMain.style.display = "none";
gmapCustom.style.display = "none";
//gmapMainFrame.src = "#";
//gmapCustomFrame.src = "#";
gmapCustomFrame.style.display = "none";
gmapMainFrame.style.display = "none";

maintitleani.style.display = "none";
mainTitle.style.display = "none";



footerContext.innerHTML = "Loading...";
settingsMenu.style.display = "none";
customflag.style.display = "none";
mainflag.style.display = "none";
userInput.style.display = "none";
mainTitle.style.display = "none";
nmapBtn.style.display = "none";
nmapBtn1.style.display = "none";
customsearchtitle.style.display = "none";
customsearchtable.style.display = "none";
customsearchsubmit.style.display = "none";
modal.style.display = "none";
table.style.display = "none";
returnMain.style.display = "none";
apiContext.innerHTML = "Connecting To API...";



// ONLOAD - STORAGE
if (localStorage.textcolor == undefined)
{
  textcolorpicker.value = "black";
  document.body.style.color = "black";
  for (var i = 0; i < alltacbtns.length; i++) {
    alltacbtns[i].style.color = 'black';
  }
}
else
{
  textcolorpicker.value = localStorage.textcolor;
  document.body.style.color = localStorage.textcolor;
  for (var i = 0; i < alltacbtns.length; i++) {
    alltacbtns[i].style.color = localStorage.textcolor;
  }
}
if (localStorage.audio == undefined)
{
  audioToggle.checked = true;
  localStorage.audio = true;
}
else
{
  audioToggle.checked = localStorage.audio;
}
if (localStorage.bgcolor == undefined)
{
  document.body.style.background = "#fefefe";
  bgcolorpicker.value = "#fefefe";
}
else
{
  document.body.style.background = localStorage.bgcolor;
  bgcolorpicker.value = localStorage.bgcolor;
}
if (localStorage.facecolor == undefined)
{
  resultWindow.style.background = "silver";
  fgcolorpicker.value = "silver";
  modalContent.style.background = "#fefefe";
}
else
{
  resultWindow.style.background = localStorage.facecolor;
  fgcolorpicker.value = localStorage.facecolor;
  modalContent.style.background = localStorage.facecolor;
}


btn.onclick = function() {
  if (audioToggle.checked == true)
  {tacbtnaudio.load();tacbtnaudio.play();}
  modal.style.display = "block";
  modal.focus();
}

span.onclick = function() {
  if (audioToggle.checked == true)
  {fmsynth.load();fmsynth.play();}
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    if (audioToggle.checked == true)
    {fmsynth.load();fmsynth.play();}
    modal.style.display = "none";
  }
}

function dressKeys(key)
{
  key = key.replace("_", " ");
  str = key.split(" ");
  for (var i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }
  return str.join(" ");
}

// PERSISTANT SCRIPT ENTRY POINT - Everytime you open app
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  let thisUrl = tabs[0].url;
  let thisProto = thisUrl.split("://")[0];
  thisHostname = thisUrl.split("://")[1];
  if (thisHostname.includes("www.")) thisHostname = thisHostname.split("www.")[1];
  if (thisHostname.includes("/")) thisHostname = thisHostname.split("/")[0];

  returnMain.style.display = "none";
  nmapRes.style.display = "none";
  table.style.display = "none";
  resultWindow.style.display = "block";
  mainTitle.style.display = "none";
  apiContext.style.display = "block";
  
  var apiUrl = atob('aHR0cHM6Ly9qc29uLmdlb2lwbG9va3VwLmlvLwo=');
  apiUrl += thisHostname;
  mainTitle.innerHTML = thisHostname;
  let xmlhttp = new XMLHttpRequest();
  
  xmlhttp.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200)
    {
      pageInfo = {'URL': thisUrl, 'Base': thisHostname, 'Protocol': thisProto};
      var obj = JSON.parse(this.responseText);
      var obj = {...pageInfo, ...obj};
      var revObj = Object.assign([], obj).reverse(); 
      if (!revObj)
      {resultarea.innerHTML = "Fatal Error With API!";footerContext.innerHTML = "Fatal Error";return;}
      else if (revObj.success === true)
      {footerContext.innerHTML = defaultContext;}
      var size = 0, key;
      for (key in revObj)
      {
          if (revObj.hasOwnProperty(key))
          {
            let row = table.insertRow(0);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            if (size < 3)
            {
              cell1.innerHTML = dressKeys(key) + ":";
            }
            else
            {
              cell1.innerHTML = dressKeys(key) + ":";
            }
            cell2.innerHTML = "\n" + revObj[key];
            size++;
          };
      }

      $("tbody").each(function(elem,index){
        var arr = $.makeArray($("tr",this).detach());
        arr.reverse();
          $(this).append(arr);
      });

      for (var i = 0; i < alltacbtns.length; i++) {
        alltacbtns[i].style.display = "block";
      }
      returnMain.style.display = "none";
      maintitleani.style.display = "block";
      apiContext.style.display = "none";
      loading.style.display = "none";
      resultWindow.style.display = "block";
      mainflag.src = `https://www.countryflags.io/${obj.country_code}/shiny/64.png`;
      gmapMainFrame.src = `https://maps.google.com/maps?q=${obj.latitude},${obj.longitude}&t=&z=11&ie=UTF8&iwloc=&output=embed`;
      gmapMain.style.display = "none";
    }
  };
  xmlhttp.open("GET", apiUrl, true);
  xmlhttp.send();
});

document.getElementsByClassName("tacbtns").onmouseover = function()
{
  if (audioToggle.checked == true)
  {tacbtnaudio.load();tacbtnaudio.play();}
};

nmapBtn.onclick = function()
{
  if (audioToggle.checked == true)
  {tacbtnaudio.load();tacbtnaudio.play();}
  for (var i = 0; i < alltacbtns.length; i++) {
    alltacbtns[i].style.display = "none";
  }
  maintitleani.style.display = "none";
  gmapMain.style.display = "none";
  toggleInfoBtn.style.display = "none";
  customsearchtoggle.style.display = "none";
  btn.style.display = "none";
  nmapBtn.style.display = "none";
  nmapRes.style.display = "none";
  mainTitle.style.display = "none";
  table.style.display = "none";
  loading.style.display = "block";
  apiContext.style.display = "block";
  mainflag.style.display = "none";

  let xmlhttp = new XMLHttpRequest();
  var htri = atob('aHR0cHM6Ly9hcGkuaGFja2VydGFyZ2V0LmNvbS9ubWFwLz9xPQ==');
  let nmapUrl = htri + thisHostname;
  xmlhttp.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200)
    {
      returnMain.style.display = "block";
      apiContext.style.display = "none";
      loading.style.display = "none";
      nmapRes.style.display = "block";
      nmapRes.innerHTML = this.responseText;
      if (audioToggle.checked == true)
      {successsynth.load();successsynth.play();}
    }
  }
  xmlhttp.open("GET", nmapUrl, true);
  xmlhttp.send();
  
};

returnMain.onclick = function()
{
  if (audioToggle.checked == true)
  {fmsynth.load();fmsynth.play();}

  gmapMain.style.display = "none";
  gmapCustom.style.display = "none";
  customflag.style.display = "none";
  mainflag.style.display = "none";
  for (var i = 0; i < alltacbtns.length; i++) {
    alltacbtns[i].style.display = "block";
  }
  returnMain.style.display = "none";
  nmapRes.style.display = "none";
  loading.style.display = "none";
  modal.style.display = "none";
  table.style.display = "none"; 
  mainTitle.style.display = "none";
  

  // CLOSE UP MODULES AFTER CUSTOM NMAP TO AVOID CLUTTER


  if (customsearchtitle.style.display == "block")
  {
    togglesearchtac.src = "/ui/tac_open.png";
  }
  else
  {
    togglesearchtac.src = "/ui/tac_closed.png";
  }
  
  toggleinfotac.src = "/ui/tac_closed.png";
  
  nmapBtn.style.display = "none";
  nmapBtn1.style.display = "none";

  resultWindow.style.display = "block";
  btn.style.display = "block";
  customsearchtoggle.style.display = "block";
  btn.style.display = "block";
  toggleInfoBtn.style.display = "block";
}

toggleInfoBtn.onclick = function()
{
  if (audioToggle.checked == true)
  {tacbtnaudio.load();tacbtnaudio.play();}
  if (table.style.display == "none")
  {
    toggleinfotac.src = "/ui/tac_open.png";
    table.style.display = "block";
    mainTitle.style.display = "block";
    nmapBtn.style.display = "block";
    mainflag.style.display = "block";
    gmapMain.style.display = "block";
    gmapMainFrame.style.display = "block";
    gmapCanvasMacro[0].style.display = "block";
    gmapCanvasMacroOuter[0].style.display = "block";
  }
  else
  {
    toggleinfotac.src = "/ui/tac_closed.png";
    gmapMain.style.display = "none";
    table.style.display = "none";
    mainTitle.style.display = "none";
    nmapBtn.style.display = "none";
    mainflag.style.display = "none";
    gmapMain.style.display = "none";
    gmapMainFrame.style.display = "none";
    gmapCanvasMacro[0].style.display = "none";
    gmapCanvasMacroOuter[0].style.display = "none";
  }
}

customsearchtoggle.onclick = function()
{
  if (audioToggle.checked == true)
  {tacbtnaudio.load();tacbtnaudio.play();}
  if (nmapBtn1.style.display == "none")
  {
    togglesearchtac.src = "/ui/tac_open.png";
    userInput.style.display = "block";
    customsearchsubmit.style.display = "block";
    nmapBtn1.style.display = "block";
    //customsearchtable.style.display = "block";
    //customsearchtitle.style.display = "block";
  }
  else
  {
    gmapCustom.style.display == "none";
    gmapCustomFrame.src = "";
    gmapCustomFrame.style.display = "none";
    togglesearchtac.src = "/ui/tac_closed.png";
    userInput.style.display = "none";
    customsearchtitle.style.display = "none";
    customsearchtable.style.display = "none";
    customsearchsubmit.style.display = "none";
    nmapBtn1.style.display = "none";
    customflag.style.display = "none";
    gmapCustomFrame.style.display = "none";
    gmapCanvasMacro[1].style.display = "none";
    gmapCanvasMacroOuter[1].style.display = "none";

  }
  
}

// CUSTOM SEARCH
customsearchsubmit.onclick = function()
{
  if (audioToggle.checked == true)
  {tacbtnaudio.load();tacbtnaudio.play();}
  if (userInput.value == "")
  {
    if (audioToggle.checked == true)
    {errorsynth.load();errorsynth.play();}
    alert("Geo-IP API: No Input!")
    return;
  }
  userInput.style.display = "none";
  customsearchsubmit.style.display = "none";
  var apiUrl = atob('aHR0cHM6Ly9qc29uLmdlb2lwbG9va3VwLmlvLwo=');
  apiUrl += userInput.value;
  customsearchtitle.innerHTML = userInput.value;
  customsearchtitle.style.display = "block";
  customsearchtitle.style.display = "block";
  var xmlhttp1 = new XMLHttpRequest();

  xmlhttp1.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200)
    {
      pageInfo = {'User Input': userInput.value};
      var obj = JSON.parse(this.responseText);
      var obj = {...pageInfo, ...obj};
      //var revObj = Object.assign([], obj).reverse(); 
      if (!obj){alert("Fatal Error With API!");return;}
      else if (obj.success === true){footerContext.innerHTML = `Found Results For ${obj.hostname}!`;}

      // Found the solution to the multiplying tables issue - Flush table values before updating.
      
      if (customsearchtable.rows.length !== 0)
      {
        var ind;
        var stat = customsearchtable.rows.length;
        for (ind = 0; ind < stat; ind++)
        {
          //DEBUG//alert(`${ind}/${customsearchtable.rows.length}`)
          try
          {
            customsearchtable.deleteRow(0);
          }
          catch(o)
          {
            footerContext.innerHTML = `Fatal Enumeration Error: "${o}"`;
          }
        }
      }
      
      var size = 0, key;
      for (key in obj)
      {
          if (obj.hasOwnProperty(key))
          {
            let row = customsearchtable.insertRow(0);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            if (size < 3)
            {
              cell1.innerHTML = dressKeys(key) + ":";
            }
            else
            {
              cell1.innerHTML = dressKeys(key) + ":";
            }
            cell2.innerHTML = "\n" + obj[key];
            size++;
          };
      }
      

      $("tbody").each(function(elem,index){
        var arr = $.makeArray($("tr",this).detach());
        arr.reverse();
          $(this).append(arr);
      });
      gmapCustomFrame.src = `https://maps.google.com/maps?q=${obj.latitude},${obj.longitude}&t=&z=11&ie=UTF8&iwloc=&output=embed`;
      gmapCustomFrame.style.display = "block";
      gmapCustom.style.display = "block";
      customflag.src = `https://www.countryflags.io/${obj.country_code}/shiny/64.png`;
      nmapBtn.style.display = "none";
      apiContext.style.display = "none";
      loading.style.display = "none";
      customsearchtable.style.display = "block";
      customsearchtitle.style.display = "block";
      nmapBtn1.style.display = "block"; 
      customflag.style.display = "block";
      gmapCanvasMacro[1].style.display = "block";
      gmapCanvasMacroOuter[1].style.display = "block";
      if (audioToggle.checked == true)
      {successsynth.load();successsynth.play();} 
    }
  };
  xmlhttp1.open("GET", apiUrl, true);
  xmlhttp1.send();
}

nmapBtn1.onclick = function()
{
  if (audioToggle.checked == true)
  {tacbtnaudio.load();tacbtnaudio.play();}
  if (userInput.value == "")
  {
    if (audioToggle.checked == true)
    {errorsynth.load();errorsynth.play();}
    alert("NMAP API: No Input!")
    return;
  }
  for (var i = 0; i < alltacbtns.length; i++) {
    alltacbtns[i].style.display = "none";
  }
  maintitleani.style.display = "none";
  mainflag.style.display = "none";
  toggleInfoBtn.style.display = "none";
  customsearchtoggle.style.display = "none";
  customsearchsubmit.style.display = "none";
  userInput.style.display = "none";
  btn.style.display = "none";
  nmapBtn.style.display = "none";
  nmapBtn1.style.display = "none";
  nmapRes.style.display = "none";
  mainTitle.style.display = "none";
  table.style.display = "none";
  loading.style.display = "block";
  apiContext.style.display = "block";


  let xmlhttp = new XMLHttpRequest();
  var htri = atob('aHR0cHM6Ly9hcGkuaGFja2VydGFyZ2V0LmNvbS9ubWFwLz9xPQ==');
  let nmapUrl = htri + userInput.value;
  xmlhttp.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200)
    {
      returnMain.style.display = "block";
      apiContext.style.display = "none";
      loading.style.display = "none";
      nmapRes.style.display = "block";
      nmapRes.innerHTML = this.responseText;
      if (audioToggle.checked == true)
      {successsynth.load();successsynth.play();}
    }
  }
  xmlhttp.open("GET", nmapUrl, true);
  xmlhttp.send();
};

settingstoggle.onclick = function()
{
  if (audioToggle.checked == true)
  {tacbtnaudio.load();tacbtnaudio.play();}
  if (settingsMenu.style.display == "none")
  {
    settingsMenuTac.src = "/ui/tac_open.png";
    settingsMenu.style.display = "block";
  }
  else
  {
    settingsMenuTac.src = "/ui/tac_closed.png";
    settingsMenu.style.display = "none";
  }
}

bgcolorpicker.oninput = function()
{
  localStorage.bgcolor = bgcolorpicker.value;
  document.body.style.background = localStorage.bgcolor;
  
}

fgcolorpicker.oninput = function()
{
  localStorage.facecolor = fgcolorpicker.value;
  resultWindow.style.background = localStorage.facecolor;
  modalContent.style.background = localStorage.facecolor;
}

textcolorpicker.oninput = function()
{
  localStorage.textcolor = textcolorpicker.value;
  document.body.style.color = localStorage.textcolor;
  for (var i = 0; i < alltacbtns.length; i++) {
    alltacbtns[i].style.color = localStorage.textcolor;
  }
  
}

audioToggle.oninput = function()
{
  localStorage.audio = audioToggle.checked;
}

/// LOCAL STORAGE:
// bgcolor
// facecolor
// textcolor
// audio
