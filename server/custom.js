/**
 * If you want custom output from socket, then you can customize that.
 * @param {Array} cords [longitude,latitude]
 * @param {Number} id index as id of the drone
 */
function sendCurCords(cords,id){
    return `This drone cords is ${cords} and id id ${id}`;
}
module.exports = {
    sendCurCords
}