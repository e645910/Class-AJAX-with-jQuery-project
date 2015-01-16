$('document').ready(function(){
// use the console.log(test); to test the app.js is communicating with the index.html
//jQuery that handles the click event on our get current users section
  $('#getUsers').on('click', function() {
//return the ajax request
    return $.ajax({
      method: 'GET', //ajax methodd to retrieve data
      url: 'http://reqr.es/api/users?page=1',//api is pulling info from users page
//give our app something to do if the request is successful
    success: function(res) {// (res) is what the data is called that is being retrieved
        console.log(res);
//Call the insertData function with the data we recieved.        
        insertData(res.data);
        }
        });
  });
//Create an insertData function that takes the data, parses our it's valuable information, and writes it to the DOM

var insertData = function(arr) {
    for (var i = 0; i < arr.length; i++) {
      $('#userInfo' + (i + 1)).html('<div>' +//.html is changing our index.html file
        'User Info:' +
        '<li>' +
        'First name: ' + arr[i].first_name +// insert data
        '</li>' +
        '<li>' +
        'Last name: ' + arr[i].last_name +// insert data
        '</li>' +
        '<hr>' +
        '</div>'
      )
    }
  }


// Hook up the submit button so that it is ready to handle the click event
// Once we've filled out the form, the value of the input fields are what we typed into it.
$('#addUser').on('click', function(e) {
    e.preventDefault();//prevents reloading the page for this event
// .val() gives us the value of something. 
    var userName = $('#name').val();
    var userJob = $('#job').val();
    console.log('test');
    return $.ajax({
//Have the function return our ajax POST request
      method: 'POST',
      url: 'http://reqr.es/api/users',
      data: {name: userName, job: userJob},
//Let's add a success part to our request.
      success: function(res) {
// Inside our success function, we need to make some html we can add into our DOM.
      $('#recentUser').html(
          '<li>' +
            'name: ' + res.name +
          '</li>' +
          '<li>' +
            'job: ' + res.job +
          '</li>' +
          '<li>' +
            'id: ' + res.id +
          '</li>' +
          '<li>' +
            'created at: ' + res.createdAt +
          '</li>'
        )
      }
    })
  })

 });
















