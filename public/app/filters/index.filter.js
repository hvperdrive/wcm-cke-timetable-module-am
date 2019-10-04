(function() {
	angular.module("cke-timetable-am_0.0.5.filters")
		.filter("timelineIndex", function() {
			return function(array, indexPropName) {
				if (!indexPropName) {
					indexPropName = "index";
				}

				_.forEach(array, function(item, i) {
					if (!item) {
						return;
					}

					item[indexPropName] = i;
				});

				return array;
			}
		});
})()
