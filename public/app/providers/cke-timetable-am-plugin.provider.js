(function(angular) {
	angular.module("cke-timetable-am_0.0.1")
		.provider("ckeditorTimetablePlugin", [

			"$provide",

			function ckeditorTimetablePluginProvider($provide) {

				var registerAll = function registerAll() {
					$provide.decorator("ckeditorService", [

						"$delegate",
						"ckeditorTimetablePluginDefinition",

						function(ckeditorService, ckeditorTimetablePluginDefinition) {
							_.forEach(ckeditorTimetablePluginDefinition, function(plugin, name) {
								ckeditorService.activatePlugin(name, plugin.plugin, plugin.meta);
							});

							return ckeditorService;
						},
					]);
				};

				this.controls = {
					registerAll: registerAll,
				};

				this.$get = function get() {
					return this.controls;
				};

			},
		]);
})(window.angular);
