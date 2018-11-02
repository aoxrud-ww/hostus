import React, { PureComponent } from 'react';
import Duration from '../Duration/Duration.js'
import PropTypes from 'prop-types';

class ElapsedTime extends PureComponent {

  constructor(props) {
    super(props);
    this.state = this.getDuration();
  }

  getDuration() {
    let value = this.props.value;
    if(this.props.compareTo === 'now') {
      const seconds = (Date.now() - this.props.value) / 1000;
      value = Math.round(seconds / 60);
    }

    return {
      value,
      unit: 'min',
      isOverdue: this.props.max && this.props.max < value
    }
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(this.getDuration());
    }, this.props.checkInterval);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <Duration {...this.state} size={this.props.size} />
    );
  }
}


ElapsedTime.defaultProps = {
  value: 0,
  checkInterval: (30 * 1000),
  max: 0,
  compareTo: '',
  size: 'default'
};

ElapsedTime.propTypes = {
  value: PropTypes.number,
  checkInterval: PropTypes.number,
  max: PropTypes.number,
  compareTo: PropTypes.string,
  size: PropTypes.string
}

export default ElapsedTime;
