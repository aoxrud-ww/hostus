import React, { PureComponent } from 'react';
import styles from './CustomerForm.module.scss';
import Textfield from '../Textfield/Textfield.js';
import PartySizePicker from '../PartySizePicker/PartySizePicker.js';
import TagsPicker from '../TagsPicker/TagsPicker.js';
import IncrementInput from '../IncrementInput/IncrementInput.js';
import Button from '../Button/Button.js';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Validator from '../../services/Validator';
import { get } from 'lodash';

const validator = new Validator();
const modelValidation = {
  name: ['isNotEmpty'],
  partySize: ['isInt', 'isMin:1']
};

function FormError({on, message}) {
  return on ? <div className={styles.error}>{message}</div> : "";
}

class CustomerForm extends PureComponent {

  constructor(props) {
    super(props);
    this.state = this.getModel();
    this.changedName = this.changedAttribute.bind(this)('name');
    this.changedPhone = this.changedAttribute.bind(this)('phone');
    this.changedPartySize = this.changedAttribute.bind(this)('partySize');
    this.changedNote = this.changedAttribute.bind(this)('note');
    this.changedTags = this.changedAttribute.bind(this)('tags');
    this.changedQuotedWaitTime = this.changedAttribute.bind(this)('quoted');
    this.save = this.save.bind(this);
  }

  getModel() {
    return {
      name: this.props.name,
      phone: this.props.phone,
      partySize: this.props.partySize,
      note: this.props.note,
      tags: this.props.tags,
      quoted: this.props.quoted
    };
  }

  changedAttribute(attributeName) {
    return (attributeValue) => {
      this.setState({
        [attributeName]: attributeValue
      });
    }
  }

  save() {
    const validations = validator.validateModel(this.state, modelValidation);
    if(validations.isValid) {

      const result = this.props.onSave(this.state);
      this.setState({validations: null});
      if(result) {
        this.reset();
      }
    } else {
      this.setState({
        validations
      });
    }
  }

  reset() {
    this.setState(this.getModel());
  }

  render() {
    return (
      <form>
        <div className={styles.row}>
          <div className={styles.twoColumn}>
            <div>
              <Textfield placeholder="ie. Jane Doe" label="Customer Name" onChange={this.changedName} value={this.state.name}  />
              <FormError on={get(this.state, 'validations.name.isNotEmpty') === false} message="Please enter a name." />
            </div>
            <div>
              <Textfield label="Phone" mask="(999) 999 - 9999" onChange={this.changedPhone} value={this.state.phone} />
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <PartySizePicker onChange={this.changedPartySize} value={this.state.partySize}  />
          <FormError on={get(this.state, 'validations.partySize.isMin') === false} message="Please a valid party size." />
        </div>
        <hr />
        <div className={cx(styles.row, styles.quoted)}>
          <IncrementInput value={this.state.quoted} onChange={this.changedQuotedWaitTime} step={5} label="Quoted Wait" suffix="min" allowZero={true} />
        </div>
        <hr />
        <div className={styles.row}>
          <Textfield value={this.state.note} onChange={this.changedNote} label="Notes" placeholder="ie. Special requirements" underline={false} />
        </div>
        <div className={styles.row}>
          <TagsPicker value={this.state.tags} onChange={this.changedTags} />
        </div>
        <Button theme="primary" onClick={this.save}>Save</Button>
      </form>
    );
  }
}

CustomerForm.defaultProps = {
  name: '',
  partySize: 1,
  phone: '',
  note: '',
  quoted: 0,
  tags: []
};

CustomerForm.propTypes = {
  name: PropTypes.string,
  partySize: PropTypes.number,
  phone: PropTypes.string,
  note: PropTypes.string,
  tags: PropTypes.array,
  quoted: PropTypes.number,
  onSave: PropTypes.func.isRequired
};

export default CustomerForm;
