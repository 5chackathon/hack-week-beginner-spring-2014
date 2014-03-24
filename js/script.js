// Adds a to-do list item containing the text 'itemText' to the HTML. If
// 'isChecked' is true, the item will be checked off.
function appendItem(itemText, isChecked) {
    var item = $('<li>')

    var checkbox = $('<input/>', { type: 'checkbox' });

    // Check the checkbox if we need to
    checkbox.prop('checked', isChecked);

    // Mark the item as checked if it's clicked
    checkbox.click(function() {
        markItem($(item), $(this).prop('checked'));
        saveItems();
    });
    item.append(checkbox);

    var itemText = $('<span/>', { class: 'itemText', text: itemText });
    item.append(itemText);

    var deleteButton = $('<button/>', { class: 'delete', text: 'Delete'});

    // Remove the item from the checkbox if the delete button is clicked
    deleteButton.click(function() {
        removeItem($(item));
    });
    item.append(deleteButton);

    // We need to mark the item if it is checked
    markItem(item, isChecked);

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

// Mark an item as completed or not
function markItem(item, isCompleted) {
    var decoration = 'none';

    if (isCompleted) {
        decoration = 'line-through';
    }

    $(item).find('.itemText').css('text-decoration', decoration);
}

// Saves the current to-do list items to localStorage
function saveItems() {
    var list = [];

    // Get only the text of each to-do list item
    $('#items li').each(function() {
        var item = {};
        item.text = $(this).find('span').text();
        item.isChecked = $(this).find('input').prop('checked');

        list.push(item);
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
        appendItem(list[i].text, list[i].isChecked);
    }
}

$(document).ready(function() {
    $('#add').on('click', addItem);
    loadItems();
});
