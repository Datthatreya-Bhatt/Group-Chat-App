window.addEventListener('DOMContentLoaded',async()=>{

  let url = 'http://localhost:3000';
  

  let token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = token;
  //token = JSON.parse(token);

  let oldMsg = localStorage.getItem('data');
  oldMsg = JSON.parse(oldMsg);

  document.getElementById('search').addEventListener('click',async()=>{

    let cred = document.getElementById('friend').value;

    try{
      let res = await axios.post(`${url}/search`,{
        cred: cred
      });
      console.log(res);

      if(res.data === 'found'){

        if(confirm('User found, wanna add them to your contact ?')){

          let res = await axios.post(`${url}/addcontact`,{
            email: cred
          });

          //add them to localstorage
          console.log(res);
          alert('success');
          location.reload();


        }else{
          alert('give another try');
        }
      }else{
        alert('no user found');
      }
    }catch(err){
      console.log(err);
    }
})

document.getElementById('createGroup').addEventListener('click',async()=>{
    location.href = `${url}/group/create`;
});




    if(!oldMsg){
        //store variable is an array for now , im using this array to store data in localstorage, best way is to use linked list instead of array.
        let data = await axios.get(`${url}/chat/contacts`);

        if(data.data === 'no contacts'){
            alert('You have not sent message to anyone, say hi to somebody');

        }else{
            console.log(data);
            let store = [[],[]];
            let left = document.getElementById('left');

            store = JSON.stringify(store);
            localStorage.setItem('data', store);

            data.data.forEach(element => {
                let token = localStorage.getItem('token');
                token = JSON.parse(token);

                //console.log(token);
                
                let div =  document.createElement('div');
                div.className = "alert alert-primary";

                let section = '';
                let cred = '';
                //let name = '';

                // in div they see contacts email only we need name
                if(element.group != null ){
                    div.innerHTML = `${element.group}`;
                    section += 'g';
                    cred += element.group;
                    //name += element.group;

                }
                else if(element.from === token.user && element.group === null){
                    div.innerHTML = `${element.to}`;
                    section += 'i';
                    cred += element.to;
                   // name += element.to;
                   console.log(element);
                }
                else{
                    div.innerHTML = `${element.from}`;
                    section += 'i';
                    cred += element.from;
                    //name += element.from;
                   console.log(element);





                }

                //storing contacts in local storage
                //section, cred, isGroup, name

                
                store = localStorage.getItem('data');
                store = JSON.parse(store);
                store[0].push([section, cred]);
                store = JSON.stringify(store);
                localStorage.setItem('data',store);

                 
                div.addEventListener('click', async()=>{

                    try{
                        //change local storage
                        let token = localStorage.getItem('token');
                        token = JSON.parse(token);
                        token.connected = cred;
                        console.log(token, cred);
                        token = JSON.stringify(token);
                        localStorage.setItem('token',token);
                        token = localStorage.getItem('token');
                        //token = JSON.parse(token);
                        axios.defaults.headers.common['Authorization'] = token;

                        //add event listener
                        document.getElementById('send').addEventListener('click', async ()=>{
                            let text = document.getElementById('text').value;
                            let res = await axios.post(`${url}/chat/${section}`,{text:text});
                            console.log(text, res);
                            //location.reload();
                        })


                        // getting messages
                        let res = await axios.get(`${url}/chat/${section}`);
                        console.log(res);
                        //show data on screen
                        
                        res.data.forEach(element =>{
                            let right = document.getElementById('right');
                            let div =  document.createElement('div');
                            div.className = "alert alert-primary";
                            let id = element.id;
                            let msg = '';
                            
                            //conditions
                            if(section === 'g'){
                                div.innerHTML = `${element.from}: ${element.message}`;
                                msg = `${element.from}: ${element.message}`;

                            }
                            else if(section === 'i' && element.from != token.user){
                                div.innerHTML = `${element.from}: ${element.message}`;
                                msg = `${element.from}: ${element.message}`;

                            }
                            else{
                                div.innerHTML = `You: ${element.message}`;
                                msg = `You: ${element.message}`;


                            }
                            right.appendChild(div);

                            let store = localStorage.getItem('data');
                            store = JSON.parse(store);

                            store[1].push([section, cred, msg, id]);

                            store = JSON.stringify(store);
                            id = JSON.stringify(id);

                            localStorage.setItem('data',store);
                            localStorage.setItem('id',id);

                           

                            
                        
                        })

                    }catch(err){
                        console.log(err);
                    }
                    
                });
                
                
                left.appendChild(div);
            });
           
            let store2 = localStorage.getItem('data');
            store2 = JSON.parse(store2);
            let limit = 10;

            for(let i =0;i<store2[0].length;i++){  
                let index = [];
                let count = 0;
                for(let j =0;j<store2[1].length;j++){
                    //if section and credentials match in both array
                    if(store2[0][i][0] === store2[1][j][0] && store2[0][i][1] === store2[1][j][1]){
                        index.push(j);
                        count++;
                    }
                }

                let difference = count - limit;  

                //this loop is to keep the array size to 10, by removing old data
                while(difference>0 && index.length>0){
                    store2[1].splice(index[0],1);
                    index.shift();
                    difference --;
                }
                    
                store2 = JSON.stringify(store2);
                localStorage.setItem('data', store2);

               

            }
            
            
            
            

        }

        console.log('Data')

    }
    else{

        console.log('Local storage');
        let data = localStorage.getItem('data');
        data = JSON.parse(data);

        //console.log(data);
        let left = document.getElementById('left');

        data[0].forEach(element => {
            console.log(element);
            let div =  document.createElement('div');
            div.className = "alert alert-primary";

            let section = element[0];
            let cred = `${element[1]}`;
           
            div.innerHTML = `${element[1]}`;
               
           

            div.addEventListener('click', async()=>{

                try{
                    //change local storage
                    let token = localStorage.getItem('token');
                    token = JSON.parse(token);
                    token.connected = cred;
                    console.log(token, cred);
                    token = JSON.stringify(token);
                    localStorage.setItem('token',token);
                    token = localStorage.getItem('token');
                    //token = JSON.parse(token);
                    axios.defaults.headers.common['Authorization'] = token;

                    //add event listener
                    document.getElementById('send').addEventListener('click', async ()=>{
                        let text = document.getElementById('text').value;
                        let res = await axios.post(`${url}/chat/${section}`,{text:text});
                        console.log(res);
                        //location.reload();
                    })


                    data[1].forEach(element =>{
                        let right = document.getElementById('right');
                        let div =  document.createElement('div');
                        div.className = "alert alert-primary";
                        div.innerHTML = `${element[2]}`;
                       
                        right.appendChild(div);

                        let id = element[3];
                        id = JSON.stringify(id);
                        localStorage.setItem('id', id);

                    
                    })
                    
                    setInterval(()=>{listener(section)},1000);

                }catch(err){
                    console.log(err);
                }
                
            });
            
            
            left.appendChild(div);
        });


       

    }

async function listener(section){
    let id = localStorage.getItem('id');
    id = Number(JSON.parse(id));
    let cred = localStorage.getItem('token');
    cred = JSON.parse(cred);
    let res = await axios.get(`${url}/${section}/${id}`);
    //console.log(res);

    let data = localStorage.getItem('data');
    data = JSON.parse(data);
    res.data.forEach(element =>{
        data[1].shift();
        id = element.id;
        let msg =  `${element.from}: ${element.message}`;

        let right = document.getElementById('right');
        let div = document.createElement('div');
        div.className = "alert alert-primary";
        div.innerHTML = `${element.from}: ${element.message}`;

        right.appendChild(div);

        data[1].push([section, cred, msg, id]);
        //store[1].push([section, cred, msg, id]);




    })

    id = JSON.stringify(id);
    localStorage.setItem('id',id);
    
};

//setInterval(()=>{listener(section)},1000);

  
})

