const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 100;

let drawing = false;
canvas.addEventListener('mousedown', () => {
   drawing = true;
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath();
});


let cursors = {};


canvas.addEventListener('mousemove', (event) => {
    if(!drawing) return;

    ctx.lineWidth=2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    ctx.lineTo(event.clientX,event.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX, event.clientY);

   //send the drawing data to the server
    socket.emit('draw',{
        x:clientX,
        y:clientY
    });
    
});

//connect to the socket.IO server
const socket = io()

socket.on('connect',()=>{
   console.log('connected to server');
});

//listen for draw event from the server
socket.on('draw',(data)=>{
    //draw the data recieved from the server
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    ctx.lineTo(data.x, data.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(data.x, data.y);


    if(!(data.id in cursors)){
        cursors[data.id] ={
            x: data.x,
            y: data.y,
            color: data.color
        }
    };

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = data.color;
    ctx.arc(data.x, data.y,5,0,2*Math.PI);
    ctx.stroke();
});

