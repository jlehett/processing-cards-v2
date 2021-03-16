/**
 * Class to help with masking layers with other layers created
 * via the p.createGraphics call.
 */
class Masker {
    // Initialize by providing the processing context
    constructor(p) {
        this.p = p;
    }

    /**
     * Takes in the content graphics object and the mask graphics
     * object, and masks the content with the mask.
     * 
     * @param {p5.Graphics} _content The content Graphics object
     * @param {p5.Graphics} _mask The mask Graphics object
     * @returns {p5.Image} The resulting masked image
     */
    mask(_content, _mask) {
        // Create the mask as an image
        let img = this.p.createImage(_mask.width, _mask.height);
        img.copy(_mask, 0, 0, _mask.width, _mask.height, 0, 0, _mask.width, _mask.height);

        // Convert _content from pg to image
        let contentImg = this.p.createImage(_content.width, _content.height);
        contentImg.copy(_content, 0, 0, _content.width, _content.height, 0, 0, _content.width, _content.height);
        
        // Create the mask
        contentImg.mask(img);
        
        // Return the masked image
        return contentImg;
    }
}

export default Masker;