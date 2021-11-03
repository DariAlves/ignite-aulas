"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var port = process.env.PORT || 3333;
app.get('/', function (request, response) {
    return response.json({ message: 'Hello, world!' });
});
app.listen(port, function () {
    console.log("Server listening on port " + port);
});