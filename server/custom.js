/**
 * If you want custom output from socket, then you can customize that.
 * @param {Array} cords [longitude,latitude]
 * @param {Number} id index as id of the drone
 */
function sendCurCords(cords,bearing, id) {
    console.log({bearing})
    return {
        id,
        'gps.lon':cords[0],
        'gps.lat':cords[1],
        heading:bearing
    };
}

/**
 * Send line data
 * @param {Object} line geojson linestring object
 * @returns user defined object
 */
function sendLine(line, id) {
    return { cords: line.geometry.coordinates, id }
}


/**
 * Events names
 */
const CORD_EVENT = "path_order";
const WAY_POINT_EVENT = "way_points-client-merchant";

module.exports = {
    sendCurCords, CORD_EVENT, WAY_POINT_EVENT, sendLine
}
