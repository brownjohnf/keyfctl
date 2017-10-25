'use strict';

const
  _     = require("lodash"),
  utils = require('../shared/utils'),
  git   = require('../shared/git'),
  Component   = require('../models/component'),
  Frame   = require('../models/frame')

module.exports = class Keyframe {
  constructor(obj) {
    this.errors    = []

    _.merge(this, obj.keyframe)
  }

  globalVars() {
    return _.get(this, 'variables', [])
  }

  componentVars(componentName) {
    return _.get(this.services, `componentName}.variables`, [])
  }

  services() {
    if (_.has(this, 'services')) return this.services
    if (_.has(this, 'components')) return this.components

    return {}
  }

  isValid() {
    this.errors = []

    _.forEach(this.services(), (val, key) => {
      if (!_.has(val, 'image')) {
        this.errors.push(`service ${key} missing key 'image'`)
      }

      if (!_.has(val, 'version')) {
        this.errors.push(`service ${key} missing key 'version'`)
      }
    })

    return this.errors.length === 0
  }
}

