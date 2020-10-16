$.ajax({
  type: 'GET',
  url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=159',
  dataType: 'json',
  success: function (response, textStatus) {
    console.log(response);
    // response is a parsed JavaScript object instead of raw JSON
  },
  error: function (request, textStatus, errorMessage) {
    console.log(errorMessage);
  }
});
