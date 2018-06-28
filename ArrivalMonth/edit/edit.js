		var date= new Date();	
		var day;
		var enterTime;
		var leaveTime;
		
		$(function () {
			init();
			initHeaderTitle();
			$("#actionBtn").on("click",update);
		});
		
		function init() {
			day = getUrlVars()["day"];
			enterTime = getUrlVars()["enter"];
			leaveTime = getUrlVars()["leave"];
			if(enterTime != "null" && enterTime != "")
				$(".enterInpt").val(enterTime);
			if(leaveTime != "null" && leaveTime != "")
				$(".leaveInpt").val(leaveTime);
		}
		
		function update() {
			enterTime = $(".enterInpt").val();
			leaveTime = $(".leaveInpt").val();
			if(enterTime != "null" && enterTime != "")
				localStorage.setItem(getItemEnterKey(day), enterTime);
			if(leaveTime != "null" && leaveTime != "")
				localStorage.setItem(getItemLeaveKey(day), leaveTime);
			document.location.href = '../ArivalMonth/Main.html';
		} 
		
		
		
		function getUrlVars() {
			var vars = {};
			var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
				vars[key] = value;
			});
			return vars;
		}
		
		function getItemEnterKey(index) {
			var month = date.getMonth() + 1;
			var itemId = "item_" + month + "_" + index;
			return itemId + "Enter";
		}
		
		function getItemLeaveKey(index) {
			var month = date.getMonth() + 1;
			var itemId = "item_" + month + "_" + index;
			return itemId + "Leave";
		}		
		
		function initHeaderTitle() {
			$(".mainHeader").html('Day ' + day);
		}

		
		

		

	
			
		
	