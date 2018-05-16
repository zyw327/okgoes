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
 * @param {Number} length 
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
 * @param {Number} length 
 */
function CHAR(length) {
    length = length || 255;
    if (!(this instanceof CHAR)) {
        return new CHAR(length);
    }
    this.length = length;
    this.sql = 'CHAR(' + length + ')';
}
/**
 * NUMBER
 * @param {Number} m
 * @param {Number} d
 */
function NUMBER(m, d) {
    m = m || 10
    d = d || 0;
    if (!(this instanceof NUMBER)) {
        return new NUMBER(m, d);
    }
    this.sql = "DECIMAL(" + m + "," + d + ")";
}
/**
 * TEXT
 */
function TEXT() {
    if (!(this instanceof TEXT)) {
        return new TEXT();
    }
    this.sql = "TEXT";
}
/**
 * DATE
 */
function DATE() {
    if (!(this instanceof DATE)) {
        return new DATE();
    }
    this.sql = "DATE";
}
/**
 * TIMESTAMP
 */
function TIMESTAMP() {
    if (!(this instanceof TIMESTAMP)) {
        return new TIMESTAMP();
    }
    this.sql = 'TIMESTAMP';
}
/**
 * FLOAT
 * @param {Number} m
 * @param {Number} d
 */
function FLOAT(m, d) {
    m = m || 10
    d = d || 0;
    if (!(this instanceof FLOAT)) {
        return new FLOAT(m, d);
    }
    this.sql = "FLOAT(" + m + "," + d + ")";
}
/**
 * DOUBLE
 * @param {Number} m
 * @param {Number} d
 */
function DOUBLE(m, d) {
    m = m || 10
    d = d || 0;
    if (!(this instanceof DOUBLE)) {
        return new DOUBLE(m, d);
    }
    this.sql = "DOUBLE(" + m + "," + d + ")";
}
/**
 * TINYINT
 * @param {Number} length 
 */
function TINYINT(length) {
    length = length || 255;
    if (!(this instanceof TINYINT)) {
        return new TINYINT(length);
    }
    this.length = length;
    this.sql = 'TINYINT(' + this.length + ')';
}

/**
 * TINYINT
 * @param {Number} length 
 */
function INTEGER(length) {
    length = length || 11;
    if (!(this instanceof INTEGER)) {
        return new INTEGER(length);
    }
    this.length = length > 11 ? 11 : length;
    this.sql = 'INT(' + this.length + ')';
}

/**
 * BOOLEAN
 */
function BOOLEAN () {
    if (!(this instanceof INTEGER)) {
        return new BOOLEAN();
    }
    this.sql = 'TINYINT(1)';
}

/**
 * BIGINT
 *  @param {Number} length 
 */
function BIGINT (length) {
    length = length || 11;
    if (!(this instanceof BIGINT)) {
        return new BIGINT(length);
    }
    this.length = length > 11 ? 11 : length;
    this.sql = 'BIGINT(' + this.length + ')';
}

/**
 * ENUM
 * @param {Array} values 
 */
function ENUM(values) {
    if (!values || !(values instanceof Array) || !values.length) {
        throw new Error();
    }
    if (!(this instanceof ENUM)) {
        return new ENUM(values);
    }
    this.sql = 'ENUM(' + values.join(',') + ')';
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
    INTEGER,
    BOOLEAN,
    BIGINT,
    ENUM
};

module.exports = Type;