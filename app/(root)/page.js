"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const HeaderBox_1 = __importDefault(require("@/components/HeaderBox"));
const Home = () => {
    const LoggedIn = { firstname: "Sanchit" };
    return (<section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox_1.default type="greeting" title="Welcome" user={(LoggedIn === null || LoggedIn === void 0 ? void 0 : LoggedIn.firstname) || "Guest"} subtext="Acess granted"/>
                </header>
            </div>
        </section>);
};
exports.default = Home;
