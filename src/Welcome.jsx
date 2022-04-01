import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./styles.css";
import WhyUsImage from "../src/assets/images/whyusimage.jpg";
import pathologyGirl from "../src/assets/images/pathologygirl.jpg";
import gettingStartedImage from "../src/assets/images/gettingstarted.png";
import trustMaleTwoImage from "../src/assets/images/trustmaletwo.png";
import trustMaleOneImage from "../src/assets/images/trustmaleone.png";

import { BsFacebook } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate= useNavigate()
  return (
    <Col className="bg-white">
      <Row xs={12} className="m-0 welcome__header__shadow">
        <Col className="welcome__header__left">
          <h4>AI Telepathology</h4>
        </Col>
        <Col></Col>
        <Col className="welcome__header__last">
          <button className="login__btn" onClick={() => navigate("/landing/signin")}>Login</button>
          <button className="get__started__btn" onClick={() => navigate("/landing/signup")}>Getting Started</button>
        </Col>
      </Row>

      <Container>
        <Col>
          <Row xs={12} className="getting__started__row">
            <Col xs={5}>
              <h2 className="getting__started__title">Getting Started</h2>
              <div className="hr__line" />
              <p className="getting__started__text">
                It is a long established fact that a reader will be distracted by the readable content of a page when
                looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution
                of letters, as opposed to using 'Content here, content here', making it look like readable English.
              </p>
            </Col>
            <Col xs={7} className="getting__started__image">
              <img className="getting__started__image__style" src={gettingStartedImage} />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row xs={12} className="why__us__container">
            <Col xs={12} lg={4} className="why__us__image__container d-flex justify-content-center  align-self-end">
              <img className="why__us__image__style" src={WhyUsImage} />
            </Col>
            <Col xs={12} lg={8}>
              <div className="welcome__divider">
                <span>Why us</span>
              </div>
              <Row xs={12}>
                <Col xs={12} lg={5} className="why__us__box p-2">
                  <h4>Accessible online 24 x 7</h4>
                  <p>Since the service is hosted on cloud, it can be accessible all day long and everyday.</p>
                </Col>
                <Col xs={12} lg={5} className="why__us__box p-3">
                  <h4> No more waiting</h4>
                  <p>Don’t wait for your local pathologist, get a diagnosis in no time</p>
                </Col>
              </Row>
              <Row xs={12}>
                <Col xs={12} lg={5} className="why__us__box p-3">
                  <h4>AI assisted diagnosis</h4>
                  <p>Get your pathology samples diagnosed with the help of our AI algorithms.</p>
                </Col>
                <Col xs={12} lg={5} className="why__us__box p-3">
                  <h4>Your data is safe</h4>
                  <p>We store your data according to HIPPA guidelines and protocols.</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col className="why__to__join__content">
          <div className="welcome__divider">
            <span>Why To Join</span>
          </div>
          <Row className="ai-content m-0 justify-content-around">
            <Col className="box">
              <h3>Reach out to more patients</h3>
              <p className="p-2">
                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero.
              </p>
            </Col>
            <Col className="box">
              <h3>Flexible work hours</h3>
              <p className="p-2">
                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero.
              </p>
            </Col>
            <Col className="box">
              <h3>AI assistance</h3>
              <p className="p-2">
                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero.
              </p>
            </Col>
          </Row>
        </Col>

        <div className="mt-5" />
      </Container>

      <Row xs={12} className="m-0 mb-4  justify-content-around ml-3 mr-3">
        <div className="welcome__divider">
          <span>Trusted and Loved by</span>
        </div>
        <Col xs={12} lg={3} className="trust__info__container ">
          <div className="d-flex justify-content-center">
            <img src={trustMaleOneImage} className="pathology__profile" />
          </div>
          <Row>
            <p className="text-center">
              "For the past one and half year I’m using this site and its an awesome experience. I don’t find words to
              express anymore"
            </p>
          </Row>
          <Row>
            <p className="trust__person__name">John King</p>
          </Row>
        </Col>

        <Col xs={12} lg={3} className="trust__info__container ">
          <div className="d-flex justify-content-center">
            <img src={trustMaleTwoImage} className="pathology__profile" />
          </div>
          <Row>
            <p className="text-center">
              “ It’s incredible and it’s affordable and convenient and it’s just... the best!!
            </p>
          </Row>
          <Row>
            <p className="trust__person__name">Katta Naveen Sai</p>
            {/* <p className="trust__person__info">slkdjfklsf</p> */}
          </Row>
        </Col>
        <Col xs={12} lg={3} className="trust__info__container ">
          <div className="d-flex justify-content-center">
            <img src={pathologyGirl} className="pathology__profile" />
          </div>
          <Row>
            <p className="text-center">
              “The Pathologist’s are professional and so helpful. Thank you AI-Path ! You’re a lifesaver!”
            </p>
          </Row>
          <Row>
            <p className="trust__person__name">Anvesh gandhari</p>
            {/* <p className="trust__person__info">slkdjfklsf</p> */}
          </Row>
        </Col>
      </Row>

      <Row xs={12} className="m-0 welcome__footer">
        <Col xs={7}>
          <Row xs={12}>
            <p>
              Send your feedback to : <b>feedback@deeppath.com</b>
            </p>
            <p>or</p>
            <p>
              Fill this form :{" "}
              <b
                className="pointer"
                onClick={() =>
                  window.open(
                    "https://docs.google.com/forms/d/e/1FAIpQLSf6Ay0xhwsxG6K6SkfZFesJ2uw60On-kZSlN249tuWs03QBPQ/viewform?usp=sf_link"
                  )
                }
              >
                click here
              </b>
            </p>
          </Row>
        </Col>
        <Col xs={5} className=" d-flex align-items-start">
          <Row>
            <p>Follow Us</p>
            <BsFacebook />
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default Welcome;
