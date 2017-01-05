---
---

var software = {{ site.data.software | jsonify }};

function get_software_spec(id) {
  for (var i = 0; i < software.length; i += 1) {
    var category = software[i];
    for (var j = 0; j < category.software.length; j += 1) {
      var spec = category.software[j];
      if (spec.id == id) {
        return spec;
      }
    }
  }
  alert("Error: software with id \"" + id + "\" not found! Where did you get this from? Debug your code!");
  return {"name" : "invalid software specification because no id was found."};
}