import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import HoverMenu from "./HoverMenu";
// import NotificationsMenu from "./NotificationsMenu";
// import FontAwesomeIcon from "@fortawesome/react-fontawesome";
// import faBell from "@fortawesome/fontawesome-pro-light/faBell";

import NewStoryModal from "./NewStoryModal";
import { getLoggedInUser } from "../ducks/reducers/userReducer";

class Nav extends Component {
  constructor() {
    super();

    this.state = {
      hoverMenuMode: "hidden",
      notificationsMode: "hidden",
      modalMode: "hidden",
      isLoggedIn: false
    };

    this.loggedInNav = this.loggedInNav.bind(this);
    this.toggleHoverMenu = this.toggleHoverMenu.bind(this);
    this.toggleNotificationsMenu = this.toggleNotificationsMenu.bind(this);
    this.toggleNewStoryModal = this.toggleNewStoryModal.bind(this);
    this.hideAllMenus = this.hideAllMenus.bind(this);
  }

  componentDidMount() {
    if (!this.props.user.user_id) {
      this.props.getLoggedInUser().then(response => {
        console.log( 'isLoggedIn: ', response );
        if (response.value.data.user_id) {
          this.loggedInNav();
        }
      });
    }
  }

  loggedInNav() {
    this.setState({ isLoggedIn: true });
  }

  toggleHoverMenu() {
    if (this.state.hoverMenuMode === "hidden") {
      this.setState({ hoverMenuMode: "visible", notificationsMode: "hidden" });
    } else {
      this.setState({ hoverMenuMode: "hidden" });
    }
  }

  toggleNotificationsMenu() {
    if (this.state.notificationsMode === "hidden") {
      this.setState({ notificationsMode: "visible", hoverMenuMode: "hidden" });
    } else {
      this.setState({ notificationsMode: "hidden" });
    }
  }

  hideAllMenus() {
    this.setState({
      hoverMenuMode: "hidden",
      notificationsMode: "hidden"
    });
  }

  toggleNewStoryModal() {
    if (this.state.modalMode === "hidden") {
      this.setState({ modalMode: "visible" });
    } else {
      this.setState({ modalMode: "hidden" });
    } 
  }

  render() {
    // console.log('NAV Props!!!    ', this.props);
    const { user } = this.props;

    return (
      <Fragment>
      {/* *TO DO: conditional rendering depending on whether user is signed in or not */}
      <div className={this.state.isLoggedIn ? "main-nav logged-in-nav" : "main-nav logged-out-nav"}>
        <div className="nav-left">
          <NavLink onClick={() => this.hideAllMenus()} to={this.state.isLoggedIn ? "/home" : "/"}>Home</NavLink>
          <NavLink onClick={() => this.hideAllMenus()} to="/discover">Discover</NavLink>
        </div>
        <div className="nav-right">
  
          {
            (user.user_id) ?
          (<Fragment>
          <button onClick={() => this.toggleNewStoryModal()} className="btn"> + New Story</button>
          
          {/* <div className="notifications-wrap">
            <FontAwesomeIcon
              onClick={() => this.toggleNotificationsMenu()}
              icon={faBell}
            />
            <NotificationsMenu
              notificationsMode={this.state.notificationsMode}
              toggleNotificationsMenu={this.toggleNotificationsMenu}
            />
          </div> */}

          <div className="account-links-wrap">
            <img
              onClick={() => this.toggleHoverMenu()}
              className="navatar"
              src={user.avatar}
              alt={user.display_name}
            />
            <HoverMenu 
              hoverMenuMode={this.state.hoverMenuMode} 
              toggleHoverMenu={this.toggleHoverMenu}
            />
          </div>
          </Fragment>) :
          (<div className="nav-left">
            <NavLink onClick={() => this.hideAllMenus()} to="/login">Log In</NavLink>
            <NavLink onClick={() => this.hideAllMenus()} to="/signup">Sign Up</NavLink>
          </div>)
        }
        </div>
      </div>

      <NewStoryModal modalMode={this.state.modalMode} toggleModal={this.toggleNewStoryModal} />

      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.authedUser
  }
};
export default connect(mapStateToProps, {getLoggedInUser})(Nav);
