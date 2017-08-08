// Define Google spreadsheet URL
var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1JaOe5PF9YC_A6c5ntP2YKPdGvTNqruq4ohsmSvlnK1U/pubhtml?gid=0';
var bandsTemplate = Handlebars.compile($('#bands-template').html());
// Get query string parameters
var params = [],
	hash;
var q = document.URL.split('?')[1];
if (q != undefined) {
	q = q.split('&');
	for (var i = 0; i < q.length; i++) {
		hash = q[i].split('=');
		params.push(hash[1]);
		params[hash[0]] = hash[1];
	}
}
// Start with no params
var searchTerm = "";
// Check for parameters
if (params == 0) {
	$('#searchTerm').html("<h2>" + searchTerm + " Results</h2>");
	loadResults(createQuery(searchTerm));
} else if (params['q']) { // Search user input
	searchTerm = params['q'].split('+').join([separator = ' ']).trim();
	$('#searchTerm').append("<h3>Search results for &ldquo;" + searchTerm + "&rdquo;</h3>");
	loadResults(createQuery(searchTerm));
}
// define search string function
function createQuery(term) {
	return "select B,C,D,E,F,G where (lower(B) like lower('%" + term + "%')) or (lower(C) like lower('%" + term + "%')) or (lower(D) like lower('%" + term + "%')) or (lower(E) like lower('%" + term + "%')) or (lower(F) like lower('%" + term + "%')) order by C asc";
}
// define function to load results
function loadResults(sql) {
	$('#bands').sheetrock({
		url: mySpreadsheet,
		query: sql,
		rowTemplate: bandsTemplate,
		callback: function(error, options, response) {
			if (!error) {
				if ($('#bands tr').length == 1) {
					$('#bands').append("<h3>No results.</h3>")
				}
			} else {
				$('#bands').append('<h3>Error.</h3>');
			}
		}
	});
}
Handlebars.registerHelper("normalize", function(input) {
	return input.toLowerCase().replace(/ +/g, "+").replace(/\.+|,.+|'.+/g, "");
});
$(document).ready(function() {
	$("#bands").tablesorter();
});
