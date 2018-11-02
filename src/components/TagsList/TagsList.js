import React, { PureComponent } from 'react';
import styles from './TagsList.module.scss';
import Tag from '../Tag/Tag.js';
import PropTypes from 'prop-types';

class TagsList extends PureComponent {

  toggleTag(tag, isActive) {
    this.props.onChange({
      ...this.props.selected,
      [tag]: isActive
    });
  }

  render() {
    return (
      <div className={styles.container}>
        {this.props.tags.map(tag => (
          <Tag key={tag} isActive={this.props.selected[tag]} onToggle={this.toggleTag.bind(this, tag)}>
            {tag}
          </Tag>
        ))}
        {this.props.children}
      </div>
    );
  }
}

TagsList.defaultProps = {
  tags: [],
  selected: {},
  onChange: () => {}
};

TagsList.propTypes = {
  tags: PropTypes.array,
  selected: PropTypes.object,
  onChange: PropTypes.func.isRequired
};

export default TagsList;

