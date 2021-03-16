/**
 * Class to help create Delauney Triangulations.
 */
class General {

    /**
     * Returns the distance between two points.
     * 
     * @param {float[2]} point1 The first point in array format
     * @param {float[2]} point2 The second point in array format
     * @returns {float} The distance between point1 and point2
     */
    static distance(point1, point2) {
        return Math.sqrt(
            Math.pow(point1[0]-point2[0], 2) +
            Math.pow(point1[1]-point2[1], 2)
        );
    }
}

export default General;