var scheduleData = [];

function saveSchedule() {
  var dateInput = document.getElementById("date-input");
  var locationInput = document.getElementById("location-input");
  var contentInput = document.getElementById("content-input");
  var budgetInput = document.getElementById("budget-input");
  var transportationInput = document.getElementById("transportation-input");
  var accommodationInput = document.getElementById("accommodation-input");
  var weatherInput = document.getElementById("weather-input");

  var schedule = {
    date: dateInput.value,
    location: locationInput.value,
    content: contentInput.value,
    budget: budgetInput.value,
    transportation: transportationInput.value,
    accommodation: accommodationInput.value,
    weather: weatherInput.value
  };

  scheduleData.push(schedule);
  displayCalendar();
  clearInputs();
}

function displayCalendar() {
  var calendarContainer = document.getElementById("calendar");
  calendarContainer.innerHTML = "";

  var currentDate = new Date();
  var currentMonth = currentDate.getMonth() + 1; // 0부터 11까지여서 1 더해야 함.
  var currentYear = currentDate.getFullYear();

  for (var i = 1; i <= 31; i++) {
    var cell = document.createElement("div");
    cell.className = "calendar-cell";
    cell.textContent = i;

    var daySchedules = scheduleData.filter(function(schedule) {
      var scheduleDate = new Date(schedule.date);
      var scheduleMonth = scheduleDate.getMonth() + 1;
      var scheduleYear = scheduleDate.getFullYear();
      return (
        scheduleDate.getDate() === i &&
        scheduleMonth === currentMonth &&
        scheduleYear === currentYear
      );  // 현재 날짜에 해당하는 일정만 선택
    });

    daySchedules.forEach(function(schedule) {
      var scheduleItem = document.createElement("div");
      scheduleItem.className = "schedule-item";
      
      var locationElement = document.createElement("div");
      locationElement.textContent = "장소: " + schedule.location;
      scheduleItem.appendChild(locationElement);

      var contentElement = document.createElement("div");
      contentElement.textContent = "일정 내용: " + schedule.content;
      scheduleItem.appendChild(contentElement);

      var budgetElement = document.createElement("div");
      budgetElement.textContent = "예산: " + schedule.budget;
      scheduleItem.appendChild(budgetElement);

      var transportationElement = document.createElement("div");
      transportationElement.textContent = "교통: " + schedule.transportation;
      scheduleItem.appendChild(transportationElement);

      var accommodationElement = document.createElement("div");
      accommodationElement.textContent = "숙박정보: " + schedule.accommodation;
      scheduleItem.appendChild(accommodationElement);

      var weatherElement = document.createElement("div");
      weatherElement.textContent = "날씨: " + schedule.weather;
      scheduleItem.appendChild(weatherElement);

      cell.appendChild(scheduleItem);
    });

    calendarContainer.appendChild(cell);
  }
}

function clearInputs() {
  document.getElementById("date-input").value = "";
  document.getElementById("location-input").value = "";
  document.getElementById("content-input").value = "";
  document.getElementById("budget-input").value = "";
  document.getElementById("transportation-input").value = "";
  document.getElementById("accommodation-input").value = "";
  document.getElementById("weather-input").value = "";
}

document.getElementById("save-btn").addEventListener("click", saveSchedule);

function deleteMemo() {
  document.getElementById("date-input").value = "";
  document.getElementById("location-input").value = "";
  document.getElementById("content-input").value = "";
  document.getElementById("budget-input").value = "";
  document.getElementById("transportation-input").value = "";
  document.getElementById("accommodation-input").value = "";
  document.getElementById("weather-input").value = "";
}

function goBack() {
    window.open("trip.html");
    window.close();
}