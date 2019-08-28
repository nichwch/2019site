import React from 'react';
import './App.css';

var maskon = require('../art/maskon.png');
var fuckitmaskoff = require('../art/fuckitmaskoff.png');

var mountain = require('../art/mountain.png');
var building1 = require('../art/building1.png');
var building2 = require('../art/building2.png');
var building3 = require('../art/building3.png');
var building4 = require('../art/building4.png');
var oceanbackground = require('../art/oceanbackground.png');
var bit1 = require('../art/bit1.png');
var bit2 = require('../art/bit2.png');
var bit3 = require('../art/bit3.png');

const BLOG = "Blog";
const PROJECTS = "Projects";
const ABOUT = "About";
const ENTRY = "Nicholas Chen";

const BackgroundBox = (props) => {
  return (<div className="layerElement"
               style={{
                      left:props.left,
                      bottom:props.bottom,
                      }}
          >
            <div className="backgroundBox">
              <h1 className="titleText">
                {props.title}
              </h1>
              <h2 className="subTitle">
                [hover to expand]
              </h2>
            </div>
          </div>
          )
}


class App extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    return {
      title:ENTRY,
      surfer:maskon,
      content:(
        <React.Fragment>
          <p>Scroll to navigate.<br/>[HQ v4.0]</p>
          <p>
          The animations on this site aren't crazy, but if it's frying your computer go click here for a potato friendly version.
          </p>
          <p>find me:</p>
          <ul>
            <li><a href="">email</a></li>
          </ul>


        </React.Fragment>
      )
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
    let backgroundScrollSpeed = -1;

    document.documentElement.scrollLeft = document.documentElement.scrollLeft - (delta * scrollSpeed);
    document.body.scrollLeft = document.body.scrollLeft - (delta * scrollSpeed);

    let backgroundContainer = document.querySelector(".backgroundContainer");
    let children = backgroundContainer.children;




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

    // child = document.querySelector("#layer4");
    // childTransform = this.getTranslate(child);
    // newval = (document.documentElement.scrollLeft||document.body.scrollLeft)*backgroundScrollSpeed;
    // this.setTranslate(newval,childTransform[1],childTransform[2],child);

    // console.log("SCROLL",(document.documentElement.scrollLeft|| document.body.scrollLeft));

    if((document.documentElement.scrollLeft|| document.body.scrollLeft)<2000)
    {
      let childImage = document.querySelector("#nickImage");
      childImage.style.transform = `scaleX(-1) scale(${0.3})`;
      let nick = document.querySelector("#nick");

      childTransform = this.getTranslate(nick);
      let finalX = -450;
      this.setTranslate(finalX,childTransform[1],childTransform[2],nick);
    }

    if((document.documentElement.scrollLeft>2000 || document.body.scrollLeft>2000) && ((document.documentElement.scrollLeft|| document.body.scrollLeft)<3000))
    {

      child = document.querySelector("#nick");
      childTransform = this.getTranslate(child);

      //original transform is -450,530,-180

      //how far through the 1000 pixel transition zone we've gotten
      let progress = (((document.documentElement.scrollLeft|| document.body.scrollLeft) - 2000)/1000);
      // let finalX = window.innerWidth-(window.innerWidth * 0.65);
      // let newX = -450+progress * (finalX);
      // this.setTranslate(newX,childTransform[1],childTransform[2],child);


      let childImage = document.querySelector("#nickImage");
      let finalScale = 1;
      let newScale = 0.3 + (progress*finalScale);
      childImage.style.transform = `scaleX(-1) scale(${newScale})`;

    }

    if((document.documentElement.scrollLeft>3000 || document.body.scrollLeft>3000) && ((document.documentElement.scrollLeft|| document.body.scrollLeft)<7000))
    {
      let childImage = document.querySelector("#nickImage");
      childImage.style.transform = `scaleX(-1) scale(${1.3})`;
      let nick = document.querySelector("#nick");

      // childTransform = this.getTranslate(nick);
      // let finalX = window.innerWidth-(window.innerWidth * 0.65)-450;
      // this.setTranslate(finalX,childTransform[1],childTransform[2],nick);
    }

    if((document.documentElement.scrollLeft>6000 || document.body.scrollLeft>6000) && ((document.documentElement.scrollLeft|| document.body.scrollLeft)<7000))
    {

      child = document.querySelector("#nick");
      childTransform = this.getTranslate(child);

      //original transform is -450,530,-180

      //how far through the 1000 pixel transition zone we've gotten
      let progress = ((7000-(document.documentElement.scrollLeft|| document.body.scrollLeft))/1000);
      // let finalX = window.innerWidth-(window.innerWidth * 0.65);
      // let newX = -450+progress * (finalX);
      // this.setTranslate(newX,childTransform[1],childTransform[2],child);

      let childImage = document.querySelector("#nickImage");
      let finalScale = 1;
      let newScale = 0.3 + (progress*finalScale);
      childImage.style.transform = `scaleX(-1) scale(${newScale})`;
    }

    if((document.documentElement.scrollLeft|| document.body.scrollLeft)>7000)
    {
      let childImage = document.querySelector("#nickImage");
      childImage.style.transform = `scaleX(-1) scale(${0.3})`;
      let nick = document.querySelector("#nick");

      // childTransform = this.getTranslate(nick);
      // let finalX = -450;
      // this.setTranslate(finalX,childTransform[1],childTransform[2],nick);
    }





    //end
    //blog
    if((document.documentElement.scrollLeft>9000 || document.body.scrollLeft>9000))
    {
      this.setState({
        title:BLOG,
        surfer:maskon,
        content:(
          <React.Fragment>
            <p>Coming soon.</p>
            <p>For now, here's my <a href="https://medium.com/@nichwch">medium page</a></p>

          </React.Fragment>
        )
      });
    }

    //projects
    else if((document.documentElement.scrollLeft>7000 || document.body.scrollLeft>7000))
    {
      this.setState({
        title:PROJECTS,
        surfer:maskon,
        content:(
          <React.Fragment>
            <p>I love making things! Keep scrolling to see some projects I've made.</p>
            <p>Things I use:</p>
            <ul>
              <li>React (HTML5,CSS,JS,Redux,Router,Bootstrap)</li>
              <li>Node (AWS,Express,PostgreSQL)</li>
              <li>Unity (2D)</li>
              <li>Procreate</li>
            </ul>

          </React.Fragment>
        )
      });
    }
    //about page
    else if((document.documentElement.scrollLeft>3000 || document.body.scrollLeft>3000))
    {
      this.setState({
        title:ABOUT,
        surfer:fuckitmaskoff,
        content:(
          <React.Fragment>
            <p>That's me to the right! I don't really skateboard.</p>
            <p>I'm a sophomore at UC Davis studying CS and economics. There, I'm part of the PLASMA incubator,
            Model UN, and boxing club.</p>
            <p>I became interested in programming after making a videogame my junior
            year of high school. It's been my favorite hobby since. I especially love web programming,
            but harbor much curiosity towards backend development, machine learning, and
            game development as well.</p>
            <p>My favorite videogames are Super Mario Galaxy 2, Metal Gear Solid 5, and FTL. My taste in music
            is ever shifting - right now I'm impartial to Radiohead, 80s synth, and psychadelic rock. By the time
            anyone reads that it'll probably have changed. </p>

          </React.Fragment>
        )
      });
    }

    //start
    else if((document.documentElement.scrollLeft>0 || document.body.scrollLeft>0))
    {
      this.setState(this.getInitialState());
    }

  }

  render()
  {
    return (
      <React.Fragment>
      <div id="scrolling-wrapper" className="scrolling-wrapper">

      </div>

      <div className="contentLayer">

        <div className = "navContainer">
          <div className = "navEl" id="About">
            About
          </div>

          <div className = "navEl" id="About">
            Projects
          </div>

          <div className = "navEl" id="About">
            Blog
          </div>
        </div>

        <div className="mainBox">
          <h1 className="titleText">
            {this.state.title}
          </h1>
          <h2 className="subTitle">
            [hover to expand]
          </h2>
          <div className="content">
            {this.state.content}
          </div>
        </div>
      </div>

        <div className="backgroundContainer">


          {/*layer 1 (closest)*/}
          <div className="layer" id="layer1"
               style={{
                  transform:`translate3d(${0}px, ${0}px, ${40}px)`,
                  zIndex:'-2'}}
          >
              <img  className="layerElement"
                    style={{height:"700px",
                            filter:'brightness(80%)',
                            left:"600px"
                          }}
                    src={building1}>
              </img>
              <BackgroundBox left={800}
                             bottom={200}
                             title={this.state.title}

              />

              <BackgroundBox left={2300}
                             bottom={200}
                             title={this.state.title}

              />
          </div>

          {/*layer 2*/}
          <div className="layer" id="layer2"
               style={{
                       transform:`translate3d(${0}px, ${90}px, ${-90}px)`,
                       filter:'brightness(60%)',
                       zIndex:'-4'}}
          >
              <img className="layerElement"
                   style={{height:"800px",
                           left:"200px",
                           bottom:"-10px"
                           }}
                   src={building3}>
              </img>
              <BackgroundBox left={200}
                             bottom={200}
                             title={this.state.title}

              />
              <img className="layerElement"
                   style={{height:"800px",
                           left:"500px",
                           bottom:"-200px",
                           transform:"scaleX(-1)",
                           }}
                   src={building2}>
              </img>

              <BackgroundBox left={550}
                             bottom={0}
                             title={this.state.title}

              />

              <img className="layerElement"
                   style={{height:"800px",
                           left:"900px",
                           bottom:"-3px",
                           }}
                   src={building3}>
              </img>
              <img className="layerElement"
                   style={{height:"800px",
                           left:"2300px",
                           bottom:"-50px",
                           }}
                   src={building2}>
              </img>

              <BackgroundBox left={3100}
                             bottom={600}
                             title={this.state.title}

              />
              <BackgroundBox left={2950}
                             bottom={400}
                             title={this.state.title}

              />


          </div>

          {/*surfer*/}
          <div className="layer" id="nick"
               style={{
                      transform:`translate3d(${-450}px, ${570}px, ${-180}px)`,
                      filter:'brightness(100%)',
                      zIndex:'-6'}}
          >
              <img className="layerElement"
                   id="nickImage"
                   style={{height:"1000px",
                           left:"450px",
                           bottom:"400px",
                           transform:"scaleX(-1) scale(0.3)",
                           }}
                   src={this.state.surfer}>
              </img>
          </div>

          {/*layer 3*/}
          <div className="layer" id="layer3"
               style={{
                       transform:`translate3d(${0}px, ${180}px, ${-180}px)`,
                       filter:'brightness(40%)',
                       zIndex:'-8'}}
          >
              <img className="layerElement"
                   style={{height:"800px",
                           left:"400px",
                           bottom:"-150px",
                           transform:"scaleX(-1)",
                           }}
                   src={building3}>
              </img>
              <img className="layerElement"
                   style={{height:"800px",
                           left:"800px",
                           bottom:"-300px",
                           }}
                   src={building2}>
              </img>

              <BackgroundBox left={550}
                             bottom={0}
                             title={this.state.title}

              />
              <BackgroundBox left={450}
                             bottom={300}
                             title={this.state.title}

              />

              <img className="layerElement"
                   style={{height:"800px",
                           left:"1300px",
                           bottom:"-100px",
                           transform:"scaleX(-1)",
                           }}
                   src={building1}>
              </img>
              <img className="layerElement"
                   style={{height:"800px",
                           left:"2800px",
                           bottom:"-200px",
                           }}
                   src={building4}>
              </img>

              <img  className="layerElement"
                    style={{height:"700px",
                            filter:'brightness(80%)',
                            left:"3600px"
                          }}
                    src={building3}>
              </img>

              <img  className="layerElement"
                    style={{height:"700px",
                            filter:'brightness(80%)',
                            left:"4600px",
                            bottom:"-200px"
                          }}
                    src={building4}>
              </img>

              <img  className="layerElement"
                    style={{height:"700px",
                            filter:'brightness(80%)',
                            left:"5600px"
                          }}
                    src={building1}>
              </img>

              <img  className="layerElement"
                    style={{height:"700px",
                            filter:'brightness(80%)',
                            left:"6600px",
                            bottom:"-100px"
                          }}
                    src={building2}>
              </img>
          </div>

          <div className="layer" id="layer4"
               style={{
                      transform:`translate3d(${0}px, ${-1500}px, ${-900}px)`,
                      zIndex:'-10'}}
          >
                <img className="layerElement"
                     style={{height:"1000px",
                            transform:"scale(6)",
                            filter:""
                              // left:"450px",
                              // bottom:"400px",
                              // transform:"scaleX(-1) scale(0.3)",
                           }}
                     src={oceanbackground}>
                </img>
          </div>

        </div>






    </React.Fragment>
    );
  }

}



export default App;
