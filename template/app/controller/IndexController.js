const ControllerAction = require('okgoes').ControllerAction;
const Example = require('../model/Example');

class IndexController extends ControllerAction{

	constructor(req, res){
		super(req, res);
		this.example = new Example();
	}

	async index() {
		this.response.cookie.setCookie('name', 'zyw1223423');
		await this.render({msg: 'Hello World!', example: this.example.getMsg()});
	}
}

module.exports = IndexController;