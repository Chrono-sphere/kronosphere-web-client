import React, { Component } from 'react';
import './TaskCard.css';

class TaskCard extends Component {

    constructor(props) {
        super(props);

        this.onResize();
    }

    onResize() {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
    }

    bindEvents() {
        this.card.addEventListener( 'mousedown', this.onMouseDown );
    	window.addEventListener( 'mouseup', this.onMouseUp );
    	window.addEventListener( 'mousemove', this.onMouseMove );
    	window.addEventListener( 'resize', this.onResize );
    }

    onMouseDown(event) {
        this.isMouseDown = true;
        this.mouseX = event.pageX;
        this.mouseY = event.pageY;

        this.pinX = this.cardWidth / 2; // pin to center
	    this.pinY = this.cardHeight / 2; // pin to center

        //pinx = mx - cardx; // pin to click point
	    //piny = my - cardy; // pin to click point

        this.pinxperc = 100 - ( this.pinX / this.cardWidth ) * 100; // transform based on the pin position
        this.pinyperc = 100 - ( this.pinY / this.cardHeight ) * 100; // transform based on the pin position
    }

    onMouseUp() {
        this.isMouseDown = false;
    }

    onMouseMove(event) {
        if(this.isMouseDown) {
            this.mouseX = event.pageX;
            this.mouseY = event.pageY;
        }
    }

    loop() {
        if(this == null) {
            return;
        }
        window.requestAnimationFrame( this.loop )

        // set new target position
        this.targetX = this.mouseX - this.cardX - this.pinX;
        this.targetY = this.mouseY - this.cardY - this.pinY;

        // lerp to new position
        this.cardX += this.targetX * 0.25;
        this.cardY += this.targetY * 0.25;

        // contain card to window bounds
        if( this.cardX < -this.cardWidth / 2 ) {
            this.cardX = -this.cardWidth / 2;
        }
        if( this.cardX > this.windowWidth - this.cardWidth / 2 ) {
            this.cardX = this.windowWidth - this.cardWidth / 2;
        }
        if( this.cardY < -this.cardHeight / 2 ) {
            this.cardY = -this.cardHeight / 2;
        }
        if( this.cardY > this.windowHeight - this.cardHeight / 2 ) {
            this.cardY = this.windowHeight - this.cardHeight / 2;
        }

        // get rotation based on how much card moved
        this.targetrx = ( this.ocardY - this.cardY - this.rx ) * 3;
        this.targetry = ( this.cardX - this.ocardX - this.ry ) * 3;

        // lock rotation so things don't get too crazy
        this.targetrx = Math.min( this.targetrx, 90 );
        this.targetrx = Math.max( this.targetrx, -90 );
        this.targetry = Math.min( this.targetry, 90 );
        this.targetry = Math.max( this.targetry, -90 );

        // lerp to new rotation
        this.rx += this.targetrx * 0.1;
        this.ry += this.targetry * 0.1;

        // scale up when the mouse is pressed
        this.targetscale = this.isMouseDown ? 1.2 - this.scale : 1 - this.scale;
        this.scale += this.targetscale * 0.2;

        // apply the transform
        this.card.style[ 'transform' ] = 'translate3d(' + this.cardX + 'px, ' + this.cardY + 'px, 0)';
        //image.style[ 'transform-origin' ] = pinxperc + '% ' + pinyperc + '%';
        //image.style[ 'transform' ] = 'scale(' + scale + ') rotateY(' + ry + 'deg) rotateX(' + rx + 'deg)';

        // store the old card position
        this.ocardX = this.cardX;
        this.ocardY = this.cardY;
    }

    render() {
        return (
            <div className="task-card">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/836/hearthstone-ragnaros.png" />
            </div>
        );
    }

    componentDidMount() {
        this.card = document.querySelector('.task-card');
        this.cardWidth = this.card.width;
        this.cardHeight = this.card.height;
        this.cardX = this.windowWidth / 2 - this.cardWidth / 2;
        this.cardY = this.windowHeight / 2 - this.cardHeight / 2;

        this.ocardX = this.cardX;
        this.ocardy = this.cardY;

        this.pinX = 0;
        this.pinY = 0;
        this.pinxperc = 0;
        this.pinyperc = 0;
        this.targetX = this.cardX;
        this.targetY = this.cardY;
        this.rx = 0;
        this.ry = 0;
        this.targetrx = 0;
        this.targetry = 0;
        this.scale = 1;
        this.targetscale = this.scale;
        this.isMouseDown = false;
        this.mouseX = this.cardX;
        this.mouseY = this.cardY;

        this.bindEvents();
        this.loop();
    }
}

export default TaskCard;
