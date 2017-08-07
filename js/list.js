// Define spreadsheet URL.
var mySpreadsheet = 'https://docs.google.com/spreadsheets/d/1JaOe5PF9YC_A6c5ntP2YKPdGvTNqruq4ohsmSvlnK1U/pubhtml?gid=0';

// Compile the Handlebars template.
var bandsTemplate = Handlebars.compile($('#bands-template').html());

// Get a list of all bands.
$('#bands').sheetrock({
  url: mySpreadsheet,
  query: "select B,count(C) group by B order by B",
  rowTemplate: bandsTemplate
});

Handlebars.registerHelper("normalize", function(input) {
  return input.toLowerCase().replace(/ +/g, "+").replace(/\.+|,.+|'.+/g, "");
});
