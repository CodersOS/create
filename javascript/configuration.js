var to_install = [];

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
  spec.install_button.textContent = "Click to Install.";
  to_install.pop(spec.id);
}

function install(spec) {
  spec.list_entry.classList.add("toinstall");
  spec.install_button.textContent = "Will be installed.";
  to_install.push(spec.id);
}

function software_spec_to_install() {
  var specifications = [];
  for (var i = 0; i < to_install.length; i += 1) {
    var id = to_install[i];
    var spec = get_software_spec(id);
    specifications.push(spec);
  }
  return specifications;
}
