(function(angular, CKEDITOR) {
	angular.module("cke-timetable-am_0.0.1")
		.factory("ckeditorTimetableAMPlugin", [

			"$document",
			"CKEditorTimetableAMConfig",
			"DialogService",

			function ckeditorTimetableAMPlugin(
				$document,
				CKEditorTimetableAMConfig,
				DialogService
			) {
				var defaultDayTemplate = "<header><h2></h2></header>" +
					"<section><table><thead><tr><th>Tijdstip</th><th>Inhoud</th></tr></thead>" +
					"<tbody class=\"wcm-timetable__day__content\"></tbody>" +
					"</table></section>";

				function getWidgetData(dayContainers) {
					// Loop over the days and extract the dataset of the elemen and its child rows.
					return _.map(dayContainers || [], function(day) {
						return {
							meta: day.$.dataset,
							items: _.map(day.find(".wcm-timetable__day__content>tr"), function(item) {
								return item.$.dataset;
							}),
						};
					});
				}

				function updateWidget(days, container) {
					// Loop over days and create approperiate html
					var daysTemplate = _.reduce(days, function(day) {
						// Create a day div with a specific class an default template
						var dayContainer = CKEDITOR.dom.element("div");

						dayContainer.addClass("wcm-timetable__day");
						dayContainer.setHtml(defaultDayTemplate);

						// Get newly created header and content elements of the day div to set custom data
						var dayHeader = dayContainer.findOne("header");
						var dayContent = dayContainer.findOne(".wcm-timetable__day__content");

						dayHeader.setData("date", day.meta.date);

						// Loop through the items of the day and generate an accumulative template string
						var dayContentInnerTemplate = _.reduce(day.items, function(item) {
							// Create a row with 2 cells
							var row = CKEDITOR.dom.element("tr");
							var tdTime = CKEDITOR.dom.element("td");
							var tdDescription = CKEDITOR.dom.element("td");

							row.append(tdTime, true);
							row.append(tdDescription, false);

							// Add data tot de row dataset
							row.data("startTime", item.startTime);
							row.data("endTime", item.endTime);
							row.data("description", item.description);

							// Set innerHTML for a visible representatation
							tdTime.setHtml(item.startTime.toISOString() + " - " + item.endTime.toISOString());
							tdDescription.setHtml(item.description);

							// return row html
							return row.getHtml();
						}, "");

						// set items template in the dayContent div
						dayContent.setHtml(dayContentInnerTemplate);
					}, "");

					// Set the generated html in the timetable container div
					container.setHtml(daysTemplate);
				}

				function getContainer(element) {
					return element.findOne(".wcm-timetable");
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
								allowedContent: "",
								upcast: function(el) {
									return el.name === "div" && el.hasClass("wcm-timetable");
								},
								downcast: function() {
									updateWidget(this.data.days, getContainer(this.element));
								},
								init: function() {
									var widget = this;
									var days = getDayContainers(widget.element);

									widget.setData("days", getWidgetData(days));

									widget.on("edit", function() {
										var newData = angular.copy(this.data);

										DialogService.openModal({
											templateUrl: CKEditorTimetableAMConfig.modulePath + "templates/timetableModal.tpl.html",
											data: newData,
										}).then(function() {
											var tempMockData = [{
												meta: {
													date: new Date(),
												},
												items: [{
													startTime: new Date(),
													endTime: new Date(),
													description: "something 1",
												}, {
													startTime: new Date(),
													endTime: new Date(),
													description: "something 2",
												}],
											}];

											widget.setData("days", tempMockData);
											updateWidget(tempMockData, widget.element);
											editor.fire("change");
										});
									});
								},
							});

							editor.ui.addButton("timetable", {
								label: "Add a timetable",
								command: "timetable",
								toolbar: "insert",
								icon: "placeholder",
								hidpi: true,
							});
						},
					},
				};
			},
		]);
})(window.angular, window.CKEDITOR);
