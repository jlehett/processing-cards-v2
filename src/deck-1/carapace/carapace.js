import React, { Component } from 'react';
import p5 from 'p5';
import { StyleSheet, css } from 'aphrodite';
import Card from '../../components/card';

const CARD_WIDTH = 897;
const CARD_HEIGHT = 1497;

class Carapace extends Component {
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

            p.background(0);

            p.translate(p.width/2, p.height/2)
            p.rotate(Math.PI/4.0);

            p.rectMode(p.CENTER);

            p.noFill();
            p.stroke(255);
            p.strokeWeight(20);
            p.rotate(Math.PI/4.0);
            p.rect(0, 0, 400, 400);

            for (let radius = 540; radius > 450; radius -= 20) {
                p.strokeWeight(5);
                p.fill(0);
                p.rotate(Math.PI/4.0);
                p.rect(0, 0, radius, radius);
            }

            p.noFill();
            p.stroke('#ffffff');
            p.strokeWeight(20);
            p.rect(0, 0, 200, 200);

            p.noStroke();
            p.fill(255);
            p.rect(0, 0, 25, 25);

            p.noFill();
            p.stroke(255);
            p.strokeWeight(10);
            
            for (let radius = 900; radius < 1100; radius += 90) {
                p.rect(0, 0, radius, radius);
            }


            for (let radius = 1300; radius < 1400; radius += 90) {
                p.rect(0, 0, radius, radius);
            }
		}

		// Called once per frame
		p.draw = () => {

		}

	}

    render() {
		return (
            <Card
                cardTitle='Carapace'
                pageBackground='#000000'
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

export default Carapace;