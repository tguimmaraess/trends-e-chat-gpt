"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
var googleTrends = require('google-trends-api');
var bodyParser = require('body-parser');
const generate_1 = __importDefault(require("./chatgpt/generate"));
var app = (0, express_1.default)();
var rota = (0, express_2.Router)();
var porta = process.env.PORT || 3333;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express_1.default.json());
var opcoes = {
    geoLocation: "Brazil",
    hl: "pt-BR",
    keyword: ""
};
rota.get('/', function (req, res) {
    res.json({ mensagem: "A API está funcionando, use exemplolink.com/interesse?interesse=Seu_Interesse para começar!" });
});
rota.get("/interesse", function (req, res) {
    if (req.query.interesse != null && req.query.interesse !== "") {
        opcoes.keyword = req.query.interesse;
        googleTrends.interestOverTime(opcoes).then(function (resposta) {
            res.json({ mensagem: JSON.parse(resposta) });
        }).catch(function (erro) {
            res.json({ mensagem: erro });
        });
    }
    else {
        res.json({ mensagem: "É preciso enviar um termo de busca. Exemplo: exemplolink.com/interesse?interesse=Seu_Interesse" });
    }
});
rota.get("/complecao", function (req, res) {
    if (req.query.complecao != null && req.query.complecao !== "") {
        opcoes.keyword = req.query.complecao;
        googleTrends.autoComplete(opcoes).then(function (resposta) {
            res.json({ mensagem: JSON.parse(resposta) });
        }).catch(function (erro) {
            res.json({ mensagem: erro });
        });
    }
    else {
        res.json({ mensagem: "É preciso enviar um termo de busca. Exemplo: exemplolink.com/complecao?complecao=Termo_para_ser_auto_completado" });
    }
});
rota.get("/busca-relacionada", function (req, res) {
    if (req.query.buscarelacionada != null && req.query.buscarelacionada !== "") {
        opcoes.keyword = req.query.buscarelacionada;
        googleTrends.autoComplete(opcoes).then(function (resposta) {
            res.json({ mensagem: JSON.parse(resposta) });
        }).catch(function (erro) {
            res.json({ mensagem: erro });
        });
    }
    else {
        res.json({ mensagem: "É preciso enviar um termo de busca. Exemplo: exemplolink.com/busca-relacionada?buscarelacionada=Busca_relacionada_que_você_queira" });
    }
});
rota.get("/topicos-de-hoje", function (req, res) {
    if (req.query.topicosdehoje != null && req.query.topicosdehoje !== "") {
        opcoes.keyword = req.query.topicosdehoje;
        googleTrends.autoComplete(opcoes).then(function (resposta) {
            res.json({ mensagem: JSON.parse(resposta) });
        }).catch(function (erro) {
            res.json({ mensagem: erro });
        });
    }
    else {
        res.json({ mensagem: "É preciso enviar um termo de busca. Exemplo: exemplolink.com/topicos-de-hoje?topicosdehoje=Termo_para_ser_buscado" });
    }
});
rota.get("/topicos-relacionados", function (req, res) {
    if (req.query.topicosrelacionados != null && req.query.topicosrelacionados !== "") {
        opcoes.keyword = req.query.topicosrelacionados;
        googleTrends.autoComplete(opcoes).then(function (resposta) {
            res.json({ mensagem: JSON.parse(resposta) });
        }).catch(function (erro) {
            res.json({ mensagem: erro });
        });
    }
    else {
        res.json({ mensagem: "É preciso enviar um termo de busca. Exemplo: exemplolink.com/topicos-relacionado?topicosrelacionado=Tópico_para_ser_buscado" });
    }
});
rota.get("/gerar-nome-de-animal", function (req, res) {
    if (req.query.animal != null && req.query.animal !== "") {
        (0, generate_1.default)(req, res).then(function (resposta) {
            return resposta;
        });
        // return;
    }
    else {
        res.json({ mensagem: "É preciso enviar um termo de busca. Exemplo: exemplolink.com/gerar-nome-de-animal?animal=Cavalo" });
    }
});
app.use(rota);
app.listen(porta, function () {
    console.log('server running on port 3333');
});
