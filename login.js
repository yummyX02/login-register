window.onload = function () {
	let name = document.querySelector('#text-username');
	let pass = document.querySelector('#text-password');
	let register = document.querySelector('#register');
	let login = document.querySelector('#login');
	var re = 0;
	var reg = [
		/^[a-zA-Z0-9_-]{5,16}$/,
		/^[A-Z]{1}[A-Za-z0-9_]{5,11}$/
	];
	// console.log(reg);
	function check() {

		let indev = reg[0].test(name.value);
		if (name.value.length < 5 || name.value.length > 11) {
			alert('用户名至少5位且不得超过11位');
			re++;
		}
		if (!indev) {
			// reg_name = true;
			// name.innerHTML = "<font color='green'>用户名符合规则</font>";
			alert('用户名不符合规则');
			re++;
		}
		// else {
		// 	name.innerHTML = "<font color='red'>用户名不符合规则</font>";
		// }


		//
		let indec = reg[1].test(pass.value);
		if (pass.value.length < 6) {
			alert('密码至少6位');
			re++;
		}
		if (!indec) {
			// reg_pass = true;
			// pass.innerHTML = "<font color='green'>密码符合规则</font>";
			alert('密码不符合规则');
			re++;
		}
		// else {
		// 	// pass.innerHTML = "密码不符合规则";
		// 	alert('密码不符合规则');
		// }

	}
	// function checkName() {
	// 	if (name.value.length < 5 || name.value.length > 11) {
	// 		alert('用户名至少5位且不得超过11位');
	// 		re++;
	// 		let index = reg[0].test(name.value);
	// 		if (index) {
	// 			reg_name = true;
	// 			name.innerHTML = "<font color='green'>用户名符合规则</font>";
	// 		}
	// 		else {
	// 			name.innerHTML = "<font color='red'>用户名不符合规则</font>";
	// 		}
	// 	}
	// }
	// function checkPass() {
	// 	let indec = reg[1].test(pass.value);
	// 	if (pass.value.length < 6) {
	// 		alert('密码至少6位');
	// 		re++;
	// 		if (indec) {
	// 			reg_pass = true;
	// 			pass.innerHTML = "<font color='green'>密码符合规则</font>";
	// 		}
	// 		else {
	// 			pass.innerHTML = "<font color='red'>密码不符合规则</font>";
	// 		}
	// 	}
	// }
	// name.addEventListener('mouseout', checkName);
	// pass.addEventListener('mouseout', checkPass);
	login.addEventListener('click', check);
	register.addEventListener('click', check);

	//注册
	if (re == 0) {
		register.addEventListener('click', () => {
			//原生ajax
			const xhr = new XMLHttpRequest();
			xhr.open("POST", "http://47.94.90.140:8888/api/register");
			let sendData = JSON.stringify({
				username: name.value,
				password: pass.value,
			});
			xhr.setRequestHeader('Content-type', 'application/json');
			xhr.send(sendData);
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					if (xhr.status === 200 && xhr.status < 300) {
						alert(JSON.parse(xhr.response).msg);
					}
				}

			}
		})
	}
	// else{
	// 	alert('用户名或密码有误');
	// }


	//登陆
	login.addEventListener('click', () => {
		const logEvent = new XMLHttpRequest;
		logEvent.open('POST', 'http://47.94.90.140:8888/api/login');
		let sendData = JSON.stringify({
			username: name.value,
			password: pass.value,
		});
		logEvent.setRequestHeader('Content-type', 'application/json');
		logEvent.send(sendData);
		logEvent.onreadystatechange = () => {
			if (logEvent.readyState === 4) {
				if (logEvent.status === 200) {
					alert(JSON.parse(logEvent.response).msg);
					sessionStorage.setItem('log_token', JSON.parse(logEvent.response).data.token);
					sessionStorage.setItem('nameID', name.value);
					sessionStorage.setItem('passwordID', pass.value);
					window.location.href = "./update.html";
				}
			}
		};

	})

}