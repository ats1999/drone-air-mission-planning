/**
 * If you want custom output from socket, then you can customize that.
 * @param {Array} cords [longitude,latitude]
 * @param {Number} id index as id of the drone
 */
function sendCurCords(cords, id) {
    return {
        'gps.lon': cords[0],
        'gps.lat': cords[1],
        id
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
const CORD_EVENT = "cords";
const WAY_POINT_EVENT = "static_data";

module.exports = {
    sendCurCords, CORD_EVENT, WAY_POINT_EVENT, sendLine
}