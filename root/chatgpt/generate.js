var configuracao = require("openai");


const configuration = new  configuracao.Configuration({
    apiKey: "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",
});
const openai = new  configuracao.OpenAIApi(configuration);

async function generate(req, res) {

  
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "A chave não está configurada",
      }
    });
    return;
  }

  const animal = req.query.animal || '';
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid animal",
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

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Sugerir 3 nomes para animais que são super heróis.  Traduzir para portguês`;
}

module.exports = generate