import React, { Component } from 'react';
import styles from './WaitlistStats.module.scss';
import { connect } from "react-redux";

class WaitlistStats extends Component {

  render() {
    return (
      <div className={styles.container}>
        <ul className={styles.metricList}>
          <li className={styles.metric}>
            <div className={styles.value}>
              {this.props.list.length}
            </div>
            <div className={styles.label}>Waiting</div>
          </li>

          <li className={styles.metric}>
            <div className={styles.value}>
              10
            </div>
            <div className={styles.label}>Served People</div>
          </li>

          <li className={styles.metric}>
            <div className={styles.value}>
              8
            </div>
            <div className={styles.label}>Served Groups</div>
          </li>



          <li className={styles.metric}>
            <div className={styles.value}>
              0<span className={styles.minorLabel}>min</span>
            </div>
            <div className={styles.label}>Wait 1-4</div>
          </li>

          <li className={styles.metric}>
            <div className={styles.value}>
              5<span className={styles.minorLabel}>min</span>
            </div>
            <div className={styles.label}>Wait 5-6</div>
          </li>


          <li className={styles.metric}>
            <div className={styles.value}>
              5<span className={styles.minorLabel}>min</span>
            </div>
            <div className={styles.label}>Wait 7+</div>
          </li>

        </ul>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return { list: state.list };
};

export default connect(mapStateToProps)(WaitlistStats);
