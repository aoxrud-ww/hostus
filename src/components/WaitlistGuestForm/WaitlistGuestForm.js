import React, { Component } from 'react';
import styles from './WaitlistGuestForm.module.scss';
import { connect } from "react-redux";

class WaitlistGuestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      partySize: '',
      phone: '',
      note: ''
    };
    this.add = this.add.bind(this);
    this.changedName = this.handleInputChange.bind(this)('name');
    this.changedPartySize = this.handleInputChange('partySize').bind(this);
    this.changedPhone = this.handleInputChange('phone').bind(this);
    this.changedNote = this.handleInputChange('note').bind(this);
  }

  handleInputChange(fieldName) {
    return e => {
      this.setState({
        [fieldName]: e.target.value
      });
    }
  }

  add(e) {
    e.preventDefault();
    this.props.onAdd(this.state);
    this.setState({
      name: '',
      partySize: '',
      phone: '',
      note: ''
    });
  }


  render() {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>{this.props.title}</h1>
        </header>
        <form className={styles.form}>

          <div className={styles.row}>
            <input id='name' placeholder="Guest name" onChange={this.changedName} value={this.state.name} />
            <input className={styles.partySize} placeholder="Party" onChange={this.changedPartySize} value={this.state.partySize} />
          </div>

          <input id='phone' placeholder="Phone" onChange={this.changedPhone} value={this.state.phone} />

          <textarea id='notes' placeholder="Notes" onChange={this.changedNote} value={this.state.note}></textarea>

          <button type='button' onClick={this.add}>Add</button>

        </form>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {  };
};


const mapDispatchToProps = {
  onAdd(item) {
    return {
      type: 'add',
      item
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WaitlistGuestForm);
