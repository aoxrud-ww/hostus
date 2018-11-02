import React, { Component } from 'react';
import styles from './CreateVisit.module.scss';
import { connect } from "react-redux";
import Button from '../Button/Button.js';
import PageHeader from '../PageHeader/PageHeader.js';
import CustomerForm from '../CustomerForm/CustomerForm.js';

import { createWaitlistVisit } from '../../actions';
import * as routes from '../../routes';

class CreateVisit extends Component {

  constructor(props) {
    super(props);
    this.updatedCustomerForm = this.updatedCustomerForm.bind(this);
    this.save = this.save.bind(this);
  }

  updatedCustomerForm(customer) {
    this.setState({
      customer
    });
  }

  save() {
    this.props.addVisit(this.state.customer);
  }

  render() {
    return (
      <div className='card'>
        <div className={styles.form}>
          <CustomerForm onChange={this.updatedCustomerForm} />
        </div>
        <Button theme="primary" onClick={this.save}>Save</Button>
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
