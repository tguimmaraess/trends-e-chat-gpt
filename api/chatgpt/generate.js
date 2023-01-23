var configuracao = require("openai");
var bodyParser = require('body-parser')
var express =  require('express')
var app = express();

app.use(bodyParser.json())

const configuration = new  configuracao.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new  configuracao.OpenAIApi(configuration);

async function generate(req, res) {

  
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        mensagem: "A chave não está configurada",
      }
    });
    return;
  }

  const animal = req.query.animal || '';
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        mensagem: "Please enter a valid animal",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(animal),
      temperature: 0.6,
    });
    res.status(200).json({ resultado: completion.data.choices[0].text });
} catch(erro) {
    // Consider adjusting the error handling logic for your use case
    if (erro.response) {
      console.error(erro.response.status, erro.response.data);
      res.status(erro.response.status).json(erro.response.data);
    } else {
      console.error(`Erro ao linkar com a OpenAI: ${erro.message}`);
      res.status(500).json({
        error: {
          mensagem: 'Ocorreu um erro durante o pedido.',
        }
      });
    }
  }
}


async function generate2(req, res, textoTopico) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        mensagem: "A chave não está configurada",
      }
    });
    return;
  }

  const texto = textoTopico || '';
  if (textoTopico.trim().length === 0) {
    res.status(400).json({
      error: {
        mensagem: "Please enter a valid animal",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: gerarPrompt2(texto),
      temperature: 0.6,
      max_tokens: 1000
    });
  
    res.status(200).json({ resultado: completion.data.choices[0].text, topico: texto });
} catch(erro) {
    // Consider adjusting the error handling logic for your use case
    if (erro.response) {
      console.error(erro.response.status, erro.response.data);
      res.status(erro.response.status).json(erro.response.data);
    } else {
      console.error(`Erro ao linkar com a OpenAI: ${erro.message}`);
      res.status(500).json({
        error: {
          mensagem: 'Ocorreu um erro durante o pedido.',
        }
      });
    }
  }
}


function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return "Sugerir 3 nomes para " + animal +"  que são super heróis.  Traduzir para portguês";
}


function gerarPrompt2(texto) {
   return "Criar um título e um texto com " + texto +". Traduzir para português";
}


module.exports = {generate, generate2}