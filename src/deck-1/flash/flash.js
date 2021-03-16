import React, { Component } from 'react';
import p5 from 'p5';
import { StyleSheet, css } from 'aphrodite';
import Card from '../../components/card';
import lodash, { toInteger } from 'lodash';

const CARD_WIDTH = 897;
const CARD_HEIGHT = 1497;

class Flash extends Component {
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
        let numParticles = toInteger(Math.random() * 10000);
        let opacity = Math.random() * 50.0;
        let particleSize = 2;
        let xNoisiness = Math.random() * 0.05;
        let yNoisiness = 0.0;
        if (Math.random() > 0.5) {
            yNoisiness = xNoisiness;
        } else {
            yNoisiness = Math.random() * 0.05;
        }
        let randomNoisiness = Math.random() * 0.1;
        let padding = 20;
        let scale = 1.0;
        let time = 0.0;
        let speed = 0.005;

        let particles = [];

        let paletteChoices = [
            ['#03045e', '#023e8a', '#0077b6', '#0096c7', '#00b4d8', '#48cae4', '#90e0ef', '#ade8f4', '#caf0f8'],
            ['#d8f3dc', '#b7e4c7', '#95d5b2', '#74c69d', '#52b788', '#40916c', '#2d6a4f', '#1b4332', '#081c15'],
            ['#2b2d42', '#8d99ae', '#edf2f4', '#ef233c', '#d90429'],
            ['#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd', '#6c757d', '#495057', '#343a40', '#212529'],
            ['#0b132b', '#1c2541', '#3a506b', '#5bc0be', '#6fffe9'],
        ];
        let palette = lodash.sample(paletteChoices);

		// Called once for initialization
		p.setup = () => {
			// Create the canvas to draw on
			p.createCanvas(CARD_WIDTH, CARD_HEIGHT);

            if (Math.random() > 0.5) {
                p.background(255);
            } else {
                p.background(0);
            }

            // Create particles in the field
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: Math.random() * p.width,
                    y: Math.random() * p.height,
                    color: lodash.sample(palette),
                    randomNoise: Math.random() * randomNoisiness,
                });
            }
		}

		// Called once per frame
		p.draw = () => {
            time += speed;

            // Draw the particles
            for (let particle of particles) {
                let particleColor = p.color(particle.color);
                particleColor.setAlpha(opacity);
                p.stroke(particleColor);
                p.noFill();
                p.strokeWeight(particleSize);

                // Update the particles
                let direction = p.radians(p.noise(particle.x * xNoisiness, particle.y * yNoisiness, particle.randomNoise) * 360.0);
                let prevX = particle.x;
                let prevY = particle.y;
                particle.x += Math.sin(direction) * scale;
                particle.y += Math.cos(direction) * scale;

                if (particle.x < -padding || particle.y < -padding || particle.x > p.width+padding || particle.x > p.height+padding) {
                    if (particle.x < -padding) {
                        particle.x = p.width + padding;
                    }
                    if (particle.x > p.width+padding) {
                        particle.x = -padding;
                    }
                    if (particle.y < -padding) {
                        particle.y = p.height+padding;
                    }
                    if (particle.y > p.height+padding) {
                        particle.y = -padding;
                    }
                } else {
                    p.line(prevX, prevY, particle.x, particle.y);
                }
            }
		}
	}

    render() {
		return (
            <Card
                cardTitle='FLASH'
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

export default Flash;