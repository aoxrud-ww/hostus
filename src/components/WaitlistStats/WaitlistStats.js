import React, { PureComponent } from 'react';
import styles from './WaitlistStats.module.scss';
import { connect } from "react-redux";
import Duration from "../Duration/Duration.js";
import ReactSVG from 'react-svg';
import userIcon from '../../assets/user-alt.svg';


class WaitTimesBySize extends PureComponent {
  render() {
    return (
      <div className={styles.metric}>
        <Duration value={this.props.value} unit="min" size="large" />

        <div className={styles.label}>
          <div className={styles.iconContainer}>
            <ReactSVG src={userIcon} svgClassName={styles.icon} />
          </div>
          {this.props.label}
        </div>
      </div>
    )
  }
}

class WaitlistStats extends PureComponent {
  render() {
    const stats = [
      {label: "Parties in waitlist", value: this.props.list.length},
      {label: "Called parties", value: this.props.list.length},
      {label: "Served parties", value: this.props.list.length},
    ];

    return (
      <div className='card'>
        <h1 className={styles.primaryHeadline}>Average Wait Times</h1>
        <ul className={styles.waitTimesList}>
          {this.props.waitTimes.map(metric => (
            <li key={metric.label} className={styles.waitTimeItem}>
              <WaitTimesBySize value={metric.value} label={metric.label} />
            </li>
          ))}
        </ul>

      </div>
    );

    /*
    <h1 className={styles.secondaryHeadline}>Statistics</h1>
    <ul className={styles.stats}>
      {stats.map(metric => (
        <li key={metric.label} className={styles.statsItem}>
          <span className={styles.statsLabel}>{metric.label}</span>
          <span className={styles.statsValue}>{metric.value}</span>
        </li>
      ))}
    </ul>
    */
  }
}


const mapStateToProps = state => {
  return {
    list: state.list,
    waitTimes: state.waitTimes
  };
};

export default connect(mapStateToProps)(WaitlistStats);
