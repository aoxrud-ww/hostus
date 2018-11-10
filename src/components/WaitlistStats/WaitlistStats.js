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

  }
}


const mapStateToProps = state => {
  return {
    waitTimes: state.waitTimes
  };
};

export default connect(mapStateToProps)(WaitlistStats);
