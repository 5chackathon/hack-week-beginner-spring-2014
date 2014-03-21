function addItem() {
	// the text to be added
	var text = $("#todoVal").val();
	console.log(text);
	if (text != "") {
		$(".items").append('<tr><td>'+ text+ '</td> <td><button class="delete" onclick="removeItem(this)">Delete</button></td></tr>');
		// clear the text field
		$("#todoVal").val('');
	}
}

function removeItem(item) {
	console.log($(item).parent());
	$(item).parent().parent().remove();
}
$(function() {
	$("#add").on("click", addItem);
	$()
});

