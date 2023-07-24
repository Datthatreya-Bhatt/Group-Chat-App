let url = 'http://localhost:3000';

document.getElementById('button').addEventListener('click',()=>{
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let number = document.getElementById('number').value;
    let password = document.getElementById('password').value;

    let res = axios.post(`${url}/login`,{name,email,number,password});
    console.log(res);

});