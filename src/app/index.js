import React from 'react';
import './App.css';

var maskon = require('../art/maskon.png');
var fuckitmaskoff = require('../art/fuckitmaskoff.png');
var mountain1 = require('../art/mountain1.png');
var mountain2 = require('../art/mountain2.png');
var jetboard = require('../art/jetboard.png');

class App extends React.Component {

  constructor(props)
  {
    super(props)

  }

  componentDidMount()
  {

    var throttle = function(type, name, obj) {
        var obj = obj || window;
        var running = false;
        var func = function(e) {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                var event = new CustomEvent(name);
                event.deltaX = e.deltaX;
                event.deltaY = e.deltaY;
                obj.dispatchEvent(event);
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };
    throttle ("wheel", "optimizedScroll");

    window.addEventListener('optimizedScroll',this.handleScroll,
      {
        passive: true
      }
    );
  }

  setTranslate = (xPos, yPos, zPos,el) => {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px,"+zPos+"px)";
  }

  getTranslate = (el) => {
    var transf = el.style.transform;
    // transf = "translate3d(15px, 17px, 19px)";
    var first = transf.indexOf("(");
    var second = transf.indexOf(",");
    var third = transf.indexOf(",",second+1);

    var x = transf.substring(first+1,transf.indexOf("px",first));
    var y = transf.substring(second+1,transf.indexOf("px",second));
    var z = transf.substring(third+1,transf.indexOf("px",third));

    var preres = [x,y,z];
    var res = [parseInt(x),parseInt(y),parseInt(z)];

    return [parseInt(x),parseInt(y),parseInt(z)];
  }

  handleScroll = (e) =>
  {
    var delta;
    if(Math.abs(e.deltaY)>Math.abs(e.deltaX))
    {
      delta = e.deltaY;
    }
    else
    {
      delta = e.deltaX;
    }
    delta = e.deltaY;
    let scrollSpeed = -0.5;
    let scrollspeed_background1 = -0.5;
    let scrollspeed_background2 = -0.5;

    document.documentElement.scrollLeft -= (delta * scrollSpeed);
    document.body.scrollLeft -= (delta * scrollSpeed);

    const background1 = document.querySelector(".background1");

    const background2 = document.querySelector(".background2");

    console.log(background1.style.transform);
    let background1transf = this.getTranslate(background1);
    let newval1 = ((document.documentElement.scrollLeft||document.body.scrollLeft) * scrollspeed_background1);
    this.setTranslate(newval1,background1transf[1],background1transf[2],background1);

    let background2transf = this.getTranslate(background2);
    let newval2 = ((document.documentElement.scrollLeft||document.body.scrollLeft) * scrollspeed_background2);
    this.setTranslate(newval2,background2transf[1],background2transf[2],background2);

  }

  render()
  {
    return (
      <React.Fragment>
      <div id="scrolling-wrapper" className="scrolling-wrapper">
        <div className="transparent">
        Nicholas Chen<br/>
        cs@ucd

        </div>
      </div>
        <div className="backgroundContainer">
          <div className="background1" style={{transform:`translate3d(${0}px, ${20}px, ${-20}px)`}}>
            <img className="box" style={{height:"500px",transform:`translate3d(${500}px, ${0}px, ${0}px)`}} src={mountain1}>
            </img>

            <img className="box" style={{height:"400px",transform:`translate3d(${1700}px, ${0}px, ${0}px)`}} src={mountain1}>
            </img>
          </div>

          <div className="background2" style={{transform:`translate3d(${0}px, ${250}px, ${-200}px)`}}>
            <img className="box" style={{height:"700px",transform:`translate3d(${700}px, ${0}px, ${0}px)`}} src={mountain2}>
            </img>

            <img className="box" style={{height:"500px",transform:`translate3d(${1500}px, ${0}px, ${0}px)`}} src={mountain2}>
            </img>

          </div>
        </div>


        <div className="foreground">
          <img className="box" style={{height:"500px"}} src={maskon}>
          </img>
        </div>

    </React.Fragment>
    );
  }

}

export default App;
