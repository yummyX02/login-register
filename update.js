window.onload = ()=>{
    let nameInfo = document.querySelector('#name-info');
    let passInfo = document.querySelector('#pass-info');
    let newId = document.querySelector('#newId');
    let idBtn = document.querySelector('#idBtn');
    
    nameInfo.innerHTML = sessionStorage.getItem('nameID');
    passInfo.innerHTML = sessionStorage.getItem('passwordID');
    //更新
    idBtn.addEventListener('click', ()=>{
        const xhr_id = new XMLHttpRequest;
        let nameID = sessionStorage.getItem('nameID');
        let log_token = sessionStorage.getItem('log_token');
        let sendData = JSON.stringify(newId.value);
        xhr_id.open('GET','http://47.94.90.140:8888/api/updateId?username='+nameID+'&userId=xxxxx');
        xhr_id.setRequestHeader('authorization',log_token);
        xhr_id.send(sendData);
        xhr_id.onreadystatechange = ()=>{
            if (xhr_id.readyState===4){
                if (xhr_id.status===200){
                    alert (JSON.parse(xhr_id.response).msg);
                }
                else{
                    alert('请求错误，请重试！');
                }
            }
            
        };
    })
}