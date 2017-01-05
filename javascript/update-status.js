
function getQueryVariable(variable) {
    // from http://stackoverflow.com/a/2091331/1320237
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    alert('Query variable ' + variable + ' not found.');
}

var build_server = getQueryVariable("build_server");
var status_path = getQueryVariable("status");
var build_status_url = build_server + status_path;

function request_status_update() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var status = JSON.parse(this.responseText);
      update_progress(status);
    }
  };
  xhttp.open("GET", build_status_url, true);
  xhttp.send();
}

function update_progress(progress) {
  var download_button = document.getElementById("download-button");
  var download_link = document.getElementById("download-link");
  var progress_div = document.getElementById("progress");
  if (progress.status == "stopped") {
    if (progress.url) {
      download_button.textContent = "CLICK TO DOWNLOAD";
      download_link.href = progress.url;
    } else {
      download_button.textContent = "ERROR: iso creation failed";
    }
  }
  var innerHTML = "";
  for (var i = 0; i < progress.commands.length; i += 1) {
    var command = progress.commands[i];
    var specification = get_software_spec(command.name);
    var command_status = command.status;
    var exitcode = "";
    if (command_status == "stopped") {
      exitcode = "Process exited with status code " + 
                 command.exitcode + " - ";
      if (command.exitcode == 0) {
        command_status = "success";
        exitcode += "success.";
      } else {
        command_status = "failure";
        exitcode += "error."
      }
    }
    var command_output = command.output || "";
    innerHTML += '                                        \
      <div class="command status-' + command.status + '">          \
        <div class="name">' + specification.name + '</div>         \
        <pre class="output">' + command_output + '</pre>           \
        <div class="exitcode">' + exitcode + '</div>               \
      </div>                                                       \
    '
  }
  progress_div.innerHTML = innerHTML;
}

var update_interval = 5000;
function update_status_timer() {
  window.setTimeout(update_status_timer, update_interval);
  request_status_update();
}
update_status_timer();
