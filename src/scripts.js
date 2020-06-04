/*
> twitter.com/hostinfonet

> support@host-info.net OR head to host-info.net and leave a message via tawk.to!



Priority-Level: Minor, Moderate, Critical

BUGS:
> [Moderate], audio toggle does not update based on LocalStorage.
*/


var thisHostname;
let defaultContext = "Welcome To OpenView!";
var table = document.getElementById('resulttable');
var resultWindow = document.getElementById('resultwindow');
var mainTitle = document.getElementById('maintitle');
var loading = document.getElementById('loading');
var nmapBtn = document.getElementById('portscanbtn');
var nmapBtn1 = document.getElementById('portscanbtn1');
var nmapRes = document.getElementById('nmapres');
var returnMain = document.getElementById('return');
var apiContext = document.getElementById('apitext');
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var customsearchtable = document.getElementById("customsearchtable");
var customsearchtoggle = document.getElementById("customsearchtoggle");
var customsearchtitle = document.getElementById("customsearchtitle");
var customsearchsubmit = document.getElementById("customsearchbtn");
var toggleInfoBtn = document.getElementById("toggleinfo");
var userInput = document.getElementById("userinput");
var togglesearchtac = document.getElementById("togglesearchtac");
var toggleinfotac = document.getElementById("toggleinfotac");
var settingstoggle = document.getElementById("settingstoggle");

var tacbtnaudio = new Audio('ui/tacbtn.mp3');
var fmsynth = new Audio('ui/fm_synth.mp3');
var errorsynth = new Audio('ui/error.mp3');
var successsynth = new Audio('ui/success.mp3');

var audioToggle = document.getElementById('audiotoggle');

var mainflag = document.getElementById('mainflag');
var customflag = document.getElementById('customflag');

var settingsMenu = document.getElementById('settingsmenu');
var settingsMenuTac = document.getElementById('settingstac');

var bgcolorpicker = document.getElementById('bgcolorpicker');
var fgcolorpicker = document.getElementById('fgcolorpicker');
var textcolorpicker = document.getElementById('textcolorpicker');

var footerContext = document.getElementById('infofooterp');

var maintitleani = document.getElementById("maintitleani");

// ONLOAD - UI
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
btn.style.display = "block";

// ONLOAD - STORAGE
if (localStorage.textcolor == undefined)
{
  textcolorpicker.value = "black";
  document.body.style.color = "black";
}
else
{
  textcolorpicker.value = localStorage.textcolor;
  document.body.style.color = localStorage.textcolor;
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
}
else
{
  resultWindow.style.background = localStorage.facecolor;
  fgcolorpicker.value = localStorage.facecolor;
}



// ONLOAD - BACKEND
// Regex-pattern to check URLs against. 
// It matches URLs like: http[s]://[...]stackoverflow.com[...]

// A function to use as callback
function doStuffWithDom(domContent) {
    alert('I received the following DOM content:\n' + domContent);
}

// When the browser-action button is clicked...
chrome.runtime.onMessage.addListener(function (tab)
{
  chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);  
});




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

/*
function onMouseMove(event) {

  // Update the mouse variable
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  // Make the sphere follow the mouse
  mouseMesh.position.set(event.clientX, event.clientY, 0);

  var vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
  vector.unproject( camera );
  var dir = vector.sub( camera.position ).normalize();
  var distance = - camera.position.z / dir.z;
  var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
};
*/
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  var thisUrl = tabs[0].url;
  var thisProto = thisUrl.split("://")[0];
  thisHostname = thisUrl.split("://")[1];
  if (thisHostname.includes("www.")) thisHostname = thisHostname.split("www.")[1];
  if (thisHostname.includes("/")) thisHostname = thisHostname.split("/")[0];

  returnMain.style.display = "none";
  nmapRes.style.display = "none";
  table.style.display = "none";
  resultWindow.style.display = "none";
  mainTitle.style.display = "none";
  apiContext.style.display = "block";
  loading.style.display = "block";
  
  var apiUrl = atob('aHR0cHM6Ly9qc29uLmdlb2lwbG9va3VwLmlvLwo=');
  apiUrl += thisHostname;
  mainTitle.innerHTML = thisHostname;
  var xmlhttp = new XMLHttpRequest();
  
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
            var row = table.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
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

      apiContext.style.display = "none";
      loading.style.display = "none";
      // Dont automatically show table
      // table.style.display = "block";
      resultWindow.style.display = "block";
      //mainTitle.style.display = "block"; 
      //nmapBtn.style.display = "block";
      mainflag.src = `https://www.countryflags.io/${obj.country_code}/shiny/64.png`;
      //mainflag.style.display = "block";
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
  toggleInfoBtn.style.display = "none";
  customsearchtoggle.style.display = "none";
  btn.style.display = "none";
  nmapBtn.style.display = "none";
  nmapRes.style.display = "none";
  mainTitle.style.display = "none";
  table.style.display = "none";
  loading.style.display = "block";
  returnMain.style.display = "block";
  apiContext.style.display = "block";

  let xmlhttp = new XMLHttpRequest();
  let htri = atob('aHR0cHM6Ly9hcGkuaGFja2VydGFyZ2V0LmNvbS9ubWFwLz9xPQ==');
  let nmapUrl = htri + thisHostname;
  xmlhttp.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200)
    {
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
  customflag.style.display = "none";
  mainflag.style.display = "none";
  returnMain.style.display = "none";
  nmapRes.style.display = "none";
  loading.style.display = "none";
  modal.style.display = "none";
  table.style.display = "block"; 
  mainTitle.style.display = "block";
  resultWindow.style.display = "block";
  btn.style.display = "block";
  customsearchtoggle.display = "block";
  nmapBtn.style.display = "none";
  nmapBtn.style.display = "none";
  customsearchtoggle.style.display = "block";
  btn.style.display = "block";
  toggleInfoBtn.style.display = "block";
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
    togglesearchtac.src = "/ui/tac_closed.png";
    userInput.style.display = "none";
    customsearchtitle.style.display = "none";
    customsearchtable.style.display = "none";
    customsearchsubmit.style.display = "none";
    nmapBtn1.style.display = "none";
    customflag.style.display = "none";
  }
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
  }
  else
  {
    toggleinfotac.src = "/ui/tac_closed.png";
    table.style.display = "none";
    mainTitle.style.display = "none";
    nmapBtn.style.display = "none";
    mainflag.style.display = "none";
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
            var row = customsearchtable.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
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

      customflag.src = `https://www.countryflags.io/${obj.country_code}/shiny/64.png`;
      nmapBtn.style.display = "none";
      apiContext.style.display = "none";
      loading.style.display = "none";
      customsearchtable.style.display = "block";
      customsearchtitle.style.display = "block";
      nmapBtn1.style.display = "block"; 
      customflag.style.display = "block";
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
  returnMain.style.display = "block";
  apiContext.style.display = "block";


  let xmlhttp = new XMLHttpRequest();
  let htri = atob('aHR0cHM6Ly9hcGkuaGFja2VydGFyZ2V0LmNvbS9ubWFwLz9xPQ==');
  let nmapUrl = htri + userInput.value;
  xmlhttp.onreadystatechange = function()
  {
    if (this.readyState == 4 && this.status == 200)
    {
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
}

textcolorpicker.oninput = function()
{
  localStorage.textcolor = textcolorpicker.value;
  document.body.style.color = localStorage.textcolor;
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
