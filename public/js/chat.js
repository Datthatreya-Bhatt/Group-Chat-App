window.addEventListener('DOMContentLoaded',async()=>{

    let url = 'http://localhost:3000';

    // in future im planning to use linked list rather than using array in local storage

    let token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = token;


    document.getElementById('createGroup').addEventListener('click',async()=>{
        location.href = `${url}/group/create`;
    });

    
    document.getElementById('edit').addEventListener('click',async()=>{
        location.href = `${url}/admin`;
    });

    let data = await axios.get(`${url}/chat/groups`);
    // console.log(data);
    // console.log(data.data[0].groups);
    // console.log(data.data[0].groups[0].groupsUser.admin);

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



                    document.getElementById('send').addEventListener('click', async ()=>{
                        let text = document.getElementById('text').value;
                        let res = await axios.post(`${url}/chat`,{text:text});
                       // console.log(text, res);
                    })


                    // getting messages
                    let res = await axios.get(`${url}/chat/messages`);
                    console.log(res);

                    //show data on screen
                    let right = document.getElementById('right');
                    right.innerHTML = '';
                    let id = 0;
                    res.data.forEach(element =>{
                        let div =  document.createElement('div');
                        div.className = "alert alert-primary";

                        //console.log(element.id);
                        // console.log(element.user.name);
                        id = element.id;
                        div.innerHTML = `${element.user.name}: ${element.message}`;
                        right.appendChild(div);
                    
                    })

                    id = JSON.stringify(id);
                    localStorage.setItem('id', id);

                    setInterval(listener, 1000);

                }catch(err){
                    console.log(err);
                }
                
            });
            
            
            left.appendChild(div);
        });
        
           
            
            

    }

async function listener(){
    let id = localStorage.getItem('id');
    id = Number(JSON.parse(id));
    let res = await axios.get(`${url}/g/${id}`);
    //console.log(res);

    res.data.forEach(element =>{
        console.log(element);

        id = element.id;
        let right = document.getElementById('right');
        let div = document.createElement('div');
        div.className = "alert alert-primary";
        div.innerHTML = `${element.user.name}: ${element.message}`;

        right.appendChild(div);

    })

    id = JSON.stringify(id);
    localStorage.setItem('id',id);
    
};
  
})

