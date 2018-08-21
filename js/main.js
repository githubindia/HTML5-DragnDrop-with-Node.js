// Default selection panel
filterSelection("all")

function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}


// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

// Getting element from ID.
function _(id){
    return document.getElementById(id);	
}

var droppedIn = false;
function drag_start(event) {
    _('app_status').innerHTML = "Dragging the "+event.target.getAttribute('id');
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("text", event.target.getAttribute('id') );
}

function drag_enter(event) {
    _('app_status').innerHTML = "You are dragging over the "+event.target.getAttribute('id');
}

function drag_leave(event) {
    _('app_status').innerHTML = "You left the "+event.target.getAttribute('id');
}

function drag_drop(event) {
    event.preventDefault(); /* Prevent undesirable default behavior while dropping */
    var elem_id = event.dataTransfer.getData("text");
    event.target.appendChild( _(elem_id) );
    _('app_status').innerHTML = "Dropped "+elem_id+" into the "+event.target.getAttribute('id');
    //  _(elem_id).removeAttribute("draggable");
    _(elem_id).classList.remove('column');
    _(elem_id).style.cursor = "default";
    droppedIn = true;
}

function drag_end(event) {
    if(droppedIn == false){
        _('app_status').innerHTML = "You let the "+event.target.getAttribute('id')+" go.";
    }
    droppedIn = false;
}

// Reading the dropzone and make changes to backend.
function readDropZone() {
    var data = [];
    var images = [];
    var name;
    var element_id;
    for(var i=0; i < _("drop_zones").children.length; i++) {
        name = null;
        images = [];
        var element_id = _("drop_zones").children[i].id
        for (var j = 0; j<_(element_id).children.length; j++) {
            var elements = _(element_id).children[j];
            if(elements.innerHTML) {
                element_id = elements.id;
                name = elements.innerHTML;
            } else {
                // alert(_(element_id).children[j].src);
                images.push(_(element_id).children[j].src);
            }
        }
        data.push({
            'folder_id': element_id,
            'name': name,
            'images': images
        })
    }
    if (_("drop_zones").children.length == data.length) {
        $.ajax({
            type: "POST",
            url: "http://localhost:5000/tagData",
            async: false,
            data: {data},
            success: function(response){
                console.log(response);
                if (response == 'successful') {
                    location.href = "./success.html"
                }
            }
        });
    }
}