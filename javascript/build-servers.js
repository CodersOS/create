---
---

var all_build_servers = {{ site.data["build-servers"] | jsonify }};

function find_ready_build_servers() {
  for (var i = 0; i < all_build_servers.length; i += 1) {
    var server = all_build_servers[i];
    test_and_add_server(server);
  }
}

find_ready_build_servers();

var ready_build_servers = [];

function test_and_add_server(server) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      if (response.status == "ready") {
        var server_copy = JSON.parse(JSON.stringify(server));
        server_copy.priority = response.priority;
        ready_build_servers.push(server_copy);
        console.log("build-servers.js: test_and_add_server: added build server: " + JSON.stringify(server_copy));
      }
    }
  };
  var url = server.url + "/status";
  xhttp.open("GET", url, true);
  xhttp.send();
}

function choose_build_server() {
  // see http://www.w3schools.com/jsref/jsref_sort.asp
  ready_build_servers.sort(function(a, b){return a.priority - b.priority});
  return ready_build_servers[0];
}

function build(build_server, specification) {
  var build_form = document.getElementById("build-form");
  var spec_id = "build-form-specification";
  var build_form_specification = document.getElementById(spec_id);
  build_form_specification.value = JSON.stringify(specification);
  build_form.action = build_server.url + "/create";
  build_form.submit();
}

