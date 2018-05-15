const FieldType = require('./Field/Type');
/**
 * mysql fields
 */
class Field {
    /**
     * 
     * @param {Object} defindFields 
     */
    constructor(defindFields) {
        this.define(defindFields);
    }
    /**
     * 
     * @param {Object} defindFields 
     */
    define(defindFields) {
        this.fields = defindFields;
    }

    /**
     * 
     */
    parse() {
        for (let value of this.fields) {
            if (value.type) {

            }
        }
    }
}

for (let key in FieldType) {
    Field[key] = FieldType[key];
}

module.exports = Field;