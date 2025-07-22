// variaveis para controle do inventário e seleção
let itemSelecionado = null;
let itensnoInventario = [];
let chaveSelecionada = false;
let diarioSelecionado = false;
let diario_coletado = false;

// função para adicionar item no inventário visualmente e registrar no go
function adicionarItem(nomeDoItem, srcImagem) {
  if (!itensnoInventario.includes(nomeDoItem)) {
    itensnoInventario.push(nomeDoItem);

    const novoItem = document.createElement('img');
    novoItem.src = srcImagem;
    novoItem.classList.add('itens');
    novoItem.dataset.nome = nomeDoItem;

    // com um clique, seleciona o item no inventario
    novoItem.addEventListener('click', function () {
      const todosItens = inventario.querySelectorAll('.itens');
      todosItens.forEach(item => item.classList.remove('selecionada'));
      novoItem.classList.add('selecionada');

      itemSelecionado = novoItem;

      chaveSelecionada = novoItem.dataset.nome === 'chave';
      diarioSelecionado = novoItem.dataset.nome === 'diario';
    });

    inventario.appendChild(novoItem);

    // evnia item coletado para o go
    fetch('/coletar-item', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item: nomeDoItem })
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao registrar item');
        return res.json();
      })
      .then(data => console.log('Item coletado: ', data))
      .catch(err => console.error('Erro ao registrar item:', err));
  }
}

// Evento para clicar na chave
chave.addEventListener('click', function () {
  chave.classList.toggle('zoom');
  setTimeout(() => {
    chave.style.display = 'none';
    adicionarItem('chave', '/static/imgs/chave.png');

    // envia para o go que a chave foi coletada
    fetch('/pegar-chave', { method: 'POST' })
      .then(res => res.json())
      .then(data => console.log('Chave coletada:', data.ChaveColetada))
      .catch(err => console.error('Erro ao coletar chave:', err));
  }, 1000);
});

//evento para clicar no anel
anel.addEventListener('click', function () {
  anel.classList.toggle('zoom');

  setTimeout(() => {
    anel.style.display = 'none';

    adicionarItem('anel', '/static/imgs/anel.png');

    fetch('/coletar-item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ item: 'anel' })
    })
    .then(res => res.json())
    .then(data => {
      console.log('Anel coletado:', data);
    })
    .catch(err => console.error('Erro ao tentar pegar o anel:', err));
  }, 1000);
});

// evento para clicar no papel 
papel.addEventListener('click', function () {
  papel.classList.toggle('zoom');
  setTimeout(() => {
    papel.style.display = 'none';
    adicionarItem('papel', '/static/imgs/papelChao-parede2.png');
  }, 1000);
});

// evento para clicar no diário
diario.addEventListener('click', function () {
  diario_coletado = true;
  diario.classList.toggle('zoom');
  setTimeout(() => {
    diario.style.display = 'none';
    adicionarItem('diario', '/static/imgs/diario.png');

    // envia para o go que o diário foi coletado
    fetch('/pegar-diario', { method: 'POST' })
      .then(res => res.json())
      .then(data => console.log('Diário coletado no backend:', data.DiarioColetado))
      .catch(err => console.error('Erro ao coletar o diário:', err));
  }, 1000);
});

// evento para clicar no armário e verifica se chave está selecionada
armarioofc.addEventListener('click', function () {
  console.log("Chave selecionada? ", chaveSelecionada);
  fetch("/armario", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chaveSelecionada: chaveSelecionada })
  })
    .then(res => res.json())
    .then(data => {
      if (data.armarioAberto) {
        armarioaberto.style.display = 'block';
        if (!diario_coletado) {
          diario.style.display = 'block';
        }
      } else {
        audioTrancado.play()
          .then(() => console.log('Trancado! (audio tocando)'))
          .catch(err => console.log('Erro ao tocar o áudio', err));
      }
    })
    .catch(err => console.error("Erro na requisição do armário:", err));
});

// evento para clicar no inventário para abrir o diário (se selecionado)
inventario.addEventListener('click', function () {
  if (diarioSelecionado) {
    diariopag1.style.display = 'block';
    quadroParede3.style.display = 'none';
    closeLivro.style.display = 'block';

    // caso queira enviar algo ao backend quando o diário é aberto, pode colocar aqui
  }
});

// botôes para mudar página do diário
diarioRight.addEventListener('click', function () {
  diariopag1.style.display = 'none';
  diariopag2.style.display = 'block';
});
diarioLeft.addEventListener('click', function () {
  diariopag2.style.display = 'none';
  diariopag1.style.display = 'block';
});

// fechar o armário aberto
armarioaberto.addEventListener('click', function () {
  armarioaberto.style.display = 'none';
});

porta.addEventListener('click', function () {
  fetch('/destravou-porta', { method: 'POST' })
    .then(res => {
      if (!res.ok) throw new Error('Erro ao verificar porta');
      return res.json();
    })
    .then(data => {
      if (data.sucesso === true) {
        alert(data.mensagem);
        console.log('Porta destravada com o anel! Fim de jogo');
        portaAberta.style.display = 'block';
        porta.style.display = 'none';
      } else {
        alert(data.mensagem);
        console.log('Tentativa de abrir a porta sem o anel');
      }
    })
    .catch(err => console.error('Erro ao destravar porta:', err));
});


portaAberta.addEventListener('click', function(){
    alert("Parabens, voce conlcuiu o jogo!")
    fimdejogo.style.display = 'block';
    paredeEntrar.style.display = 'none';
    parede1.style.display = 'none';
    parede2.style.display = 'none';
    parede3.style.display = 'none';
    parede4.style.display = 'none';
    inventario.style.display = 'none';
})