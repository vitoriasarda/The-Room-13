//animações da parede 1 
almofada.addEventListener('click', function(){
    almofada.classList.toggle('cima');
});

almofada2.addEventListener('click', function(){
    almofada2.classList.toggle('cima');
});

quadro.addEventListener('click', function(){
    quadro.classList.toggle('esquerda');
});

porta.addEventListener('click', function() {
    audioTrancado.play().catch(e => console.error("Erro ao tocar áudio 'trancado':", e));
});

// animações da parede 2
let estadoStationRadio = 'parado';
station_radio.addEventListener('click', function() {
    if (estadoStationRadio === 'parado') {
        audioFantasma.pause();
        audioFantasma.currentTime = 0;
        audioStation.play().then(() => {
            estadoStationRadio = 'estacao';
        }).catch(err => console.error("Erro ao tocar áudio da estação:", err));
    } else if (estadoStationRadio === 'estacao') {
        audioStation.pause();
        audioStation.currentTime = 0;
        audioFantasma.play().then(() => {
            estadoStationRadio = 'fantasma';
        }).catch(err => console.error("Erro ao tocar áudio do fantasma:", err));
    } else if (estadoStationRadio === 'fantasma') {
        audioFantasma.pause();
        audioFantasma.currentTime = 0;
        estadoStationRadio = 'parado';
    }
});

let tvLigada = false;
tv.addEventListener('click', function() {
    if (!tvLigada) {
        tv.style.display = 'none';
        videoTV.style.display = 'block';
        videoTV.play();
        tvLigada = true;
    }
});

videoTV.addEventListener('click', function() {
    if (tvLigada) {
        videoTV.pause();
        videoTV.currentTime = 0;
        videoTV.style.display = 'none';
        tv.style.display = 'block';
        tvLigada = false;
    }
});

videoTV.addEventListener('ended', function() {
    if (tvLigada) {
        videoTV.style.display = 'none';
        tv.style.display = 'block';
        tvLigada = false;
    }
});

livro.addEventListener('click', function(){
    livro.classList.toggle('cima');
});

itensPequenos.addEventListener('click', function(){
    itensPequenos.classList.toggle('cima');
})

camera.addEventListener('click', function(){
    camera.classList.toggle('esquerda');
})

abajur.addEventListener('click', function(){
    abajur.classList.toggle('cima');
})

cafe.addEventListener('click', function(){
    cafe.classList.toggle('cima');
})

quadroParede2.addEventListener('click', function(){
    quadroParede2.classList.toggle('esquerda');
})

// animações da parede 4
relogioParede4.addEventListener('click', function(){
    relogioParede4.classList.toggle('esquerda');
    
})

almofada1Parede4.addEventListener('click', function(){
    almofada1Parede4.classList.toggle('cima');
})

almofada2Parede4.addEventListener('click', function(){
    almofada2Parede4.classList.toggle('cima');
})

quadro1Parede4.addEventListener('click', function(){
    quadro1Parede4.classList.toggle('cima');
})

quadro2Parede4.addEventListener('click', function(){
    quadro2Parede4.classList.toggle('esquerda');
})

// animações da parede 3
dadosParede3.addEventListener('click', function(){
    dadosParede3.classList.toggle('cima');  
});

quadroParede3.addEventListener('click', function(){
    quadroParede3.classList.toggle('esquerda-quadro-cofre');  
});

plantaParede3.addEventListener('click', function(){
    plantaParede3.classList.toggle('direita')
});

// a lógica do cofre
function atualizarDisplay() {
    const texto = entrada.padEnd(3, '_');
    displaySenha.textContent = texto.split('').join(' ');
}
let anel_coletado = false;

botoes.forEach(botao => {
    // pega o clique dos botoes do cofre 123456789
    botao.addEventListener('click', () => {
        // se o cofre ta aberto da return
        if (cofre.src.includes('cofre-aberto')) {
            return;
        }

        // pega a senha
        if (entrada.length < 4) {
            entrada += botao.textContent;
            atualizarDisplay();
        }
        // caso a senha seja igual a tres digitos
        if (entrada.length === 3) {
            //e se o codigo inserido for o correto:
            if (entrada === codigoCorreto) {
                cofre.src = '/static/imgs/cofre-aberto.png';
                cofre.classList.add('cofre-aberto-tamanho');
                displaySenha.style.display = 'none';
                cofreDigitos.style.display = 'none';
                anel.style.display = 'block';
            } else {
                displaySenha.textContent = 'ERRO';
                setTimeout(() => {
                    entrada = '';
                    atualizarDisplay();
                }, 1000);
            }
        }
    });
});

// evento para fechar o diario depois de lido: 
closeLivro.addEventListener('click', function(){
    diariopag1.style.display = 'none';
    diariopag2.style.display = 'none';
    closeLivro.style.display = 'none';
    quadroParede3.style.display = 'block'; 
});
