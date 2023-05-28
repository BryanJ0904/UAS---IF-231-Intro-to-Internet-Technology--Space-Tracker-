import React, { useState, useEffect } from "react";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import "./Planets.css";
import Mercury from "../assets/mercury.png";
import Venus from "../assets/venus.png";
import Earth from "../assets/earth.png";
import Mars from "../assets/mars.png";
import Jupiter from "../assets/jupiter.png";
import Saturn from "../assets/saturn2.png";
import Uranus from "../assets/uranus.png";
import Neptune from "../assets/neptune.png";

function Planets() {
  const [planetList, setPlanetList] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);

  const uniquePlanetNames = [
    "Mercury",
    "Venus",
    "Earth",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune",
  ];

  useEffect(() => {
    const fetchPlanetData = async (name) => {
      try {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/planets?name=${name}`,
          {
            headers: {
              "X-Api-Key": "qXXn1mOOW/pwoEWKnYI9Eg==8m9W26wDyl7dtv7q",
              "Content-Type": "application/json",
            },
          }
        );
        const fetchedData = await response.json();
        return fetchedData[0];
      } catch (error) {
        console.error(`Error fetching planet ${name}:`, error);
        return null;
      }
    };

    const fetchPlanets = async () => {
      const planetPromises = uniquePlanetNames.map((name) =>
        fetchPlanetData(name)
      );
      const planetData = await Promise.all(planetPromises);
      setPlanetList(planetData.filter((planet) => planet !== null));
      setLoading(false);
    };

    fetchPlanets();
  }, []);

  useEffect(() => {
    Splitting({ target: ".planet-title h1", by: "chars" });

    const elApp = document.querySelector("#app");

    const elPlanets = Array.from(
      document.querySelectorAll("[data-planet]")
    ).reduce((acc, el) => {
      const planet = el.dataset.planet;

      acc[planet] = el;

      return acc;
    }, {});

    const planetKeys = Object.keys(elPlanets);

    function getDetails(planet) {
      // tilt, gravity, hours
      const details = Array.from(
        elPlanets[planet].querySelectorAll(`[data-detail]`)
      ).reduce(
        (acc, el) => {
          acc[el.dataset.detail] = el.innerHTML.trim();

          return acc;
        },
        { planet }
      );

      return details;
    }

    // ...........

    let currentPlanetIndex = 0;
    let currentPlanet = getDetails("mercury");

    function selectPlanet(planet) {
      const prevPlanet = currentPlanet;
      const elActive = document.querySelector("[data-active]");

      delete elActive.dataset.active;

      const elPlanet = elPlanets[planet];

      elPlanet.dataset.active = true;
      currentPlanet = getDetails(elPlanet.dataset.planet);

      console.log(prevPlanet, currentPlanet);

      const elHoursDetail = elPlanet.querySelector('[data-detail="hours"]');
      animate.fromTo(
        {
          from: +prevPlanet.hours,
          to: +currentPlanet.hours,
        },
        (value) => {
          elHoursDetail.innerHTML = Math.round(value);
        }
      );

      const elTiltDetail = elPlanet.querySelector('[data-detail="tilt"]');
      animate.fromTo(
        {
          from: +prevPlanet.tilt,
          to: +currentPlanet.tilt,
        },
        (value) => {
          elTiltDetail.innerHTML = value.toFixed(2);
        }
      );

      const elGravityDetail = elPlanet.querySelector('[data-detail="gravity"]');

      animate.fromTo(
        {
          from: +prevPlanet.gravity,
          to: +currentPlanet.gravity,
        },
        (value) => {
          elGravityDetail.innerHTML = value.toFixed(1);
        }
      );
    }

    function selectPlanetByIndex(i) {
      if (currentPlanetIndex !== i) {
        currentPlanetIndex = i;
        elApp.style.setProperty("--active", i);
        selectPlanet(planetKeys[i]);
      }
    }

    function animate(duration, fn) {
      const start = performance.now();
      let progress = 0;

      function tick(now) {
        if (progress >= 1) {
          fn(1);
          return;
        }

        const elapsed = now - start;
        progress = elapsed / duration;

        fn(progress);

        requestAnimationFrame(tick);
      }

      tick(start);
    }

    function easing(progress) {
      return (1 - Math.cos(progress * Math.PI)) / 2;
    }

    const animationDefaults = {
      duration: 1000,
      easing,
    };

    animate.fromTo = ({ from, to, easing, duration }, fn) => {
      easing = easing || animationDefaults.easing;
      duration = duration || animationDefaults.duration;

      const delta = +to - +from;

      return animate(duration, (progress) =>
        fn(from + easing(progress) * delta)
      );
    };

    const svgNS = "http://www.w3.org/2000/svg";
    const elSvgNav = document.querySelector(".planet-nav svg");

    const elTspans = [...document.querySelectorAll("tspan")];
    const length = elTspans.length - 1;

    elSvgNav.style.setProperty("--length", length);

    const elNavPath = document.querySelector("#navPath");
    const elLastTspan = elTspans[length];
    const navPathLength =
      elNavPath.getTotalLength() - elLastTspan.getComputedTextLength();

    elTspans.forEach((tspan, i) => {
      let percent = i / length;

      tspan.setAttribute("x", percent * navPathLength);
      tspan.setAttributeNS(svgNS, "x", percent * navPathLength);

      tspan.addEventListener("click", (e) => {
        e.preventDefault();
        selectPlanetByIndex(i);
      });
    });
  }, []);

  const handleClick = (planet) => {
    setSelectedPlanet(planet);
    setShowDetails(true);
  };

  const handleClose = () => {
    setShowDetails(false);
  };

  return (
    <div>
      {showDetails && <div className="page-block"></div>}
      {selectedPlanet && (
        <div className="container popup-box">
          <div className={`planet-information ${showDetails ? "show" : ""}`}>
            <button className="close-button" onClick={handleClose}>
              Close
            </button>
            <div className="d-flex justify-content-around">
              <div>
                <h1 className="planet-name">{selectedPlanet.name}</h1>
                <br />
                <p>Mass: {selectedPlanet.mass}</p>
                <p>Radius: {selectedPlanet.radius}</p>
                <p>Period: {selectedPlanet.period}</p>
                <p>Semi-major Axis: {selectedPlanet.semi_major_axis}</p>
                <p>Temperature: {selectedPlanet.temperature}°K</p>
                <p>
                  Distance (light year): {selectedPlanet.distance_light_year}
                </p>
                <p>Host Star Mass: {selectedPlanet.host_star_mass}</p>
                <p>
                  Host Star Temperature: {selectedPlanet.host_star_temperature}
                  °K
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                {uniquePlanetNames.map((name) => {
                  if (name === selectedPlanet.name) {
                    if (name === "Mercury") {
                      return (
                        <img id="selected-planet-img" src={Mercury} alt="" />
                      );
                    } else if (name === "Venus") {
                      return (
                        <img id="selected-planet-img" src={Venus} alt="" />
                      );
                    } else if (name === "Earth") {
                      return (
                        <img id="selected-planet-img" src={Earth} alt="" />
                      );
                    } else if (name === "Mars") {
                      return <img id="selected-planet-img" src={Mars} alt="" />;
                    } else if (name === "Jupiter") {
                      return (
                        <img id="selected-planet-img" src={Jupiter} alt="" />
                      );
                    } else if (name === "Saturn") {
                      return (
                        <img id="selected-planet-img" src={Saturn} alt="" />
                      );
                    } else if (name === "Uranus") {
                      return (
                        <img id="selected-planet-img" src={Uranus} alt="" />
                      );
                    } else if (name === "Neptune") {
                      return (
                        <img id="selected-planet-img" src={Neptune} alt="" />
                      );
                    }
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <div id="app" data-current-planet="mercury">
        <nav className="planet-nav">
          <svg viewBox="0 20 400 400" xmlns="http://www.w3.org/2000/svg">
            <path
              id="navPath"
              d="M10,200 C30,-28 370,-28 390,200"
              fill="none"
            />

            <text>
              <textPath href="#navPath" startOffset="0" fontSize="10">
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
            <button
              key={planetList[0]?.name}
              className="planet-description planet-button"
              onClick={() => handleClick(planetList[0])}
              disabled={loading}
            >
              {loading ? "Loading..." : "More Information"}
            </button>
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
            <img className="planet-img" src={Mercury} alt="" />
          </figure>
        </div>

        <div className="planet" data-planet="venus">
          <div className="planet-title">
            <h1>Venus</h1>
            <p className="planet-description">
              A planet of razors and tennis players.
            </p>
            <button
              key={planetList[1]?.name}
              className="planet-description planet-button"
              onClick={() => handleClick(planetList[1])}
              disabled={loading}
            >
              {loading ? "Loading..." : "More Information"}
            </button>
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
            <img className="planet-img" src={Venus} alt="" />
          </figure>
        </div>

        <div className="planet" data-planet="earth">
          <div className="planet-title">
            <h1>Earth</h1>
            <p className="planet-description">
              Voted best planet in the Solar System by all organisms.
            </p>
            <button
              key={planetList[2]?.name}
              className="planet-description planet-button"
              onClick={() => handleClick(planetList[2])}
              disabled={loading}
            >
              {loading ? "Loading..." : "More Information"}
            </button>
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
            <img className="planet-img" src={Earth} alt="" />
          </figure>
        </div>

        <div className="planet" data-planet="mars">
          <div className="planet-title">
            <h1>Mars</h1>
            <p className="planet-description">
              Future Site of Elon Musk's AirBnB.
            </p>
            <button
              key={planetList[3]?.name}
              className="planet-description planet-button"
              onClick={() => handleClick(planetList[3])}
              disabled={loading}
            >
              {loading ? "Loading..." : "More Information"}
            </button>
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
            <img className="planet-img" src={Mars} alt="" />
          </figure>
        </div>

        <div className="planet" data-planet="jupiter">
          <div className="planet-title">
            <h1>Jupiter</h1>
            <p className="planet-description">
              Twice as massive as the other planets combined.
            </p>
            <button
              key={planetList[4]?.name}
              className="planet-description planet-button"
              onClick={() => handleClick(planetList[4])}
              disabled={loading}
            >
              {loading ? "Loading..." : "More Information"}
            </button>
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
            <img className="planet-img" src={Jupiter} alt="" />
          </figure>
        </div>

        <div className="planet" data-planet="saturn">
          <div className="planet-title">
            <h1>Saturn</h1>
            <p className="planet-description">
              This planet sponsored by Zales.
            </p>
            <button
              key={planetList[5]?.name}
              className="planet-description planet-button"
              onClick={() => handleClick(planetList[5])}
              disabled={loading}
            >
              {loading ? "Loading..." : "More Information"}
            </button>
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
            <img className="planet-img" src={Saturn} alt="" />
          </figure>
        </div>

        <div className="planet" data-planet="uranus">
          <div className="planet-title">
            <h1>Uranus</h1>
            <p className="planet-description">
              Hey, stop laughing. It's not funny.
            </p>
            <button
              key={planetList[6]?.name}
              className="planet-description planet-button"
              onClick={() => handleClick(planetList[6])}
              disabled={loading}
            >
              {loading ? "Loading..." : "More Information"}
            </button>
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
            </div>{" "}
          </div>

          <figure className="planet-figure">
            <img className="planet-img" src={Uranus} alt="" />
          </figure>
        </div>

        <div className="planet" data-planet="neptune">
          <div className="planet-title">
            <h1>Neptune</h1>
            <p className="planet-description">
              A planet for pirates; just narrowly made the cut when scientists
              decided nine planets was too many.
            </p>
            <button
              key={planetList[7]?.name}
              className="planet-description planet-button"
              onClick={() => handleClick(planetList[7])}
              disabled={loading}
            >
              {loading ? "Loading..." : "More Information"}
            </button>
          </div>

          <div className="planet-details">
            <div className="detail" data-detail="tilt" data-postfix="°">
              28.32{" "}
            </div>
            <div className="detail" data-detail="gravity" data-postfix="𝗑">
              1.12{" "}
            </div>
            <div className="detail" data-detail="hours">
              16.1
            </div>
          </div>

          <figure className="planet-figure">
            <img className="planet-img" src={Neptune} alt="" />
          </figure>
        </div>
      </div>
    </div>
  );
}

export default Planets;
