const ControllerAction = require('../controller/Action');

class ErrorAction extends ControllerAction {
    constructor(context, error) {
        super(context, error);
        this.error = error;
    }

    trace() {
        this.response.setType('html');
        this.response.setBody(this.error.html());
    }
}

module.exports = ErrorAction;