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
    window.addEventListener('wheel',this.handleScroll,
      {
        passive: true
      }
    );
  }

  // setTranslate = (xPos, yPos, el) => {
  //     el.style.transform = "translate3d(" + xPos + ", " + yPos + "px, 0)";
  // }
  //
  // getTranslate = (el) => {
  //   var transf = el.style.transform;
  //   transf = "translate3d(0px, 0px, 0px)";
  //   var first = transf.indexOf("(");
  //   var second = transf.indexOf(",");
  //   var third = transf.indexOf(",",second);
  //
  //
  //   console.log(third);
  //   var x = transf.substring(first+1,transf.indexOf("px",first));
  //   var y = transf.substring(second+1,transf.indexOf("px",second));
  //   var z = transf.substring(third+1,transf.indexOf("px",third));
  //
  //   var preres = [x,y,z];
  //   console.log(preres);
  //   var res = [parseInt(x),parseInt(y),parseInt(z)];
  //   console.log(res);
  //
  //   return [parseInt(x),parseInt(y),parseInt(z)];
  // }

  handleScroll = (e) =>
  {
    e = window.event || e;
    var delta;
    if(Math.abs(e.deltaY)>Math.abs(e.deltaX))
    {
      delta = e.deltaY;
    }
    else
    {
      delta = e.deltaX;
    }
    var scrollSpeed = -0.5;
    var scrollspeed_background1 = -1;
    var scrollspeed_background2 = -0.5;

    document.documentElement.scrollLeft -= (delta * scrollSpeed);
    document.body.scrollLeft -= (delta * scrollSpeed);

    const background1 = document.querySelector(".background1");
    background1.style.left = `${(document.documentElement.scrollLeft * scrollspeed_background1)+0}px`;

    const background2 = document.querySelector(".background2");
    background2.style.left = `${(document.documentElement.scrollLeft * scrollspeed_background2)+0}px`;


    // window.requestAnimationFrame(this.handleScroll);
  }

  render()
  {
    return (
      <React.Fragment>
        <div className="background1" style={{transform:`translate3d(${0}px, ${0}px, 0)`}}>
          <img className="box">
          </img>

          <img className="box" style={{height:"500px"}} src={mountain1}>
          </img>
        </div>

        <div className="background2" style={{left:"0px"}}>
          <img className="box" style={{height:"1000px"}} src={mountain2}>
          </img>

          <img className="box" style={{height:"800px"}} src={mountain2}>
          </img>

        </div>
        <div className="foreground">
          <img className="box" style={{height:"500px"}} src={maskon}>
          </img>
        </div>
        <div id="scrolling-wrapper" className="scrolling-wrapper">
          <div className="transparent">
          Nicholas Chen<br/>
          cs@ucd

          </div>
        </div>
    </React.Fragment>
    );
  }

}

export default App;
