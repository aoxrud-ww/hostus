import React, { PureComponent } from 'react';
import styles from './AppHeader.module.scss';
import downArrowIcon from '../../assets/down-arrow.svg';
import ReactSVG from 'react-svg';
import { NavLink, Link } from 'react-router-dom'
import * as routes from '../../routes.js';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

class AppHeader extends PureComponent {
  render() {
    return (

      <div className={styles.container}>
      <div className={styles.nav}>
        <ul className={styles.navigation}>
          <li><NavLink exact to={routes.HOME} activeClassName={styles.active} className={styles.navLink}>Waitlist</NavLink></li>
        </ul>
        <ul className={styles.member}>
          <li>
            <Link to={routes.ACCOUNT} className={styles.account}>
              {this.props.name}
              <ReactSVG src={downArrowIcon} svgClassName={styles.downArrow} />
            </Link>
          </li>
        </ul>
      </div>
      </div>
    );
  }
}

AppHeader.defaultProps = {
  name: ''
};

AppHeader.propTypes = {
  name: PropTypes.string
};

const mapStateToProps = state => {
  return { name: state.user.name };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);

