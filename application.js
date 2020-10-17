$(document).ready(function() {
  getTask();
});

var getTask = function() {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=159',
    dataType: 'json',
    success: function (response, textStatus) {
      console.log(response);
      response.tasks.forEach(function (task) {
        var htmlString = ""
        var keyId = ""
        var checkCheckbox = ""
        var crossOut = ""

        for (var key in task) {
          if (key === 'content') {
            htmlString += task[key] + "<br/>";
          }
          else if (key === 'id') {
            keyId += task[key];
          }
          else if (key === 'completed' && task[key] === true) {
            checkCheckbox = 'checked';
            crossOut = 'strike-through';
          }
        }
        $('div #to-do-items').append("<div class='row taskRow " + crossOut + "' id=" + keyId + ">"
        + "<div class='col-1 px-auto'>" + " <input onclick='updateTask(this);' type='checkbox'" + checkCheckbox + " class='form-check-input' data-id=" + keyId + ">" + "</div>"
        + "<div class='col-9'>" + htmlString + "</p>" + "</div>"
        + "<div class='col-1 px-auto'>" + "<button onclick='deleteTask(this);' type='button' class='btn btn-sm btn-danger' data-id=" + keyId + ">Remove</button>" + "</div>"
        + "</div>");
      });
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var postTask = function() {
  var inputValue = $("input#newTask").val();
  $.ajax({
    type: 'POST',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=159',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: inputValue
      }
    }),
    success: function (response, textStatus) {
      console.log(response)
      var keyId = response.task.id;
      var htmlString = response.task.content;

      $('div #to-do-items').append("<div class='row taskRow' id=" + keyId + ">"
      + "<div class='col-1 px-auto'>" + "<input onclick='updateTask(this);' type='checkbox' class='form-check-input' data-id=" + keyId + ">" + "</div>"
      + "<div class='col-9'>" + htmlString + "</p>" + "</div>"
      + "<div class='col-1 px-auto'>" + "<button onclick='deleteTask(this);' type='button' class='btn btn-sm btn-danger' data-id=" + keyId + ">Remove</button>" + "</div>"
      + "</div>");
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var deleteTask = function(idNumberDelete) {
  console.log(idNumberDelete);
  var taskId = $(idNumberDelete).data("id");
  $.ajax({
    type: 'DELETE',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + taskId + '?api_key=159',
    success: function (response, textStatus) {
      console.log(response);
      $(".taskRow#" + taskId).remove();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var updateTask = function(idNumberUpdate) {
  console.log(idNumberUpdate);
  var taskId = $(idNumberUpdate).data("id");
  var url;

  if (idNumberUpdate.checked) {
    url = 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + taskId + '/mark_complete?api_key=159';
    $(".taskRow#" + taskId).addClass("strike-through");
  } else {
    url = 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + taskId + '/mark_active?api_key=159';
    $(".taskRow#" + taskId).removeClass("strike-through");
  }

  $.ajax({
    type: 'PUT',
    url: url,
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        completed: true
      }
    }),
    success: function (response, textStatus) {
      console.log(response);

    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var clickedActive = function() {
  $(".taskRow").remove();
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=159',
    dataType: 'json',
    success: function (response, textStatus) {
      console.log(response);
      response.tasks.forEach(function (task) {
        var htmlString = ""
        var keyId = ""

        for (var key in task) {
          if (key === 'completed' && task[key] === true) {
            return;
          }
          else if (key === 'content') {
            htmlString += task[key] + "<br/>";
          }
          else if (key === 'id') {
            keyId += task[key];
          }
        }
        $('div #to-do-items').append("<div class='row taskRow' id=" + keyId + ">"
        + "<div class='col-1 px-auto'>" + " <input onclick='updateTask(this);' type='checkbox' class='form-check-input' data-id=" + keyId + ">" + "</div>"
        + "<div class='col-9'>" + htmlString + "</p>" + "</div>"
        + "<div class='col-1 px-auto'>" + "<button onclick='deleteTask(this);' type='button' class='btn btn-sm btn-danger' data-id=" + keyId + ">Remove</button>" + "</div>"
        + "</div>");
      });
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var clickedCompleted = function() {
  $(".taskRow").remove();
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=159',
    dataType: 'json',
    success: function (response, textStatus) {
      console.log(response);
      response.tasks.forEach(function (task) {
        var htmlString = ""
        var keyId = ""
        var checkCheckbox = ""
        var crossOut = ""

        for (var key in task) {
          if (key === 'completed' && task[key] === true) {
            checkCheckbox = 'checked';
            crossOut = 'strike-through';
          }
          else if (key === 'completed' && task[key] === false) {
            return;
          }
          else if (key === 'content') {
            htmlString += task[key] + "<br/>";
          }
          else if (key === 'id') {
            keyId += task[key];
          }
        }
        $('div #to-do-items').append("<div class='row taskRow " + crossOut + "' id=" + keyId + ">"
        + "<div class='col-1 px-auto'>" + " <input onclick='updateTask(this);' type='checkbox'" + checkCheckbox + " class='form-check-input' data-id=" + keyId + ">" + "</div>"
        + "<div class='col-9'>" + htmlString + "</p>" + "</div>"
        + "<div class='col-1 px-auto'>" + "<button onclick='deleteTask(this);' type='button' class='btn btn-sm btn-danger' data-id=" + keyId + ">Remove</button>" + "</div>"
        + "</div>");
      });
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var clickedAll = function() {
  $(".taskRow").remove();
  getTask();
}
