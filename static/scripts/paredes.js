const botao_iniciar = document.querySelector('.button-entrar');

window.addEventListener('DOMContentLoaded', function() {
    inventario.style.display = 'none';
    parede1.style.display = 'none';

    botao_iniciar.addEventListener('click', function(){
    paredeEntrar.style.display = 'none';
    setTimeout(() =>{
        inventario.style.display = 'block';
        parede1.style.display = 'block';
    }, 300);
}); 

let salaAtual = 'parede1';

setasEsquerda.forEach(seta => {
    seta.addEventListener('click', function () {
        if (salaAtual === 'parede1') {
            mudarSala('parede1', 'parede2');
        } else if (salaAtual === 'parede2') {
            mudarSala('parede2', 'parede4');
        } else if (salaAtual === 'parede4') {
            mudarSala('parede4', 'parede3');
        } else if (salaAtual === 'parede3') {
            mudarSala('parede3', 'parede1');
        }
    });
});

setasDireita.forEach(seta => {
    seta.addEventListener('click', function () {
        if (salaAtual === 'parede1') {
            mudarSala('parede1', 'parede3');
        } else if (salaAtual === 'parede3') {
            mudarSala('parede3', 'parede4');
        } else if (salaAtual === 'parede4') {
            mudarSala('parede4', 'parede2');
        } else if (salaAtual === 'parede2') {
            mudarSala('parede2', 'parede1');
        }
    });
});

function mudarSala(de, atual) {
    document.querySelector(`.${de}`).style.display = 'none';
    setTimeout(() => {
        document.querySelector(`.${atual}`).style.display = 'block';
    }, 300)

    salaAtual = atual;

    //manda para o Go
    fetch('/trocar-parede', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parede: atual })
    })
    .then(res => res.json())
    .then(data => console.log('Estado atualizado', data));
}
})
