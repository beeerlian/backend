

module.exports = ({users, sender ,data})=> {
	
	const found =Array.from( users).find(e => {
		console.log(e.user.id , " === ", data.receiverId);
		return e.user.id === data.receiverId;
	});
	if(!found){
		sender.emit("offer",{
			success: false,
			event: "offer",
			message: "User doesnt exist"
		});
		return;
	}

	found.emit("offer",{
		success: true,
		event: "offer",
		data : {
			sdp: data.sdp,
			senderId: sender.user.id
		}
	});
};