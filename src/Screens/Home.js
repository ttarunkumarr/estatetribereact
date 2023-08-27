import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import NavBar from "../Components/NavBar";
import banner from "../assets/face-banner.jpg";
import hyd from "../assets/hyderabad.jpg";
import other from "../assets/other.jpg";
import test from "../assets/testimoial_banner.png";
import test1 from "../assets/n2.png";
import test2 from "../assets/vijayawada.webp";
import { fetchPropertiesNew } from "../functions/getPropertiesNew";
import Footer from "./Footer";
import flat from "../assets/typeflat.png";
import villa from "../assets/typevilla.png";
import house from "../assets/typeother.png";
import othertype from "../assets/3.png";
import { useHistory } from "react-router-dom";
import { auth } from "../Config/Firebase";
import BestDeal from "./BestDeal";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { fetchUserRole } from "../functions/getRoles";
function Home() {
  const [prope, setPrope] = useState([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (auth?.currentUser) {
      fetchUserRole((role) => {
        if (role != "No role found") {
        }
      });
    }
  }, []);
  useEffect(() => {
    setLoading(true);
    fetchPropertiesNew((role) => {
      setPrope(role);
      console.log(prope);
      setLoading(false);
    });
  }, []);
  const his = useHistory();
  const handleClick = () => {
    his.push("/explore");
  };
  const handleCardClick = (propertyType) => {
    const filteredProperties = prope.filter(
      (property) => property.propertyType === propertyType
    );
    if (filteredProperties.length > 0) {
      his.push("./properties", {
        filteredProperties,
      });
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };
  const handleLogin = () => {
    setLoading(true);
    setErrorMessage("");
    try {
      signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUsername("");
          setPassword("");
          setErrorMessage("Logged In");
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          setErrorMessage(
            errorCode === "auth/wrong-password" ? "Wrong Password" : errorCode
          );
        });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === "auth/popup-closed-by-user") {
        setLoading(false);
        setErrorMessage("User cancelled the login");
        console.log("User cancelled the login");
      } else {
        setErrorMessage(errorMessage);
        console.error(errorMessage);
      }
    } finally {
      setLoading(false);
      history.push("/");
    }
  };
  return (
    <>
      <NavBar />
      <div className="main-hero-wrapper">
        <div className="hero-section-start">
          <div className="hero-left">
            {auth?.currentUser ? (
              <>
                <h4>Estate Tribe is</h4>
                <h1>The real estate marketplace</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </>
            ) : (
              <div className="loginHolder">
                <div className="box-login">
                  <h1>Login {auth?.currentUser?.displayName}</h1>
                  <input
                    type="email"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={handleKeyPress}
                    disabled={loading}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyPress}
                    disabled={loading}
                  />
                  <div>
                    <button
                      className="login-button"
                      onClick={handleLogin}
                      disabled={loading}
                    >
                      Login
                    </button>
                  </div>
                </div>
                <div className="box-google">
                  <button
                    type="button"
                    className="login-with-google-btn"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                  >
                    Sign in with Google
                  </button>
                </div>
              </div>
            )}
            <div className="searchbar">
              <div className="input-searchbar">
                <input
                  type="text"
                  id="neighbour"
                  name="neighbour"
                  placeholder="🔍 Neighbourhood, Address, City,School, Zipcode"
                />
                <select id="home" name="home">
                  <option value="usa">Home</option>
                  <option value="canada">Home</option>
                  <option value="uk">Kingdom</option>
                  <option value="australia">Home</option>
                  <option value="other">Other</option>
                </select>
                <select id="rent" name="rent">
                  <option value="usa">Rent</option>
                  <option value="canada">Rent</option>
                  <option value="uk">Kingdom</option>
                  <option value="australia">Rent</option>
                  <option value="other">Other</option>
                </select>
                <button>Start Search</button>
              </div>
            </div>
          </div>
          <div className="hero-right">
            <div class="image-container">
              <img src={banner} alt="estate Inc. banner" class="image-hero" />
              <div className="img-overlay">
              <h4>Estate Tribe is</h4>
              <h1>The real estate <br/> marketplace</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            </div>

          
          </div>
        </div>
      </div>
      <div className="neighbour-container m-h-35">
        <div className="neighbour-heading">
          <h1>Explore Our Neighbourhood</h1>
          <div className="line-under"></div>
        </div>
        <div className="Explore-images desktop1">
          <div className="row1">
            <div
              className="row1-card"
              onClick={() => {
                handleClick();
              }}
            >
              <img src={hyd} alt="estate Inc. banner" />
              <div className="card-stick">
                <h1>Hyderabad</h1>
                <p>Estates</p>
              </div>
            </div>
            <div
              className="row1-card"
              onClick={() => {
                handleClick();
              }}
            >
              <img src={banner} alt="estate Inc. banner" />
              <div className="card-stick">
                <h1>Bhimavaram</h1>
                <p>Estates</p>
              </div>
            </div>
            <div
              className="row1-card"
              onClick={() => {
                handleClick();
              }}
            >
              <img src={test1} alt="estate Inc. banner" />
              <div className="card-stick">
                <h1>Vijayawada</h1>
                <p>Estates</p>
              </div>
            </div>
          </div>
          <div className="row2">
            <div
              className="row1-card"
              onClick={() => {
                handleClick();
              }}
            >
              <img src={other} alt="estate Inc. banner" />
              <div className="card-stick">
                <h1>Benguluru</h1>
                <p>Estates</p>
              </div>
            </div>
            <div
              className="row2-card"
              onClick={() => {
                handleClick();
              }}
            >
              <img src={test2} alt="estate Inc. banner" />
              <div className="card-stick">
                <h1>Vizag</h1>
                <p>Estates</p>
              </div>
            </div>
          </div>
          <div className="row3">
            <div
              className="row3-card"
              onClick={() => {
                handleClick();
              }}
            >
              <img src={test} alt="estate Inc. banner" />
              <div className="card-stick">
                <h1>Other</h1>
                <p>Estates</p>
              </div>
            </div>
          </div>
        </div>
        <div className="Explore-images mobile">
          <div className="row1">
            <div
              className="row1-card"
              onClick={() => {
                handleClick();
              }}
            >
              <img src={hyd} alt="estate Inc. banner" />
              <div className="card-stick">
                <h1>Hyderabad</h1>
                <p>Estates</p>
              </div>
            </div>
            <div
              className="row1-card"
              onClick={() => {
                handleClick();
              }}
            >
              <img src={banner} alt="estate Inc. banner" />
              <div className="card-stick">
                <h1>Bhimavaram</h1>
                <p>Estates</p>
              </div>
            </div>
            <div
              className="row1-card"
              onClick={() => {
                handleClick();
              }}
            >
              <img src={test1} alt="estate Inc. banner" />
              <div className="card-stick">
                <h1>Vijayawada</h1>
                <p>Estates</p>
              </div>
            </div>
            <div
              className="row1-card"
              onClick={() => {
                handleClick();
              }}
            >
              <img src={other} alt="estate Inc. banner" />
              <div className="card-stick">
                <h1>Benguluru</h1>
                <p>Estates</p>
              </div>
            </div>
            <div
              className="row1-card"
              onClick={() => {
                handleClick();
              }}
            >
              <img src={test2} alt="estate Inc. banner" />
              <div className="card-stick">
                <h1>Vizag</h1>
                <p>Estates</p>
              </div>
            </div>
            <div
              className="row1-card"
              onClick={() => {
                handleClick();
              }}
            >
              <img src={test} alt="estate Inc. banner" />
              <div className="card-stick">
                <h1>Other</h1>
                <p>Estates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="neighbour-container">
        <div className="neighbour-heading">
          <h1>Discover by Property Type</h1>
          <div className="line-under"></div>
        </div>
        <div className="box-columns desktop">
          <div className="col top-large">
            <div className="top-left-col">
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  handleCardClick("Residential");
                }}
              >
                <div className="left-col">
                  <span>Residential</span>
                  <span className="hoverVis">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt.
                  </span>
                </div>
              </a>
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  handleCardClick("Commercial");
                }}
              >
                <div className="left-col">
                  <span>Commercial</span>
                  <span className="hoverVis">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt.
                  </span>
                </div>
              </a>
            </div>
            <div className="bottom-left-col">
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  handleCardClick("Open Plots");
                }}
              >
                <div className="bottom-col">
                  <span>Open Plots</span>
                  <span className="hoverVis">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt.
                  </span>
                </div>
              </a>
            </div>
          </div>
          <div className="col top-large">
            <div className="top-right">
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  handleCardClick("Estates");
                }}
              >
                <div className="right-col">
                  <span>Estates</span>
                  <span className="hoverVis">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt.
                  </span>
                </div>
              </a>
            </div>
            <div className="bottom-right">
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  handleCardClick("Hotels");
                }}
              >
                <div className="bottom-right-col">
                  <span>Hotels</span>
                  <span className="hoverVis">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt.
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="bestdeals-main">
        <div class="neighbour-heading">
          <h1>Best Of Deals</h1>
          <div class="line-under"></div>
        </div>
        <div class="bestdeal">
          <div class="headingbestdeal"></div>
          <div class="cards-best-deal">
            <BestDeal />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
