"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("firebase/app");
require("firebase/firestore");
var FirebaseRepository = /** @class */ (function () {
    function FirebaseRepository(config) {
        this.init(config);
    }
    FirebaseRepository.prototype.init = function (config) {
        firebase.initializeApp(config);
        this.firestore = firebase.firestore();
    };
    return FirebaseRepository;
}());
exports.FirebaseRepository = FirebaseRepository;
//# sourceMappingURL=firebase.repository.js.map