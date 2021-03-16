import Masker from './masker';
import _ from 'lodash';

/**
 * Class to help with drawing a polygon with some texture.
 */
class TextureDrawer {
    // Initialize by providing the processing context
    constructor(p) {
        this.p = p;
        this.masker = new Masker(p);

        // Define the different types of fill functions
        this.fillFunctions = {
            'Dotted': this.dotted
        }
    }

    /******************
     * FILL FUNCTIONS *
     ******************/

    dotted = (layer, boundingBox, settings) => {
        // Create default settings
        let defaultSettings = {
            dotBoxSize: 10,
            dotSize: 5,
            dotColor: this.p.color(0),
            alternating: 'vertical',
        };
        let fullSettings = _.merge({}, defaultSettings, settings);
        
        // Set the dot color
        layer.noStroke();
        layer.fill(fullSettings.dotColor);
        layer.rectMode(this.p.CENTER);

        // Iterate through the bounding box drawing the circles
        let alternate = false;
        if (fullSettings.alternating === 'vertical') {
            for (let x = boundingBox[0][0] - fullSettings.dotSize / 4.0; x < boundingBox[1][0] + fullSettings.dotSize; x += fullSettings.dotBoxSize) {
                for (let y = boundingBox[0][1] - fullSettings.dotSize / 2.0; y < boundingBox[1][1] + fullSettings.dotSize; y += fullSettings.dotBoxSize) {
                    if (alternate) {
                        layer.ellipse(x, y-fullSettings.dotBoxSize/4.0, fullSettings.dotSize, fullSettings.dotSize);
                    } else {
                        layer.ellipse(x, y+fullSettings.dotBoxSize/4.0, fullSettings.dotSize, fullSettings.dotSize);
                    }
                }
                alternate = !alternate;
            }
        } else if (fullSettings.alternating === 'horizontal') {
            for (let y = boundingBox[0][1] - fullSettings.dotSize / 4.0; y < boundingBox[1][1] + fullSettings.dotSize; y += fullSettings.dotBoxSize) {
                for (let x = boundingBox[0][0] - fullSettings.dotSize / 2.0; x < boundingBox[1][0] + fullSettings.dotSize; x += fullSettings.dotBoxSize) {
                    if (alternate) {
                        layer.ellipse(x-fullSettings.dotBoxSize/4.0, y, fullSettings.dotSize, fullSettings.dotSize);
                    } else {
                        layer.ellipse(x+fullSettings.dotBoxSize/4.0, y, fullSettings.dotSize, fullSettings.dotSize);
                    }
                }
                alternate = !alternate;
            }
        }
    }

    /********************
     * PUBLIC FUNCTIONS *
     ********************/

    drawPolygon = (layer, points, borderWidth, borderColor, fillFunction, fillFunctionSettings) => {
        // Determine the bounding box of the polygon
        let minX = _.minBy(points, this.getXFromPoint)[0];
        let maxX = _.maxBy(points, this.getXFromPoint)[0];
        let minY = _.minBy(points, this.getYFromPoint)[1];
        let maxY = _.maxBy(points, this.getYFromPoint)[1];
        let boundingBox = [
            [minX, minY],
            [maxX, maxY]
        ];
        // Set the stroke according to the passed-in params
        layer.stroke(borderColor);
        layer.strokeWeight(borderWidth);
        layer.noFill();
        // Draw the polygon itself with the border
        layer.beginShape();
        for (let point of points) {
            layer.vertex(point[0], point[1]);
        }
        layer.endShape(this.p.CLOSE);
        // Construct the mask layer
        let maskingLayer = this.p.createGraphics(layer.width, layer.height);
        maskingLayer.noStroke();
        maskingLayer.fill(0, 0, 0, 255);
        maskingLayer.beginShape();
        for (let point of points) {
            maskingLayer.vertex(point[0], point[1]);
        }
        maskingLayer.endShape(this.p.CLOSE);
        // Create the fill layer
        let fillLayer = this.p.createGraphics(layer.width, layer.height);
        // Draw the fill layer with the fill function
        this.fillFunctions[fillFunction](fillLayer, boundingBox, fillFunctionSettings);
        // Mask the texture layer
        let maskedFill = this.masker.mask(fillLayer, maskingLayer);
        // Draw the maskedFill layer to the screen
        layer.image(maskedFill, 0, 0);
        // Free resources
        fillLayer.remove();
        maskingLayer.remove();
    }



    /*********************
     * PRIVATE FUNCTIONS *
     *********************/

    /**
     * Given a point in an array format (e.g., [pointX, pointY]) return the x-coordinate.
     * 
     * @param {float[]} point A coordinate in array format (e.g., [pointX, pointY])
     * @returns {float} The x-coordinate of the point
     */
    getXFromPoint = (point) => {
        return point[0];
    }

    /**
     * Given a point in an array format (e.g., [pointX, pointY]) return the y-coordinate.
     * 
     * @param {float[]} point A coordinate in array format (e.g., [pointX, pointY])
     * @returns {float} The y-coordinate of the point
     */
    getYFromPoint = (point) => {
        return point[1];
    }
}

export default TextureDrawer;