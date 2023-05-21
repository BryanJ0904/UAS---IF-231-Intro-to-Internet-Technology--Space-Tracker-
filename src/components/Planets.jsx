import React from 'react';
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from 'splitting';
import './Planets.css';
import mercury from '../assets/mercury.png'
import venus from '../assets/venus.png'
import earth from '../assets/earth.png'
import mars from '../assets/mars.png'
import jupiter from '../assets/jupiter.png'
import saturn from '../assets/saturn2.png'
import uranus from '../assets/uranus.png'
import neptune from '../assets/neptune.png'

function Planets() {
  React.useEffect(() => {
Splitting({ target: '.planet-title h1', by: 'chars' });

const elApp = document.querySelector('#app');

const elPlanets = Array.from(document.querySelectorAll('[data-planet]')).
reduce((acc, el) => {
  const planet = el.dataset.planet;

  acc[planet] = el;

  return acc;
}, {});

const planetKeys = Object.keys(elPlanets);

function getDetails(planet) {
  // tilt, gravity, hours
  const details = Array.from(elPlanets[planet].
  querySelectorAll(`[data-detail]`)).
  reduce((acc, el) => {
    acc[el.dataset.detail] = el.innerHTML.trim();

    return acc;
  }, { planet });

  return details;
}

// ...........

let currentPlanetIndex = 0;
let currentPlanet = getDetails('mercury');

function selectPlanet(planet) {
  const prevPlanet = currentPlanet;
  const elActive = document.querySelector('[data-active]');

  delete elActive.dataset.active;

  const elPlanet = elPlanets[planet];

  elPlanet.dataset.active = true;
  currentPlanet = getDetails(elPlanet.dataset.planet);

  console.log(prevPlanet, currentPlanet);

  const elHoursDetail = elPlanet.querySelector('[data-detail="hours"]');
  animate.fromTo({
    from: +prevPlanet.hours,
    to: +currentPlanet.hours },
  value => {
    elHoursDetail.innerHTML = Math.round(value);
  });

  const elTiltDetail = elPlanet.querySelector('[data-detail="tilt"]');
  animate.fromTo({
    from: +prevPlanet.tilt,
    to: +currentPlanet.tilt },
  value => {
    elTiltDetail.innerHTML = value.toFixed(2);
  });

  const elGravityDetail = elPlanet.querySelector('[data-detail="gravity"]');

  animate.fromTo({
    from: +prevPlanet.gravity,
    to: +currentPlanet.gravity },
  value => {
    elGravityDetail.innerHTML = value.toFixed(1);
  });
}

function selectPlanetByIndex(i) {
  if(currentPlanetIndex != i){
    currentPlanetIndex = i;
    elApp.style.setProperty('--active', i);
    selectPlanet(planetKeys[i]);
  }
}

function animate(duration, fn) {
  const start = performance.now();
  const ticks = Math.ceil(duration / 16.666667);
  let progress = 0; // between 0 and 1, +/-

  function tick(now) {
    if (progress >= 1) {
      fn(1);
      return;
    }

    const elapsed = now - start;
    progress = elapsed / duration;

    // callback
    fn(progress); // number between 0 and 1

    requestAnimationFrame(tick); // every 16.6666667 ms
  }

  tick(start);
}

function easing(progress) {
  return (1 - Math.cos(progress * Math.PI)) / 2;
}

const animationDefaults = {
  duration: 1000,
  easing };


animate.fromTo = ({
  from,
  to,
  easing,
  duration },
fn) => {
  easing = easing || animationDefaults.easing;
  duration = duration || animationDefaults.duration;

  const delta = +to - +from;

  return animate(duration, progress => fn(from + easing(progress) * delta));
};


/* ---------------------------------- */

const svgNS = 'http://www.w3.org/2000/svg';
const elSvgNav = document.querySelector('.planet-nav svg');

const elTspans = [...document.querySelectorAll('tspan')];;
const length = elTspans.length - 1;

elSvgNav.style.setProperty('--length', length);

// Getting the length for distributing the text along the path
const elNavPath = document.querySelector('#navPath');
const elLastTspan = elTspans[length];
const navPathLength = elNavPath.getTotalLength() - elLastTspan.getComputedTextLength();

elTspans.forEach((tspan, i) => {
  let percent = i / length;

  tspan.setAttribute('x', percent * navPathLength);
  tspan.setAttributeNS(svgNS, 'x', percent * navPathLength);

  tspan.addEventListener('click', e => {
    e.preventDefault();
    selectPlanetByIndex(i);
  });

});
});

    return(
    <div id="app" data-current-planet="mercury">

      <nav className="planet-nav">
        <svg viewBox="0 20 400 400" xmlns="http://www.w3.org/2000/svg">

        <path 
            id="navPath" 
            d="M10,200 C30,-28 370,-28 390,200"
            fill="none" />

        <text>
          <textPath href="#navPath" startOffset="0" font-size="10">
            <tspan>Mercury</tspan>
            <tspan>Venus</tspan>
            <tspan>Earth</tspan>
            <tspan>Mars</tspan>
            <tspan>Jupiter</tspan>
            <tspan>Saturn</tspan>
            <tspan>Uranus</tspan>
            <tspan>Neptune</tspan>
          </textPath>
        </text>

      </svg>
    </nav>

  <div className="planet" data-planet="mercury" data-active>
    <div className="planet-title">
      <h1>Mercury</h1>
      <p className="planet-description">Tiny and close to the sun.</p>
    </div>

    <div className="planet-details">
      <div className="detail" data-detail="tilt" data-postfix="°">
        2.04
      </div>
      <div className="detail" data-detail="gravity" data-postfix="𝗑">
        0.38
      </div>
      <div className="detail" data-detail="hours">
        1406.4
      </div>
    </div>

    <figure className="planet-figure">
      <img className="planet-img" src={mercury}/>
    </figure>
  </div>

  <div className="planet" data-planet="venus">
    <div className="planet-title">
      <h1>Venus</h1>
      <p className="planet-description">A planet of razors and tennis players.</p>
    </div>

    <div className="planet-details">
      <div className="detail" data-detail="tilt" data-postfix="°">
        177.36
      </div>
      <div className="detail" data-detail="gravity" data-postfix="𝗑">
        0.91
      </div>
      <div className="detail" data-detail="hours">
        5832
      </div>
    </div>

    <figure className="planet-figure">
      <img className="planet-img" src={venus} />
    </figure>
  </div>

  <div className="planet" data-planet="earth">
    <div className="planet-title">
      <h1>Earth</h1>
      <p className="planet-description">Voted best planet in the Solar System by all organisms.</p>
    </div>

    <div className="planet-details">
      <div className="detail" data-detail="tilt" data-postfix="°">
        23.5
      </div>
      <div className="detail" data-detail="gravity" data-postfix="𝗑">
        1
      </div>
      <div className="detail" data-detail="hours">
        24
      </div>
    </div>

    <figure className="planet-figure">
      <img className="planet-img" src={earth} />
    </figure>
  </div>

  <div className="planet" data-planet="mars">
    <div className="planet-title">
      <h1>Mars</h1>
      <p className="planet-description">Future Site of Elon Musk's AirBnB.</p>
    </div>

    <div className="planet-details">
      <div className="detail" data-detail="tilt" data-postfix="°">
        25.19
      </div>
      <div className="detail" data-detail="gravity" data-postfix="𝗑">
        0.38
      </div>
      <div className="detail" data-detail="hours">
        24.6
      </div>
    </div>

    <figure className="planet-figure">
      <img className="planet-img" src={mars} />
    </figure>
  </div>

  <div className="planet" data-planet="jupiter">
    <div className="planet-title">
      <h1>Jupiter</h1>
      <p className="planet-description">Twice as massive as the other planets combined.</p>
    </div>

    <div className="planet-details">
      <div className="detail" data-detail="tilt" data-postfix="°">
        3.13
      </div>
      <div className="detail" data-detail="gravity" data-postfix="𝗑">
        2.53
      </div>
      <div className="detail" data-detail="hours">
        9.9
      </div>
    </div>

    <figure className="planet-figure">
      <img className="planet-img" src={jupiter} />
    </figure>
  </div>

  <div className="planet" data-planet="saturn">
    <div className="planet-title">
      <h1>Saturn</h1>
      <p className="planet-description">This planet sponsored by Zales.</p>
    </div>

    <div className="planet-details">
      <div className="detail" data-detail="tilt" data-postfix="°">
        26.73
      </div>
      <div className="detail" data-detail="gravity" data-postfix="𝗑">
        1.08
      </div>
      <div className="detail" data-detail="hours">
        10.7
      </div>
    </div>

    <figure className="planet-figure">
      <img className="planet-img" src={saturn} />
    </figure>
  </div>

  <div className="planet" data-planet="uranus">
    <div className="planet-title">
      <h1>Uranus</h1>
      <p className="planet-description">Hey, stop laughing. It's not funny.</p>
    </div>

    <div className="planet-details">
      <div className="detail" data-detail="tilt" data-postfix="°">
        97.77
      </div>
      <div className="detail" data-detail="gravity" data-postfix="𝗑">
        0.89
      </div>
      <div className="detail" data-detail="hours">
        17.2
      </div>    </div>

    <figure className="planet-figure">
      <img className="planet-img" src={uranus} />
    </figure>
  </div>


  <div className="planet" data-planet="neptune">
    <div className="planet-title">
      <h1>Neptune</h1>
      <p className="planet-description">A planet for pirates; just narrowly made the cut when scientists decided nine planets was too many.</p>
    </div>

    <div className="planet-details">
      <div className="detail" data-detail="tilt" data-postfix="°">
        28.32      </div>
      <div className="detail" data-detail="gravity" data-postfix="𝗑">
        1.12      </div>
      <div className="detail" data-detail="hours">
        16.1
      </div>
    </div>

    <figure className="planet-figure">
      <img className="planet-img" src={neptune} />
    </figure>
  </div>
</div>
    )
}

export default Planets;