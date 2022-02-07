import {
  Container,
  Menu,
  Sidebar,
  Button,
  Icon,
  Segment,
  Dropdown,
  Image,
} from "semantic-ui-react";
import React, { useEffect, useState, Fragment, useContext } from "react";
import useReactRouter from "use-react-router";
import Axios from "axios";
import LogedInMenu from "./Menus/LogedInMenu";
import LogedOutMenu from "./Menus/LogedOutMenu";
import { UserContext } from "../../common/context/UserProvider";
import { config } from "../../common/config/config";
import { deviceType } from "react-device-detect";
import defIcon from "../../assets/defIcon.png";
import { useWindowDimensions } from "../../common/context/WindowDimensionsProvider";
const img = require("../../assets/pdc_logo.png");

/**
 * @author @binjiasata @yiyinzhang
 * @description This is the navbar, contains PDC icon, project list button,
 *              login menu or logout menu for now.
 *
 */
const Header = (props) => {
  // const { width } = useWindowDimensions();
  // const [width, setWidth] = useState(window.innerWidth)

  const { width } = useWindowDimensions();
  const breakpoint = 730;

  const { history } = useReactRouter();
  const [activeItem, setActiveItem] = useState("");

  const { userInfo, setUserInfo } = useContext(UserContext);
  const [menubarHidden, setMenuBarVisibility] = useState(false);
  const [sidebarHidden, setSideBarVisibility] = useState(true);
  const [sideBarContentVisible, setSideBarContentVisibility] = useState(false);

  // path config http://localhost:8080/
  let path = config();

  // Use google login
  const handleLogin = () => {
    //window.open(path + "auth/login", "_self");
    history.push("/signin");
    handleSideBarClick();
  };

  const handleLogout = () => {
    window.open(path + "auth/logout", "_self");
  };

  const handleHome = (e, { name }) => {
    history.push("/");
    setActiveItem(name);
    handleSideBarClick();
  };

  const handleOurTeam = (e, { name }) => {
    history.push("/OurTeam");
    setActiveItem(name);
    handleSideBarClick();
  };
  const handleEvents = (e, { name }) => {
    history.push("/events");
    setActiveItem(name);
    handleSideBarClick();
  };

  const handleStudent = (e, { name }) => {
    history.push("/student");
    setActiveItem(name);
    handleSideBarClick();
  };

  const handlehirestudent = (e, { name }) => {
    history.push("/hirestudent");
    setActiveItem(name);
    handleSideBarClick();
  };

  const handleAlumni = (e, { name }) => {
    history.push("/alumni");
    setActiveItem(name);
    handleSideBarClick();
  };

  const handleCovid19 = (e, { name }) => {
    history.push("/covid");
    setActiveItem(name);
    handleSideBarClick();
  };

  const handleProjectList = (e, { name }) => {
    history.push("/project-list");
    setActiveItem(name);
    handleSideBarClick();
  };
  const handleVolunteers = (e, { name }) => {
    history.push("/Volunteers");
    setActiveItem(name);
    handleSideBarClick();
  };

  const handleFeedback = (e, { name }) => {
    history.push("/feedback");
    setActiveItem(name);
    handleSideBarClick();
  };
  console.log(width);

  const handlemobileDesktopView = (width) => {
    //console.log("device::", device);

    if (width < breakpoint) {
      setMenuBarVisibility(true);
      setSideBarVisibility(false);
    } else {
      setMenuBarVisibility(false);
      setSideBarVisibility(true);
    }

    // if (device === "mobile" || device === "tablet") {
    //   setMenuBarVisibility(true);
    //   setSideBarVisibility(false);
    // } else {
    //   setMenuBarVisibility(false);
    //   setSideBarVisibility(true);
    // }
  };

  const handleSideBarClick = () => {
    //console.log("sideBarContentVisible::", sideBarContentVisible);
    setSideBarContentVisibility(!sideBarContentVisible);
  };
  // Get logged user info from backend
  useEffect(() => {
    let device = deviceType;

    // setWidth(window.innerWidth)

    handlemobileDesktopView(width);
    // handlemobileDesktopView(device);
    // window.addEventListener('resize', handleResize)

    Axios.get(path + "auth/login/success", {
      withCredentials: true,
    })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setUserInfo({
          ...userInfo,
          user: data.user,
          authenticated: data.authenticated,
        });

        if (data.user.checkUser) {
          console.log("new user ...... 160");
          console.log(data.user);
          history.push("/");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [width]);

  return (
    <Fragment>
      <Menu fixed="top" inverted>
        <Container inverted="true" hidden={menubarHidden}>
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            as="a"
            onClick={handleHome}
            header
          >
            <Image avatar size="mini" circular src={img} />
            &nbsp;&nbsp;&nbsp; Professional Development Club
          </Menu.Item>
          {/* <Menu.Item
            name="home"
            active={activeItem === "home"}
            as="a"
            onClick={handleHome}
            header
          >
            
          </Menu.Item> */}
          {/* <Menu.Item
            name="OurTeam"
            active={activeItem === "OurTeam"}
            onClick={handleOurTeam}
          >
            Our Team
          </Menu.Item> */}
          <Dropdown item text="The Team">
            <Dropdown.Menu>
              <Dropdown.Item className="bg" onClick={handleOurTeam} name="OurTeam">
                Our Team
              </Dropdown.Item>
              <Dropdown.Item onClick={handleAlumni} name="OurAlumni">
                Our Alumni
              </Dropdown.Item>
              <Dropdown.Item onClick={handleVolunteers} name="OurVolunteers">
                Our Volunteers
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* {!userInfo.authenticated ||
          (userInfo.user && (userInfo.user.company || userInfo.user.admin)) ? (
            <Menu.Item
              name="hirestudent"
              active={activeItem === "hirestudent"}
              onClick={handlehirestudent}
            >
              Hire Students
            </Menu.Item>
          ) : (
            ""
          )} */}

          {!userInfo.authenticated ||
          (userInfo.user && !userInfo.user.company) ? (
            <Menu.Item
              name="Student"
              active={activeItem === "Student"}
              onClick={handleStudent}
            >
              For Students
            </Menu.Item>
          ) : (
            ""
          )}
          {/* <Menu.Item
              name="Volunteers"
              active={activeItem === "Volunteers"}
              onClick={handleVolunteers}
            >
              {" "}
              Volunteers
            </Menu.Item> */}
          {/* <Menu.Item
            name="Alumni"
            active={activeItem === "Alumni"}
            onClick={handleAlumni}
          >
            Our Alumni
          </Menu.Item> */}
          {/*<Menu.Item*/}
          {/*  name="Covid19"*/}
          {/*  active={activeItem === "Covid19"}*/}
          {/*  onClick={handleCovid19}*/}
          {/*>*/}
          {/*  Updates on COVID-19*/}
          {/*</Menu.Item> *!/*/}

          <Menu.Item
            name="Events"
            active={activeItem === "Events"}
            onClick={handleEvents}
          >
            Events
          </Menu.Item>

          <Menu.Item
            name="ProjectList"
            active={activeItem === "ProjectList"}
            onClick={handleProjectList}
          >
            Project List
          </Menu.Item>

          <Menu.Item
            name="feedback"
            active={activeItem === "feedback"}
            onClick={handleFeedback}
          >
            Feedback
          </Menu.Item>
          <Menu.Item
            name="joinTeam"
            position="left"
            active={activeItem === "joinTeam"}
          >
            <Button
              onClick={() =>
                window.open(
                  "https://forms.office.com/Pages/ResponsePage.aspx?id=sdof1BV-_Uy1-nIA5U3ra5WauXDgBfFLkMzBuH0SCR9UOElJOExDSjRON1c2RElYVTY3STY0V0NNVC4u",
                  "_blank"
                )
              }
              basic
              inverted
              content="Join the Team"
            />
          </Menu.Item>
          {userInfo.authenticated ? (
            <LogedInMenu
              logOut={handleLogout}
              username={userInfo.user.name}
              userPicture={
                userInfo.user.picture ? userInfo.user.picture : defIcon
              }
            />
          ) : (
            <LogedOutMenu logIn={handleLogin} />
          )}
        </Container>

        {/* Sidebar */}
        <Container hidden={sidebarHidden}>
          <Button onClick={handleSideBarClick} color="blue">
            <Icon name="bars" />
          </Button>
          <Sidebar
            visible={sideBarContentVisible}
            as={Menu}
            animation="slide along"
            direction="left"
            icon="labeled"
            vertical
            width="thin"
            inverted
            color="blue"
          >
            <Button onClick={handleSideBarClick} color="blue">
              <Icon name="close" />
            </Button>
            <Container>
              <Menu.Item
                name="home"
                active={activeItem === "home"}
                as="a"
                onClick={handleHome}
                header
              >
                Professional Development Club
              </Menu.Item>
              {/* <Menu.Item
                name="OurTeam"
                active={activeItem === "OurTeam"}
                onClick={handleOurTeam}
              >
                Our Team
              </Menu.Item> */}
              <Dropdown item text="The Team">
                <Dropdown.Menu>
                  <Dropdown.Item className="bg" onClick={handleOurTeam} name="OurTeam">
                    Our Team
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleAlumni} name="OurAlumni">
                    Our Alumni
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleVolunteers} name="OurVolunteers">
                    Our Volunteers
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* {!userInfo.authenticated ||
              (userInfo.user &&
                (userInfo.user.company || userInfo.user.admin)) ? (
                <Menu.Item
                  name="hirestudent"
                  active={activeItem === "hirestudent"}
                  onClick={handlehirestudent}
                >
                  Hire Students
                </Menu.Item>
              ) : (
                ""
              )} */}

              {!userInfo.authenticated ||
              (userInfo.user && !userInfo.user.company) ? (
                <Menu.Item
                  name="Student"
                  active={activeItem === "Student"}
                  onClick={handleStudent}
                >
                  For Students
                </Menu.Item>
              ) : (
                ""
              )}
              {/* <Menu.Item
                name="Alumni"
                active={activeItem === "Alumni"}
                onClick={handleAlumni}
              >
                For Alumni
              </Menu.Item>
              <Menu.Item
                name="Covid19"
                active={activeItem === "Covid19"}
                onClick={handleCovid19}
              >
                Updates on COVID-19
              </Menu.Item> */}
              <Menu.Item
                name="Events"
                active={activeItem === "Events"}
                onClick={handleEvents}
              >
                Events
              </Menu.Item>
              <Menu.Item
                name="projectList"
                active={activeItem === "projectList"}
                onClick={handleProjectList}
              >
                Project List
              </Menu.Item>
              <Menu.Item
                name="feedback"
                active={activeItem === "feedback"}
                onClick={handleFeedback}
              >
                Feedback
              </Menu.Item>
              <Menu.Item
                name="joinTeam"
                position="left"
                active={activeItem === "joinTeam"}
              >
                <Button
                  onClick={() =>
                    window.open(
                      "https://forms.office.com/Pages/ResponsePage.aspx?id=sdof1BV-_Uy1-nIA5U3ra5WauXDgBfFLkMzBuH0SCR9UOElJOExDSjRON1c2RElYVTY3STY0V0NNVC4u",
                      "_blank"
                    )
                  }
                  basic
                  inverted
                  content="Join the Team"
                />
              </Menu.Item>

              {userInfo.authenticated ? (
                <LogedInMenu
                  logOut={handleLogout}
                  username={userInfo.user.name}
                  userPicture={
                    userInfo.user.picture ? userInfo.user.picture : defIcon
                  }
                />
              ) : (
                <LogedOutMenu logIn={handleLogin} />
              )}
            </Container>
          </Sidebar>
        </Container>
      </Menu>
    </Fragment>
  );
};

export default Header;
