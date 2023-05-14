import { memo } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Journals } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
import styles from "./navBar.module.css";

const activeLinkClassName = ({ isActive }) => {
  const classes = [styles.navLink];
  if (isActive) {
    classes.push(styles.active);
  }
  return classes.join(" ");
};

function NavBar() {
  return (
    <Navbar bg="light" expand="sm" fixed="top">
      <NavLink
        to="/todo"
        className={({ isActive }) =>
          `${activeLinkClassName({ isActive })} ${styles.toDoLink}`
        }
      >
        <Journals /> Todo
      </NavLink>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="me-auto my-2 my-lg-0">
          <NavLink to="/about" className={activeLinkClassName}>
            About
          </NavLink>
          <NavLink to="/contact" className={activeLinkClassName}>
            Contact
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default memo(NavBar);
