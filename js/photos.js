// Define spreadsheet URL.
var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1JaOe5PF9YC_A6c5ntP2YKPdGvTNqruq4ohsmSvlnK1U/pubhtml?gid=2087435397';

// Compile the Handlebars template.
var bandsTemplate = Handlebars.compile($('#photos-template').html());

// Get a list of all bands.
$('#photos').sheetrock({
  url: mySpreadsheet,
  query: "select A,B,C,D,E order by A",
  rowTemplate: bandsTemplate
});

Handlebars.registerHelper("normalize", function(input) {
	return input.toLowerCase().replace(/ +/g, "+").replace(/\.+|,.+|'.+/g, "");
});
