import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ProgressionCircle extends PureComponent {
  render() {
    const styles = { animationDuration: `${this.props.duration}ms` };
    const position = 15;
    const strokeWidth = this.props.strokeWidth;
    const radius = position - (strokeWidth/2);

    return (
      <svg preserveAspectRatio="xMidYMid meet" className="circle-chart" viewBox="0 0 30 30" width={this.props.size} height={this.props.size} xmlns="http://www.w3.org/2000/svg">
        <circle className="circle-chart__background" stroke={this.props.outlineColor} strokeWidth={strokeWidth} fill="none" cx={position} cy={position} r={radius} />
        <circle style={styles} className="circle-chart__circle" stroke={this.props.strokeColor} strokeWidth={strokeWidth}  fill="none" cx={position} cy={position} r={radius} strokeDasharray="100,100" strokeLinecap="round" />
      </svg>
    );
  }
}

ProgressionCircle.defaultProps = {
  strokeWidth: 3,
  duration: 3000,
  outlineColor: "#efefef",
  strokeColor: "#00acc1",
  size: 20
};

ProgressionCircle.propTypes = {
  strokeWidth: PropTypes.number,
  duration: PropTypes.number,
  outlineColor: PropTypes.string,
  strokeColor: PropTypes.string,
  size: PropTypes.number
};

export default ProgressionCircle;