$(document).ready(function(){
	$('#getUsers').on('click', function() {
		return $.ajax({
			method: 'GET',
			url: 'http://reqr.es/api/users?page=1',
			success: function(res){
				console.log(11111111, res);
				insertData(res.data);
			},
			error: function(err){
				console.log(err)
			}
		});
	});
	var insertData = function(arr){
		for(var i = 0; i < arr.length; i++){
			$('#userInfo' + (i + 1)).html(
				'<div>' 
					+ 'User Info ' + arr[i].id + ':' 
					+ '<li>' + 'First name: ' + arr[i].first_name + '</li>' 
					+ '<li>' + 'Last name: ' + arr[i].last_name + '</li>' 
					+ '<hr>' +
				'</div>'
			)
		}
	}

	$('#addUser').on('click', function(e){
		e.preventDefault();
		var userName = $('#name').val();
		var userJob = $('#job').val();
		return $.ajax({
			method: 'POST',
			url: 'http://reqr.es/api/users',
			data: {name: userName, userJob},
			success: function(res){
				console.log(222222, res)
				$('recentUser').html(
					'<li>' + res.name + '</li>' 
					+ '<li>' + res.job + '</li>'
					+ '<id>' + res.id + '</li>'
					+ '<li>' + 'created at: ' + res.createdAt + '</li>'
				)
			}
		})
	})
});