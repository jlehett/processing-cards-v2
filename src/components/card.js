import React, { Component } from 'react';
import p5 from 'p5';
import { StyleSheet, css } from 'aphrodite';
import { Typography } from '@material-ui/core';

class Card extends Component {
    render() {
		return (
            <div
                style={{ background: this.props.pageBackground }}
                className={css(styles.page)}
            >
                <Typography
                    variant='h2'
                    className={css(styles.title, styles.titleLeft)}
                >
                    {this.props.cardTitle}
                </Typography>

                <div className={css(styles.cardBorder)}>
                    {this.props.cardContent}
                </div>

                <Typography
                    variant='h2'
                    className={css(styles.title, styles.titleRight)}
                >
                    {this.props.cardTitle}
                </Typography>
            </div>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardBorder: {
        background: 'white',
        padding: '40px',
        borderRadius: '40px',
    },
    title: {
        color: 'white',
        fontWeight: '100',
        letterSpacing: '50px',
        textTransform: 'uppercase',
        width: '1497px',
        height: 0,
        textAlign: 'center',
    },
    titleLeft: {
        transform: 'rotate(-90deg) translate(50px, 200px)',
    },
    titleRight: {
        transform: 'rotate(90deg) translate(0, 200px)',
    },
});

export default Card;