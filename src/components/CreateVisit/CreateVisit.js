import React, { Component } from 'react';
import styles from './CreateVisit.module.scss';
import { connect } from "react-redux";
import CustomerForm from '../CustomerForm/CustomerForm.js';
import { createWaitlistVisit } from '../../actions';
import { HOME } from '../../routes.js';

class CreateVisit extends Component {

  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }

  save(customer) {
    this.props.addVisit(customer);
    this.props.history.push(HOME);
    return true;
  }

  render() {
    return (
      <div className={styles.container}>
      <div className={styles.form}>
        <div className='card'>

          <CustomerForm onSave={this.save} />
        </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  addVisit: createWaitlistVisit
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateVisit);
