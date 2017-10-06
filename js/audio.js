// Define Google spreadsheet URL
var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1JaOe5PF9YC_A6c5ntP2YKPdGvTNqruq4ohsmSvlnK1U/pubhtml?gid=0';
var bandsTemplate = Handlebars.compile($('#bands-template').html());
// Get query string parameters
var q = document.URL;
var params = {};
q.replace(/[?&]([^=]+)[=]([^&#]+)/g, function(match, key, value) {
	params[key] = value;
	return '';
});

function isEmpty(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) return false;
	}
	return true;
}
// Start with no params
var searchTerm = "";
// Check for parameters
if (isEmpty(params)) {
	$('#searchTerm').html("<h2>" + searchTerm + " Results</h2>");
	loadResults(createQuery(searchTerm));
} else if (params['q']) { // Search user input
	searchTerm = params['q'].split('+').join([separator = ' ']).trim();
	$('#searchTerm').append("<h3>Search results for &ldquo;" + searchTerm + "&rdquo;</h3>");
	loadResults(createQuery(searchTerm));
} else if (params['album']) { // specific album search
	album = params['album'].split('+').join([separator = ' ']).trim();
	sqlString = "select B,C,D,E,F,G where (lower(D) like lower('%" + album + "%')) order by C asc";
	$('#searchTerm').append("<h3>Search results for the album &ldquo;" + album + "&rdquo;</h3>");
	loadResults(sqlString);
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
$(document).ready(function (e) {
    if (jQuery.fn.tablesorter) {
        alert("pluginloaded");
    }
    // jQuery.tablesorter();
    $('#bands').tablesorter();
});

