import "../App.css";
import { useState, useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import ExperienceForm from "./ExperienceForm"
import { parseISO } from "date-fns"

const SingleExperience = ({ experience, userName, handleChange }) => {

  return (
    <Row>
      <Col xs="auto" className="experience">
        <img src={experience.image} className="img-fluid w-25" alt="" />
      </Col>
      <Col className="pl-0">
        <h6 className="m-0 ">{experience.role}</h6>
        <p className="m-0">{experience.company}</p>
        {/* <p className="">
          {styleDate(experience.startDate)} -{" "}
          {experience.endDate ? styleDate(experience.endDate) : "Present"}
        </p> */}
      </Col>
      <Col className="d-flex justify-content-end p-0 pr-4">
        <ExperienceForm
          id={experience._id}
          requestType={"put"}
          userName={userName}
          handleChange={handleChange}
        />
      </Col>
    </Row>
  );
};

export default SingleExperience;
