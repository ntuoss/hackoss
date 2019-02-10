"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate_js_1 = require("validate.js");
validate_js_1.validators.beforeTime = function (time, options, key, attributes) {
    var otherTime = attributes[options.timeAttribute];
    if (time >= otherTime) {
        return options.message || options.timeAttribute + " is after " + key;
    }
};
validate_js_1.validators.afterTime = function (time, options, key, attributes) {
    var otherTime = attributes[options.timeAttribute];
    if (time <= otherTime) {
        return options.message || options.timeAttribute + " is before " + key;
    }
};
validate_js_1.validators.array = function (value, options, key, attributes) {
    return value.map(function (v) { return validate_js_1.validate(v, options.constraints); });
};
validate_js_1.validators.object = function (value, options, key, attributes) {
    return validate_js_1.validate(value, options.constraints);
};
//# sourceMappingURL=validators.js.map