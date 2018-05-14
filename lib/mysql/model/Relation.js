const Model = require('../Model');
/**
 * relation model
 */
module.exports = class RelationModel extends Model {
    /**
     * 
     * @param {String} table 
     * @param {String} alias 
     * @param {Object} relationModel 
     */
    constructor(table, alias, relationModel) {
        super(table, alias);
    }
}