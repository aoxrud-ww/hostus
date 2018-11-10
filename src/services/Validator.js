class Validator {
  validate(value, rules) {
    return rules.every(ruleSpec => this.checkRule(value, ruleSpec));
  }

  checkRule(value, ruleSpec) {
    const {rule, options} = this.parseRule(ruleSpec);
    return this[rule].apply(this, [value].concat(options));
  }

  parseRule(ruleSpec) {
    const [rule, options] = ruleSpec.split(':');
    return {rule, options};
  }

  evaluate(value, rules) {
    return rules.reduce((validations, ruleSpec) => {
      if(!this.checkRule(value, ruleSpec)) {
        const { rule } = this.parseRule(ruleSpec);
        validations[rule] = false;
      }
      return validations;
    }, {});
  }

  validateModel(model, validations) {
    let result = Object.keys(validations).reduce((memo, field) => {
      memo[field] = this.evaluate(model[field], validations[field]);
      return memo;
    }, {});

    result.isValid = Object.keys(result).every(field => {
      return Object.keys(result[field]).length === 0
    });

    return result;
  }

  isString(value) {
    if (typeof value === 'string') {
      return true;
    }
    return false;
  }

  isNotEmpty(value) {
    if (value !== '' && value !== null && typeof value !== 'undefined') {
      return true;
    }
    return false;
  }

  isInt(value) {
    return Number.isInteger(value);
  }

  isMin(value, min) {
    return value >= Number(min);
  }

  isMax(value, max) {
    return value <= Number(max);
  }
}

export default Validator;