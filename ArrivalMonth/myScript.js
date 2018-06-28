		var date;
		var currentDayDate;
		var currentDay;
		var datalist;
		
		var	day;
		var	month;
		var	year;
		
		var dayesWorked;
		var dayesToWork;
		
		var houresWorked;
		var houresToWork;
		
		var hoursMissing;
		var houresExtra;		
		
		$(function () {
			init();
			initActions();
			initHeaderTitle();	
			updateDataListMaualy();
			refreshTable();
			updateInfo();
		});
		
		function init() {
			date= new Date();
			currentDayDate = date.getDate();
			//currentDayDate = 13;
			currentDay = date.getDay() + 1;	
			//currentDay = 1;
			datalist = new Array();
			
			day = date.getDate();
			month = date.getMonth();
			year = date.getFullYear();
		
			var paramMonth = getUrlVars()["month"];
			if(typeof(paramMonth) != "undefined") {
				month = parseInt(paramMonth);
			}
			
			//constats:
			hoursPerDay = 8.5;
		}
		
		function getUrlVars() {
			var vars = {};
			var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
				vars[key] = value;
			});
			return vars;
		}
		
		function initActions() {
			$("#enterBtn").click(enterAction);
			$("#leaveBtn").click(leaveAction);	
			$("footer input").hover(hoverAction);
			if(month < 1) {
				$("div.prev").css("display","none");
			} 
			else {
				$("div.prev").click(loadPrevMonth);
			}
			if(month > date.getMonth()) {
				$("div.next").css("display","none");
			} 
			else {
				$("div.next").click(loadNextMonth);
			}
			setItemClickAction();
		}
		
		function loadPrevMonth() {
			var goToMonth = month - 1;
			document.location.href = '../ArivalMonth/Main.html?month=' + goToMonth;
		}
		
		function loadNextMonth() {
			var goToMonth = month + 1;
			document.location.href = '../ArivalMonth/Main.html?month=' + goToMonth;
		}
		
		function setItemClickAction() {
			$("table tr td").on("click",function() {
				editCell(this);
			});
			$("table tr td").on("dblclick",function() {
				var enter = $(this).find(".enterTime").text();;
				var leave = $(this).find(".leaveTime").text();;
				var day = $(this).find(".table-item-top").text();
				document.location.href = '../ArivalMonth/edit.html?day=' + day + '&enter=' + enter + '&leave=' + leave;
			});
			$("table tr td").on("mouseover",function() {
				$(this).css("border","1px solid blue");
			});
			$("table tr td").on("mouseout",function() {
				$(this).css("border","1px solid #555");
			});
		}
		
		function editCell(obj) {
				$("table tr td").css("background-color","#DAD9D7");
				$(obj).css("background-color","#A6C6EE");
		}
		
		function initHeaderTitle() {
			$(".mainHeader").html(convertMonthNumberToString(month) + ' ' + day + ', ' + year);
		}
		
		function convertMonthNumberToString(num) {
			var res = "";
			switch(num) {
				case 0:
					res = "January";
					break;
				case 1:
					res = "February";
					break;		
				case 2:
					res = "March";
					break;		
				case 3:
					res = "April";
					break;		
				case 4:
					res = "May";
					break;		
				case 5:
					res = "June";
					break;		
				case 6:
					res = "July";
					break;			
				case 7:
					res = "August";
					break;
				case 8:
					res = "September";
					break;		
				case 9:
					res = "October";
					break;		
				case 10:
					res = "November";
					break;		
				case 11:
					res = "December";
					break;				
				default:
					res = "January";		
			}
			return res;
		}
		
		function ItemObject(id, enter, leave) {
			this.id = id;
			this.enter = enter;
			this.leave = leave;
		}
		
		function initDatalist() {
			datalist = new Array();
			for(var i = 1; i <= currentDayDate; i++) {
				datalist[i] = new ItemObject("item" + i, localStorage.getItem(getItemEnterKey(i)), localStorage.getItem(getItemLeaveKey(i)));
			}
		}
		
		function refreshTable() {
			initDatalist();
			var firsttDayOfTheMonth = getFirstDayOfTheMonth();
			dayesToWork = 0;
			for(var counter = firsttDayOfTheMonth - 1, i = 1, dayOfMonth = firsttDayOfTheMonth; counter < currentDayDate + firsttDayOfTheMonth - 1; counter++, i++, dayOfMonth++){
				var todayDate = counter - firsttDayOfTheMonth + 2;
				if((counter > firsttDayOfTheMonth - 2) && !isWeekendDay(dayOfMonth)){
					$("td:eq(" + counter + ")").empty();
					$("td:eq(" + counter + ")").html('<div class="table-item-top">' + todayDate + '</div><div class="table-item-bottom"><span class="enterTime">' + datalist[i].enter 
					+ '</span> - <span class="leaveTime">' + datalist[i].leave  + '<span/></div>');
					dayesToWork++;
				} 
				if(counter + 1 == currentDayDate + firsttDayOfTheMonth - 1) {
					$("td:eq(" + counter + ")").removeClass("blurred-item");
				}
				else {
					$("td:eq(" + counter + ")").addClass("blurred-item");
				}
			}
			dayesToWork --;
		}
		
		function isWeekendDay(day) {
			var saturday = (day % 7) == 0;
			var sunday = (day % 7) == 1;
			return (saturday || sunday);
		}
		
		function updateInfo(){
			updateInfoData();
			refreshInfo();
		}
		
		function updateInfoData() {
			dayesWorked = 0;
			houresWorked = 0;
			houresToWork = dayesToWork * hoursPerDay;
			hoursMissing = 0;
			houresExtra = 0;
			var item;
			for(var i = 1; i < currentDayDate; i++) {
				item = datalist[i];
				if(item.enter && item.leave && item.enter != null && item.leave != null) {
					console.log(item.enter + " " + item.leave + "\n");
					houresWorked += caculateHoursDone(item.enter, item.leave);
					dayesWorked++;
				}
			}
			if(dayesWorked > dayesToWork){
					dayesWorked--;
					console.log(dayesWorked);
			}
			
			if(houresToWork > houresWorked)
				hoursMissing = parseFloat((houresToWork - houresWorked).toFixed(2));	
			else 	
				houresExtra = parseFloat((houresWorked - houresToWork).toFixed(2));		

		}
		
		function caculateHoursDone(start, end) {
			var startArr=start.split(":");
			var endArr=end.split(":");			
			var startH = parseInt(startArr[0]);
			var startM = parseInt(startArr[1]);
			var endH = parseInt(endArr[0]);
			var endM = parseInt(endArr[1]);
			var resH = 0;
			var resM = 0;
			if(endM >= startM){
				resH = endH - startH;
				resM = endM - startM;
			}
			else {
				resH = endH - startH - 1;
				resM = 60 - (startM - endM);
			}
			resM = resM!=0 ? resM/60 :resM;
			
			res = (resH + resM)
			
			return parseFloat(res.toFixed(2));
		}
		
		function refreshInfo() {
			$("#dWorked").empty();
			$("#dWorked").html(dayesWorked);
			
			$("#dToWork").empty();
			$("#dToWork").html(dayesToWork);

			$("#hWorked").empty();
			$("#hWorked").html(houresWorked.toFixed(2));		

			$("#hToWork").empty();
			$("#hToWork").html(houresToWork);	

			$("#hMissing").empty();
			$("#hMissing").html(hoursMissing.toFixed(2));		
			
			$("#hExtra").empty();
			$("#hExtra").html(houresExtra.toFixed(2));						
		}
		
		function getFirstDayOfTheMonth() {
			var day = currentDay;
			var temp = (currentDayDate % 7) - day;
			var res = (8 - temp) % 7;
			res = (res == 0)? 7: res;
			return res;
		}
		
		function enterAction() {	
			localStorage.setItem(getItemEnterKey(currentDayDate), getCurrentTime());
			refreshTable();
		}
		
		function leaveAction() {
			localStorage.setItem(getItemLeaveKey(currentDayDate), getCurrentTime());
			refreshTable();
		}		
		
		function hoverAction() {
			
		}
		
		function getItemEnterKey(index) {
			var thisMonth = month + 1;
			var itemId = "item_" + thisMonth + "_" + index;
			return itemId + "Enter";
		}
		
		function getItemLeaveKey(index) {
			var thisMonth = month + 1;
			var itemId = "item_" + thisMonth + "_" + index;
			return itemId + "Leave";
		}		

		function getCurrentTime() {
			var hours = date.getHours().toString();
			var minutes = date.getMinutes().toString();

			if(hours.length < 2)
				hours = '0' + hours;
			if(minutes.length < 2)
				minutes = '0' + minutes;				
			var time = hours + ':' + minutes;
			return time;			
		}	
		
		function updateDataListMaualy() {
			manualUpdate();
		}
		
		function deleteAllData() {
			for(var i = 0; i < 31; i++) {
				localStorage.removeItem(getItemEnterKey(i));
				localStorage.removeItem(getItemLeaveKey(i));	
			}		
		}
		
		function manualUpdate() {	
		}