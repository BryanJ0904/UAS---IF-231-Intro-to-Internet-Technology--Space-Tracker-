import { Fragment } from "react";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import earth from '../assets/earth.png';
import stars from '../assets/stars.png';
import saturn from '../assets/saturn1.png';


function Home() {
  useEffect(() => {
    let stars = document.getElementById("stars");
    let planet = document.getElementById("planet");
    let saturn = document.getElementById("saturn");
    window.addEventListener("scroll", function () {
      let value = window.scrollY;
      stars.style.left = value * 0.5 + "px";
      planet.style.top = value * 0.75 + "px";
      saturn.style.top = (-1000 + (value * 1.5)) + "px";
      if (-1000 + (value * 1.5) > 0) {
        saturn.style.top = "0px";
      }
    });
  }, []);

  useEffect(() => {
    let toggler = 0;
    function handleScroll() {
      const text2 = document.querySelectorAll("#text2")
      const scrollPosition = window.pageYOffset;
      if (scrollPosition > 500 && toggler == 0) {
        text2.forEach((element, index) => {
        setTimeout(() => {
          element.classList.toggle("shown");
          element.classList.toggle("hide");
        }, index * 500);
      });
      toggler = 1;
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <Fragment>
    <div id="box1" style={{overflow: 'hidden'}}>
      <img id="stars" src={stars} />
      <div id="flexbox" className="container d-flex align-items-center flex-md-row flex-column justify-content-center" style={{color: 'white'}}>
        <div id="text1">
          <h1>One simple platform that covers everything in the universe.</h1>
          <p>Exploring the universe has never been as easier as one simple click.</p>
          <a href="#box2" id="button" className="mt-2">Learn More</a>
        </div>
        <div id="planetbox" className="d-flex align-items-center">
          <img id="planet" className="align-self-center" src={earth} width="250px" height="250px" />
        </div>
      </div>
    </div>
    <div id="box2" style={{overflow: 'hidden'}}>
    <img id="saturn" src={saturn} />
      <div id="flexbox" className="container d-flex align-items-center flex-lg-row flex-column justify-content-between" style={{color: 'white'}}>
        <div id="text2" className="hide info1 d-flex flex-column justify-content-around">
          <div>
            <h1>EXPLORE THE UNIVERSE</h1>
            <p>Our platform is dedicated to providing comprehensive and easily accessible information about space exploration, astronomy, and the universe. More than that, our website integrates NASA API, allowing us to gather and present real-time data and information from NASA's vast resources. Our goal is to make the wonders of space more accessible and engaging for everyone.</p>
          </div>
        </div>
        <div id="text2" className="hide info2 d-flex flex-column justify-content-around">
          <div>
            <h1>EDUCATIONAL RESOURCES</h1>
            <p>We provide a comprehensive collection of educational resources such as articles, videos, and infographics to educate visitors about. We aim to bring an education system that is more fun and easy to understand.</p>
          </div>
          <div>
            <h1>GET THE LATEST NEWS & UPDATES</h1>
            <p>Our users are informed with the latest news, discoveries, and updates in the field of space exploration through a dedicated news section.</p>
          </div>
          <div>
            <h1>COMMUNITY FORUMS</h1>
            <p>Our website incorporates forums and discussion boards where users can engage in conversations, ask questions, and share their thoughts and experiences related to space exploration.</p>
          </div>
        </div>
      </div>
    </div>
    <div id="box3">
      <h3 style={{color: 'white'}}>&times;</h3>
    </div>
    </Fragment>
  );
}

export default Home;
