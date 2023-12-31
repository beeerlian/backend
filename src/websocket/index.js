const { verifyJWT } = require("../utils");
const { onConnected, onOffer } = require("./handler");


module.exports = (io) => {
	const users = new Set();
	io.use((socket, next)=>{
		
		if (socket.handshake.headers && socket.handshake.headers.authorization){
			const authHeader = socket.handshake.headers.authorization;
			
			if (!authHeader || !authHeader.startsWith("Bearer")) {
				throw new Error("request unauthorized");
			}
			const token = authHeader.slice(7);
			const payload = verifyJWT(token);
			socket.user = payload;
			console.log(socket.user);
			next();
		}
		else {
			next(new Error("Authentication error"));
		}    
	});
		
	io.on("connection", (socket)=> {
		users.add(socket);
		onConnected(socket);
		socket.on("pong", ()=> {
			socket.send({type: "pong"});
		});
       
		socket.on("message", ()=> {
			socket.send({type: "pong"});
		});
	
		socket.on("offer", (data)=> {
			onOffer({users, sender: socket, data: JSON.parse(data)});
		});
       
		socket.on("answer", ()=> {
			socket.send({type: "pong"});
		});
	});
};