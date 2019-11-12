"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
function getToken() {
    return __awaiter(this, void 0, void 0, function* () {
        let token;
        try {
            const response = yield axios_1.default.post("https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=%2Fpartenaire&grant_type=client_credentials&client_id=PAR_esimplu_6d01d503b9969b5a603a608bc2bf1aba23460cbe24c8a2691534c830cf79899e&client_secret=44713bde3b3e0d313b5aaccbceae4da8e299ad0237d18b4b1b391572609cd81a&scope=api_offresdemploiv2%20application_PAR_esimplu_6d01d503b9969b5a603a608bc2bf1aba23460cbe24c8a2691534c830cf79899e%20o2dsoffre", {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            token = response.data;
        }
        catch (error) { }
        return token;
    });
}
const token = getToken();
const config = {
    headers: {
        Authorization: "Bearer PAR_esimplu_6d01d503b9969b5a603a608bc2bf1aba23460cbe24c8a2691534c830cf79899e",
        "Content-Type": "application/json",
        Accept: "application/json"
    }
};
exports.axiosInstance = axios_1.default.create(config);
//# sourceMappingURL=axios.js.map