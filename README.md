# Understanding AJAX with jQuery

Today we're going to talk about Ajax, and how we can use jQuery to make Ajax requests.

Ajax allows us to retreive data from a server or API without refreshing the entire page. Before Ajax that's what would happen.

Essentially, ajax has helped web to become what it is today. Can you imagine making a facebook post and having it refresh the entire website? 

If you look at the index.html of this app, we have 3 things. A form that takes in data. A 'get current users' section, and a 'recently added user' section. 

The form will take in data, and then pass it to the 'recently added user' section. If we add a new user it will replace the previous one. The get current users section will hit an api and pull their users data. 

We will be using the [reqres](http://reqr.es) for our API, which is an open API filled with dummy data. Let's get started!

## Step 1 - Our first GET request

- Write some jQuery that handles the click event on our get current users section

``` javascript
  $('#getUsers').on('click', function() {
    // do stuff here
  })
```

- Now let's return the ajax request

``` javascript
  $('#getUsers').on('click', function() {
    return $.ajax({
      method: 'GET',
      url: 'http://reqr.es/api/users?page=1',
      success: //do something
    })
  })
```

We are telling our request 3 things:
  - What kind of request (method)
  - What is the URL
  - What do we do on a successful request

- Let's give our app something to do if the request is successful

``` javascript
  $('#getUsers').on('click', function() {
    return $.ajax({
      method: 'GET',
      url: 'http://reqr.es/api/users?page=1',
      success: function(res) {
        console.log(res);
      }
    })
  })
```

Now when we click the button, we will end up with the response of our api in our console. Cool!

Being able to console.log data is cool, and a great place to start, but we need to get that data into our DOM! 

- Create an insertData function that takes the data, parses our it's valuable information, and writes it to the DOM

``` javascript
  var insertData = function() {
    for (var i = 0; i < arr.length; i++) {
      $('#userInfo' + (i + 1)).html('<div>' +
        'User Info:' +
        '<li>' +
        'First name: ' + arr[i].first_name +
        '</li>' +
        '<li>' +
        'Last name: ' + arr[i].last_name +
        '</li>' +
        '<hr>' +
        '</div>'
      )
    };
  }
```

What this does is take the data, iterates through it with a loop and writes it into the DOM. It's not pretty, but it gets the job done.


- Create an empty array named arr at the top of the page

``` javascript
  var arr = [];
```

- Set the array equal to the response's child named data, and call the insertData function.

``` javascript
  $('#getUsers').on('click', function() {
    return $.ajax({
      method: 'GET',
      url: 'http://reqr.es/api/users?page=1',
      success: function(res) {
        console.log(res);
        arr = res.data
        insertData();
      }
    })
  })
```

Now when we click the GET current users button we should see them populate in our DOM.

## Step 2 - Our first POST request

GET requests are the easiest of requests. POSTs are a bit more tricky, but not by a lot. Let's hook our form up so that we can make a post request!

- Hook up the submit button so that it is ready to handle the click event

``` javascript
  $('#addUser').on('click', function() {
    // do thing here
  });
```

- The next thing we want to do is capture the value of our input forms using .val()

``` javascript
  $('#addUser').on('click', function() {
    var userName = $('#name').val();
    var userJob = $('#job').val();
  });
```

.val() gives us the value of something. Once we've filled out the form, the value of the input fields are what we typed into it. 

- Have the function return our ajax PUT request

``` javascript
  $('#addUser').on('click', function() {
    var userName = $('#name').val();
    var userJob = $('#job').val();
    return $.ajax({
      method: 'POST',
      url: 'http://reqr.es/api/users',
      data: {name: userName, job: userJob}
    })
  });
```

Notice how our method now says post, and our URL is a little different. Another thing that is different is this 'data' part. Data lets us pass specific information to the API via our request. This is useful when making POST requests because we are POSTing something to the api. It's also helpful when trying to find specific user data, we can do something like pass in the users ID. 

Our data is currently the values from our input fields. 

- Let's add a success part to our request.

``` javascript
  $('#addUser').on('click', function() {
    var userName = $('#name').val();
    var userJob = $('#job').val();
    return $.ajax({
      method: 'POST',
      url: 'http://reqr.es/api/users',
      data: {name: userName, job: userJob},
      success: function(res) {

      }
    })
  });
```

- Inside our success function, we need to make some html we can add into our DOM.

``` javascript
  $('#addUser').on('click', function() {
    var userName = $('#name').val();
    var userJob = $('#job').val();
    return $.ajax({
      method: 'POST',
      url: 'http://reqr.es/api/users',
      data: {name: userName, job: userJob},
      success: function(res) {
        $('#recentUser').html(
          '<li>' +
            'name: ' + data.name +
          '</li>' +
          '<li>' +
            'job: ' + data.job +
          '</li>' +
          '<li>' +
            'id: ' + data.id +
          '</li>' +
          '<li>' +
            'created at: ' + data.createdAt +
          '</li>'
        )
      }
    })
  });
```























