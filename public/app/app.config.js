(function(angular) {
	angular.module("cke-timetable-am_1.0.0")
		.config([

			"ckeditorTimetablePluginProvider",
			"ckeditorProvider",

			function(ckeditorTimetablePluginProvider) {
				ckeditorTimetablePluginProvider.controls.registerAll();
			},
		]);
})(window.angular);
