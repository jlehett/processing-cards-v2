import React, { Component } from 'react';
import p5 from 'p5';
import { StyleSheet, css } from 'aphrodite';
import Card from '../../components/card';
import lodash from 'lodash';

const CARD_WIDTH = 897;
const CARD_HEIGHT = 1497;

class Void extends Component {
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
        const radiusOffset = Math.random(0.8) + 0.005;
        const minRadius = 50;
        const detail = Math.random(0.25) + 0.005;
        const noisiness = Math.random() * 2.0 + 1.0;
        const noiseScale2 = Math.random() * 1.0 + 0.8;
        const noiseScale3 = Math.random() * 200.0 + 1.0;
        const useMultiColor = lodash.sample([true, false]);
        const scale = 0.4;

        let paletteChoices = [
            ['#03045e', '#023e8a', '#0077b6', '#0096c7', '#00b4d8', '#48cae4', '#90e0ef', '#ade8f4', '#caf0f8'],
            ['#d8f3dc', '#b7e4c7', '#95d5b2', '#74c69d', '#52b788', '#40916c', '#2d6a4f', '#1b4332', '#081c15'],
            ['#2b2d42', '#8d99ae', '#edf2f4', '#ef233c', '#d90429'],
            ['#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd', '#6c757d', '#495057', '#343a40', '#212529'],
            ['#0b132b', '#1c2541', '#3a506b', '#5bc0be', '#6fffe9'],
            ['#1A3439', '#1F7F92', '#08DBF8', '#D1F3EF', '#F8A830'],
            ['#342E3E', '#7E827E', '#AAC6CC', '#DEE8E6', '#DCB0B7'],
            ['#464854', '#40807F', '#959CB9', '#FD3D66', '#9BF36C'],
        ];

        let colorChoices = lodash.sample(paletteChoices);
        const background = lodash.sample(colorChoices);
        lodash.remove(colorChoices, (item) => item === background);
        const center = lodash.sample(colorChoices);
        lodash.remove(colorChoices, (item) => item === center);
        const radii1 = lodash.sample(colorChoices);
        lodash.remove(colorChoices, (item) => item === radii1);
        const radii2 = lodash.sample(colorChoices);
        lodash.remove(colorChoices, (item) => item === radii2);

        function drawBlob(radius) {
            if (useMultiColor) {
                p.stroke(lodash.sample([radii1, radii2]) + '50');
            } else {
                p.stroke(radii1 + '50');
            }
            p.strokeWeight(2);
            p.noFill();
            let baseRadius = radius * radiusOffset + minRadius;

            p.beginShape();
            for (let theta = 0; theta < 2.0 * Math.PI; theta += detail) {
                let r1 = Math.cos(theta) + 1;
                let r2 = Math.sin(theta) + 1;
                let r = baseRadius + p.noise(r1*noiseScale2, r2*noiseScale2, radius/noiseScale3) * noisiness * radius;
                let x = 0 + r * Math.cos(theta);
                let y = 0 + r * Math.sin(theta);
                p.curveVertex(x*scale, y*scale);
            }
            p.endShape(p.CLOSE);
        }

		// Called once for initialization
		p.setup = () => {
			// Create the canvas to draw on
			p.createCanvas(CARD_WIDTH, CARD_HEIGHT);

            p.background(background);
            p.push();
            p.translate(p.width/2.0, p.height/2.0);

            for (let r = 0; r < 1000; r++) {
                drawBlob(r);
            }

            p.noFill();
            p.stroke(background);
            p.strokeWeight(20);
            for (let r = minRadius; r < minRadius + 2000; r += 150) {
                p.ellipse(0, 0, r, r);
            }

            p.pop();
		}

		// Called once per frame
		p.draw = () => {

		}

	}

    render() {
		return (
            <Card
                cardTitle='Void'
                pageBackground='#000011'
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

export default Void;