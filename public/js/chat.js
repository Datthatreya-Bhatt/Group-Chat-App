let url = 'http://localhost:3000';

let token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = token;


document.getElementById('Sends').addEventListener('click', async()=>{
    let text = document.getElementById('text').value;

    let res = await axios.post(`${url}/chat`,{text:text});
    console.log(res);
})