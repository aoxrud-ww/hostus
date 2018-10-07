import React, { Component } from 'react';
import styles from './AddParty.module.scss';
import { connect } from "react-redux";
import Button from '../Button/Button.js';
import PageHeader from '../PageHeader/PageHeader.js';
import CustomerForm from '../CustomerForm/CustomerForm.js';


class AddParty extends Component {

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
    console.log(this.state);
  }

  render() {
    return (
      <div className={styles.container}>
        <PageHeader title="Add Guest" />

        <div className={styles.customer}>
          <div className={styles.form}>
            <CustomerForm onChange={this.updatedCustomerForm} {...this.props.customer} />
          </div>
          <Button theme="primary" onClick={this.save}>Save</Button>
        </div>
      </div>
    );
  }
}

AddParty.defaultProps = {
};

const mapStateToProps = state => {
  return {
    customer: state.customer
  };
};


const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AddParty);



// const mapStateToProps = state => {
//   return { list: state.list };
// };


// const mapDispatchToProps = {
//   onDelete(item) {
//     return {
//       type: 'delete',
//       item
//     }
//   },
//   onNotify(item) {
//     return {
//       type: 'notify',
//       item
//     }
//   },
//   onEdit(item) {
//     return {
//       type: 'edit',
//       item
//     }
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Waitlist);