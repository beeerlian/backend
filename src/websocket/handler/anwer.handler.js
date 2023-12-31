module.exports = ({users, sender ,data})=> {
	
	const found =Array.from( users).find(e => {
		console.log(e.user.id , " === ", data.receiverId);
		return e.user.id === data.receiverId;
	});
	if(!found){
		sender.emit("answer",{
			success: false,
			event: "answer",
			message: "User doesnt exist"
		});
		return;
	}

	found.emit("answer",{
		success: true,
		event: "answer",
		data : {
			sdp: data.sdp,
			senderId: sender.user.id
		}
	});
};