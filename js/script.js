// Adds a to-do list item containing the text 'itemText' to the HTML
function appendItem(itemText) {
    // Create the HTML
    var item = $('<li>')

    var itemText = $('<span/>').addClass('itemText').text(itemText);
    item.append(itemText);

    var deleteButton = $('<button/>').addClass('delete').text('Delete');
    item.append(deleteButton);

    deleteButton.click(function() {
        removeItem($(item));
    });

    $('#items').append(item);
}

// Gets the text in the text box and adds an item to the list
function addItem() {
    var text = $("#todoValue").val();

    if (text) {
        appendItem(text);
        saveItems();
        $("#todoValue").val('');
    }
}

// Removes an item from the to-do list
function removeItem(item) {
    $(item).remove();
    saveItems();
}

// Saves the current to-do list items to localStorage
function saveItems() {
    var list = [];

    // Get only the text of each to-do list item
    $('#items li span').each(function() {
        list.push($(this).text());
    })

    localStorage['todo'] = JSON.stringify(list);
}

// Load the to-do list from local storage into the app
function loadItems() {
    if (!localStorage['todo']) {
        return;
    }

    var list = JSON.parse(localStorage['todo']);

    for (var i = 0; i < list.length; i++) {
        appendItem(list[i]);
    }
}

$(function() {
    $('#add').on('click', addItem);
    loadItems();
});
