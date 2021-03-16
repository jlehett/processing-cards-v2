import React, { Component } from 'react';
import p5 from 'p5';
import { StyleSheet, css } from 'aphrodite';
import Card from '../../components/card';
import lodash from 'lodash';
import rwc from 'random-weighted-choice';

const CARD_WIDTH = 897;
const CARD_HEIGHT = 1497;

class Script extends Component {
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
        const numRows = 60;
        const paddingTop = 13;
        const paddingBottom = 13;
        const paddingLeft = 1;
        const paddingRight = 1;
        const wordSpacing = 100;
        const wordLengthChoices = [25, 50, 75, 100, 125, 150, 175, 200];
        const chanceOfNoRender = 0.00;
        const chanceOfEnding = 0.0;
        const rowHeight = 20;
        const wordRadius = 40;

        const colorChoices = ['#03071e', '#370617', '#6a040f', '#9d0208', '#d00000', '#dc2f02', '#e85d04', '#f48c06', '#faa307', '#ffba08'];
        const background = lodash.sample(colorChoices);
        lodash.remove(colorChoices, (item) => item === background);
        const c1 = lodash.sample(colorChoices);
        lodash.remove(colorChoices, (item) => item === c1);
        const c2 = lodash.sample(colorChoices);
        lodash.remove(colorChoices, (item) => item === c2);
        const c3 = lodash.sample(colorChoices);
        lodash.remove(colorChoices, (item) => item === c3);
        const c4 = lodash.sample(colorChoices);
        lodash.remove(colorChoices, (item) => item === c4);
        const c5 = lodash.sample(colorChoices);
        lodash.remove(colorChoices, (item) => item === c5);
        const c6 = lodash.sample(colorChoices);
        lodash.remove(colorChoices, (item) => item === c6);

        const theme = [
            { weight: 3, id: c1},
            { weight: 2, id: c2},
            { weight: 2, id: c3},
            { weight: 2, id: c4},
            { weight: 2, id: c5},
            { weight: 0.5, id: c6},
        ];

        // Function to get y coordinate given a row number, the number of rows total, and any padding values
        function getRowPosition(rowNumber) {
            return p.map(rowNumber, 1, numRows, paddingTop, p.height-paddingBottom) - rowHeight / 2.0;
        }

        // Draw a code row
        function drawCodeRow(yCoordinate) {
            let currentX = paddingLeft;
            while (Math.random() > chanceOfEnding) {
                let wordLength = lodash.sample(wordLengthChoices);
                let wordColor = rwc(theme);
                p.noStroke();
                p.fill(wordColor);
                if (currentX + wordLength > p.width - paddingRight) {
                    if (currentX < p.width - paddingRight) {
                        p.rect(currentX, yCoordinate, p.width-paddingRight-currentX, rowHeight, wordRadius);
                    }
                    break;
                }
                if (Math.random() > chanceOfNoRender) {
                    p.rect(currentX, yCoordinate, wordLength, rowHeight, wordRadius);
                }
                currentX += wordLength + wordSpacing;
            }
        }

		// Called once for initialization
		p.setup = () => {
			// Create the canvas to draw on
			p.createCanvas(CARD_WIDTH, CARD_HEIGHT);

            // Clear background
            p.background(background);

            // We want to draw lines of pseudo-code
            for (let rowNumber = 1; rowNumber <= numRows; rowNumber++) {
                p.stroke(255);
                p.noFill();
                p.strokeWeight(5);
                let y = getRowPosition(rowNumber, 15, 50, 50);
                drawCodeRow(y);
            }
		}

		// Called once per frame
		p.draw = () => {

		}

	}

    render() {
		return (
            <Card
                cardTitle='Hazard'
                pageBackground='#260812'
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

export default Script;