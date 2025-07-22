#  The Room 13 - Jogo de Escape Room

![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

Um jogo de puzzle e terror no estilo "Escape Room" desenvolvido como projeto para a disciplina de Linguagens de Programação.

---

##  Sobre o Projeto

*The Room 13* é uma experiência interativa que coloca o jogador em um quarto de hotel assombrado. O objetivo é explorar o ambiente, encontrar pistas, resolver uma série de quebra--cabeças e desvendar a história de um espírito atormentado para, finalmente, encontrar a saída.

O projeto foi construído com uma arquitetura cliente-servidor, utilizando **Go (Golang)** no backend para gerenciar o estado do jogo e **JavaScript**, HTML e CSS no frontend para criar a interface e a interatividade.

---

##  Funcionalidades Principais

* **Navegação por Cenas:** Explore as quatro paredes do quarto com uma interface de apontar e clicar.
* **Sistema de Inventário:** Colete itens, selecione-os e use-os para interagir com objetos no cenário.
* **Puzzles Contextuais:** Resolva enigmas que conectam diferentes pistas, como usar um código encontrado em um diário para abrir um cofre.
* **Narrativa Progressiva:** Desvende a história trágica do quarto através de documentos e eventos interativos.
* **Controle de Estado no Backend:** O progresso do jogador é gerenciado e validado pelo servidor em Go.
* **Ambientação Sonora:** Efeitos de áudio e música que criam uma atmosfera de suspense e imersão.

---

##  Tecnologias Utilizadas

* **Backend:** **Go (Golang)**
    * Criação de um servidor web HTTP nativo.
    * Definição de rotas (API) para gerenciar as ações do jogador (`/pegar-chave`, `/armario`, etc.).
    * Gerenciamento do estado do jogo (itens coletados, sala atual).
* **Frontend:**
    * **HTML5:** Estruturação de todos os elementos do jogo.
    * **CSS3:** Estilização, posicionamento de objetos e todas as animações visuais.
    * **JavaScript (Vanilla):** Manipulação do DOM, gerenciamento de eventos de clique e comunicação com o backend via `fetch`.

---

##  Como Executar o Projeto

Para rodar o jogo em sua máquina local, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/vitoriasarda/The-Room-13.git](https://github.com/vitoriasarda/The-Room-13.git)
    cd The-Room-13
    ```

2.  **Execute o servidor Backend:**
    Certifique-se de que você tem o [Go](https://go.dev/doc/install) instalado. No terminal, dentro da pasta do projeto, rode o comando:
    ```bash
    go run main.go
    ```
    Você deverá ver a mensagem: `Servidor rodando em http://localhost:8081`

3.  **Abra o Jogo:**
    Abra seu navegador de preferência e acesse a URL:
    [http://localhost:8081](http://localhost:8081)


## 👥 Autores

* Eduarda da Silva Pouzada
* John Kennedy Medina
* Vitória das Neves Sardá
