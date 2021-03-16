import React, { Component } from 'react';
import p5 from 'p5';
import { StyleSheet, css } from 'aphrodite';
import Card from '../../components/card';
import TextureDrawer from '../../tools/texture-drawer';
import {Delaunay} from 'd3-delaunay';

const CARD_WIDTH = 897;
const CARD_HEIGHT = 1497;

class Test extends Component {
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
        // Settings for the card
        var NUM_POINTS = 100;

        // Create the tools for the card
        var textureDrawer = new TextureDrawer(p);

		// Called once for initialization
		p.setup = () => {
			// Create the canvas to draw on
			p.createCanvas(CARD_WIDTH, CARD_HEIGHT);

            p.background(255);

            // Create a random set of points in the card
            let points = [];
            for (let i = 0; i < NUM_POINTS; i++) {
                points.push([Math.random() * CARD_WIDTH, Math.random() * CARD_HEIGHT]);
            }

            // Get the delaunay triangulation
            let delaunay = Delaunay.from(points);
            let triangles = delaunay.trianglePolygons();

            for (let triangle of triangles) {
                let points = [triangle[0], triangle[1], triangle[2]];
                let config = {
                    dotBoxSize: Math.random() * 5 + 4,
                    dotSize: 4,
                    dotColor: p.color(0),
                    alternating: 'vertical',
                };

                if (config.dotBoxSize > 7) {

                } else {
                    textureDrawer.drawPolygon(
                        p,
                        points,
                        0,
                        p.color(0, 0, 0, 0),
                        'Dotted',
                        config
                    );
                }
            }

            triangles = delaunay.trianglePolygons();
            for (let triangle of triangles) {
                let points = [triangle[0], triangle[1], triangle[2]];
                p.stroke(0);
                p.noFill();
                p.strokeWeight(1);
                p.beginShape();
                for (let point of points) {
                    p.vertex(point[0], point[1]);
                }
                p.endShape(p.CLOSE);
            }

            //p.saveCanvas('download', '.png');
		}

		// Called once per frame
		p.draw = () => {

		}

	}

    render() {
		return (
            <Card
                cardTitle='Voyage'
                pageBackground='#010101'
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

export default Test;