function capSlash(str) {
	return (""+str).replace(/\/(.)/g, function(m, m1) {
		// console.log(m1);
		return '/' + m1.toUpperCase();
	});
}
function capitalize(str) {
	ret = str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	ret = capSlash(ret);
	return ret;
}
function ordinal_suffix_of(i) {
	var j = i % 10,
	k = i % 100;
	if (j == 1 && k != 11) { return i + "st"; }
	if (j == 2 && k != 12) { return i + "nd"; }
	if (j == 3 && k != 13) { return i + "rd"; }
	return i + "th";
}
function process(class_name, period_num) {
	var ret = capitalize(class_name);
	if (ret == "") {
		ret = "Empty"
	}
	ret = ret.replace('Ap', 'AP');
	ret = ret.replace('Bc', 'BC');
	ret = ret.replace('Ab', 'AB');
	ret = ret.replace('Pe', 'PE');
	if (ret.substring(0, 2) === 'Us')
		ret = 'US' + ret.substring(2)
	ret = ret.replace(' Us ', ' US ')
	if (ret.includes("Myth")) {
		if (ret.includes("/folk/writ")) { ret = ret.replace("/folk/writ", "/Folk/Writ")}
		else { ret.replace("Myth", "Myth/Folk/Writ")}
	}
	if (ret.includes("Free")) {
		ret = "Unscheduled " + ordinal_suffix_of(period_num);
	}
	if (ret.toLowerCase().includes("hamlit")) {
		ret = "Amer Lit/Writ&period=" + period_num
	}
	if (ret.toLowerCase().includes("government")) { ret = ret.replace("government", "Govt") }
	if (ret.toLowerCase().includes("polernment")) { ret = ret.replace('polernment', ''); }
	if (ret.includes("Gov") && !(ret.includes("Govt"))) { ret = ret.replace("Gov", "Govt") }
	if (ret.includes("Govt") && (ret.toLowerCase().includes("pol"))) {
		console.log('hi');
		ret = ret.replace("&pol", "");
		ret = ret.replace("&Pol", "");
		ret = ret.replace("& Pol", "");
		if (ret.includes("Govt "))
			ret = ret.replace("Govt ", "Govt");
		console.log("b: " + ret);
	}
	if (ret.includes("Govt") && !(ret.toLowerCase().includes("pol"))) {
		console.log("bruh");
		ret = ret.replace("Govt", "Govt & Pol");
	}
	if (ret.includes("Econ") && !(ret.includes("Economics"))) { ret = ret.replace("Econ", "Economics"); }
	if (ret.includes("Calc") && !(ret.includes("Calculus"))) { ret = ret.replace("Calc", "Calculus"); }
	// 2018 Override
	if (ret.includes("Unscheduled")) {
		ret = "Empty"
	}
	return ret;
}

function occurrences(string, subString, allowOverlapping) {
	string += "";
	subString += "";
	if (subString.length <= 0) return (string.length + 1);

	var n = 0,
		pos = 0,
		step = allowOverlapping ? 1 : subString.length;

	while (true) {
		pos = string.indexOf(subString, pos);
		if (pos >= 0) {
			++n;
			pos += step;
		} else break;
	}
	return n;
}

'use strict';
function updateList(that) {
	if (!that) {
		return;
	}
	var lastValue = that.lastValue,
		value = that.value,
		array = [],
		pos = value.indexOf('|'),
		start = that.selectionStart,
		end = that.selectionEnd,
		options;

	if (that.options) {
		options = that.options;
	} else {
		options = Object.keys(that.list.options).map(function (option) {
			return that.list.options[option].value;
		});
		that.options = options;
	}

	if (lastValue !== value) {
		that.list.innerHTML = options.filter(function (a) {
			return ~a.toLowerCase().indexOf(value.toLowerCase());
		}).map(function (a) {
			// return '<option value="' + value + '|' + a + '">' + a + '</option>';
			return '<option value="' + a + '"></option>';
		}).join();
		// console.log(that.list.innerHTML);
		console.log(occurrences(that.list.innerHTML, "</option>"));
		not_found = (occurrences(that.list.innerHTML, "</option>") == 0);
		if (not_found) {
			$('#hs').css('border', '1px solid #f06033');
			$('#schoolnotfound').css('display', 'inline');
		}
		console.log(not_found);
		// console.log(that.list.innerHTML);
		updateInput(that);
		that.lastValue = value;

	}
}

function updateInput(that) {
	if (!that) {
		return;
	}
	var value = that.value,
		pos = value.indexOf('|'),
		start = that.selectionStart,
		end = that.selectionEnd;

	if (~pos) {
		value = value.slice(pos + 1);
	}
	that.value = value;
	that.setSelectionRange(start, end);
}