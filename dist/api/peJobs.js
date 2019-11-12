"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    cloudinary.v2.api.sub_folders("collections", (error, result) => {
        if (error !== undefined) {
            console.log('Error retrieving images');
        }
        res.json({ collections: result.folders });
    });
});
exports.default = router;
//# sourceMappingURL=peJobs.js.map