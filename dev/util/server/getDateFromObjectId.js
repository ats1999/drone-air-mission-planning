export default function getDate(objectId) {
	let d = new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
	let dateString = '';
	console.log(d.getMonth())
	dateString += d.getDate()+'/';
	dateString += `${d.getMonth()+1<=9?'0'+(d.getMonth()+1):d.getMonth()+1}`;
	dateString += d.getFullYear();
	return dateString;
};
