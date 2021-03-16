import React, { Component } from 'react';
import p5 from 'p5';
import { StyleSheet, css } from 'aphrodite';
import Card from '../../components/card';
import lodash from 'lodash';

const CARD_WIDTH = 897;
const CARD_HEIGHT = 1497;

class Iced extends Component {
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
        const padding = 100;
        const boxSize = 40;
        const boxModifier = 40;
        const circleSize = 20;
        const numColumns = 20;
        const numRows = 30;
        const rotateChance = 0.05;
        const circleChance = 0.05;

        const background = '#edf2f4';
        const squares = '#2b2d42';
        const highlights = '#ef233c';
        const circles = '#ef233c';

		// Called once for initialization
		p.setup = () => {
			// Create the canvas to draw on
			p.createCanvas(CARD_WIDTH, CARD_HEIGHT);

            p.blendMode(p.DARKEST);

            p.rectMode(p.CENTER);
            p.background(background);
            p.noStroke();

            for (let x = 0; x < numColumns; x++) {
                for (let y = 0; y < numRows; y++) {
                    p.push();
                    const xCoord = p.map(x, 0, numColumns-1, padding, p.width-padding);
                    const yCoord = p.map(y, 0, numRows-1, padding, p.height-padding);
                    p.translate(xCoord, yCoord);

                    if (Math.random() > circleChance) {
                        let modifiedBoxSizeX = boxSize;
                        let modifiedBoxSizeY = boxSize;
                        p.noStroke();
                        if (Math.random() < rotateChance) {
                            p.fill(highlights + '50');
                            p.rotate(Math.random() * Math.PI);
                            modifiedBoxSizeX += Math.random() * boxModifier;
                            modifiedBoxSizeY += Math.random() * boxModifier;
                            p.rect(0, 0, modifiedBoxSizeX, modifiedBoxSizeY);
                        } else {
                            modifiedBoxSizeX -= Math.random() * boxModifier;
                            modifiedBoxSizeY -= Math.random() * boxModifier;
                            if (modifiedBoxSizeX < 0) {
                                modifiedBoxSizeX = 0;
                            }
                            if (modifiedBoxSizeY < 0) {
                                modifiedBoxSizeY = 0;
                            }
                            p.noStroke();
                            p.fill(squares);
                            p.rect(0, 0, modifiedBoxSizeX, modifiedBoxSizeY);
                        }
                        
                    } else {
                        p.stroke(circles);
                        p.strokeWeight(2);
                        p.fill(circles);
                        p.ellipse(0, 0, circleSize, circleSize);
                    }

                    p.pop();
                }
            }

            // Overlay
            p.blendMode(p.BLEND);
            p.rectMode(p.CORNER)
            
            for (let i = 0; i < 5; i++) {
                let y = p.map(i, 0, 4, 0, CARD_HEIGHT - CARD_HEIGHT / 5);
                if (i % 2 == 0) {
                    p.noFill();
                    p.noStroke();
                } else {
                    //p.stroke(squares + '85');
                    p.fill(background);
                }
                p.rect(-10, y, CARD_WIDTH+20, CARD_HEIGHT / 10);
            }
		}

		// Called once per frame
		p.draw = () => {

		}

	}

    render() {
		return (
            <Card
                cardTitle='Bit-Path'
                pageBackground='#ef233c'
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

export default Iced;