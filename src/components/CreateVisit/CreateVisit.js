import React, { Component } from 'react';
import styles from './CreateVisit.module.scss';
import { connect } from "react-redux";
import CustomerForm from '../CustomerForm/CustomerForm.js';
import { createWaitlistVisit } from '../../actions';

class CreateVisit extends Component {

  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }

  save(customer) {
    this.props.addVisit(customer);
    return true;
  }

  render() {
    return (
      <div className='card'>
        <div className={styles.form}>
          <CustomerForm onSave={this.save} />
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
