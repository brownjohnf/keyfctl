'use strict';

const
  _     = require("lodash"),
  utils = require('../shared/utils'),
  git   = require('../shared/git'),
  Component   = require('../models/component')
const validate = require('jsonschema').validate

module.exports.Configuration = class Configuration {
  constructor(obj) {
    const valid = validate(obj, this.schema())

    if (valid.errors.length > 0) {
      throw new Error(valid.errors)
    }

    _.merge(this, obj)
  }

  globalVars() {
    return _.get(this, 'global', [])
  }

  componentVars(componentName) {
    return _.get(this, componentName, [])
  }

  schema() {
    return {
      id: '/Configuration',
      type: 'object',
      properties: {
        global: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              value: { type: 'string' },
            }
          }
        }
      },
      patternProperties: {
        "[a-z\-]+": {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              value: { type: 'string' },
            }
          }
        }
      }
    }
  }
}

