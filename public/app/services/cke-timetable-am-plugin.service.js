(function(angular) {
	angular.module("cke-timetable-am_0.0.1.services")
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
