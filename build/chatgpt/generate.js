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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePrompt = void 0;
const openai_1 = require("openai");
const configuration = new openai_1.Configuration({
    apiKey: "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",
});
const openai = new openai_1.OpenAIApi(configuration);
function default_1(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const completion = yield openai.createCompletion({
                model: "text-davinci-003",
                prompt: generatePrompt(animal),
                temperature: 0.6,
            });
            res.status(200).json({ result: completion.data.choices[0].text });
        }
        catch (erro) {
            // Consider adjusting the error handling logic for your use case
            if (erro.response) {
                console.error(erro.response.status, erro.response.data);
                res.status(erro.response.status).json(erro.response.data);
            }
            else {
                console.error(`Erro ao linkar com a OpenAI: ${erro.message}`);
                res.status(500).json({
                    error: {
                        message: 'Ocorreu um erro durante o pedido.',
                    }
                });
            }
        }
    });
}
exports.default = default_1;
function generatePrompt(animal) {
    const capitalizedAnimal = animal[0].toUpperCase() + animal.slice(1).toLowerCase();
    return `Sugerir 3 nomes para animais que são super heróis.  Traduzir para portguês`;
}
exports.generatePrompt = generatePrompt;
