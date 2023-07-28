window.addEventListener('DOMContentLoaded',async()=>{

  let url = 'http://localhost:3000';
  let i = 0;

  let token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = token;
  
  let oldMsg = localStorage.getItem('message');
  oldMsg = JSON.parse(oldMsg);

  if(!oldMsg){
    //store variable is an array for now , im using this array to store data in localstorage, best way is to use linked list instead of array.
    let store = [[],[]]
    let data = await axios.get(`${url}/chat/messages/0`);
    
    let left = document.getElementById('left');
    data.data.user.forEach(element => {
        let div =  `<div class="alert alert-primary" role="alert">
        ${element.name} online
      </div>`
        store[1].push(element);
        left.innerHTML += div;
    });

    let right = document.getElementById('right');
    data.data.message.forEach(element => {
        let div =  `<div class="alert alert-primary" role="alert">
        ${element.name}: ${element.message}
        </div>`
        store[0].push(element);
        right.innerHTML += div;
    });

    document.getElementById('send').addEventListener('click', async ()=>{
        let text = document.getElementById('text').value;
        let res = await axios.post(`${url}/chat`,{text:text});
    })

    i = data.data.count;
    

    
    let limit = 10;
    let length = data.data.message.length;
    let difference = (length - limit) > 0 ? (length - limit) : 0;  
    
    //this loop is to keep the array size to 10, by removing old data
    while(difference>0){
      store[0].shift();
      difference --;
    }
    
    store = JSON.stringify(store);
    localStorage.setItem('message', store);

  }
  else{
    console.log(123);
    let res = localStorage.getItem('message');
    res = JSON.parse(res);

    let id  = 0;

    let left = document.getElementById('left');
    res[1].forEach(element => {
        let div =  `<div class="alert alert-primary" role="alert">
        ${element.name} online
      </div>`
        left.innerHTML += div;
    });

    let right = document.getElementById('right');
    res[0].forEach(element => {
        let div =  `<div class="alert alert-primary" role="alert">
        ${element.name}: ${element.message}
        </div>`
       id = element.id;
        right.innerHTML += div;
    });


    document.getElementById('send').addEventListener('click', async ()=>{
        let text = document.getElementById('text').value;
        let res = await axios.post(`${url}/chat`,{text:text});
    });

    i = id;

   
    call = async()=>{
  
        let data2 = await axios.get(`${url}/count`);
        let count = data2.data;
       
        if(count>i){
          let data = await axios.get(`${url}/chat/messages/${i}`);

          console.log(data);
    
          let right = document.getElementById('right');
          data.data.message.forEach(element => {
              let div =  `<div class="alert alert-primary" role="alert">
              ${element.name}: ${element.message}
            </div>`
              res[0].push(element);
              right.innerHTML += div;
          });
    
            
          document.getElementById('send').addEventListener('click', async ()=>{
            let text = document.getElementById('text').value;
            let res = await axios.post(`${url}/chat`,{text:text});
          })
    
          i = count
          console.log(count,i);

          let limit = 10;
          let length = res[0].length;
          let difference = (length - limit) > 0 ? (length - limit) : 0;  
          
          while(difference>0){
            res[0].shift();
            difference --;
          }
          
          store = JSON.stringify(res);
          localStorage.setItem('message', store);

        }
    
      }
    
      
      setInterval(call,1000);
        
       


  }
  


  
})

