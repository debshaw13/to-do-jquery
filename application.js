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
        if (key === 'content') {
          htmlString += task[key] + "<br/>";
        }
        else if (key === 'id') {
          keyId += task[key];
        }
      }
      $('div #to-do-items').append("<div class='row'>"
      + "<div class='col-1 px-auto'>" + "<input onclick='updateTask(this);' type='checkbox' class='form-check-input' data-id=" + keyId + ">" + "</div>"
      + "<div class='col-9'>" + htmlString + "</p>" + "</div>"
      + "<div class='col-1 px-auto'>" + "<button onclick='deleteTask(this);' type='button' class='btn btn-sm btn-danger' data-id=" + keyId + "'>Remove</button>" + "</div>"
      + "</div>");
    });
  },
  error: function (request, textStatus, errorMessage) {
    console.log(errorMessage);
  }
});

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
      console.log(response);
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
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var updateTask = function(idNumberUpdate) {
  console.log(idNumberUpdate);
  var taskId = $(idNumberUpdate).data("id");
  $.ajax({
    type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + taskId + '/mark_complete?api_key=159',
    success: function (response, textStatus) {
      console.log(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}
