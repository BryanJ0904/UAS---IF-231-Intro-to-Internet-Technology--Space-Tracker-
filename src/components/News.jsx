import { Fragment } from "react";
import { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./News.css";
import first from '../assets/1.jpg'
import second from '../assets/2.jpg'
import third from '../assets/3.jpg'

function News(){
    useEffect(() => {
        const carousel = document.querySelector(".carousel");
        const arrowIcons = document.querySelectorAll("i");
        const img = document.querySelectorAll("#mainimg");
        const content = document.querySelectorAll(".content");

        let isCooldown = false;
        arrowIcons.forEach((icon, index) => {
            icon.addEventListener("click", () => {
                if(!isCooldown && changeToggle){
                    carousel.scrollLeft += index === 0 ? -img[0].clientWidth : img[0].clientWidth;
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
                    if(isClicked){
                        content[index].classList.toggle("on");
                        changeToggle = changeToggle === true ? false : true;
                        isClicked = false;
                    }
                }, 200);
            })
        })

        let isDragStart = false;
        let startPageX, prevScrollLeft, positionDiff;
        function dragStart(e){
            const handleMouseUp = () => {
                isClicked = true;
                carousel.removeEventListener("mouseup", handleMouseUp);
              };
            carousel.addEventListener("mouseup", handleMouseUp);
            setTimeout(() => {
                if(!isClicked && changeToggle){
                    isDragStart = true;
                    startPageX = e.pageX;
                    prevScrollLeft = carousel.scrollLeft;
                    carousel.removeEventListener("mouseup", handleMouseUp);
                }
            }, 100);
            
        }
        function dragStop(){
            if(!isDragStart) return;
            isDragStart = false;
            carousel.classList.remove("dragging");
            if(positionDiff < -250){
                carousel.scrollLeft += img[0].clientWidth + positionDiff;
            }
            else if(positionDiff > 250){
                carousel.scrollLeft += -img[0].clientWidth + positionDiff;
            }
            else{
                carousel.scrollLeft = prevScrollLeft;
            }
        }

        function dragging(e) {
            if(!isDragStart) return;
            e.preventDefault();
            carousel.classList.add("dragging");
            positionDiff = e.pageX - startPageX;
            carousel.scrollLeft = prevScrollLeft - positionDiff;
        }
        carousel.addEventListener("mousedown", dragStart);
        window.addEventListener("mouseup", dragStop);
        carousel.addEventListener("mousemove", dragging); 
        
    }, []);
    return(
        <Fragment>
        <div className="container d-flex flex-column" style={{color: 'white'}}>
            <div className="title"><h1>NASA Photo of the day</h1></div>
            <div className="d-flex justify-content-center align-items-center">
                <i className="d-flex justify-content-center align-items-center"><div id="arrow" className="arrow-left"></div></i>
                    <div className="carousel d-flex">
                        <img id="mainimg" className="newsimg" src={second} alt="img" /><div id="first" className="content">a</div>
                        <img id="mainimg" className="newsimg" src={second} alt="img" /><div id="second" className="content">a</div>
                        <img id="mainimg" className="newsimg" src={second} alt="img" /><div id="third" className="content">a</div>
                    </div>
                    
                <i className="d-flex justify-content-center align-items-center"><div id="arrow" className="arrow-right"></div></i>
            </div>
        <br />
        <div className="row">
            <div className="col-3 p-3"><img className="newsimg" src={second}></img></div>
            <div className="col-9 p-3">
                <h1>BIG ANNOUNCEMENT</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam imperdiet justo nibh, aliquet ultrices nibh tempus vitae.</p>
            </div>
        </div>
        <div className="row">
            <div className="col-3 p-3"><img className="newsimg" src={second}></img></div>
            <div className="col-9 p-3">
                <h1>BIG ANNOUNCEMENT</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam imperdiet justo nibh, aliquet ultrices nibh tempus vitae.</p>
            </div>
        </div>
        <div className="row">
            <div className="col-3 p-3"><img className="newsimg" src={second}></img></div>
            <div className="col-9 p-3">
                <h1>BIG ANNOUNCEMENT</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam imperdiet justo nibh, aliquet ultrices nibh tempus vitae.</p>
            </div>
        </div>
        </div>
        </Fragment>
    )
}

export default News;