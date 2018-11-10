import React, { Component } from 'react';
import styles from './WaitlistItem.module.scss';
import WaitlistItemOptions from '../WaitlistItemOptions/WaitlistItemOptions.js';
import ElapsedTime from '../ElapsedTime/ElapsedTime.js';
import Tag from '../Tag/Tag.js';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class WaitlistItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showOptions: false
    };
    this.itemClick = this.itemClick.bind(this);
    this.notify = this.notify.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.complete = this.complete.bind(this);
  }

  toggleOptions() {
    this.setState((state) => ({
      showOptions: !this.state.showOptions
    }));
  }

  itemClick() {
    this.toggleOptions();
  }

  delete() {
    this.props.onDelete(this.props.item);
  }

  notify() {
    this.props.onNotify(this.props.item);
  }

  edit() {
    this.props.onEdit(this.props.item);
  }

  complete() {
    this.props.onComplete(this.props.item);
  }

  renderTags() {
    if(!this.props.item.tags || !this.props.item.tags.length) {
      return;
    }
    return this.props.item.tags.map(tag => (
      <Tag key={tag} clickable={false} theme="compact">{tag}</Tag>
    ));
  }

  renderNotes() {
    if(!this.props.item.note) {
      return;
    }

    return (
      <div className={styles.note}>
        {this.props.item.note}
      </div>
    );
  }

  renderOptions() {
    if(!this.state.showOptions) {
      return;
    }

    return (
      <div className={styles.description}>
        <div className={styles.info}>
          <div className={styles.actions}>
            <WaitlistItemOptions onDelete={this.delete} onNotify={this.notify} onEdit={this.edit} onComplete={this.complete} />
          </div>
          <div className={styles.quoted}>
            <ElapsedTime value={this.props.item.quoted} />
            <span className={styles.label}>Quoted</span>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const classNames = classnames({
      [styles.container]: true,
      [styles.opened]: this.state.showOptions
    });

    return (
      <div className={classNames}>

        <button className={styles.rowButton} onClick={this.itemClick}>

          <div className={styles.mainRow}>
            <div className={styles.partySize}>
              {this.props.item.partySize}
            </div>
            <div className={styles.name}>
                {this.props.item.name}
            </div>
            <div className={styles.tags}>
              {this.renderTags()}
            </div>
            <div className={styles.waiting}>
              <ElapsedTime value={this.props.item.createdAt} compareTo="now" max={this.props.item.quoted} />
            </div>
          </div>
          <div className={styles.notes}>
            {this.props.item.note}
          </div>
        </button>

        {this.renderOptions()}
      </div>
    );
  }
}

WaitlistItem.defaultProps = {
  item: {}
}

WaitlistItem.propTypes = {
  item: PropTypes.object,
  onComplete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onNotify: PropTypes.func.isRequired
}


export default WaitlistItem;
