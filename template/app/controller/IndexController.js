const ControllerAction = require('okgoes').ControllerAction;
const Example = require('../model/Example');

class IndexController extends ControllerAction{

	constructor(req, res){
		super(req, res);
		this.example = new Example();
	}

	async _init() {
		return true;
	}

	async index() {
		this.response.cookie.setCookie('name', 'zyw1223423');
		await this.renderHtml({msg: 'Hello World!', example: this.example.getMsg()});
	}

	async json() {
		let params = this.request.getAllParams();
		let postParams = this.request.getPost();
		let query = this.request.getQuery();
		let controller = this.request.getController();
		let action = this.request.getAction();
		await this.renderJson({user: 'okgoes', params: params, query: query, postParams: postParams, action: action, controller: controller});
	}

	async redirect() {
		this.response.redirect('http://blog.okgoes.com');
	}
}

module.exports = IndexController;