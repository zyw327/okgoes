/**
 * 视图层
 */
module.exports = class View {
	/**
	 * 
	 * @param {Object} context 
	 * @api public
	 */
	constructor(context) {
		this.context = context;
	}
	/**
	 * 
	 * @param {String} path 
	 * @param {Object} params 
	 * @api public
	 */
	async render(path, params) {
		await this.context.render(path, params);
	}
}
