import React, { Component } from 'react';
import p5 from 'p5';
import { StyleSheet, css } from 'aphrodite';
import Card from '../../components/card';
import Masker from '../../tools/masker';
import LineMaker from '../../tools/line-maker';
import { toInteger } from 'lodash';
import _ from 'lodash';

const CARD_WIDTH = 897;
const CARD_HEIGHT = 1497;

class Corporate extends Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
	}

    componentDidMount() {
		this.myP5 = new p5(this.Sketch, this.myRef.current);
	}

	// All of the sketch code resides in this function, which grabs a p5 reference
	// to allow us to call p5-specific methods.
	Sketch = (p) => {
        // Constants
        var CIRCLE_SIZE = 600;
        var TOWER_WIDTH = 200;
        var TOWER_HEIGHT = 1270;
        var OVERLAY_START_SIZE = 500;
        var CIRCLE_ROTATION = 0;
        var NUM_SPLOTCHES = toInteger(Math.random() * 20) + 2;
        var SPLOTCH_SIZE = p.map(Math.random(), 0, 1, 20, 80);
        var NUM_STARS = toInteger(Math.random() * 100);
        var MAX_STAR_SIZE = 10;
        var MIN_STAR_SIZE = 2;
        var NUM_STREAKS = toInteger(Math.random() * 40);
        var MAX_STREAK_SIZE = 30;
        var MIN_STREAK_SIZE = 20;
        var MIN_STREAK_ALPHA = 50;
        var MAX_STREAK_ALPHA = 255;
        var DOUBLED_LINE_WIDTH = 10;
        var DOUBLED_LINE_TRANSLATION = 125;
        var LEFT_TOWER_ACCENT_HEIGHT = p.map(Math.random(), 0, 1, 400, 900);
        var RIGHT_TOWER_ACCENT_HEIGHT = p.map(Math.random(), 0, 1, 400, 500);

        // Color choices
        var darkBackgroundChoices = ['#ffffff', '#000000'];
        // Randomized palettes
        var paletteChoices = [
            {
                name: 'Standard Contrast',
                backgroundChoices: [
                    '#fc0349', '#06d6a0', '#8338ec', '#2b9348', '#80ffdb', '#ff7f36', '#ff7f36', '#86ff36', '#36ff65', '#36ffbf',
                    '#36fffc', '#3640ff', '#ff36d3'
                ],
                towerChoices: ['#c6c6c6', '#938BA1'],
                circleBackgroundChoices: ['#0d0d0d', '#ffffff'],
                circleForegroundChoices: ['#ffffff']
            },
            {
                name: 'Colored Tower',
                backgroundChoices: [
                    '#0d0d0d', '#ffffff'
                ],
                towerChoices: [
                    '#fc0349', '#06d6a0', '#8338ec', '#2b9348', '#80ffdb', '#ff7f36', '#ff7f36', '#86ff36', '#36ff65', '#36ffbf',
                    '#36fffc', '#3640ff', '#ff36d3'
                ],
                circleBackgroundChoices: ['#ffffff'],
                circleForegroundChoices: ['#ffffff']
            },
            {
                name: 'Colored Tower w/ Colored Backgrounds',
                backgroundChoices: [
                    '#fc0349', '#06d6a0', '#8338ec', '#2b9348', '#80ffdb', '#ff7f36', '#ff7f36', '#86ff36', '#36ff65', '#36ffbf',
                    '#36fffc', '#3640ff', '#ff36d3'
                ],
                towerChoices: [
                    '#fc0349', '#06d6a0', '#8338ec', '#2b9348', '#80ffdb', '#ff7f36', '#ff7f36', '#86ff36', '#36ff65', '#36ffbf',
                    '#36fffc', '#3640ff', '#ff36d3'
                ],
                circleBackgroundChoices: ['#ffffff'],
                circleForegroundChoices: ['#ffffff'],
            }, 
        ]
        // Perfectly defined palettes
        var definedPalettes = [
            {
                name: 'Defined',
                backgroundChoices: ['#26408B'],
                towerChoices: ['#C2E7D9'],
                circleBackgroundChoices: ['#0D0221'],
                circleForegroundChoices: ['#26408B'],
                towerCenterChoices: ['#ffffff', '#26408B'],
                towerAccentChoices: ['#26408B'],
                textureChoices: ['#0d0221']
            },
            {
                name: 'Defined',
                backgroundChoices: ['#333745'],
                towerChoices: ['#C7EFCF', '#333745'],
                circleBackgroundChoices: ['#EEF5DB'],
                circleForegroundChoices: ['#FE5F55'],
                towerCenterChoices: ['#ffffff', '#FE5F55'],
                towerAccentChoices: ['#FE5F55', '#ffffff'],
                textureChoices: ['#E63462']
            },
            {
                name: 'Defined',
                backgroundChoices: ['#05668d'],
                towerChoices: ['#f0f3bd'],
                circleBackgroundChoices: ['#ffffff'],
                circleForegroundChoices: ['#c1121f'],
                towerCenterChoices: ['#ffffff', '#02c39a'],
                towerAccentChoices: ['#02c39a'],
                textureChoices: ['#02c39a', '#0d0d0d']
            },
            {
                name: 'Defined',
                backgroundChoices: ['#121212'],
                towerChoices: ['#292929'],
                circleBackgroundChoices: ['#121212'],
                circleForegroundChoices: ['#94FF41'],
                towerCenterChoices: ['#94FF41'],
                towerAccentChoices: ['#94FF41'],
                textureChoices: ['#292929', '#94FF41', '#092402'],
            },
        ];

        // Choose a palette
        if (Math.random() < 0.5) {
            var palette = _.sample(paletteChoices);
        } else {
            palette = _.sample(definedPalettes);
        }

        var tower = _.sample(palette.towerChoices);
        var background = _.sample(palette.backgroundChoices);
        var towerAccent = palette.towerAccentChoices ? _.sample(palette.towerAccentChoices) : background;
        var circleForeground = _.sample(palette.circleForegroundChoices);
        var circleBackground = _.sample(palette.circleBackgroundChoices);

        // Special setup for Standard Contrast w/ Colored Circle
        if (circleBackground === '#ffffff' && palette.name !== 'Defined') {
            if (palette.name === 'Colored Tower w/ Colored Backgrounds' || palette.name === 'Colored Tower') {
                circleForeground = tower;
            } else {
                circleForeground = background;
            }
        }

        // Randomly select either pure-white center tower piece, or matching the background
        var towerCenter = palette.towerCenterChoices ? _.sample(palette.towerCenterChoices) : null;
        if (Math.random() < 0.5 && !towerCenter) {
            towerCenter = '#ffffff';
        } else if (!towerCenter) {
            towerCenter = background;
        }

        var accent = null;
        if (p.lightness(background) < 90) {
            accent = '#ffffff';
        } else {
            accent = '#000000';
        }

        if (palette.name === 'Colored Tower' || palette.name === 'Colored Tower w/ Colored Backgrounds') {
            if (Math.random() < 0.5) {
                accent = tower;
            }
        }

        var texture = palette.textureChoices ? p.color(_.sample(palette.textureChoices)) : null;
        if (!texture) {
            if ((Math.random() < 0.5 && p.lightness(background) !== 100) || p.lightness(background) === 0) {
                texture = p.color('#ffffff');
            } else {
                texture = p.color('#000000');
            }
        }

        // Randomly make the background non-colored with a dark background
        if (Math.random() < 0.5 && palette.name !== 'Defined') {
            if (palette.name === 'Colored Tower') {
                texture = p.color(tower)
            } else {
                texture = p.color(background);
            }
            background = _.sample(darkBackgroundChoices);
        }

        // Log the palette
        console.log({
            name: palette.name,
            tower,
            background,
            circleForeground,
            circleBackground,
            texture,
            accent,
            towerCenter,
            towerAccent
        });

        // Create the Masker tool
        var masker = new Masker(p);

        // Create the LineMaker tool
        var lineMaker = new LineMaker(p);

		// Called once for initialization
		p.setup = () => {
	    	// Create the canvas to draw on
			p.createCanvas(CARD_WIDTH, CARD_HEIGHT);

            // Create the layers for the scene
            let bgLayer = p.createGraphics(CARD_WIDTH, CARD_HEIGHT);
            let bgTextureLayer = p.createGraphics(CARD_WIDTH, CARD_HEIGHT);
            let lowerBgLayer = p.createGraphics(CARD_WIDTH, CARD_HEIGHT);
            let bgAccentOverlay = p.createGraphics(CARD_WIDTH, CARD_HEIGHT);
            let bgAccentOverlay2 = p.createGraphics(CARD_WIDTH, CARD_HEIGHT);
            let bgCircleLayer = p.createGraphics(CIRCLE_SIZE, CIRCLE_SIZE);
            let towerLayer = p.createGraphics(CARD_WIDTH, CARD_HEIGHT);
            let lowerFgLayer = p.createGraphics(CARD_WIDTH, CARD_HEIGHT);

            // Draw the background layer
            drawBgLayer(bgLayer);
            drawBgTextureLayer(bgTextureLayer);
            drawLowerBgLayer(lowerBgLayer);
            drawBgAccentOverlay(bgAccentOverlay);
            drawBgAccentOverlay2(bgAccentOverlay2);
            drawBgCircleLayer(bgCircleLayer);
            drawTowerLayer(towerLayer);
            drawLowerFgLayer(lowerFgLayer);
		}

        function drawBgLayer(layer) {
            // Draw the initial background color
            layer.background(background);

            // Draw dark splotches in areas
            for (let i = 0; i < NUM_SPLOTCHES; i++) {
                // Determine the center splotch-zone
                let centerX = Math.random() * CARD_WIDTH;
                let centerY = Math.random() * CARD_HEIGHT;

                // Create 500 circles near that center point
                for (let j = 0; j < SPLOTCH_SIZE; j++) {
                    let x = centerX + p.randomGaussian(0, 150);
                    let y = centerY + p.randomGaussian(0, 150);
                    let circleSize = p.map(Math.random(), 0, 1, 100, 400);
                    texture.setAlpha(8);
                    layer.fill(texture);
                    layer.noStroke();
                    layer.ellipse(x, y, circleSize, circleSize);
                }
            }

            layer.filter(p.BLUR, 10);

            p.image(layer, 0, 0);
        }

        function drawBgTextureLayer(layer) {
            texture.setAlpha(p.map(Math.random(), 0, 1, 5, 30));
            // Draw accent lines on the background
            layer.translate(CARD_WIDTH/2, CARD_HEIGHT/2);
            layer.rotate(p.radians(45));
            for (let x = -CARD_WIDTH; x < CARD_WIDTH; x+= 5) {
                lineMaker.accentLine(
                    layer,
                    texture,
                    x,
                    CARD_HEIGHT,
                    x,
                    -CARD_HEIGHT,
                    0.1,
                    0.2,
                    [2, 4, 6, 8, 10],
                );
            }

            p.image(layer, 0, 0);
        }

        function drawBgAccentOverlay(layer) {
            // Create the masking layer
            let maskingLayer = p.createGraphics(CARD_WIDTH, CARD_HEIGHT);
            for (let y = 0; y < CARD_HEIGHT; y++) {
                let alpha = p.map(y, 0, CARD_HEIGHT-800, 255, 0);
                maskingLayer.strokeWeight(2);
                maskingLayer.stroke(0, 0, 0, alpha);
                maskingLayer.line(0, y, CARD_WIDTH, y);
            }

            // Draw some accent lines along the top
            layer.strokeWeight(5);
            if (p.red(texture) === 255) {
                layer.stroke(255, 255, 255, 100);
            } else {
                layer.stroke(0, 0, 0, 100);
            }
            layer.noFill();

            layer.push();
            layer.translate(CARD_WIDTH/2.0, 400);
            layer.rotate(Math.PI/4.0);
            layer.rectMode(p.CENTER);

            for (let i = 0; i < 3; i++) {
                layer.rect(0, 0, OVERLAY_START_SIZE+200*i, OVERLAY_START_SIZE+200*i);
            }
            layer.pop();

            // Draw the doubled-up lines
            layer.push();
            layer.translate(CARD_WIDTH/2.0, 400);

            layer.push();
            layer.rotate(Math.PI/4.0);
            layer.translate(0, -DOUBLED_LINE_TRANSLATION);
            layer.rect(0, -DOUBLED_LINE_WIDTH/2, CARD_WIDTH, DOUBLED_LINE_WIDTH);
            layer.pop();

            layer.push();
            layer.rotate(Math.PI/4.0*3.0);
            layer.translate(0, DOUBLED_LINE_TRANSLATION);
            layer.rect(0, -DOUBLED_LINE_WIDTH/2, CARD_WIDTH, DOUBLED_LINE_WIDTH);
            layer.pop();

            layer.push();
            layer.rotate(-Math.PI/4.0);
            layer.translate(0, DOUBLED_LINE_TRANSLATION);
            layer.rect(0, -DOUBLED_LINE_WIDTH/2, CARD_WIDTH, DOUBLED_LINE_WIDTH);
            layer.pop();

            layer.push();
            layer.rotate(-Math.PI/4.0*3.0);
            layer.translate(0, -DOUBLED_LINE_TRANSLATION);
            layer.rect(0, -DOUBLED_LINE_WIDTH/2, CARD_WIDTH, DOUBLED_LINE_WIDTH);
            layer.pop();

            // Mask the layer according to the masking layer
            let maskedLayer = masker.mask(layer, maskingLayer);

            // Draw the masked layer
            p.image(maskedLayer, 0, 0);
        }

        function drawBgAccentOverlay2(layer) {
            // Draw the doubled rectangle at the top
            layer.stroke(accent);
            layer.strokeWeight(4);
            layer.noFill();
            layer.rectMode(p.CENTER);

            layer.rect(CARD_WIDTH/2, 0, 10, 100, 20);

            // Draw lines on either side
            layer.push();
            layer.translate(CARD_WIDTH/2, -10);
            for (let drawOpt of [{ angle: 45, translate: 10, up: -50 }, { angle: -45, translate: -10, up: 50 }]) {
                layer.push();
                layer.strokeWeight(2);
                layer.rotate(p.radians(drawOpt.angle));
                layer.translate(drawOpt.translate, 0);
                layer.line(0, -10, 0, 100);
                layer.strokeWeight(6);
                layer.line(0, 50, 0, 100);
                layer.translate(drawOpt.up, 0);
                layer.line(0, 150, 0, 250);
                layer.strokeWeight(2);
                layer.line(0, 250, 0, 400);
                layer.strokeWeight(6);
                layer.line(0, 400, 0, 800);
                layer.pop();
            }
            layer.pop();

            // Draw the layer
            p.image(layer, 0, 0);
        }

        function drawBgCircleLayer(layer) {
            // Create the masking layer
            let maskingLayer = p.createGraphics(layer.width, layer.height);
            maskingLayer.background(0, 0, 0, 0);
            maskingLayer.noStroke();
            maskingLayer.fill(0, 0, 0, 255);
            maskingLayer.rectMode(p.CENTER);
            maskingLayer.translate(maskingLayer.width/2, maskingLayer.height/2);
            maskingLayer.ellipse(0, 0, layer.width, layer.height);

            // Create the textured background of the circle
            layer.background(circleBackground);
            layer.stroke(circleForeground + '05');
            layer.strokeWeight(1);
            layer.push();
            layer.translate(layer.width/2.0, layer.height/2.0);
            layer.rotate(CIRCLE_ROTATION);
            for (let i = 0; i < 200; i++) {
                for (let x = -layer.width/2; x < layer.width/2; x++) {
                    let y = p.noise(x/5, i*5) * (CIRCLE_SIZE * 2) - CIRCLE_SIZE/1.4 - 2*i + layer.height/2.0;
                    layer.line(x, layer.height, x, layer.height-y);
                }
            }
            layer.pop();
            layer.filter(p.BLUR, 2);

            // Create some "stars" in the background
            layer.noStroke();
            layer.fill(circleForeground);
            layer.rectMode(p.CENTER);
            for (let i = 0; i < NUM_STARS; i++) {
                let x = Math.random() * layer.width;
                let y = Math.random() * layer.height;
                let starSize = p.map(Math.random(), 0, 1, MIN_STAR_SIZE, MAX_STAR_SIZE);
                layer.ellipse(x, y, starSize, starSize);
            }

            // Draw some random white streaks in the background
            layer.noFill();
            layer.push();
            layer.translate(layer.width/2.0, layer.height/2.0);
            layer.rotate(CIRCLE_ROTATION);
            for (let i = 0; i < NUM_STREAKS; i++) {
                let alpha = p.map(Math.random(), 0, 1, MIN_STREAK_ALPHA, MAX_STREAK_ALPHA);
                let circleFg = p.color(circleForeground);
                circleFg.setAlpha(alpha);
                layer.stroke(circleFg);
                layer.strokeWeight(Math.random() * 4 + 1);
                let x = Math.random() * layer.width;
                let y = Math.random() * layer.height;
                let streakSize = p.map(Math.random(), 0, 1, MIN_STREAK_SIZE, MAX_STREAK_SIZE);
                layer.line(x-layer.width/2.0, y-layer.height/2.0, x-layer.width/2.0, y-layer.height/2.0+streakSize);
            }
            layer.pop();

            // Mask the layer according to the masking layer
            let maskedLayer = masker.mask(layer, maskingLayer);

            // Draw the masked layer
            p.push();
            p.rectMode(p.CENTER);
            p.translate(p.width/2 - layer.width/2, 400 - layer.height/2);
            p.image(maskedLayer, 0, 0);
            p.pop();
        }

        function drawTowerLayer(layer) {
            // Create the masking layer
            let maskingLayer = p.createGraphics(layer.width, layer.height);
            maskingLayer.background(0, 0, 0, 0);
            maskingLayer.noStroke();
            maskingLayer.fill(0, 0, 0, 255);
            maskingLayer.rectMode(p.CENTER);
            maskingLayer.translate(maskingLayer.width/2, maskingLayer.height/2);
            maskingLayer.rect(0, 130, TOWER_WIDTH, TOWER_HEIGHT);

            // Draw the tower
            layer.background(tower);
            
            // Draw the shading
            layer.push();
            layer.translate(layer.width/2, layer.height/2);
            layer.translate(0, 130);

            layer.fill(0, 0, 0, 50);
            layer.noStroke();
            layer.rect(0, -TOWER_HEIGHT/2, -TOWER_WIDTH, TOWER_HEIGHT);

            layer.fill(255, 255, 255, 150);
            layer.noStroke();
            layer.triangle(0, -TOWER_HEIGHT/2+120, 0, -TOWER_HEIGHT/2+80, TOWER_WIDTH/2-5, -TOWER_HEIGHT/2);

            // Create mini-masking layer for the triangle
            let miniGradientMask = p.createGraphics(TOWER_WIDTH/2, TOWER_HEIGHT);
            for (let x = 0; x < miniGradientMask.width; x++) {
                miniGradientMask.noFill();
                miniGradientMask.stroke(0, 0, 0, p.map(x, 0, miniGradientMask.width, 0, 200));
                miniGradientMask.line(x, 0, x, miniGradientMask.height);
            }

            let shadingTriangle = p.createGraphics(TOWER_WIDTH/2, TOWER_HEIGHT);
            shadingTriangle.fill(0, 0, 0, 100);
            shadingTriangle.noStroke();
            shadingTriangle.triangle(0, 0, 0, 80, TOWER_WIDTH/2, 120);

            let gradientTriangle = masker.mask(shadingTriangle, miniGradientMask);

            layer.image(gradientTriangle, -TOWER_WIDTH/2, -TOWER_HEIGHT/2);
            
            // Remove the shading at the top of the tower
            layer.fill(tower);
            layer.triangle(-TOWER_WIDTH/2+5, -TOWER_HEIGHT/2, 0, -TOWER_HEIGHT/2+80, TOWER_WIDTH/2-5, -TOWER_HEIGHT/2);
            layer.fill(255, 255, 255, 100);
            layer.triangle(-TOWER_WIDTH/2+5, -TOWER_HEIGHT/2, 0, -TOWER_HEIGHT/2+80, TOWER_WIDTH/2-5, -TOWER_HEIGHT/2);

            // Draw the diamond on the tower
            layer.push();
            layer.translate(0, -350);
            layer.rectMode(p.CENTER);
            layer.rotate(p.radians(45));
            layer.fill(towerCenter);
            layer.rect(0, 0, 30, 30);
            if (towerCenter !== '#ffffff') {
                layer.fill(255, 255, 255, 100);
                layer.rect(0, 0, 30, 30);
            }
            layer.pop();

            // Draw diamond on the right side of the tower
            let leftLayer = p.createGraphics(TOWER_WIDTH/2, TOWER_HEIGHT);
            let rightLayer = p.createGraphics(TOWER_WIDTH/2, TOWER_HEIGHT);

            leftLayer.stroke(0, 0, 0, 50);
            leftLayer.strokeWeight(8);
            leftLayer.noFill();
            leftLayer.rectMode(p.CENTER);
            leftLayer.push();
            leftLayer.translate(TOWER_WIDTH/2, TOWER_HEIGHT/2-350);
            leftLayer.rotate(p.radians(45));
            leftLayer.rect(0, 0, 40, 40);
            leftLayer.stroke(0, 0, 0, 50);
            leftLayer.rect(0, 0, 100, 100);
            leftLayer.pop();

            leftLayer.stroke(towerAccent);
            lineMaker.accentLine(
                leftLayer,
                p.color(towerAccent),
                TOWER_WIDTH/2-20, TOWER_HEIGHT-100,
                TOWER_WIDTH/2-20, LEFT_TOWER_ACCENT_HEIGHT,
                0.1, 0.2,
                [1, 2, 3, 4]
            );
            leftLayer.strokeWeight(2);
            leftLayer.line(TOWER_WIDTH/2-20, TOWER_HEIGHT-100, TOWER_WIDTH/2-10, TOWER_HEIGHT-90);
            lineMaker.accentLine(
                leftLayer,
                p.color(towerAccent),
                TOWER_WIDTH/2-10, TOWER_HEIGHT-90,
                0, TOWER_HEIGHT-10,
                0.1, 0.2,
                [1, 2, 3, 4]
            );
            leftLayer.translate(20, 10);
            lineMaker.accentLine(
                leftLayer,
                p.color(towerAccent),
                TOWER_WIDTH/2-10, TOWER_HEIGHT-90,
                0, TOWER_HEIGHT-10,
                0.1, 0.2,
                [1, 2, 3, 4]
            );

            rightLayer.stroke(255, 255, 255, 100);
            rightLayer.strokeWeight(8);
            rightLayer.noFill();
            rightLayer.rectMode(p.CENTER);
            rightLayer.push();
            rightLayer.translate(0, TOWER_HEIGHT/2-350);
            rightLayer.rotate(p.radians(45));
            rightLayer.rect(0, 0, 40, 40);
            rightLayer.stroke(255, 255, 255, 100);
            rightLayer.rect(0, 0, 100, 100);
            rightLayer.pop();

            rightLayer.stroke(towerAccent);
            rightLayer.strokeWeight(2);
            lineMaker.accentLine(
                rightLayer,
                p.color(towerAccent),
                20, TOWER_HEIGHT-100,
                20, RIGHT_TOWER_ACCENT_HEIGHT,
                0.1, 0.2,
                [1, 2, 3, 4]
            );
            rightLayer.strokeWeight(2);
            rightLayer.line(20, TOWER_HEIGHT-100, 10, TOWER_HEIGHT-90);
            lineMaker.accentLine(
                rightLayer,
                p.color(towerAccent),
                10, TOWER_HEIGHT-90,
                TOWER_WIDTH/2, TOWER_HEIGHT-10,
                0.1, 0.2,
                [1, 2, 3, 4]
            );
            rightLayer.translate(-20, 10);
            lineMaker.accentLine(
                rightLayer,
                p.color(towerAccent),
                10, TOWER_HEIGHT-90,
                TOWER_WIDTH/2, TOWER_HEIGHT-10,
                0.1, 0.2,
                [1, 2, 3, 4]
            );

            // Add the left and right layers to the tower
            layer.image(leftLayer, -TOWER_WIDTH/2, -TOWER_HEIGHT/2);
            layer.image(rightLayer, 0, -TOWER_HEIGHT/2);

            // Mask the layer according to the masking layer
            let maskedLayer = masker.mask(layer, maskingLayer);

            // Draw the masked layer
            p.image(maskedLayer, 0, 0);
        }

        function drawLowerFgLayer(layer) {
            if (p.red(texture) === 255) {
                layer.stroke(255);
            } else {
                layer.stroke(0);
            }
            layer.strokeWeight(2);
            for (let x = 0; x < layer.width; x++) {
                let y = p.noise(x/100) * 100;
                layer.line(x, layer.height, x, layer.height-y);
            }

            p.image(layer, 0, 0);
        }

        function drawLowerBgLayer(layer) {
            if (p.red(texture) === 255) {
                layer.stroke(255, 255, 255, 2);
            } else {
                layer.stroke(0, 0, 0, 5);
            }
            layer.strokeWeight(2);
            for (let i = 0; i < 50; i++) {
                for (let x = 0; x < layer.width; x++) {
                    let y = p.noise(x/100, i/20) * 1000 - 20*i;
                    layer.line(x, layer.height, x, layer.height-y);
                }
            }

            p.image(layer, 0, 0);
        }

		// Called once per frame
		p.draw = () => {

		}

	}

    render() {
		return (
            <Card
                cardTitle='CORPORATE'
                pageBackground='#000'
                cardContent={
                    <div
                        ref={this.myRef}
                        className={css(styles.card)}
                    />
                }
            />
		);
    }
}

const styles = StyleSheet.create({
    card: {
        zIndex: 1000
    }
});

export default Corporate;