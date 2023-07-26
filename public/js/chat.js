window.addEventListener('DOMContentLoaded',async()=>{

  let url = 'http://localhost:3000';
  let i = 0;

  let token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = token;
  
  
  
  let data = await axios.get(`${url}/chat/messages`);

  let status = document.getElementById('status');
  data.data.user.forEach(element => {
      let div =  `<div class="alert alert-primary" role="alert">
      ${element.name} online
    </div>`
      console.log(element);
      status.innerHTML += div;
  });


  call = async()=>{
  
    let data = await axios.get(`${url}/chat/messages`);
    let count = data.data.count;
    //console.log(data);
    if(count>i){

      let message = document.getElementById('message');

      
    

      data.data.message.forEach(element => {
          let div =  `<div class="alert alert-primary" role="alert">
          ${element.name}: ${element.message}
        </div>`
          console.log(element);
          message.innerHTML += div;
      });

        
      document.getElementById('send').addEventListener('click', async ()=>{
        let text = document.getElementById('text').value;
        
        let res = await axios.post(`${url}/chat`,{text:text});
        location.reload();
        
      })

      i = count
      console.log(count,i);
    }

  }

    call()

 
  setInterval(call,1000);
    
   
})

