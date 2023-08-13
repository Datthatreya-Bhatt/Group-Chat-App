

window.addEventListener('DOMContentLoaded',async()=>{


    let url = 'http://localhost:3000';

    // in future im planning to use linked list rather than using array in local storage

    // to connecting backend server
    const socket = io('http://localhost:3001');


    let token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = token;


    document.getElementById('createGroup').addEventListener('click',async()=>{
        location.href = `${url}/group/create`;
    });

    
    document.getElementById('edit').addEventListener('click',async()=>{
        location.href = `${url}/admin`;
    });
    

    


    let data = await axios.get(`${url}/chat/groups`);
    
    if(data.data === 'no contacts'){
        alert('You are not part of any groups, create a groups and invite your friends');

    }else{
        //console.log(data);
        let left = document.getElementById('left');


        data.data[0].groups.forEach(element => {
            //console.log(element.groupsUser);
            let admin = element.groupsUser.admin;
            let gId = element.groupsUser.groupId;
            //console.log(element.groupsUser.groupId);

            let div =  document.createElement('div');
            div.className = "alert alert-primary";
            div.innerHTML = element.name;
                
            div.addEventListener('click', async()=>{

                try{

                    //change local storage
                    let token = JSON.parse(localStorage.getItem('token'));
                    token.connected = gId;

                    token = JSON.stringify(token);
                    localStorage.setItem('token',token);

                    //change headers
                    let header = localStorage.getItem('token');
                    axios.defaults.headers.common['Authorization'] = header;


                    //enable editing option if the person is admin
                    let edit = document.getElementById('edit');
                    if(admin){
                        edit.style.visibility = 'visible';
                    }
                    else{
                        edit.style.visibility = 'hidden';

                    }

                   

                    socket.emit('join-group', header);

                    socket.on('join-group-failed', err =>{
                        alert(err);
                    });

                                        
                    socket.on('receive-msg',(msg)=>{
                        let right = document.getElementById('right');

                        let div =  document.createElement('div');
                        div.className = "alert alert-primary";

                        
                        div.innerHTML = `${msg}`;
                        right.appendChild(div);
                    });

                    document.getElementById('send').addEventListener('click', async ()=>{
                        let user = localStorage.getItem('token');
                        user = JSON.parse(user);

                        let text = document.getElementById('text').value;
                        //let res = await axios.post(`${url}/chat`,{text:text});
                       // console.log(text, res);
                       socket.emit('send-msg',text, header);

                       let right = document.getElementById('right');

                       let div =  document.createElement('div');
                       div.className = "alert alert-primary";

                       
                       div.innerHTML = `${user.userName}: ${text}`;
                       right.appendChild(div);

                       socket.emit('send-msg-failed', err =>{
                            alert(err);
                       });


                    })


                    // getting messages
                    let res = await axios.get(`${url}/chat/messages`);
                    console.log(res);

                    //show data on screen
                    let right = document.getElementById('right');
                    right.innerHTML = '';
                    res.data.forEach(element =>{
                        let div =  document.createElement('div');
                        div.className = "alert alert-primary";

                        if(element.media){
                            let a = document.createElement('a');
                            a.href = element.message;
                            a.innerHTML = `${element.user.name}: ${element.message}`;
                            div.appendChild(a);

                        }
                        else{

                            div.innerHTML = `${element.user.name}: ${element.message}`;
                        }

                        right.appendChild(div);

                    })

                    //multi media upload button event
                    document.getElementById('upload').addEventListener('change',async(event)=>{
                        const input = document.querySelector('input[type=file]').files;
                        console.log(input[0]);
                        const formData = new FormData();

                        formData.append('file', input[0])

                        let res = await axios.post(`${url}/chat/upload`, formData,{
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                            } )
                        

                        console.log(res);
                        location.reload();
                        
                
                    });




                    


                }catch(err){
                    console.log(err);
                }
                
            });
            
            
            left.appendChild(div);
        });
        
           
            
            

    }


  
})

