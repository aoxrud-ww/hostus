import React, { Component } from 'react';
import styles from './CreateVisit.module.scss';
import { connect } from "react-redux";
import Button from '../Button/Button.js';
import CustomerForm from '../CustomerForm/CustomerForm.js';
import { createWaitlistVisit } from '../../actions';

class CreateVisit extends Component {

  constructor(props) {
    super(props);
    this.updatedCustomerForm = this.updatedCustomerForm.bind(this);
    this.save = this.save.bind(this);
    this.state = this.getModel();
  }

  getModel() {
    return {
      name: "",
      phone: "",
      partySize: 2,
      tags: [],
      quoted: 0,
      notes: ""
    };
  }

  updatedCustomerForm(customer) {
    this.setState({
      customer
    });
  }

  save() {
    this.props.addVisit(this.state.customer);
    this.setState({
      customer: this.getModel()
    });
  }

  render() {
    return (
      <div className='card'>
        <div className={styles.form}>
          <CustomerForm onChange={this.updatedCustomerForm} {...this.state.customer} />
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
