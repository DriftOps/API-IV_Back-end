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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var cors_1 = require("cors"); // Adicionando CORS
var user_1 = require("./user");
var client_1 = require("./client");
var processo_1 = require("./processo"); // Adicionando CRUD de processos
var app = (0, express_1.default)();
var PORT = 3001;
// Middleware
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)()); // Habilitar CORS para todas as requisições
// CRUD de Usuários
var crudUser = new user_1.default();
app.post('/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, id, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.body;
                return [4 /*yield*/, crudUser.create(user)];
            case 1:
                id = _a.sent();
                res.status(201).send("User created with ID ".concat(id));
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                res.status(500).send('Error creating user');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, crudUser.readAll()];
            case 1:
                users = _a.sent();
                res.json(users);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error(error_2);
                res.status(500).send('Error retrieving users');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/users/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id, 10);
                return [4 /*yield*/, crudUser.readOne(id)];
            case 1:
                user = _a.sent();
                if (!user) {
                    res.status(404).send('User not found');
                }
                else {
                    res.json(user);
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                res.status(500).send('Error retrieving user');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.put('/users/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id, 10);
                user = req.body;
                user.id = id; // Adicionando ID ao objeto user
                return [4 /*yield*/, crudUser.update(user)];
            case 1:
                _a.sent();
                res.send("User updated with ID ".concat(id));
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error(error_4);
                res.status(500).send('Error updating user');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.delete('/users/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id, 10);
                return [4 /*yield*/, crudUser.delete(id)];
            case 1:
                _a.sent();
                res.send("User deleted with ID ".concat(id));
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error(error_5);
                res.status(500).send('Error deleting user');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// CRUD de Clientes
var crudClient = new client_1.default();
app.post('/clients', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var client, id, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                client = req.body;
                return [4 /*yield*/, crudClient.create(client)];
            case 1:
                id = _a.sent();
                res.status(201).send("Client added with ID ".concat(id));
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.error(error_6);
                res.status(500).send('Error creating client');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/clients', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var clients, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, crudClient.readAll()];
            case 1:
                clients = _a.sent();
                res.json(clients);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                console.error(error_7);
                res.status(500).send('Error retrieving clients');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/clients/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, client, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id, 10);
                return [4 /*yield*/, crudClient.readOne(id)];
            case 1:
                client = _a.sent();
                if (!client) {
                    res.status(404).send('Client not found');
                }
                else {
                    res.json(client);
                }
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                console.error(error_8);
                res.status(500).send('Error retrieving client');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.put('/clients/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, client, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id, 10);
                client = req.body;
                client.id = id; // Adicionando ID ao objeto client
                return [4 /*yield*/, crudClient.update(client)];
            case 1:
                _a.sent();
                res.send("Client updated with ID ".concat(id));
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                console.error(error_9);
                res.status(500).send('Error updating client');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.delete('/clients/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id, 10);
                return [4 /*yield*/, crudClient.delete(id)];
            case 1:
                _a.sent();
                res.send("Client deleted with ID ".concat(id));
                return [3 /*break*/, 3];
            case 2:
                error_10 = _a.sent();
                console.error(error_10);
                res.status(500).send('Error deleting client');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// CRUD de Processos
var crudProcesso = new processo_1.default();
app.post('/processos', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var processo, id, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                processo = req.body;
                return [4 /*yield*/, crudProcesso.create(processo)];
            case 1:
                id = _a.sent();
                res.status(201).send("Processo added with ID ".concat(id));
                return [3 /*break*/, 3];
            case 2:
                error_11 = _a.sent();
                console.error(error_11);
                res.status(500).send('Error creating processo');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/processos', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var processos, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, crudProcesso.readAll()];
            case 1:
                processos = _a.sent();
                res.json(processos);
                return [3 /*break*/, 3];
            case 2:
                error_12 = _a.sent();
                console.error(error_12);
                res.status(500).send('Error retrieving processos');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/processos/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, processo, error_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id, 10);
                return [4 /*yield*/, crudProcesso.readOne(id)];
            case 1:
                processo = _a.sent();
                if (!processo) {
                    res.status(404).send('Processo not found');
                }
                else {
                    res.json(processo);
                }
                return [3 /*break*/, 3];
            case 2:
                error_13 = _a.sent();
                console.error(error_13);
                res.status(500).send('Error retrieving processo');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.put('/processos/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, processo, error_14;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id, 10);
                processo = req.body;
                processo.id = id; // Adicionando ID ao objeto processo
                return [4 /*yield*/, crudProcesso.update(processo)];
            case 1:
                _a.sent();
                res.send("Processo updated with ID ".concat(id));
                return [3 /*break*/, 3];
            case 2:
                error_14 = _a.sent();
                console.error(error_14);
                res.status(500).send('Error updating processo');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.delete('/processos/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_15;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = parseInt(req.params.id, 10);
                return [4 /*yield*/, crudProcesso.delete(id)];
            case 1:
                _a.sent();
                res.send("Processo deleted with ID ".concat(id));
                return [3 /*break*/, 3];
            case 2:
                error_15 = _a.sent();
                console.error(error_15);
                res.status(500).send('Error deleting processo');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Iniciar o servidor
app.listen(PORT, function () {
    console.log("Servidor rodando na porta ".concat(PORT));
});
exports.default = app;
