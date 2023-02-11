
const socket=io('http://localhost:8000');


const form=document.getElementById("myform");
const msginput=document.getElementById("message");
const msgconatiner=document.querySelector(".container");
var audio=new Audio("Pikachu Sms Tone.mp3");


const append=(message,position)=>{
   const msgele=document.createElement("div");
   msgele.innerText=message;
   msgele.className=position;
   msgele.classList.add(position);
   msgconatiner.append(msgele);
   if(position=="message_left")
   audio.play();

}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg=msginput.value;
    var new_string="";
    var i;
    for(i=0;i<msg.length;i++)
    {
        if(msg[i]==" ")
        continue;
        else 
        break;
    }
    for(;i<msg.length;i++)
    {
    new_string+=msg[i];
    }
    if(new_string=="")
    alert("Please enter something :)")
    else{
    console.log(msg);
    append(`You : ${msg}`,"message_right");
    socket.emit('send',msg);
    msginput.value="";
    }
})
const myname=prompt("Please enter your name");
socket.emit('new-user-joined', myname);

socket.on('user-joined',name=>
{
   if(name!=null) 
   append(`${name} joined the chat`,"message_right")
})
socket.on('left',name=>
{
   if(name!=null) 
   append(`${name} left the chat`,"message_right")
})
socket.on('receive',data=>
{
   append(`${data.name} : ${data.message}`,"message_left")
})