// makeSuffixes([ "pYqCoxht", "6t9WDot0" ])

function makeSuffixes(values) {
    var results = [];
    values.sort().reverse().forEach(function(val) {
        var tmp, hasSuffix;
        for (var i=0; i<val.length-2; i++) {
            tmp = val.substr(i).toUpperCase();
            hasSuffix = false;
            for (var j=0; j<results.length; j++) {
                if (results[j].indexOf(tmp) === 0) {
                    hasSuffix = true;
                    break;
                }
            }
            if (!hasSuffix) results.push(tmp);
        }
    });
    return results;
}

// timestamp('2019-02-01');

function timestamp(date){
	var now = new Date();
	var d = new Date(date);
    return d.getTime() + now.getTimezoneOffset() * 60000;
}

// reorderProps({man: 2, apple: 1, zebra: -1, abacaxi: 0})

function reorderProps(list, pretty) {
    var newList = {};
    Object.keys(list).sort().forEach(key => newList[key] = list[key]);

	if(pretty) return JSON.stringify(newList, null, pretty);
	return newList;
}


function getById(list, prop, value) {
    return list.find(item => item[prop] === value)
}

const normalizeValue = function (value, sufix) {
    return isNaN(value * 1) ? value : value + sufix;
  }

const put = function (value, prefix, unit, defaultValue) {
    if (value === null || value === undefined) {
        if (defaultValue !== null || defaultValue !== undefined) {
        return prefix + ': ' + normalizeValue(defaultValue, unit) + ';';
        }
        return '';
    }
    return prefix + ': ' + normalizeValue(value, unit) + ';';
}


function numberToReal(numero) {
    var numero = numero.toFixed(2).split('.');
    numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
}
