"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_cron_1 = __importDefault(require("node-cron"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router/router"));
const checkIntervals_1 = __importDefault(require("./utilities/checkIntervals"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// const startServer = async function (PORT: number) {
// if (!PORT) PORT = 3118;
const PORT = process.env.PORT || 3111;
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)()).use(express_1.default.json());
node_cron_1.default.schedule('* * * * *', () => {
    // console.log('running a task every minute');
    (0, checkIntervals_1.default)();
});
app.use(router_1.default).listen(PORT, () => {
    (0, checkIntervals_1.default)();
    console.log(`🚀🚀 Running express server at ${PORT} 🚀🚀 `);
});
// };
// const app = startServer(3111);
exports.default = app;
