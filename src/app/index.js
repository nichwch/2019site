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
      el.style.zIndex = zPos;
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

    document.documentElement.scrollLeft -= (delta * scrollSpeed);
    document.body.scrollLeft -= (delta * scrollSpeed);


    let backgroundContainer = document.querySelector(".backgroundContainer");
    let children = backgroundContainer.children;

    console.log("doc",document.documentElement.scrollLeft||document.body.scrollLeft);
    if((document.documentElement.scrollLeft>0 || document.body.scrollLeft>0))
    {
      for(let child of children)
      {
        let childTransform = this.getTranslate(child);
        let newval = childTransform[0]+(delta*scrollSpeed);
        this.setTranslate(newval,childTransform[1],childTransform[2],child);
      }
    }

    // let newval1 = ((document.documentElement.scrollLeft||document.body.scrollLeft) * scrollspeed_background1);
    // this.setTranslate(newval1,background1transf[1],background1transf[2],background1);
    //
    // let background2transf = this.getTranslate(background2);
    // let newval2 = ((document.documentElement.scrollLeft||document.body.scrollLeft) * scrollspeed_background2);
    // this.setTranslate(newval2,background2transf[1],background2transf[2],background2);

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
          <img className="box"
               style={{height:"500px",
                       transform:`translate3d(${500}px, ${20}px, ${30}px)`,
                       zIndex:'-1',
                        }}
               src={mountain1}>
          </img>

          <img className="box"
                style={{height:"400px",
                        transform:`translate3d(${1700}px, ${0}px, ${40}px)`,
                        zIndex:'-1',}}
                src={mountain1}>
          </img>

          <img className="box"
               style={{height:"700px",
                       transform:`translate3d(${700}px, ${90}px, ${-90}px)`,
                       zIndex:'-2',}}
               src={mountain2}>
          </img>

          <img className="box"
               style={{height:"500px",
                       transform:`translate3d(${1500}px, ${100}px, ${-100}px)`,
                       zIndex:'-3',}}
                src={mountain2}>
          </img>

          <img className="box"
               style={{height:"500px",
                       transform:`translate3d(${2000}px, ${100}px, ${-100}px)`,
                       zIndex:'-3',}}
                src={mountain2}>
          </img>

          <img className="box"
               style={{height:"500px",
                       transform:`translate3d(${2500}px, ${100}px, ${-100}px)`,
                       zIndex:'-3',}}
                src={mountain2}>
          </img>
        </div>


        <div className="foreground">
          <img className="box"
               style={{height:"500px"}} src={maskon}>
          </img>
        </div>

    </React.Fragment>
    );
  }

}

export default App;
