/**
 * If you want custom output from socket, then you can customize that.
 * @param {Array} cords [longitude,latitude]
 * @param {Number} id index as id of the drone
 */
function sendCurCords(cords,id){
    return {
        cords,id
    };
}
module.exports = {
    sendCurCords
}