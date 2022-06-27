import React from "react";
import "./about.scss";
import NavbarMain from "../../components/navbarMain/NavbarMain";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import jaspi from "../../bioimage/jaspi.jpg";

const About = () => {
  return (
    <div>
      <NavbarMain />
      <h1 className="kopTitel">About</h1>
      <div className="aboutsection">
        <div className="fleximageandbiodescription">
          <img src={jaspi} alt="Jasper" className="bioimg" />
          <p className="biodescription">
            <h3 className="biotitle">Bio</h3>
            Im digital artist specialized in 3d art and environment creation.
            Bringing my imagination to reality is something what fascinate me so
            much, this let me into art. After following 12 years of classes in
            art academy in my youth I continued this trend by studing the
            bachelor game graphic productions. Conveying a story throughout a
            digital art medium is the best there is, using details and all sort
            of elements to make scenes look interesting and unique. The aim
            throughout my entire creation proces is always to create the most
            impressive art possible for the best impression. Letting my
            creativity loose is also the focus of my other passion, juggling.
            Having the freedom to develop your own style of movement and
            juggling excite me. Performing and teaching circus and juggling has
            given so much unique experiences until i even achieved a juggling
            world record. Currently following the master game technology to
            sharpen my 3d art skills even more
          </p>
        </div>
        <VerticalTimeline lineColor="#CFCCD6">
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#CFCCD6", color: "#3A405A" }}
            contentArrowStyle={{ borderRight: "7px solid  #CFCCD6" }}
            date="2021 - present"
            iconStyle={{ background: "#FF9505", color: "#CFCCD6" }}
            icon={<AcUnitIcon />}
          >
            <h3 className="vertical-timeline-element-title">
              Master Game Technology
            </h3>
            <h4 className="vertical-timeline-element-subtitle">Breda, NL</h4>
            <p>
              Working on my thesis which has become a massive project for
              Ubisoft (more updates to come...)
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#CFCCD6", color: "#3A405A" }}
            contentArrowStyle={{ borderRight: "7px solid  #CFCCD6" }}
            date="Winter 2021 - 2022"
            iconStyle={{ background: "#FF9505", color: "#CFCCD6" }}
            icon={<AcUnitIcon />}
          >
            <h3 className="vertical-timeline-element-title">
              Christmas Video Editting Project for Keukens De Abdij
            </h3>
            <h4 className="vertical-timeline-element-subtitle">From home</h4>
            <p>
              A one hour video for a medium to big sized company who did an
              end-year party. I made my own 3D renders for this video too.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#CFCCD6", color: "#3A405A" }}
            contentArrowStyle={{ borderRight: "7px solid  #CFCCD6" }}
            date="Summer 2021"
            iconStyle={{ background: "#FF9505", color: "#CFCCD6" }}
            icon={<AcUnitIcon />}
          >
            <h3 className="vertical-timeline-element-title">
              Graphic Assistant VRT Sporza
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Schaarbeek, BE
            </h4>
            <p>Ek 2020 en Olympic Games</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "#CFCCD6", color: "#3A405A" }}
            contentArrowStyle={{ borderRight: "7px solid  #CFCCD6" }}
            date="2018 - 2021"
            iconStyle={{ background: "#FF9505", color: "#CFCCD6" }}
            icon={<AcUnitIcon />}
          >
            <h3 className="vertical-timeline-element-title">
              Education Digital Arts and Entertainment
            </h3>
            <h4 className="vertical-timeline-element-subtitle">Kortrijk, BE</h4>
            <p>Bachelor Game Graphics Production (Graduated of 6 - 2021)</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="2005 - 2018"
            iconStyle={{ background: "#FF9505", color: "#CFCCD6" }}
            contentStyle={{ background: "#CFCCD6", color: "#3A405A" }}
            icon={<AcUnitIcon />}
          >
            <h3 className="vertical-timeline-element-title">Drawing Academy</h3>
            <h4 className="vertical-timeline-element-subtitle">Mechelen, BE</h4>
            <p>
              Learning basic concepts of drawing as i moved to the more advanced
              concepts over the years
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default About;
