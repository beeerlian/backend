
module.exports = (socket)=> {
	socket.send({
		success: true,
		event: "connected",
		data: {
			stun : process.env.STUN_URL,
			sockerId: socket.id
		}
	});
};