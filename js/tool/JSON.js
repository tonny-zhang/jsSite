if(typeof JSON == "undefined"){
	JSON = {
		/*json×ª×Ö·û´®*/
		'stringify' : function(obj) {
			var t = typeof (obj);
			if (t != "object" || obj === null) {
				// simple data type
				if (t == "string") obj = '"' + obj + '"';
				return String(obj);
			} else {
				// recurse array or object
				var n, v, json = [], arr = (obj && obj.constructor == Array);

				// fix.
				var self = arguments.callee;

				for (n in obj) {
					v = obj[n];
					t = typeof(v);
					if (obj.hasOwnProperty(n)) {
						if (t == "string") {
							v = '"' + v + '"';
						}else if (t == "object" && v !== null) {
							v = self(v);
						}
						json.push((arr ? "" : '"' + n + '":') + String(v));
					}
				}
				return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
			}
	    },
		'parse' : function(str){
			if(typeof(str) == "string"){
				return (new Function("return " + str))();
			}
			return str;
		}
	};
}