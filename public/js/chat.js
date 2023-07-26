let url = 'http://localhost:3000';

let token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = token;

window.onload = async()=>{
    let data = await axios.get(`${url}/chat/messages`);

    let status = document.getElementById('status');
    let message = document.getElementById('message');

    
    data.data.user.forEach(element => {
        let div =  `<div class="alert alert-primary" role="alert">
        ${element.name} online
      </div>`
        console.log(element);
        status.innerHTML += div;
    });

    data.data.message.forEach(element => {
        let div =  `<div class="alert alert-primary" role="alert">
        ${element.name}: ${element.message}
      </div>`
        console.log(element);
        message.innerHTML += div;
    });

    
document.getElementById('sends').addEventListener('click', async ()=>{
  let text = document.getElementById('text').value;
  
  let res = await axios.post(`${url}/chat`,{text:text});
  console.log(res);
  location.reload();
})
   
}


