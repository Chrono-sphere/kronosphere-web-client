import React, { Component } from 'react';
import './TaskCard.css';

class TaskCard extends Component {

    constructor(props) {
        super(props);

        this.onResize();
    }

    onResize() {
        console.log('In onResize()')
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;

        console.log('window.innerWidth: ', this.windowWidth);
        console.log('window.innerHeigt: ', this.windowHeight);
    }

    bindEvents() {
        this.card.addEventListener( 'mousedown', this.onMouseDown.bind(this) );
    	window.addEventListener( 'mouseup', this.onMouseUp.bind(this) );
    	window.addEventListener( 'mousemove', this.onMouseMove.bind(this) );
    	window.addEventListener( 'resize', this.onResize.bind(this) );
    }

    onMouseDown(event) {
        console.log('in onMouseDown()');

        this.isMouseDown = true;
        this.mouseX = event.pageX;
        this.mouseY = event.pageY;

        console.log('mouseX: ', this.mouseX);
        console.log('mouseY: ', this.mouseY);

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

        console.log('event x: ', event.pageX);
        console.log('event y: ', event.pageY);
        console.log('New mouse x: ', this.mouseX);
        console.log('New mouse y: ', this.mouseY);
    }

    loop() {
        requestAnimationFrame( this.loop.bind(this) )

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
        //this.card.style[ 'transform' ] = 'translate3d(' + this.cardX + 'px, ' + this.cardY + 'px, 0)';
        this.card.style[ 'transform-origin' ] = this.pinxperc + '% ' + this.pinyperc + '%';
        this.card.style[ 'transform' ] = 'translate3d(' + this.cardX + 'px, ' + this.cardY + 'px, 0) scale(' + this.scale + ') rotateY(' + this.ry + 'deg) rotateX(' + this.rx + 'deg)';

        this.majestyvoltarget = this.isMouseDown ? 0.2 : 0;
        this.majestyvol += ( this.majestyvoltarget - this.majestyvol ) * 0.1;
        this.majesty.volume = this.majestyvol;

        this.whooshvoltarget = ( Math.abs( ( this.ocardY - this.cardY ) ) + Math.abs( ( this.ocardX - this.cardX ) ) ) * 0.003;
        this.whooshvol += ( this.whooshvoltarget - this.whooshvol ) * 0.1;
        this.whoosh.volume = Math.min( this.whooshvol, 1 );

        // store the old card position
        this.ocardX = this.cardX;
        this.ocardY = this.cardY;
    }

    render() {
        return (
            <div className="task-card">
                <div class="row">
                      <div class="card">
                        <div class="card-image">
                          <img src="https://picsum.photos/300/200" />
                          <span class="card-title">Card Title</span>
                          <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">edit</i></a>
                        </div>
                        <div class="card-content">
                          <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
                        </div>
                    </div>
                  </div>
            </div>
        );
    }

    componentDidMount() {
        console.log('In componentDidMount()');

        this.card = document.querySelector('.task-card');
        this.cardWidth = this.card.clientWidth;
        this.cardHeight = this.card.clientHeight;
        this.cardX = this.windowWidth / 2 - this.cardWidth / 2;
        this.cardY = this.windowHeight / 2 - this.cardHeight / 2;

        console.log('card width: ', this.cardWidth);
        console.log('card height: ', this.cardHeight);
        console.log('cardX: ', this.cardX);
        console.log('cardY: ', this.cardY);


        this.ocardX = this.cardX;
        this.ocardY = this.cardY;

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
        this.audioLoaded = 0;

        this.whooshvol = 0;
    	this.whooshvoltarget = 0;
    	this.whoosh = new Audio();
    	//this.whoosh.addEventListener( 'canplaythrough', this.audioload );
    	this.whoosh.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/836/hs-whoosh.ogg';
    	this.whoosh.volume = 0;
    	this.whoosh.loop = true;

    	this.majestyvol = 0;
    	this.majestyvoltarget = 0;
    	this.majesty = new Audio();
    	//this.majesty.addEventListener( 'canplaythrough', this.audioload );
    	this.majesty.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/836/hs-majesty.ogg';
    	this.majesty.volume = 0;
    	this.majesty.loop = true;

        this.audioLoad();
    }

    audioLoad() {

        console.log('In audioLoad()');

        this.majesty.play();
        this.whoosh.play();
        this.bindEvents();
        this.loop();
    }
}

export default TaskCard;
