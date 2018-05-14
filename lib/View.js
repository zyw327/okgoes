/**
 * 视图层
 */
class View {
	constructor(context) {
		this.context = context;
	}

	async render(path, params) {
		await this.context.render(path, params);
	}
}

module.exports = View;
