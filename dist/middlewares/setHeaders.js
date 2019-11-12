"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}
exports.default = default_1;
//# sourceMappingURL=setHeaders.js.map