/**
 * STRING
 * @param {Number} length 
 */
function STRING(length) {
    length = length || 255;
    if (!(this instanceof STRING)) {
        return new STRING(length);
    }
    this.length = length;
    this.sql = 'VARCHAR(' + length + ')';
}

/**
 * VARCHAR
 * @param {NUMBER} length 
 */
function VARCHAR(length) {
    length = length || 255;
    if (!(this instanceof VARCHAR)) {
        return new VARCHAR(length);
    }
    this.length = length;
    this.sql = 'VARCHAR(' + length + ')';
}
/**
 * CHAR
 * @param {NUMBER} length 
 */
function CHAR(length) {
    length = length || 255;
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
    length = length || 255;
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
    length = length || 255;
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
    length = length || 255;
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
    length = length || 255;
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
    length = length || 255;
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
    length = length || 255;
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
    length = length || 255;
    if (!(this instanceof TINYINT)) {
        return new TINYINT(length);
    }
    this.length = length;
}

/**
 * TINYINT
 * @param {NUMBER} length 
 */
function INTEGER(length) {
    length = length || 11;
    if (!(this instanceof INTEGER)) {
        return new INTEGER(length);
    }
    this.length = length > 11 ? 11 : length;
    this.sql = 'INT(' + this.length + ')';
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
    TINYINT,
    INTEGER
};

module.exports = Type;