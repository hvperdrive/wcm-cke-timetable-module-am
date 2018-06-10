(function(angular) {
	angular.module("cke-timetable-am_0.0.3")
		.config([

			"ckeditorTimetablePluginProvider",
			"ckeditorProvider",

			function(ckeditorTimetablePluginProvider) {
				ckeditorTimetablePluginProvider.controls.registerAll();
			},
		]);
})(window.angular);
