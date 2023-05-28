import { Fragment } from "react";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import earth from "../assets/earth.png";
import stars from "../assets/stars.png";
import saturn from "../assets/saturn1.png";
import bryan from "../assets/Foto Beje.jpg";
import david from "../assets/Foto David.jpg";
import dylan from "../assets/Foto Dylan.jpg";
import mark from "../assets/Foto Mark.jpg";
import matthew from "../assets/Foto Matthew.jpg";

function Home() {
  useEffect(() => {
    let stars = document.getElementById("stars");
    let planet = document.getElementById("planet");
    let saturn = document.getElementById("saturn");
    window.addEventListener("scroll", function () {
      let value = window.scrollY;
      stars.style.left = value * 0.5 + "px";
      planet.style.top = value * 0.75 + "px";
      saturn.style.top = -1000 + value * 1.5 + "px";
      if (-1000 + value * 1.5 > 0) {
        saturn.style.top = "0px";
      }
    });
  }, []);

  useEffect(() => {
    let toggler = 0;
    function handleScroll() {
      const text2 = document.querySelectorAll("#text2");
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

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const profiles = document.querySelectorAll("#profile");
    const profileDesc = document.querySelectorAll("#profile-desc");
    profiles.forEach((profile, index) => {
      profile.addEventListener("mouseenter", () => {
        profileDesc[index].style.opacity = "0.8";
      });
      profile.addEventListener("mouseleave", () => {
        profileDesc[index].style.opacity = "0";
      });
    });
  }, []);
  return (
    <Fragment>
      <div id="box1" style={{ overflow: "hidden" }}>
        <img id="stars" src={stars} />
        <div
          id="flexbox"
          className="container d-flex align-items-center flex-md-row flex-column justify-content-center"
        >
          <div id="text1">
            <h1>One simple platform that covers everything in the universe.</h1>
            <p>
              Exploring the universe has never been as easier as one simple
              click.
            </p>
            <a href="#box2" id="button" className="mt-2">
              Learn More
            </a>
          </div>
          <div id="planetbox" className="d-flex align-items-center">
            <img
              id="planet"
              className="align-self-center"
              src={earth}
              width="250px"
              height="250px"
            />
          </div>
        </div>
      </div>
      <div id="box2" style={{ overflow: "hidden" }}>
        <img id="saturn" src={saturn} />
        <div
          id="flexbox"
          className="container d-flex align-items-center flex-lg-row flex-column justify-content-between"
          style={{ color: "white" }}
        >
          <div
            id="text2"
            className="hide info1 d-flex flex-column justify-content-around"
          >
            <div>
              <h1>EXPLORE THE UNIVERSE</h1>
              <p>
                Our platform is dedicated to providing comprehensive and easily
                accessible information about space exploration, astronomy, and
                the universe. More than that, our website integrates NASA API,
                allowing us to gather and present real-time data and information
                from NASA's vast resources. Our goal is to make the wonders of
                space more accessible and engaging for everyone.
              </p>
            </div>
          </div>
          <div
            id="text2"
            className="hide info2 d-flex flex-column justify-content-around"
          >
            <div>
              <h1>EDUCATIONAL RESOURCES</h1>
              <p>
                We provide a comprehensive collection of educational resources
                such as articles, videos, and infographics to educate visitors
                about. We aim to bring an education system that is more fun and
                easy to understand.
              </p>
            </div>
            <div>
              <h1>GET THE LATEST NEWS & UPDATES</h1>
              <p>
                Our visitors are informed with the latest news, discoveries, and
                updates in the field of space exploration through a dedicated
                news section.
              </p>
            </div>
            <div>
              <h1>COMMUNITY FORUMS</h1>
              <p>
                Our website incorporates forums and discussion boards where
                visitors can engage in conversations, ask questions, and share
                their thoughts and experiences related to space exploration.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        id="box3"
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <h1 style={{ textAlign: "center" }}>About Us</h1>
        <div className="container">
          <div className="row row-cols-2 row-cols-md-3">
            <div className="col">
              <div id="profile">
                <img id="profile-img" src={bryan} alt="foto bryan" />
                <div id="profile-desc">
                  <p>
                    Perkenalkan nama saya Bryan Jonathan. Saya lahir pada
                    tanggal 14 September 2004 di Jakarta. Saya memilih jurusan
                    Informatika karena saya tertarik dalam mempelajari ilmu
                    teknologi masa depan seperti AI, Web3, blockchain, dll.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div id="profile">
                <img id="profile-img" src={david} alt="foto david" />
                <div id="profile-desc">
                  <p>
                    Hi, nama saya David Moses Mantiri Kalesaran. Lahir pada 20
                    Juli 2004, Jakarta. Saat ini saya sedang berkuliah di
                    Universitas Multimedia Nusantara. Saya berharap kita bisa
                    lulus kuliah dan mendapatkan pekerjaan yang layak (dan
                    menjadi kaya ^w^).
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div id="profile">
                <img id="profile-img" src={dylan} alt="foto dylan" />
                <div id="profile-desc">
                  <p>
                    Halo, nama saya Dylan William. Saya lahir di Jakarta pada
                    tanggal 19 November 2004. Saat ini saya sedang berkuliah di
                    UMN dengan jurusan Informatika, karena saya ingin
                    mempelajari cara membuat software.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div id="profile">
                <img id="profile-img" src={mark} alt="foto mark" />
                <div id="profile-desc">
                  <p>
                    Hallo, nama saya Mark Vincent Emmanuel By. Saya lahir di
                    Jakarta pada tanggal 23 Januari 2004. Saat ini saya sedang
                    berkuiah di UMN. saya sangat senang berkuliah di UMN karena
                    asik dan menyenangkan.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div id="profile">
                <img id="profile-img" src={matthew} alt="foto matthew" />
                <div id="profile-desc">
                  <p>
                    Hai, nama saya Matthew Nikolaus. Saya lahir pada 21 Mei 2004
                    di Jakarta. Saya seorang mahasiswa jurusan Informatika di
                    Universitas Multimedia Nusantara. Saya berkuliah di UMN
                    karena fasilitasnya yang lengkap dan lokasinya yang dekat
                    dengan rumah.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
