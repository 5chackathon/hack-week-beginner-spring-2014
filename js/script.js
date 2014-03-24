function appendItem(text) {
    $(".items").append('<tr><td>'+ text+ '</td> <td><button class="delete" onclick="removeItem(this)">Delete</button></td></tr>');
    // clear the text field
    $("#todoVal").val('');
}

function addItem() {
	// the text to be added
	var text = $("#todoVal").val();
	console.log(text);
	if (text != "") {
		appendItem(text);

        saveItem(text);
	}
}

function removeItem(item) {
	console.log($(item).parent());
    deleteItem(item);
	$(item).parent().parent().remove();
}

function getTodoList() {
    if (localStorage["todo"] == null) {
        localStorage["todo"] = "[]";
    }
    
    return JSON.parse(localStorage["todo"]);
}

function loadItems() {
    var list = getTodoList();

    for (l in list) {
        appendItem(list[l]);
    }
}

function saveItem(item) {
    var list = getTodoList();
    list.push(item);

    localStorage["todo"] = JSON.stringify(list);
}

function deleteItem(item) {
    var list = getTodoList();

    index = list.indexOf(item);
    list.splice(index,1);

    localStorage["todo"] = JSON.stringify(list);
}


$(function() {
	$("#add").on("click", addItem);
    loadItems();
	$()
});


