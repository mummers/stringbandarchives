var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1xqGTbkgosPqSRCkZ6xKj1c01sRRZkg0qeNeN2hrkFSI/pubhtml?gid=1847002595';
var bandsTemplate = Handlebars.compile($('#bands-template').html());

var searchTerm = 2019;
var today = new Date();
var nyd = new Date(today.getFullYear() + 1, 0, 1);
var one_day = 1000 * 60 * 60 * 24;

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
  console.log("hello");
	if ($(".dq").length != 0) {
    console.log("hello2");
		$(".dqNote").show();
	}
});
