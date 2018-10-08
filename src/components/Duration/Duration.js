import React, { PureComponent } from 'react';
import styles from './Duration.module.scss';
import classnames from 'classnames';


class Duration extends PureComponent {

  constructor(props) {
    super(props);
    this.state = this.getDuration();
  }

  getDuration() {
    let value = this.props.value;
    if(this.props.compareTo === 'now') {
      value = Math.round((Date.now() - this.props.value) / 6000);
    }

    return {
      value,
      unit: 'min',
      isOverdue: this.props.max && this.props.max < value
    }
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      const duration = this.getDuration();
      this.setState(duration);
    }, this.props.checkInterval);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const classNames = classnames({
      [styles.container]: true,
      [styles.overdue]: this.state.isOverdue
    });

    return (
      <div className={classNames}>
        <span className={styles.value}>
          {this.state.value}
        </span>
        <span className={styles.unit}>
          {this.state.unit}
        </span>
      </div>
    );
  }
}


Duration.defaultProps = {
  value: '',
  checkInterval: 60000,
  max: 0,
  compareTo: ''
};

export default Duration;
