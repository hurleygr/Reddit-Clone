function bindPost(){
    document.getElementById('postSubmit').addEventListener('click', function(event){
        event.preventDefault();
        var form = document.getElementById("new")
        var formData = new FormData( form );
        var data = {};
        for (var [key,value] of formData.entries()) {
          data[key] = value
        }
        var req = new XMLHttpRequest();
        req.open('POST', 'http://localhost:1137/', true)
        req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')

        req.onload = function () {
            var response = JSON.parse(req.response)
            
            make_table_body(response.rows)

        }
        req.send(JSON.stringify(data))
    })
}

function doStuff(){

}

function make_table_body(data){
    
    var size = data.length
    var table_body = document.getElementById("tbody");
    if (table_body) {
        table_body.parentNode.removeChild(table_body);
    }

    var table = document.getElementById("exercises")
    // new table body
    var newbod = document.createElement("tbody")
 
    for (i=0; i<size; i++) {
        if (data[i]) {
            add_row(data[i], newbod)
        } else {
            setTimeout(add_row(data[i], 1000))
        }
        }
    // add body to table
    table.appendChild(newbod)
}


function add_row(data, tbod) {
    var table = tbod
    var row = document.createElement("tr")
    var id = document.createElement("td")
    var id_input = document.createElement("input")
    id_input.type = "number"
    id_input.value = data.id
    

    var exercise = document.createElement("td")
    var ex_input = document.createElement("input")
    ex_input.type = "text"
    ex_input.value = data.name
    

    var reps = document.createElement("td")
    var reps_input = document.createElement("input")
    reps_input.type = "number"
    reps_input.value = data.reps
    

    var weight = document.createElement("td")
    var weight_input = document.createElement("input")
    weight_input.type = "number"
    weight_input.value = data.weight
   

    var date = document.createElement("td")
    var date_input = document.createElement("input")
    date_input.type = "date"
    let d = data.date

    date_input.value= d.slice(0,10)
   

    var lbs = document.createElement("td")
    var lbs_input = document.createElement("input")
    lbs_input.type = "number"
    lbs_input.value = data.lbs
    

    var edit = document.createElement("input")
    edit.type="button"
    edit.name="edit"
    edit.value="edit"
    edit.onsubmit=""
    var dlt = document.createElement("input")
    dlt.type="button"
    dlt.value="delete"
    dlt.name="delete"
    dlt.onsubmit=""
    
    id.appendChild(id_input)
    row.appendChild(id)

    exercise.appendChild(ex_input)
    row.appendChild(exercise)

    reps.appendChild(reps_input)
    row.appendChild(reps)

    weight.appendChild(weight_input)
    row.appendChild(weight)

    date.appendChild(date_input)
    row.appendChild(date)

    lbs.appendChild(lbs_input)
    row.appendChild(lbs)
    
    row.appendChild(edit)
    row.appendChild(dlt)
    table.appendChild(row)
     
}


function delete_table_body(tablebodyid) {
    var table_body = document.getElementById(tablebodyid);
    table_body.parentNode.removeChild(table_body);
}

function editRow(row) {
    
    var arr = Array.from(row.parentNode.parentNode.childNodes)
    var params = {};
    for (var i = 1; i <arr.length; i++){
        if (!(arr[i].children) || arr[i].children[0].type == "button") {
            continue}
        params[arr[i].children[0].id] = arr[i].children[0].value
    }
    var req = new XMLHttpRequest();
        req.open('PUT', 'http://localhost:1137/', true)

        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(params))
}


function deleteRow(row) {
    var tbody = document.getElementById("tbody");
    var id = row.parentNode.parentNode.childNodes[1].children[0].value
    params = {id: id}
    var req = new XMLHttpRequest();
        req.open('DELETE', 'http://localhost:1137/', true)

        req.setRequestHeader("Content-Type", "application/json");
        req.onload = function() {
            tbody.removeChild(row.parentNode.parentNode)}

        req.send(JSON.stringify(params))
}

