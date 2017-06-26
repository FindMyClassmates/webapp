//Usage: findStudentsIn("Monta Vista High School", "AP Macroeconomics", "5")
function findStudentsIn(school, class_val, period) {
	var ref = firebase.database().ref("users");
	var query = firebase.database().ref("users").orderByKey();
	query.once("value").then(function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var name = childSnapshot.key;
			// console.log(name);
			var newquery = firebase.database().ref("users/" + name + "/classes").orderByKey();
			// var newquery = ref.ref("classes").orderByKey();
			newquery.once("value").then(function(snapshot) {
				snapshot.forEach(function(childSnapshot2) {
					var getperiod = childSnapshot2.key;
					var key = childSnapshot2.val();
					// if (key == "Student Tutor") {
						// console.log(childSnapshot2.key + " " + key);
						// console.log("class_val: " + class_val);
						// console.log("period: " + period);
					// }
					if (key === class_val && period === getperiod) {
						console.log(name);
					}
					// console.log(key);
				});
			});
		});
	});
}
function _w(param) {
	ret = param.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");	
	return ret;
}

// function addToClass(school, class_val) {

// }