import _ from "lodash";

/**
 * Class to help with drawing creative lines.
 */
 class LineMaker {
    // Initialize by providing the processing context
    constructor(p) {
        this.p = p;
    }

    /**
     * Draws an accent line consisting of "chains" with different stroke weights.
     * 
     * @param {p5.Graphics} layer The p5 Graphics layer to draw on
     * @param {p5.Color} color The p5 color to use for the lines
     * @param {float} xStart The start of the line on the x-axis
     * @param {float} yStart The start of the line on the y-axis
     * @param {float} xEnd The end of the line on the x-axis
     * @param {float} yEnd The end of the line on the y-axis
     * @param {float} chainMinLengthFraction The minimum chain length from a scale of 0.0-1.0
     * @param {float} chainMaxLengthFraction The maximum chain length from a scale of 0.0-1.0
     * @param {integer[]} chainStrokeWeights An array of chain stroke weight options
     */
    accentLine(
        layer,
        color,
        xStart,
        yStart,
        xEnd,
        yEnd,
        chainMinLengthFraction,
        chainMaxLengthFraction,
        chainStrokeWeights,
    ) {
        // Set the stroke color
        layer.stroke(color);
        // Set the current progress as a fractional unit
        let progress = 0.0;
        // While the progress is less than 1.0, draw the chain
        while (progress < 1.0) {
            // Determine the maximum chain length that can be supported this iteration without exceeding 1.0 in progress
            let maxChainLengthForIteration = 1.0 - progress;
            // Grab a random value and map it to the min and max length fractions
            let randomVar = Math.random();
            let randomChainLength = this.p.map(randomVar, 0, 1, chainMinLengthFraction, chainMaxLengthFraction);
            // Set the chain length to the min of the randomChainLength and the maxChainLengthForIteration
            let chainLength = Math.min(maxChainLengthForIteration, randomChainLength);
            // Increment progress based on the chain length
            let prevProgress = progress;
            progress += chainLength;
            // Randomly select a strokeWeight from the array of options
            let randomStrokeWeight = _.sample(chainStrokeWeights);
            // Set the stroke weight for the drawing
            layer.strokeWeight(randomStrokeWeight);
            // Determine the points of the line for this iteration
            let x0 = this.p.map(prevProgress, 0, 1, xStart, xEnd);
            let y0 = this.p.map(prevProgress, 0, 1, yStart, yEnd);
            let x1 = this.p.map(progress, 0, 1, xStart, xEnd);
            let y1 = this.p.map(progress, 0, 1, yStart, yEnd);
            // Draw the line
            layer.line(x0, y0, x1, y1);
        }
    }
}

export default LineMaker;