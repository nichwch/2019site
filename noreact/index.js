console.log(window.location.hash);
window.scrollTo(0,0);

const layer1 = document.getElementById("layer1");
const layer2 = document.getElementById("layer2");
const layer3 = document.getElementById("layer3");
const nickImage = document.getElementById("nickImage");
const nick = document.getElementById("nick");


const setTranslate = (xPos, yPos, zPos,el) => {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px,"+zPos+"px)";
    //bad for performance
    // el.style.filter = "brightness("+(((zPos+270)/320)*100)+"%)";
}

const getTranslate = (el) => {
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

const handleScroll = (e) =>
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
  let backgroundScrollSpeed = -0.5;

  document.documentElement.scrollLeft = document.documentElement.scrollLeft - (delta * scrollSpeed);
  document.body.scrollLeft = document.body.scrollLeft - (delta * scrollSpeed);


  let childTransform;
  let newval;

  childTransform = getTranslate(layer1);
  newval = (document.documentElement.scrollLeft||document.body.scrollLeft)*backgroundScrollSpeed;
  setTranslate(newval,childTransform[1],childTransform[2],layer1);

  childTransform = getTranslate(layer2);
  newval = (document.documentElement.scrollLeft||document.body.scrollLeft)*backgroundScrollSpeed;
  setTranslate(newval,childTransform[1],childTransform[2],layer2);


  childTransform = getTranslate(layer3);
  newval = (document.documentElement.scrollLeft||document.body.scrollLeft)*backgroundScrollSpeed;
  setTranslate(newval,childTransform[1],childTransform[2],layer3);

  // console.log("SCROLL",(document.documentElement.scrollLeft|| document.body.scrollLeft));

  if((document.documentElement.scrollLeft|| document.body.scrollLeft)<2000)
  {
    nickImage.style.transform = `scaleX(-1) scale(${0.3})`;
  }

  if((document.documentElement.scrollLeft>2000 || document.body.scrollLeft>2000) && ((document.documentElement.scrollLeft|| document.body.scrollLeft)<3000))
  {
    childTransform = getTranslate(nick);

    //original transform is -450,530,-180

    //how far through the 1000 pixel transition zone we've gotten
    let progress = (((document.documentElement.scrollLeft|| document.body.scrollLeft) - 2000)/1000);
    // let finalX = window.innerWidth-(window.innerWidth * 0.65);
    // let newX = -450+progress * (finalX);
    // setTranslate(newX,childTransform[1],childTransform[2],child);

    let finalScale = 1;
    let newScale = 0.3 + (progress*finalScale);
    nickImage.style.transform = `scaleX(-1) scale(${newScale})`;

  }

  if((document.documentElement.scrollLeft>3000 || document.body.scrollLeft>3000) && ((document.documentElement.scrollLeft|| document.body.scrollLeft)<7000))
  {
    nickImage.style.transform = `scaleX(-1) scale(${1.3})`;

    // childTransform = getTranslate(nick);
    // let finalX = window.innerWidth-(window.innerWidth * 0.65)-450;
    // setTranslate(finalX,childTransform[1],childTransform[2],nick);
  }

  if((document.documentElement.scrollLeft>6000 || document.body.scrollLeft>6000) && ((document.documentElement.scrollLeft|| document.body.scrollLeft)<7000))
  {
    childTransform = getTranslate(nick);

    //original transform is -450,530,-180

    //how far through the 1000 pixel transition zone we've gotten
    let progress = ((7000-(document.documentElement.scrollLeft|| document.body.scrollLeft))/1000);
    // let finalX = window.innerWidth-(window.innerWidth * 0.65);
    // let newX = -450+progress * (finalX);
    // setTranslate(newX,childTransform[1],childTransform[2],child);
    let finalScale = 1;
    let newScale = 0.3 + (progress*finalScale);
    nickImage.style.transform = `scaleX(-1) scale(${newScale})`;
  }

  if((document.documentElement.scrollLeft|| document.body.scrollLeft)>7000)
  {
    nickImage.style.transform = `scaleX(-1) scale(${0.3})`;

    // childTransform = getTranslate(nick);
    // let finalX = -450;
    // setTranslate(finalX,childTransform[1],childTransform[2],nick);
  }





  //end
  //blog
  if((document.documentElement.scrollLeft>9000 || document.body.scrollLeft>9000))
  {
    // setState({
    //   title:BLOG,
    //   surfer:maskon,
    //   content:(
    //     <React.Fragment>
    //       <p>Coming soon.</p>
    //       <p>For now, here's my <a href="https://medium.com/@nichwch">medium page</a></p>
    //
    //     </React.Fragment>
    //   )
    // });
  }

  //projects
  else if((document.documentElement.scrollLeft>7000 || document.body.scrollLeft>7000))
  {
    // setState({
    //   title:PROJECTS,
    //   surfer:maskon,
    //   content:(
    //     <React.Fragment>
    //       <p>I love making things! Keep scrolling to see some projects I've made.</p>
    //       <p>Things I use:</p>
    //       <ul>
    //         <li>React (HTML5,CSS,JS,Redux,Router,Bootstrap)</li>
    //         <li>Node (AWS,Express,PostgreSQL)</li>
    //         <li>Unity (2D)</li>
    //         <li>Procreate</li>
    //       </ul>
    //
    //     </React.Fragment>
    //   )
    // });
  }
  //about page
  else if((document.documentElement.scrollLeft>3000 || document.body.scrollLeft>3000))
  {
    // setState({
    //   title:ABOUT,
    //   surfer:fuckitmaskoff,
    //   content:(
    //     <React.Fragment>
    //       <p>That's me to the right! I don't really skateboard.</p>
    //       <p>I'm a sophomore at UC Davis studying CS and economics. There, I'm part of the PLASMA incubator,
    //       Model UN, and boxing club.</p>
    //       <p>I became interested in programming after making a videogame my junior
    //       year of high school. It's been my favorite hobby since. I especially love web programming,
    //       but harbor much curiosity towards backend development, machine learning, and
    //       game development as well.</p>
    //       <p>My favorite videogames are Super Mario Galaxy 2, Metal Gear Solid 5, and FTL. My taste in music
    //       is ever shifting - right now I'm impartial to Radiohead, 80s synth, and psychadelic rock. By the time
    //       anyone reads that it'll probably have changed. </p>
    //
    //     </React.Fragment>
    //   )
    // });
  }

  //start
  else if((document.documentElement.scrollLeft>0 || document.body.scrollLeft>0))
  {
    // setState(getInitialState());
  }

}



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

window.addEventListener('optimizedScroll',handleScroll
);
