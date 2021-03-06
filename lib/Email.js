const nodemailer = require('nodemailer');
const EmailException = require('./email/Exception');
const Validator = require('./email/Validator');
let transporter = null;
/**
 * email and export class
 */
module.exports = class Email {
    /**
     * 
     * @param {Object} options 
     */
    constructor(options) {
        this.validator = new Validator();
        if (!transporter) {
            this.validator.checkConfig(options);
            transporter = nodemailer.createTransport({
                host: options.host,
                port: options.port || 587,
                secure: options.secure || false,
                auth: {
                    user: options.user,
                    pass: options.passwd
                }
            });
            this.transporter = transporter;
        } else {
            this.transporter = transporter;
        }
        this.mailOptions = {};
    }

    /**
     * okgoes<okgoes@okgoes.com>
     * @param {String} from 
     */
    setFrom(from) {
        this.mailOptions.from = from;
    }
    /**
     * 327523057@qq.com, 405449506@qq.com
     * @param {Stirng} toUser 
     */
    setTo(toUser) {
        this.mailOptions.to = toUser;
    }
    /**
     * title of email
     * @param {String} subject 
     */
    setSubject(subject) {
        this.mailOptions.subject = subject;
    }
    /**
     * text
     * @param {String} text 
     */
    setText(text) {
        this.mailOptions.text = text;
    }
    /**
     * html
     * @param {String} html 
     */
    setHtml(html) {
        this.mailOptions.html = html;
    }
    /**
     * 
     * @param {Object} options 
     */
    setMailOptions(options) {
        this.mailOptions = options;
    }

    /**
     * send
     * @return {Object}
     */
    async send() {
        try {
            this.validator.checkOptions(this.mailOptions);
            let res = await this.transporter.sendMail(this.mailOptions);
            return res;
        } catch (error) {
            throw new EmailException(error.message, 500, {
                errno: error.errno,
                syscall: error.syscall, 
                address: error.address, 
                port: error.port, 
                command: error.command
            });
        }
    }
}
