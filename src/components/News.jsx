import { Fragment } from "react";
import { React, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./News.css";
import second from "../assets/2.jpg";

function News() {
  const apiKey = "UcZAqj0dTdN5CeMHia4tklGhc7mK2zPqYUBT6RZ2";
  const [lastPage, setLastPage] = useState(1);
  useEffect(() => {
    Promise.all([
      fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`).then(
        (response) => response.json()
      ),
      fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`
      ).then((response) => response.json()),
      fetch(
        `https://images-api.nasa.gov/search?q=&media_type=image&year_start=2023&year_end=2023&page=${lastPage}`
      ).then((response) => response.json()),
      fetch(
        `https://eonet.gsfc.nasa.gov/api/v2.1/events?days=1`
      ).then((response) => response.json()),
    ])
      .then(([apodData, roverData, imageData, eventData]) => {

        const apodImage = document.getElementById("apod");
        const apodTitle = document.getElementById("first");

        apodImage.src = apodData.url;
        apodTitle.textContent = apodData.title;

        const roverImage = document.getElementById("rover");
        const roverTitle = document.getElementById("second");

        const latestPhoto = roverData.photos[0];
        roverImage.src = latestPhoto.img_src;
        roverTitle.textContent = latestPhoto.rover.name + "'s Latest Image";

        
        const totalImage = imageData.collection.metadata.total_hits;
        if (lastPage === 1) {
          handlePageChange(Math.ceil(totalImage / 100));
        }
        const imageUrl = document.getElementById("latest-img");
        const imageTitle = document.getElementById("third");

        const latestImageIndex = imageData.collection.items.length - 1;
        imageUrl.src =
          imageData.collection.items[latestImageIndex].links[0].href;
        imageTitle.textContent =
          imageData.collection.items[latestImageIndex].data[0].title;

        console.log(eventData.events[0]);
        const firstEvent = eventData.events[0];
        const firstEventImg = document.getElementById("event1-img");
        const firstEventTitle = document.getElementById("event1-title");
        const firstEventLink = document.getElementById("event1-link");

        firstEventTitle.textContent = firstEvent.title;
        firstEventLink.href = firstEvent.sources[0].url;
        firstEventLink.textContent = "Click here to learn more";

        console.log(eventData.events[1]);
        const secondEvent = eventData.events[1];
        const secondEventImg = document.getElementById("event2-img");
        const secondEventTitle = document.getElementById("event2-title");
        const secondEventLink = document.getElementById("event2-link");

        secondEventTitle.textContent = secondEvent.title;
        secondEventLink.href = secondEvent.sources[0].url;
        secondEventLink.textContent = "Click here to learn more";

        console.log(eventData.events[2]);
        const thirdEvent = eventData.events[2];
        const thirdEventImg = document.getElementById("event3-img");
        const thirdEventTitle = document.getElementById("event3-title");
        const thirdEventLink = document.getElementById("event3-link");

        thirdEventTitle.textContent = thirdEvent.title;
        thirdEventLink.href = thirdEvent.sources[0].url;
        thirdEventLink.textContent = "Click here to learn more";

      })
      .catch((error) => {
        console.log("An error occurred:", error);
      });
  }, [lastPage]);

  const handlePageChange = (e) => {
    setLastPage(e);
  };

  useEffect(() => {
    const carousel = document.querySelector(".carousel");
    const arrowIcons = document.querySelectorAll("i");
    const img = document.querySelectorAll(".mainimg");
    const content = document.querySelectorAll(".content");

    let isCooldown = false;
    arrowIcons.forEach((icon, index) => {
      icon.addEventListener("click", () => {
        if (!isCooldown && changeToggle) {
          carousel.scrollLeft +=
            index === 0 ? -img[0].clientWidth : img[0].clientWidth;
          isCooldown = true;
          setTimeout(() => {
            isCooldown = false;
          }, 500);
        }
      });
    });

    let isClicked = false;
    let changeToggle = true;
    img.forEach((image, index) => {
      image.addEventListener("mousedown", () => {
        setTimeout(() => {
          if (isClicked) {
            content[index].classList.toggle("on");
            changeToggle = changeToggle === true ? false : true;
            isClicked = false;
          }
        }, 200);
      });
    });

    let isDragStart = false;
    let startPageX, prevScrollLeft, positionDiff;
    function dragStart(e) {
      const handleMouseUp = () => {
        isClicked = true;
        carousel.removeEventListener("mouseup", handleMouseUp);
      };
      carousel.addEventListener("mouseup", handleMouseUp);
      setTimeout(() => {
        if (!isClicked && changeToggle) {
          isDragStart = true;
          startPageX = e.pageX;
          prevScrollLeft = carousel.scrollLeft;
          carousel.removeEventListener("mouseup", handleMouseUp);
        }
      }, 100);
    }
    function dragStop() {
      if (!isDragStart) return;
      isDragStart = false;
      carousel.classList.remove("dragging");
      if (positionDiff < -250) {
        carousel.scrollLeft += img[0].clientWidth + positionDiff;
      } else if (positionDiff > 250) {
        carousel.scrollLeft += -img[0].clientWidth + positionDiff;
      } else {
        carousel.scrollLeft = prevScrollLeft;
      }
    }

    function dragging(e) {
      if (!isDragStart) return;
      e.preventDefault();
      carousel.classList.add("dragging");
      positionDiff = e.pageX - startPageX;
      carousel.scrollLeft = prevScrollLeft - positionDiff;
    }
    carousel.addEventListener("mousedown", dragStart);
    window.addEventListener("mouseup", dragStop);
    carousel.addEventListener("mousemove", dragging);
  }, []);
  return (
    <Fragment>
      <div className="container d-flex flex-column" style={{ color: "white" }}>
        <h1 className="news-title">Astronomy pictures of the day</h1>
        <div className="d-flex justify-content-center align-items-center">
          <i className="d-flex justify-content-center align-items-center">
            <div id="arrow" className="arrow-left"></div>
          </i>
          <div className="news-headline carousel d-flex">
            <div className="col-12">
              <img id="apod" alt="" className="mainimg newsimg" />
              <div id="first" className="content"></div>
            </div>
            <div className="col-12">
              <img id="rover" alt="" className="mainimg newsimg" />
              <div id="second" className="content"></div>
            </div>
            <div className="col-12">
              <img id="latest-img" alt="" className="mainimg newsimg" />
              <div id="third" className="content"></div>
            </div>
          </div>
          <i className="d-flex justify-content-center align-items-center">
            <div id="arrow" className="arrow-right"></div>
          </i>
        </div>
        <br />
        <div className="row">
          <div className="col-3 p-3">
            <img id="event1-img" className="newsimg" src={second} alt=""></img>
          </div>
          <div className="col-9 p-3">
            <h1 id="event1-title"></h1>
            <a id="event1-link">
              There's no more news available currently
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-3 p-3">
            <img id="event2-img" className="newsimg" src={second} alt=""></img>
          </div>
          <div className="col-9 p-3">
            <h1 id="event2-title">Nothing to show here..</h1>
            <a id="event2-link">
              There's no more news available currently
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-3 p-3">
            <img id="event3-img" className="newsimg" src={second} alt=""></img>
          </div>
          <div className="col-9 p-3">
            <h1 id="event3-title">Nothing to show here..</h1>
            <a id="event3-link">
              There's no more news available currently
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default News;
