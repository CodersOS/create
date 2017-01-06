---
---

function get_null_command() {
  return "#!/bin/bash\necho 'Seems like the implementation of the install command was not found.'\nexit 1\n"
}

function command_not_found(name) {
  return "#!/bin/bash\n1>&2 echo 'ERROR: the command \"" + name + "\" was not found.'\nexit 1";
}


var commands = {};

function load_command(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var file_name = url.slice(url.lastIndexOf("/") + 1, url.length);
      commands[file_name] = this.responseText;
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
} 

var static_files = {{ site.static_files | map: "path" | jsonify }};

function load_commands() {
  for (var i = 0; i < static_files.length; i += 1) {
    var absolute_path = static_files[i];
    if (absolute_path.startsWith("/commands")) {
      var url = "." + absolute_path;
      load_command(url);
    }
  }
}

window.onload = load_commands;

function get_command_from_file_name(file_name) {
  if (file_name in commands) {
    return commands[file_name];
  } else {
    alert("ERROR: could not find command named \"" + file_name + "\". Please check the spelling.");
    return command_not_found(file_name);
  }
};