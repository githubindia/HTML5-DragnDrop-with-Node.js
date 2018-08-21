
$.ajax({
    type: "GET",
    url: "http://localhost:5000/getImages",
    async: false,

    success: function(response){
        var btn = document.createElement('BUTTON');
        btn.setAttribute('class', 'btn active');
        btn.setAttribute('onclick', "filterSelection('all')")
        btn.innerHTML = 'ALL';
        document.getElementById('myBtnContainer').appendChild(btn);
        response.results.forEach(function(obj, i) {
            var btn = document.createElement('BUTTON');
            btn.setAttribute('onclick', "filterSelection('"+obj.name+"')")
            var btn_id = "btn_" + obj.name;
            btn.id = btn_id;
            btn.innerHTML = obj.name;
            btn.setAttribute('class', 'btn');
            document.getElementById('myBtnContainer').appendChild(btn);

            //Creating drop zone for each cluster.
            var dz_div = document.createElement('div');
            var id_div = obj.name;
            dz_div.id = id_div;
            dz_div.className = 'album';
            dz_div.setAttribute('contenteditable', 'true');
            dz_div.setAttribute('droppable', 'true')
            dz_div.setAttribute('ondragenter', 'drag_enter(event)');
            dz_div.setAttribute('ondrop', 'drag_drop(event)');
            dz_div.setAttribute('ondragover', 'return false');
            dz_div.setAttribute('ondragleave', 'drag_leave(event)');
            document.getElementById('drop_zones').appendChild(dz_div);
            
            var cName = document.createElement('h6');
            cName.id = obj.name;
            cName.innerHTML = obj.name;
            document.getElementById(id_div).appendChild(cName);
            obj.images.forEach(function(obj2, i1){
                var img1 = document.createElement('img');
                img1.setAttribute('src', obj2);
                img1.setAttribute('width', '30%');
                img1.id = obj.name + i1;
                img1.className = "objects column " + obj.name;
                img1.setAttribute('draggable', 'true');
                img1.setAttribute('ondragstart', 'drag_start(event)');
                img1.setAttribute('ondragend', 'drag_end(event)');
                document.getElementById('main').appendChild(img1);
            })
        })
    },
    dataType: "JSON"
});