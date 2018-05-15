/**
 * STRING
 * @param {Number} length 
 */
function STRING(length) {
    if (!(this instanceof STRING)) {
        return new String(length);
    }
    this.length = length;
}

/**
 * VARCHAR
 * @param {NUMBER} length 
 */
function VARCHAR(length) {
    if (!(this instanceof VARCHAR)) {
        return new VARCHAR(length);
    }
    this.length = length;
}
/**
 * CHAR
 * @param {NUMBER} length 
 */
function CHAR(length) {
    if (!(this instanceof CHAR)) {
        return new CHAR(length);
    }
    this.length = length;
}
/**
 * NUMBER
 * @param {NUMBER} length 
 */
function NUMBER(length) {
    if (!(this instanceof NUMBER)) {
        return new NUMBER(length);
    }
    this.length = length;
}
/**
 * TEXT
 * @param {NUMBER} length 
 */
function TEXT(length) {
    if (!(this instanceof TEXT)) {
        return new TEXT(length);
    }
    this.length = length;
}
/**
 * DATE
 * @param {NUMBER} length 
 */
function DATE(length) {
    if (!(this instanceof DATE)) {
        return new DATE(length);
    }
    this.length = length;
}
/**
 * TIMESTAMP
 * @param {NUMBER} length 
 */
function TIMESTAMP(length) {
    if (!(this instanceof TIMESTAMP)) {
        return new TIMESTAMP(length);
    }
    this.length = length;
}
/**
 * FLOAT
 * @param {NUMBER} length 
 */
function FLOAT(length) {
    if (!(this instanceof FLOAT)) {
        return new FLOAT(length);
    }
    this.length = length;
}
/**
 * DOUBLE
 * @param {NUMBER} length 
 */
function DOUBLE(length) {
    if (!(this instanceof DOUBLE)) {
        return new DOUBLE(length);
    }
    this.length = length;
}
/**
 * TINYINT
 * @param {NUMBER} length 
 */
function TINYINT(length) {
    if (!(this instanceof TINYINT)) {
        return new TINYINT(length);
    }
    this.length = length;
}

const Type = {
    STRING,
    VARCHAR,
    CHAR,
    NUMBER,
    TEXT,
    DATE,
    TIMESTAMP,
    FLOAT,
    DOUBLE,
    TINYINT
};

module.exports = Type;