import React, { Component } from 'react';
import p5 from 'p5';
import { StyleSheet, css } from 'aphrodite';
import Card from '../components/card';

const CARD_WIDTH = 897;
const CARD_HEIGHT = 1497;

class CardPage extends Component {
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

		// Called once for initialization
		p.setup = () => {
			// Create the canvas to draw on
			p.createCanvas(CARD_WIDTH, CARD_HEIGHT);
		}

		// Called once per frame
		p.draw = () => {
			// Clears the background
			p.background('#111115');

			// Create center filled-in circle
			p.fill(255);
			p.noStroke();
			p.ellipse(p.width/2.0, p.height/2.0, 50, 50);

			// Create circles, expanding outward with decreasing opacity
			p.noFill();
			p.strokeWeight(10);
			for (let i = 1; i < 10; i++) {
				let radius = 50 + 70 * i;
				p.stroke(255, 255, 255, 255.0 / i);
				p.ellipse(p.width/2.0, p.height/2.0, radius, radius);
			}
		}

	}

    render() {
		return (
            <Card
                cardTitle='Template'
                pageBackground='#101050'
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

export default CardPage;