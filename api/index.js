
var console = require('console');
var express =  require('express')
var rota = express.Router()
var googleTrends = require('google-trends-api');
var bodyParser = require('body-parser')

var generate =  require("./chatgpt/generate")

var app = express();

var porta = process.env.PORT || 3333
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

var opcoes = {
    geoLocation: "Brazil",
    hl: "pt-BR",
    keyword: ""
}

rota.get('/', function(req, res) {
  res.json({mensagem: "A API está funcionando, use exemplolink.com/interesse?interesse=Seu_Interesse para começar!"})
})

rota.get("/interesse", function(req, res) {
    if (req.query.interesse != null && req.query.interesse !== "") {
        opcoes.keyword = req.query.interesse
        googleTrends.interestOverTime(opcoes).then(function(resposta) {
            res.json({mensagem: JSON.parse(resposta)})
        }).catch(function(erro) {
            res.json({mensagem: erro})   
        })
    } else {
        res.json({mensagem: "É preciso enviar um termo de busca. Exemplo: exemplolink.com/interesse?interesse=Seu_Interesse"})   
    }
})


rota.get("/complecao", function(req, res) {
    if (req.query.complecao != null && req.query.complecao !== "") {
        opcoes.keyword = req.query.complecao
        googleTrends.autoComplete(opcoes).then(function(resposta) {
            res.json({mensagem: JSON.parse(resposta)})
        }).catch(function(erro) {
            res.json({mensagem: erro})   
        })
    } else {
        res.json({mensagem: "É preciso enviar um termo de busca. Exemplo: exemplolink.com/complecao?complecao=Termo_para_ser_auto_completado"})   
    }
})


rota.get("/busca-relacionada", function(req, res) {
    if (req.query.buscarelacionada != null && req.query.buscarelacionada !== "") {
        opcoes.keyword = req.query.buscarelacionada
        googleTrends.autoComplete(opcoes).then(function(resposta) {
            res.json({mensagem: JSON.parse(resposta)})
        }).catch(function(erro) {
            res.json({mensagem: erro})   
        })
    } else {
        res.json({mensagem: "É preciso enviar um termo de busca. Exemplo: exemplolink.com/busca-relacionada?buscarelacionada=Busca_relacionada_que_você_queira"})   
    }
})


rota.get("/topicos-de-hoje", function(req, res) {
    if (req.query.topicosdehoje != null && req.query.topicosdehoje !== "") {
        opcoes.keyword = req.query.topicosdehoje
        googleTrends.autoComplete(opcoes).then(function(resposta) {
            res.json({mensagem: JSON.parse(resposta)})
        }).catch(function(erro) {
            res.json({mensagem: erro})   
        })
    } else {
        res.json({mensagem: "É preciso enviar um termo de busca. Exemplo: exemplolink.com/topicos-de-hoje?topicosdehoje=Termo_para_ser_buscado"})   
    }
})


rota.get("/topicos-relacionados", function(req, res) {
    if (req.query.topicosrelacionados != null && req.query.topicosrelacionados !== "") {
        opcoes.keyword = req.query.topicosrelacionados
        googleTrends.autoComplete(opcoes).then(function(resposta) {
            res.json({mensagem: JSON.parse(resposta)})
        }).catch(function(erro) {
            res.json({mensagem: erro})   
        })
    } else {
        res.json({mensagem: "É preciso enviar um termo de busca. Exemplo: exemplolink.com/topicos-relacionado?topicosrelacionado=Tópico_para_ser_buscado"})   
    }
})


rota.get("/gerar-nome-de-animal", function(req, res) {
    if (req.query.animal != null && req.query.animal !== "") {   
        generate(req, res).then(function(resposta) {
            return resposta     
        })
       // return;
      
    } else {
        res.json({mensagem: "É preciso enviar um termo de busca. Exemplo: exemplolink.com/gerar-nome-de-animal?animal=Cavalo"})   
    }
})


app.use(rota)

app.listen(porta, function() {
  console.log('server running on port 3333')
})