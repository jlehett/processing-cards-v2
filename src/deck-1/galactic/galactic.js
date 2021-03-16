import React, { Component } from 'react';
import p5 from 'p5';
import { StyleSheet, css } from 'aphrodite';
import Card from '../../components/card';

const CARD_WIDTH = 897;
const CARD_HEIGHT = 1497;

class Galactic extends Component {
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
            
            p.translate(0, 150);

            // Clears the background
			p.background('#050510');

			// Create circles, expanding outward with decreasing opacity
			p.noFill();
			p.strokeWeight(10);
			for (let i = 1; i < 50; i++) {
				let radius = 50 + 150 * i + 500;
				p.stroke(255*i, 255/i, 10*i, 255.0/i * 2.5);
				p.ellipse(p.width/2.0, p.height/2.0, radius, radius/4);
			}

            // Create center filled-in circle
			p.fill('#050510');
			p.stroke(255, 255, 10);
            p.strokeWeight(5);
			p.ellipse(p.width/2.0, p.height/2.0-180, 500, 500);

            p.fill('#050510');
            p.noStroke();
            p.ellipse(p.width/2.0, p.height/2.0, 50+150+500, (50+150+500)/4);

            p.stroke(255, 255, 10);
            p.strokeWeight(10);
            p.noFill();
            p.ellipse(p.width/2.0, p.height/2.0-180, 400, 400);

            p.noStroke();
            p.fill(255, 255, 10, 50);
            p.ellipse(p.width/2.0, p.height/2.0-180, 350, 350);

            p.fill(255, 255, 10);
            p.stroke('#050510');
            p.strokeWeight(10);
            p.ellipse(p.width/2.0, p.height/2.0-180, 50, 200);
		}

		// Called once per frame
		p.draw = () => {
		
		}

	}

    render() {
		return (
            <Card
                cardTitle='Galactic'
                pageBackground='#050510'
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

export default Galactic;