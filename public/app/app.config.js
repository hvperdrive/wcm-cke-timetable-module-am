(function(angular) {
	angular.module("cke-timetable-am_0.0.1")
		.config([

			"ckeditorTimetablePluginProvider",
			"ckeditorProvider",

			function(ckeditorTimetablePluginProvider) {
				ckeditorTimetablePluginProvider.controls.registerPlugin();
			},
		]);
})(window.angular);
