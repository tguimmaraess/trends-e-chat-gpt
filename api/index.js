
var console = require('console');
var express =  require('express')
var rota = express.Router()
var googleTrends = require('google-trends-api');
var bodyParser = require('body-parser')

var generate =  require("./chatgpt/generate")
var generate2  =  require("./chatgpt/generate")
var app = express();

var porta = process.env.PORT || 3333
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

var opcoes = {
    geo: "BR",
    hl: "pt-BR",
    keyword: ""
}

rota.get('/api/', function(req, res) {
  res.json({mensagem: "A API está funcionando, use exemplolink.com/api/1?interesse=Seu_Interesse para pesquisar interesses!"})
})

rota.get("/api/1", function(req, res) {
    if (req.query.interesse != null && req.query.interesse !== "") {
        opcoes.keyword = req.query.interesse
        googleTrends.interestOverTime(opcoes).then(function(resposta) {
            res.json({mensagem: JSON.parse(resposta)})
        }).catch(function(erro) {
            res.json({mensagem: erro})   
        })
    } else {
        res.json({mensagem: "É preciso enviar um termo de busca. Exemplo: exemplolink.com/api/1?interesse=Seu_Interesse"})   
    }
})


rota.get("/api/2", function(req, res) {
    if (req.query.complecao != null && req.query.complecao !== "") {
        opcoes.keyword = req.query.complecao
        googleTrends.autoComplete(opcoes).then(function(resposta) {
            res.json({mensagem: JSON.parse(resposta)})
        }).catch(function(erro) {
            res.json({mensagem: erro})   
        })
    } else {
        res.json({mensagem: "É preciso enviar um termo de busca. Exemplo: exemplolink.com/api/2?complecao=Termo_para_ser_auto_completado"})   
    }
})


rota.get("/api/3", function(req, res) {
    if (req.query.buscarelacionada != null && req.query.buscarelacionada !== "") {
        opcoes.keyword = req.query.buscarelacionada
        googleTrends.relatedQueries(opcoes).then(function(resposta) {
            res.json({mensagem: JSON.parse(resposta)})
        }).catch(function(erro) {
            res.json({mensagem: erro})   
        })
    } else {
        res.json({mensagem: "É preciso enviar um termo de busca. Exemplo: exemplolink.com/api/3?buscarelacionada=Busca_relacionada_que_você_queira"})   
    }
})


rota.get("/api/4", function(req, res) {
    if (req.query.topicosdehoje != null && req.query.topicosdehoje !== "") {
        opcoes.keyword = req.query.topicosdehoje
        googleTrends.dailyTrends(opcoes).then(function(resposta) {
            res.json({mensagem: JSON.parse(resposta)})
        }).catch(function(erro) {
            res.json({mensagem: erro})   
        })
    } else {
        res.json({mensagem: "É preciso enviar um termo de busca. Exemplo: exemplolink.com/api/4?topicosdehoje=Termo_para_ser_buscado"})   
    }
})


rota.get("/api/5", function(req, res) {
    if (req.query.topicosrelacionados != null && req.query.topicosrelacionados !== "") {
        opcoes.keyword = req.query.topicosrelacionados
        googleTrends.relatedTopics(opcoes).then(function(resposta) {
            res.json({mensagem: JSON.parse(resposta)})
        }).catch(function(erro) {
            res.json({mensagem: erro})   
        })
    } else {
        res.json({mensagem: "É preciso enviar um termo de busca. Exemplo: exemplolink.com/api/5?topicosrelacionado=Tópico_para_ser_buscado"})   
    }
})


rota.get("/api/6", function(req, res) {
    if (req.query.animal != null && req.query.animal !== "") {   
        generate.generate(req, res).then(function(resposta) {
            return resposta     
        })
       // return;
      
    } else {
        res.json({mensagem: "É preciso enviar um termo de busca. Exemplo: exemplolink.com/api/6?animal=Cavalo"})   
    }
})


rota.get("/api/7", function(req, res) {
    googleTrends.realTimeTrends(opcoes).then(function(resposta) {
        let primeiroTopico = JSON.parse(resposta)["storySummaries"]["trendingStories"][0]
        let texto =""
        for (const key in primeiroTopico) {
            if (Object.hasOwnProperty.call(primeiroTopico, key)) {
                if (key == "articles") {
                    const element = primeiroTopico[key][0];
                    let texto = element.articleTitle
                    generate.generate2(req, res, texto).then(function(resposta) {
                        return JSON.parse(resposta);
                    })
                }
                
            }
        }
      

    }).catch(function(erro) {
        res.json({mensagem: erro})   
    })

})


app.use(rota)

app.listen(porta, function() {
  console.log('server running on port 3333')
})