let url = 'http://localhost:3000';

document.getElementById('button').addEventListener('click',async()=>{
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let res = await axios.post(`${url}/login`,{
        email: email,
        password:password
    })

    console.log(res);
})