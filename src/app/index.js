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
    let backgroundScrollSpeed = -0.2

    document.documentElement.scrollLeft = document.documentElement.scrollLeft - (delta * scrollSpeed);
    document.body.scrollLeft = document.body.scrollLeft - (delta * scrollSpeed);

    let backgroundContainer = document.querySelector(".backgroundContainer");
    let children = backgroundContainer.children;


    if((document.documentElement.scrollLeft>0 || document.body.scrollLeft>0))
    {
      // for(let child of children)
      // {
      //   let childTransform = this.getTranslate(child);
      //   let newval = childTransform[0]+(delta*backgroundScrollSpeed);
      //   this.setTranslate(newval,childTransform[1],childTransform[2],child);
      // }
      let child = document.querySelector("#layer1");
      let childTransform = this.getTranslate(child);
      let newval = (document.documentElement.scrollLeft||document.body.scrollLeft)*backgroundScrollSpeed;
      this.setTranslate(newval,childTransform[1],childTransform[2],child);

      child = document.querySelector("#layer2");
      childTransform = this.getTranslate(child);
      newval = (document.documentElement.scrollLeft||document.body.scrollLeft)*backgroundScrollSpeed;
      this.setTranslate(newval,childTransform[1],childTransform[2],child);

      child = document.querySelector("#layer3");
      childTransform = this.getTranslate(child);
      newval = (document.documentElement.scrollLeft||document.body.scrollLeft)*backgroundScrollSpeed;
      this.setTranslate(newval,childTransform[1],childTransform[2],child);

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

      </div>
      {/*<div className="contentLayer">
      </div>*/}
        <div className="backgroundContainer">


          {/*layer 1 (closest)*/}
          <div className="layer" id="layer1"
               style={{
                  transform:`translate3d(${0}px, ${0}px, ${40}px)`,
                  zIndex:'-1'}}
          >
              <img  className="layerElement"
                    style={{height:"700px",
                            filter:'brightness(80%)',
                            left:"600px"
                          }}
                    src={building1}>
              </img>
          </div>

          {/*layer 2*/}
          <div className="layer" id="layer2"
               style={{
                       transform:`translate3d(${0}px, ${90}px, ${-90}px)`,
                       filter:'brightness(60%)',
                       zIndex:'-2'}}
          >
              <img className="layerElement"
                   style={{height:"800px",
                           left:"200px",
                           bottom:"-10px"
                           }}
                   src={building2}>
              </img>
              <img className="layerElement"
                   style={{height:"800px",
                           left:"500px",
                           bottom:"-200px",
                           transform:"scaleX(-1)",
                           }}
                   src={building2}>
              </img>
              <img className="layerElement"
                   style={{height:"800px",
                           left:"900px",
                           bottom:"-3px",
                           }}
                   src={building2}>
              </img>
          </div>

          {/*layer 3*/}
          <div className="layer" id="layer3"
               style={{
                       transform:`translate3d(${0}px, ${180}px, ${-180}px)`,
                       filter:'brightness(40%)',
                       zIndex:'-3'}}
          >
              <img className="layerElement"
                   style={{height:"800px",
                           left:"400px",
                           bottom:"-150px",
                           transform:"scaleX(-1)",
                           }}
                   src={building1}>
              </img>
              <img className="layerElement"
                   style={{height:"800px",
                           left:"800px",
                           bottom:"-300px",
                           }}
                   src={building2}>
              </img>
              <img className="layerElement"
                   style={{height:"800px",
                           left:"1300px",
                           bottom:"-100px",
                           transform:"scaleX(-1)",
                           }}
                   src={building1}>
              </img>
          </div>


          {/*layer 4 (background, does not move)*/}





          {/*
          <img className="layer"
               style={{height:"500px",
                       transform:`translate3d(${2500}px, ${100}px, ${-50}px)`,
                       zIndex:'0',
                     }}
               src={maskon}>
          </img>*/}
        </div>


        <div className="foreground">
          {this.state.text}

        </div>

    </React.Fragment>
    );
  }

}

export default App;
