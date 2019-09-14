var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1xqGTbkgosPqSRCkZ6xKj1c01sRRZkg0qeNeN2hrkFSI/pubhtml?gid=1847002595';
var bandsTemplate = Handlebars.compile($('#bands-template').html());
var searchTerm = new Date().getFullYear();
loadResults(createSQL(searchTerm), mySpreadsheet);
function createSQL(term) {
	return "select A,B,C,D,E,F,M,L,V,W,G,H,I,J,K,X,Q,R,S,T where (A like '%" + term + "%') or (B like '" + term + "') or (lower(C) like lower('%" + term + "%')) or (lower(D) like lower('%" + term + "%')) or (lower(E) like lower('%" + term + "%')) or (F like '%" + term + "%') or (lower(O) like lower('%" + term + "%')) order by A desc, B asc";
}

function loadResults(sql, sheetURL) {
	$('#bands').sheetrock({
		url: sheetURL,
		query: sql,
		rowTemplate: bandsTemplate,
		callback: function(error, options, response) {
			if (!error) {
				$('#bands').tablesorter();
				document.getElementById("results-header").innerHTML = searchTerm + " Results"
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
	return input.toLowerCase().replace(/ +/g, "+").replace(/\\.+|,.+|'.+/g, "");
});

$(document).ready(function() {
	$("td.note:contains('dq')").siblings(".prize").addClass("dq");
	if ($(".dq").length != 0) {
		$(".dqNote").show();
	}
});
