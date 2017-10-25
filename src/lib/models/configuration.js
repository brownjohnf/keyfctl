'use strict';

const
  _     = require("lodash"),
  utils = require('../shared/utils'),
  git   = require('../shared/git'),
  Component   = require('../models/component')

module.exports.Configuration = class Configuration {
  constructor(obj) {
    this.errors    = []

    _.merge(this, obj)
  }

  globalVars() {
    return _.get(this, 'global', [])
  }

  componentVars(componentName) {
    return _.get(this, componentName, [])
  }

  isValid() {
    this.errors = []

    _.forEach(this, (val, key) => {
      _.forEach(val => {
        if (!_.has(val, 'name')) {
          this.errors.push(`service ${key} missing key 'name'`)
        }

        if (!_.has(val, 'value')) {
          this.errors.push(`service ${key} missing key 'value'`)
        }
      })
    })

    return this.errors.length === 0
  }
}

