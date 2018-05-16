(function(angular, CKEDITOR) {
	angular.module("cke-timetable-am_0.0.1.factories")
		.factory("ckeditorTimetableAMPlugin", [
			"$filter",
			"CKEditorTimetableAMConfig",
			"DialogService",

			function ckeditorTimetableAMPlugin(
				$filter,
				CKEditorTimetableAMConfig,
				DialogService
			) {
				var defaultDayTemplate = "<header><h2></h2></header>" +
					"<section class=\"wcm-timetable__day__table\"><table><thead><tr><th>Tijdstip</th><th>Inhoud</th></tr></thead>" +
					"<tbody class=\"wcm-timetable__day__content\"></tbody>" +
					"</table></section>";

				function convertDateToHour(date) {
					return $filter("date")(date, "HH:mm");
				}

				function convertDateToDayMonth(date) {
					return $filter("date")(date, "d MMM");
				}

				function getWidgetData(dayContainers) {
					// Loop over the days and extract the dataset of the elemen and its child rows.
					return _.map([].slice.call(dayContainers.toArray()), function(day) {
						return {
							meta: _.assign({}, day.$.dataset),
							items: _.map(day.find(".wcm-timetable__day__content>tr").toArray(), function(item) {
								return _.assign({}, item.$.dataset);
							}),
						};
					});
				}

				function updateWidget(days, container) {
					// Loop over days and create approperiate html
					var daysTemplate = _.reduce(days, function(outerAcc, day) {
						// Create a day div with a specific class an default template
						var dayContainer = new CKEDITOR.dom.element("div");

						dayContainer.addClass("wcm-timetable__day");
						dayContainer.setHtml(defaultDayTemplate);

						// Get newly created header and content elements of the day div to set custom data
						var dayTitle = dayContainer.findOne("header>h2");
						var dayContent = dayContainer.findOne(".wcm-timetable__day__content");

						dayContainer.data("date", new Date(day.meta.date).toISOString());
						dayTitle.setHtml(convertDateToDayMonth(day.meta.date));

						// Loop through the items of the day and generate an accumulative template string
						var dayContentInnerTemplate = _.reduce(day.items, function(innerAcc, item) {
							// Create a row with 2 cells
							var row = new CKEDITOR.dom.element("tr");
							var tdTime = new CKEDITOR.dom.element("td");
							var tdDescription = new CKEDITOR.dom.element("td");

							row.append(tdTime, true);
							row.append(tdDescription, false);

							// Add data tot de row dataset
							row.data("start-time", item.startTime || "");
							row.data("end-time", item.endTime || "");
							row.data("description", item.description || "");

							// Set innerHTML for a visible representatation
							tdTime.setHtml(convertDateToHour(item.startTime) + " - " + convertDateToHour(item.endTime));
							tdDescription.setHtml(item.description);

							// return row html
							innerAcc += row.getOuterHtml();

							return innerAcc;
						}, "");

						// set items template in the dayContent div
						dayContent.setHtml(dayContentInnerTemplate);

						outerAcc += dayContainer.getOuterHtml();

						return outerAcc;
					}, "");

					// Set the generated html in the timetable container div
					container.setHtml(daysTemplate);
				}

				function getDayContainers(element) {
					return element.find(".wcm-timetable__day");
				}

				return {
					meta: {
						toolbar: [{
							name: "insert",
							items: ["timetable"],
						}],
						extraPlugins: "timetable",
					},
					plugin: {
						init: function(editor) {
							editor.widgets.add("timetable", {
								template: "<div class=\"wcm-timetable\"></div>",
								allowedContent: "div[data-*]; header section table thead tbody tr[data-*]; td",
								upcast: function(el) {
									return el.name === "div" && el.hasClass("wcm-timetable");
								},
								downcast: function() {
									updateWidget(this.data.days, this.element);
								},
								init: function() {
									var widget = this;
									var days = getDayContainers(widget.element);

									widget.setData("days", getWidgetData(days));

									widget.on("edit", function() {
										var newData = angular.copy(this.data);

										DialogService.openModal({
											templateUrl: CKEditorTimetableAMConfig.modulePath + "templates/timetableModal.tpl.html",
											controller: "timetableAMModalController",
											data: newData,
										}).then(function() {
											widget.setData("days", newData.days);
											updateWidget(newData.days, widget.element);

											editor.fire("change");
										});
									});
								},
							});

							editor.ui.addButton("timetable", {
								label: "Add a timetable",
								command: "timetable",
								toolbar: "insert",
								icon: CKEditorTimetableAMConfig.cssDirPath + "/timetable.png",
								hidpi: true,
							});

							editor.addContentsCss(CKEditorTimetableAMConfig.cssDirPath + "/style.css");
						},
					},
				};
			},
		]);
})(window.angular, window.CKEDITOR);
