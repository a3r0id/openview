var thisHostname;
var context = document.getElementById('resultwindowtitle');
let table = document.getElementById('resulttable');
let resultWindow = document.getElementById('resultwindow');
let mainTitle = document.getElementById('maintitle');
var loading = document.getElementById('loading');
var nmapBtn = document.getElementById('portscanbtn');
var nmapRes = document.getElementById('nmapres');
var returnMain = document.getElementById('return');
var apiContext = document.getElementById('apitext');
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

modal.style.display = "none";
table.style.display = "none";
nmapBtn.style.display = "none";
returnMain.style.display = "none";
apiContext.innerHTML = "Connecting To API...";
btn.style.display = "block";

btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
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

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  var thisUrl = tabs[0].url;
  var thisProto = thisUrl.split("://")[0];
  var thisHostname = thisUrl.split("://")[1];
  if (thisHostname.includes("www.")) thisHostname = thisHostname.split("www.")[1];
  if (thisHostname.includes("/")) thisHostname = thisHostname.split("/")[0];

  returnMain.style.display = "none";
  nmapRes.style.display = "none";
  context.style.display = "none";
  table.style.display = "none";
  resultWindow.style.display = "none";
  mainTitle.style.display = "none";
  apiContext.style.display = "block";
  loading.style.display = "block";
  nmapBtn.style.display = "block";
  
  var apiUrl = atob('aHR0cHM6Ly9qc29uLmdlb2lwbG9va3VwLmlvLwo=');
  apiUrl += thisHostname;
  mainTitle.innerHTML = `Info For ${thisHostname}:`;
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
      {resultarea.innerHTML = "Fatal Error With API!";context.innerHTML = "Error";return;}
      else if (revObj.success === true)
      {context.innerHTML = "<span \"style=\"font: none;\"><i>Made with </i>💖 <i>By Host-Info.net!</i></span>";}
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

      $(function(){
          $("tbody").each(function(elem,index){
            var arr = $.makeArray($("tr",this).detach());
            arr.reverse();
              $(this).append(arr);
          });
      });
      
      apiContext.style.display = "none";
      loading.style.display = "none";
      context.style.display = "block";
      table.style.display = "block";
      resultWindow.style.display = "block";
      mainTitle.style.display = "block"; 
      nmapBtn.style.display = "block";
    }
  };
  xmlhttp.open("GET", apiUrl, true);
  xmlhttp.send();
});

nmapBtn.onclick = function()
{
  btn.style.display = "none";
  nmapBtn.style.display = "none";
  nmapRes.style.display = "none";
  mainTitle.style.display = "none";
  table.style.display = "none";
  context.style.display = "none";
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
    }
  }
  xmlhttp.open("GET", nmapUrl, true);
  xmlhttp.send();
};

returnMain.onclick = function()
{
  returnMain.style.display = "none";
  nmapRes.style.display = "none";
  loading.style.display = "none";
  resultWindow.style.display = "block";
  mainTitle.style.display = "block";
  context.style.display = "block";
  table.style.display = "block"; 
  nmapBtn.style.display = "block";
  btn.style.display = "block";
}





