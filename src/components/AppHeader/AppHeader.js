import React, { Component } from 'react';
import styles from './AppHeader.module.scss';
import classnames from 'classnames';
import downArrowIcon from '../../assets/down-arrow.svg';
import ReactSVG from 'react-svg';
import { NavLink, Link } from 'react-router-dom'


class AppHeader extends Component {
  getAppHeader() {
    let value = this.props.value;
    if(this.props.compareTo === 'now') {
      value = Math.round((Date.now() - this.props.value) / 6000);
    }

    console.log(this.props.max, value);
    return {
      value,
      unit: 'min',
      isOverdue: this.props.max && this.props.max > value
    };
  }

  render() {
    const duration = this.getAppHeader();
    const classNames = classnames({
      [styles.container]: true,
      [styles.overdue]: duration.isOverdue
    });

    return (
      <div className={classNames}>
        <ul className={styles.navigation}>
          <li><NavLink exact to='/' activeClassName={styles.active}>Waitlist</NavLink></li>
          <li><NavLink to='/analytics' activeClassName={styles.active}>Analytics</NavLink></li>
        </ul>
        <ul className={styles.member}>
          <li><Link to='/account' className={styles.account}>
            Coffee &amp; Co
            <ReactSVG src={downArrowIcon} svgClassName={styles.downArrow} />
          </Link></li>
        </ul>
      </div>
    );
  }
}

export default AppHeader;
