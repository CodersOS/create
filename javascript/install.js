
function get_redirect_url(build_server) {
  var path = document.location.pathname;
  var end_of_directory = path.lastIndexOf("/");
  var directory_path = path.slice(0, end_of_directory + 1);
  var query = "?build_server=" + encodeURIComponent(build_server.url);
  return document.location.origin + directory_path + "installing.html" + query;
}

function build_specification(build_server) {
  // see https://github.com/CodersOS/image-creator-server/blob/master/docs/README.md
  var spec = {};
  spec.redirect = get_redirect_url(build_server);
  spec.commands = [];
  var installs = software_spec_to_install();
  for (var i = 0; i < installs.length; i += 1) {
    var software_spec = installs[i];
    var build_spec = get_build_command(software_spec);
    spec.commands.push(build_spec);
  }
  return spec;
}

function get_build_command(software) {
  var command = {};
  command.arguments = []; // TODO: Read parameters from options
  command.name = software.id;
  if (software.packages) {
    if (software.command || software.script) {
      alert("You can not specify command and script and packages in " + software.id + ".");
    }
    command.command = get_command_from_file_name("apt-get-install.sh");
    // check if we have a string from http://stackoverflow.com/a/4775737/1320237
    if( Object.prototype.toString.call( software.packages ) === '[object Array]' ) {
      command.arguments = software.packages
    } else {
      command.arguments = ["invalid-package"];
      alert("The packages of " + software.id + " should be given as an array. Please fix this!");
    }
  } else if (software.script) {
    command.command = get_command_from_file_name(software.script);
    if (software.command) {
      alert("You can not specify command and script in " + software.id + ".");
    }
  } else if (software.command) {
    command.command = software.command;
  } else {
    command.command = get_null_command();
  }
  return command;
}

function install_everything() {
  var build_server = choose_build_server();
  var specification = build_specification(build_server);
  build(build_server, specification);
}

function get_build_specification() {
  var build_server = choose_build_server();
  return build_specification(build_server);
}