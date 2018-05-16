(function(angular) {
	angular.module("cke-timetable-am_0.0.1")
		.provider("ckeditorTimetablePlugin", [

			"$provide",

			function ckeditorTimetablePluginProvider($provide) {

				var registerPlugin = function registerPlugin() {
					$provide.decorator("ckeditorService", [

						"$delegate",
						"ckeditorTimetableAMPlugin",

						function(ckeditorService, ckeditorTimetableAMPlugin) {
							ckeditorService.activatePlugin("timetableAM", ckeditorTimetableAMPlugin.plugin. ckeditorTimetableAMPlugin.meta);

							return ckeditorService;
						},
					]);
				};

				this.controls = {
					registerPlugin: registerPlugin,
				};

				this.$get = function get() {
					return this.controls;
				};

			},
		]);
})(window.angular);
