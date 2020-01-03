(function(angular) {
	angular.module("cke-timetable-am_1.1.0.services")
		.service("ckeditorPluginDefinitionsTimetableAM", [
			"ckeditorTimetableAMPlugin",

			function ckeditorPluginDefinitionsChangelog(
				ckeditorTimetableAMPlugin
			) {
				var plugins = {};

				plugins.timetable = ckeditorTimetableAMPlugin;

				return plugins;
			},
		]);
})(window.angular);
