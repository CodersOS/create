var install_before = [];
var to_install = [];
var install_after = ["iso-build"];

function toggle_install(spec) {
  if (spec.id == null) {
    alert("Error: this can not be installed becase there is an error in the software.yml file: No \"id\" given.")
  }
  spec.list_entry = document.getElementById(spec.id);
  spec.install_button = document.getElementById("install-" + spec.id);
  if (to_install.includes(spec.id)) {
    uninstall(spec);
  } else {
    install(spec);
  }
  console.log("toogle_install: build specification: " + JSON.stringify(get_build_specification()));
}

function uninstall(spec) {
  spec.list_entry.classList.remove("toinstall");
  to_install.pop(spec.id);
}

function install(spec) {
  spec.list_entry.classList.add("toinstall");
  to_install.push(spec.id);
}

function software_spec_to_install() {
  var specifications = [];
  var to_install_2 = install_before.concat(to_install).concat(install_after);
  for (var i = 0; i < to_install_2.length; i += 1) {
    var id = to_install_2[i];
    var spec = get_software_spec(id);
    specifications.push(spec);
  }
  return specifications;
}
