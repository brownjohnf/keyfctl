'use strict';

const
  _     = require("lodash"),
  utils = require('../shared/utils'),
  git   = require('../shared/git'),
  Component   = require('../models/component'),
  Frame   = require('../models/frame')
const validate = require('jsonschema').validate

module.exports = class Keyframe {
  constructor(obj) {
    const valid = validate(obj, this.schema())

    if (valid.errors.length > 0) {
      throw new Error(valid.errors)
    }

    _.merge(this, obj.keyframe)
  }

  schema() {
    return {
      id: '/Keyframe',
      type: 'object',
      properties: {
        kind: { type: 'string', required: true },
        api_version: { type: 'string', required: true },
        keyframe: {
          type: 'object',
          required: true,
          properties: {
            daemons: { type: 'object' },
            docker: { type: 'object' },
            components: {
              type: 'object',
              additionalProperties: false,
              patternProperties: {
                "[a-z\-]+": {
                  type: 'object',
                  required: true,
                  properties: {
                    version: { type: 'string', required: true },
                    image: { type: 'string', required: true },
                    target: { type: 'string' },
                    instances: { type: 'integer' },
                    args: { type: 'array' },
                    variables: { type: 'array' },
                    ports: {
                      type: 'array',
                      minItems: 1,
                      items: {
                        type: 'object',
                        properties: {
                          path: { type: 'string', required: true },
                          port: { type: 'integer', required: true },
                          domain: { type: 'string' },
                          name: { type: 'string' },
                          protocol: { type: 'string' }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
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
}

