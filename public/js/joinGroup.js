window.addEventListener('DOMContentLoaded',async()=>{
    let token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = token;
 
    let url = 'http://localhost:3000';

    let id = location.href;

    let res = await axios.post(`${url}/join`,{
        link: id
    }) 
    console.log(res);
    
    let card = document.getElementById('card');
    let h = document.getElementById('groupName');
    h.innerHTML += res.data.name;

    token = JSON.parse(token);
    token.connected = res.data.name;
    token = JSON.stringify(token);
    localStorage.setItem('token', token);

    card.appendChild(h);
    
    document.getElementById('button').addEventListener('click', async ()=>{
        let token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = token;

        let res = await axios.get(`${url}/join`);
        console.log(res);
        location.href = `${url}/chat`;
    })
    
    
    document.getElementById('cancel').addEventListener('click', async()=>{
        location.href = `${url}/chat`;
    })
});