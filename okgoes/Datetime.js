/**
 * 日期时间出来函数
 */
class DateTime {
    /**
     * 构造函数
     * @param {String|Number} times
     */
    constructor(times) {
        times = times || 0;
        if (times) {
            this.date = new Date(times);
        } else {
            this.date = new Date();
        }
        this.now = this.getYear() + '-' + this.getMonth() + '-' + this.getDay() + ' ' + this.getHours() + ':' + this.getMinutes() + ':' + this.getSeconds();
    }

    /**
     * 返回年份
     * @return {String}
     */
    getYear() {
        return this.date.getFullYear();
    }

    /**
     * 返回月份
     * @return {String}
     */
    getMonth() {
        let month = (this.date.getMonth() + 1).toString();
        if (month.length < 2) {
            month = '0' + month;
        }
        return month;
    }

    /**
     * 获取日期
     * @return {String}
     */
    getDay() {
        let day = this.date.getDate().toString();
        if (day.length < 2) {
            day = '0' + day;
        }
        return day;
    }
    /**
     * 获取小时
     * @return {String}
     */
    getHours() {
        let hours = this.date.getHours().toString();
        if (hours.length < 2) {
            hours = '0' + hours;
        }
        return hours;
    }
    /**
     * 获取分数
     * @return {String}
     */
    getMinutes() {
        let minutes = this.date.getMinutes().toString();
        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }
        return minutes;
    }

    /**
     * 获取秒数
     * @return {String}
     */
    getSeconds() {
        let seconds = this.date.getSeconds().toString();
        if (seconds.length < 2) {
            seconds = '0' + seconds;
        }
        return seconds;
    }

    /**
     * 返回当前时间
     * @return {String}
     */
    getNow() {
        return this.now;
    }
}
module.exports = DateTime;
