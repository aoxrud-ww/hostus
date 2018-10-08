import React, { PureComponent } from 'react';
import styles from './AppHeader.module.scss';
import downArrowIcon from '../../assets/down-arrow.svg';
import ReactSVG from 'react-svg';
import { NavLink, Link } from 'react-router-dom'
import * as routes from '../../routes.js';

class AppHeader extends PureComponent {

  render() {


    return (
      <div className={styles.container}>
        <ul className={styles.navigation}>
          <li><NavLink exact to={routes.HOME} activeClassName={styles.active}>Waitlist</NavLink></li>
          <li><NavLink to={routes.ANALYTICS} activeClassName={styles.active}>Analytics</NavLink></li>
        </ul>
        <ul className={styles.member}>
          <li>
            <Link to={routes.ACCOUNT} className={styles.account}>
              Coffee &amp; Co
              <ReactSVG src={downArrowIcon} svgClassName={styles.downArrow} />
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default AppHeader;
