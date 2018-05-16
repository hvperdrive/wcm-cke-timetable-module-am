(function(angular) {
	angular.module("cke-timetable-am_0.0.2")
		.provider("CKEditorTimetableAMConfig", [

			"MODULE_ENV_CONFIG",

			function timetableConfig(MODULE_ENV_CONFIG) {

				this.API = {
					name: MODULE_ENV_CONFIG.angularModule,
					version: "0.0.2",
					feDirPath: MODULE_ENV_CONFIG.feDirPath,
					assetsDirPath: MODULE_ENV_CONFIG.assetsDirPath,
					cssDirPath: MODULE_ENV_CONFIG.cssDirPath,
				};

				this.API.modulePath = this.API.feDirPath;

				this.$get = function get() {
					return this.API;
				};
			},
		]);
})(window.angular);
