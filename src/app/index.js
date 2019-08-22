import React from 'react';
import './App.css';

var maskon = require('../art/maskon.png');
var fuckitmaskoff = require('../art/fuckitmaskoff.png');
var jetboard = require('../art/jetboard.png');

var mountain = require('../art/mountain.png');
var building1 = require('../art/building1.png');
var building2 = require('../art/building2.png');
var bit1 = require('../art/bit1.png');
var bit2 = require('../art/bit2.png');
var bit3 = require('../art/bit3.png');


class App extends React.Component {

  constructor(props)
  {
    super(props);
    this.state =
    {
      text:"hello world"
    }


  }

  componentDidMount()
  {

    console.log(window.location.hash);
    window.scrollTo(0,0);

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
      //bad for performance
      // el.style.filter = "brightness("+(((zPos+270)/320)*100)+"%)";
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

    console.log("doc1",document.documentElement.scrollLeft||document.body.scrollLeft);

    document.documentElement.scrollLeft = document.documentElement.scrollLeft - (delta * scrollSpeed);
    document.body.scrollLeft = document.body.scrollLeft - (delta * scrollSpeed);

    console.log("doc2",document.documentElement.scrollLeft||document.body.scrollLeft);

    let backgroundContainer = document.querySelector(".backgroundContainer");
    let children = backgroundContainer.children;


    if((document.documentElement.scrollLeft>0 || document.body.scrollLeft>0))
    {
      for(let child of children)
      {
        let childTransform = this.getTranslate(child);
        let newval = childTransform[0]+(delta*scrollSpeed);
        this.setTranslate(newval,childTransform[1],childTransform[2],child);
      }
    }

    if((document.documentElement.scrollLeft>600 || document.body.scrollLeft>600))
    {
      this.setState({
        text:"text3"
      });
    }
    else if((document.documentElement.scrollLeft>400 || document.body.scrollLeft>400))
    {
      this.setState({
        text:"text2"
      });
    }
    else if((document.documentElement.scrollLeft>200 || document.body.scrollLeft>200))
    {
      this.setState({
        text:"text1"
      });
    }
    else if((document.documentElement.scrollLeft<200 || document.body.scrollLeft<200))
    {
      this.setState({
        text:"text0"
      });
    }

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
                style={{height:"700px",
                        transform:`translate3d(${1700}px, ${40}px, ${40}px)`,
                        zIndex:'-1'}}
                src={building1}>
          </img>

          <img className="box"
               style={{height:"900px",
                       transform:`translate3d(${700}px, ${180}px, ${-90}px)`,
                       zIndex:'-2'}}
               src={building2}>
          </img>

          <img className="box"
               style={{height:"900px",
                       transform:`translate3d(${1500}px, ${200}px, ${-200}px)`,
                       zIndex:'-3'}}
                src={mountain}>
          </img>

          <img className="box"
               style={{height:"900px",
                       transform:`translate3d(${2000}px, ${100}px, ${-100}px)`,
                       zIndex:'-3'}}
                src={building1}>
          </img>

          <img className="box"
               style={{height:"900px",
                       transform:`translate3d(${2500}px, ${200}px, ${-100}px)`,
                       zIndex:'-3'}}
                src={building1}>
          </img>

          <img className="box"
               style={{height:"500px",
                       transform:`translate3d(${2500}px, ${100}px, ${-50}px)`,
                       zIndex:'0',
                     }}
               src={maskon}>
          </img>
        </div>


        <div className="foreground">
          {this.state.text}

        </div>

    </React.Fragment>
    );
  }

}

export default App;
