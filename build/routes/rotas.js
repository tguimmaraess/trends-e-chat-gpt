"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotas = void 0;
const express_1 = require("express");
var googleTrends = require('google-trends-api');
var rota = (0, express_1.Router)();
function rotas() {
    rota.get('/', function (req, res) {
        res.json({ mensagem: "A API está funcionando, use exemplolink.com/interesse?=Seu_Interesse para começar!" });
    }),
        rota.get("/interesse", function (req, res) {
            if (req.query.interesse != null && req.query.interesse !== "") {
                googleTrends.interestOverTime({ keyword: 'Women\'s march' }).then(function (resposta) {
                    res.json({ mensagem: JSON.parse(resposta) });
                }).catch(function (erro) {
                    res.json({ mensagem: erro });
                });
            }
            else {
                res.json({ mensagem: "É preciso enviar um termo de busca. Exemplo: exemplolink.com/interesse?=Seu_Interesse" });
            }
        });
}
exports.rotas = rotas;
