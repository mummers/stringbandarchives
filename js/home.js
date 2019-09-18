var resultsSpreadsheet = 'https://docs.google.com/spreadsheets/d/1xqGTbkgosPqSRCkZ6xKj1c01sRRZkg0qeNeN2hrkFSI/pubhtml?gid=1847002595';
var videoSpreadsheet = 'https://docs.google.com/spreadsheets/d/1JaOe5PF9YC_A6c5ntP2YKPdGvTNqruq4ohsmSvlnK1U/pubhtml?gid=1953654254';
var bandsTemplate = Handlebars.compile($('#bands-template').html());
var searchTerm = new Date().getFullYear();
loadResults();

function loadResults() {
	$('#bands').sheetrock({
		url: resultsSpreadsheet,
		query: "select A,B,C,D,E,F,M,L,V,W,G,H,I,J,K,X,Q,R,S,T where (A like '%" + searchTerm + "%') order by A desc, B asc",
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

function loadRandom(){
	$('#themes').sheetrock({
		url: videoSpreadsheet,
		query: "select A,B order by A desc",
		callback: function(error, options, response) {
			if (error) {
		    return;
		  }
			randomVid = chance.pickone(response.rows);
		  randomVid = randomVid.cellsArray[1];
			document.getElementById('video').innerHTML = '<iframe class="embed-responsive-item" src="' + randomVid + '" allowfullscreen></iframe>'
		}
	});
}

Handlebars.registerHelper("normalize", function(input) {
	return input.toLowerCase().replace(/ +/g, "+").replace(/\\.+|,.+|'.+/g, "");
});

$(document).ready(function() {
	loadRandom();
	$("td.note:contains('dq')").siblings(".prize").addClass("dq");
	if ($(".dq").length != 0) {
		$(".dqNote").show();
	}
});
