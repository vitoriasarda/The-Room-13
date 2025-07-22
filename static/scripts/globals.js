//! objetos interativos
const almofada = document.querySelector('.almofada-preta');
const almofada2 = document.querySelector('.almofada-branca');
const quadro = document.querySelector('.quadro');
const chave = document.querySelector('.chave');
const armarioofc = document.querySelector('.armarioofc');
const armarioaberto = document.querySelector('.armario-aberto');
const station_radio = document.querySelector('.radio'); 
const tv = document.querySelector('.tv');
const videoTV = document.querySelector('.videoTV');
const livro = document.querySelector('.livro-parede2');
const itensPequenos = document.querySelector('.itens-pequenos');
const camera = document.querySelector('.camera');
const abajur = document.querySelector('.abajur');
const cafe = document.querySelector('.cafe');
const papel = document.querySelector('.papel');
const quadroParede2 = document.querySelector('.quadro-parede2');
const relogioParede4 = document.querySelector('.relogio-parede4');
const almofada1Parede4 = document.querySelector('.almofada1');
const almofada2Parede4 = document.querySelector('.almofada2');
const quadro1Parede4 = document.querySelector('.quadro1');
const quadro2Parede4 = document.querySelector('.quadro2');
const quadroParede3 = document.querySelector('.quadro-parede3');
const dadosParede3 = document.querySelector('.dados');
const cofre = document.querySelector('.cofre');
const cofreAberto = document.querySelector('.cofre-aberto');
const plantaParede3 = document.querySelector('.planta');
const closeLivro = document.querySelector('.close');
const anel = document.querySelector('.anel');
const porta = document.querySelector('.porta');
const portaAberta = document.querySelector('.porta-aberta');
const fimdejogo = document.querySelector('.pagina-final');

//! paredes
const paredeEntrar = document.querySelector('.pagina-entrar');
const parede1 = document.querySelector('.parede1');
const parede2 = document.querySelector('.parede2');
const parede3 = document.querySelector('.parede3');
const parede4 = document.querySelector('.parede4');

const inventario = document.querySelector('.inventario');
const diario = document.querySelector('.diario');
const diariopag1 = document.querySelector('.diariopag1');
const diariopag2 = document.querySelector('.diariopag2');
const diarioRight = document.querySelector('.diario-right');
const diarioLeft = document.querySelector('.diario-left');

//! botao e setas
const setasDireita = document.querySelectorAll('.arrow-right');
const setasEsquerda = document.querySelectorAll('.arrow-left');

//! audios e video
const audioFantasma = new Audio('/static/audios/fantasma.mp3');
const audioStation = new Audio('/static/audios/station_radio.mp3');
const audioTV = new Audio('/static/audios/tv.mp3');
const audioTrancado = new Audio('/static/audios/trancado.mp3');

//! cofre (Apenas variáveis)
const botoes = document.querySelectorAll('.digitos');
let entrada = '';
const codigoCorreto = '239';
const displaySenha = document.querySelector('.display-senha');
const cofreDigitos = document.querySelector('.cofre-digitos');