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
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const setHeaders_1 = __importDefault(require("./middlewares/setHeaders"));
const app = express_1.default();
dotenv_1.default.config();
app.use(setHeaders_1.default);
const port = 3000;
const { GRANT_TYPE, CLIENT_ID, CLIENT_SECRET, SCOPE } = process.env;
function getToken() {
    return __awaiter(this, void 0, void 0, function* () {
        let token;
        try {
            const response = yield axios_1.default.post(`https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=%2Fpartenaire&grant_type=${GRANT_TYPE}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&scope=${SCOPE}`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            token = response.data;
        }
        catch (error) {
            console.error(error);
        }
        return token;
    });
}
function getPEJobs(page) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield getToken();
        let index = page * 10;
        const range = `${index - 10}-${index + 9 - 10}`;
        console.log(range);
        try {
            const response = yield axios_1.default.get(`https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres/search?publieeDepuis=31&motsCles=batiment&range=${range}`, {
                headers: {
                    Authorization: `Bearer ${token.access_token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            });
            index += 10;
            return response.data;
        }
        catch (error) {
            console.error(error);
        }
    });
}
app.get("/jobs/:page", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.params.page;
    const data = yield getPEJobs(page);
    const response = {
        pages: data.resultats.length / 10,
        data: data.resultats
    };
    res.json(response);
}));
app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map