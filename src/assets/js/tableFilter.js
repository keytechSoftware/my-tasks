// ----------------------------------------------------
// Filters an HTML table
// Table ID: "table2Filter"
// Input field ID: "tableFilterString"
// Credits: https://www.w3schools.com/howto/howto_js_filter_table.asp
// ----------------------------------------------------
function filterTable(tableid, filterColumn) {
	// Declare variables
	var input, filter, table, tr, td, i;
	input = document.getElementById("tableFilterString");
	filter = input.value.toUpperCase();
	table = document.getElementById(tableid);
	tr = table.getElementsByTagName("tr");

	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td")[filterColumn];
		if (td) {
			if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
				}
		}
	}
}
