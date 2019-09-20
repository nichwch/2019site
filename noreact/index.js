window.scrollTo(0,0);

if( window.innerWidth <= 800||navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)) {
     window.location.href="./potato";
   } else {
     console.log(window.innerWidth);
   }

const layer1 = document.getElementById("layer1");
const layer2 = document.getElementById("layer2");
const layer3 = document.getElementById("layer3");
const nickImage = document.getElementById("nickImage");
const nick = document.getElementById("nick");

const titleText = document.getElementById("titleText");
const content = document.getElementById("content");

const contentBox = document.getElementById("mainBox");


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

  console.log("SCROLL",(document.documentElement.scrollLeft|| document.body.scrollLeft));



  //end
  //blog
  if((document.documentElement.scrollLeft>16000 || document.body.scrollLeft>16000))
  {
    // setState({
    //   title:BLOG,
    //   surfer:maskon,
    //   content:(
    //     <React.Fragment>

    //     </React.Fragment>
    //   )
    // });
    //
    titleText.innerHTML = "Blog";
    content.innerHTML = `
    <p>Coming soon.</p>
    <p>For now, here's my <a href="https://medium.com/@nichwch">medium page</a>.</p>
    `;

    mainBox.className = "mainBox appear";
  }

  else if((document.documentElement.scrollLeft>12000 || document.body.scrollLeft>12000))
  {
    mainBox.className = "mainBox appear disappear";
  }

  //projects
  else if((document.documentElement.scrollLeft>10000 || document.body.scrollLeft>10000))
  {
    // setState({
    //   title:PROJECTS,
    //   surfer:maskon,
    //   content:(
    //     <React.Fragment>
    //
    //     </React.Fragment>
    //   )
    // });
    //
    //
    titleText.innerHTML = "Projects";
    content.innerHTML = `
    <p>I love making things! Keep scrolling to see some projects I've made.</p>
    <p>Things I use:</p>
    <ul>
      <li>React (HTML5,CSS,JS,Redux,Router,Bootstrap)</li>
      <li>Node (AWS,Express,PostgresQL)</li>
      <li>Unity (2D)</li>
      <li>Procreate</li>
    </ul>
    `;


    nickImage.className = "layerElement nickImageC";
    nickImage.src = "./art/maskon.png";
    mainBox.className = "mainBox appear";
  }
  //about page
  else if((document.documentElement.scrollLeft>4000 || document.body.scrollLeft>4000))
  {
    nickImage.className = "layerElement nickImageC zoomedIn";


    titleText.innerHTML = "About";
    content.innerHTML = `<p>That's me to the right! I don't really skateboard.</p>
    <p>I'm a sophomore at UC Davis studying CS and economics. There, I'm part of the PLASMA incubator,
    Model UN, and boxing club.</p>
    <p>I became interested in programming after making a videogame my junior
    year of high school. It's been my favorite hobby since. I especially love web programming,
    but harbor much curiosity towards backend development, machine learning, and
    game development as well.</p>
    <p>My favorite videogames are Super Mario Galaxy 2, Metal Gear Solid 5, and FTL. My taste in music
    is ever shifting - right now I'm impartial to Portishead, 80s synth, and psychadelic rock. By the time
    anyone reads that it'll probably have changed. </p>`;


    nickImage.src = "./art/fuckitmaskoff.png";

  }

  //start
  else if((document.documentElement.scrollLeft>0 || document.body.scrollLeft>0))
  {
    nickImage.className = "layerElement nickImageC";

    titleText.innerHTML = "Nicholas Chen";
    content.innerHTML = `
    <p>Scroll to navigate.<br/>[HQ v4.0]</p>
    <p>
    Animations running slowly? Use the <a href="./potato">potato version</a>
    </p>
    <p>find me:</p>
    <p><a href="mailto:nichwch@gmail.com">email</a>|<a href="www.linkedin.com/in/nicholas-chen-developer">linkedin</a>|<a href="https://github.com/nichwch">github</a>|<a href="https://medium.com/@nichwch">blog</a>|<a href="https://www.instagram.com/machine.future/">insta</a></p>
    `;


    nickImage.src = "./art/maskon.png";
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

window.addEventListener('optimizedScroll',handleScroll,
{
  passive:true
}
);

window.addEventListener('keydown',(e)=>{
  console.log(e.code);
  if(e.code==="ArrowRight")
  {
    // document.documentElement.scrollLeft = document.documentElement.scrollLeft + 500;
    // document.body.scrollLeft = document.body.scrollLeft + 500;
    handleScroll({deltaY:500,deltaX:0});
  }
  else if(e.code==="ArrowLeft")
  {
    // document.documentElement.scrollLeft = document.documentElement.scrollLeft - 500;
    // document.body.scrollLeft = document.body.scrollLeft - 500;
    handleScroll({deltaY:-500,deltaX:0});
  }
});
