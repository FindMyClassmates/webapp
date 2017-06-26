var path = window.location.pathname;
var page = path.split("/").pop();
console.log(page);


function parse(str)
{
    var args = [].slice.call(arguments, 1),
        i = 0;
    return str.replace(/%s/g, function()
    {
        return args[i++];
    });
}

function getEmpty(str)
{
	var table = document.getElementById(str);
	var emptyCnt = 0;
	for (var i = 0; i < table.rows.length; i++)
		if (table.rows[i].cells[0].children[0].value == null || table.rows[i].cells[0].children[0].value == "") 
			emptyCnt++;
	return emptyCnt;
}

function getElements(str)
{
	var table = document.getElementById(str);
	var tableArr = [];
	for (var i = 0; i < table.rows.length; i++)
	{
		if (table.rows[i].cells[0].children[0].value != null && table.rows[i].cells[0].children[0].value != "")
			tableArr.push(table.rows[i].cells[0].children[0].value);
		console.log("value: " + table.rows[i].cells[0].children[0].value);
	}
	console.log("getElements end:");
	return tableArr;
}

document.addEventListener('DOMContentLoaded', function()
{
	console.log("addRow");
	var addRowButton = document.getElementById('addRow');
	addRowButton.addEventListener('click', function()
	{
		var table = document.getElementById("tabTable");
		var len = table.rows.length;
		var row = table.insertRow(len);
		var cell = row.insertCell(0);
		var idvar = "tab" + len;
		var htmlstring = parse("<tr><td>%s. <input type = 'text' id = %s></td></tr>", len+1, idvar);
		cell.innerHTML = htmlstring;
	});
}, false);

