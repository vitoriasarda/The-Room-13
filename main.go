package main

import (
	"encoding/json"
	"log"
	"net/http"
	"sync"
)

type Jogador struct {
	Nome            string   `json:"nome"`
	SalaAtual       string   `json:"salaAtual"`
	ChaveColetada   bool     `json:"chaveColetada"`
	DiarioColetado  bool     `json:"diarioColetado"`
	ItensInventario []string `json:"itensInventario"`
    DestravouPorta bool `json:"destravouPorta"`

}

var jogador = Jogador{
	Nome:            "Jogador 1",
	SalaAtual:       "sala1",
	ChaveColetada:   false,
	DiarioColetado:  false,
	ItensInventario: []string{},
}

var mu sync.Mutex

func main() {
	// rotas
	http.HandleFunc("/pegar-chave", pegarChave)
	http.HandleFunc("/pegar-diario", pegarDiario)
	http.HandleFunc("/coletar-item", coletarItem)
	http.HandleFunc("/armario", armario)
	http.HandleFunc("/status", status)
    http.HandleFunc("/pegar-anel", pegarAnel)
    http.HandleFunc("/destravou-porta", destravouPorta)

	
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.NotFound(w, r)
			return
		}
		http.ServeFile(w, r, "static/index.html")
	})

	log.Println("Servidor iniciado em http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func pegarAnel(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	mu.Lock()
	defer mu.Unlock()

	
	for _, item := range jogador.ItensInventario {
		if item == "anel" {
			responderJSON(w, map[string]any{
				"sucesso":  false,
				"mensagem": "Você já pegou o anel.",
			})
			return
		}
	}

	adicionarItem("anel")
	responderJSON(w, map[string]any{
		"sucesso":  true,
		"mensagem": "Anel coletado com sucesso!",
	})
}


func pegarChave(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}
	mu.Lock()
	defer mu.Unlock()
	jogador.ChaveColetada = true
	adicionarItem("chave")
	responderJSON(w, map[string]bool{"chaveColetada": true})
}

func pegarDiario(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}
	mu.Lock()
	defer mu.Unlock()
	jogador.DiarioColetado = true
	adicionarItem("diario")
	responderJSON(w, map[string]bool{"diarioColetado": true})
}

func coletarItem(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}
	var dados struct {
		Item string `json:"item"`
	}
	if err := json.NewDecoder(r.Body).Decode(&dados); err != nil {
		http.Error(w, "Erro ao decodificar JSON", http.StatusBadRequest)
		return
	}
	mu.Lock()
	defer mu.Unlock()
	adicionarItem(dados.Item)
	responderJSON(w, map[string]string{"status": "item adicionado"})
}

func armario(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}
	mu.Lock()
	defer mu.Unlock()
	if jogador.ChaveColetada {
		responderJSON(w, map[string]bool{"armarioAberto": true})
	} else {
		responderJSON(w, map[string]bool{"armarioAberto": false})
	}
}

func status(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	defer mu.Unlock()
	responderJSON(w, jogador)
}

func adicionarItem(item string) {
	for _, existente := range jogador.ItensInventario {
		if existente == item {
			return // já está no inventário
		}
	}
	jogador.ItensInventario = append(jogador.ItensInventario, item)
}

func destravouPorta(w http.ResponseWriter, r *http.Request) {
	/*if r.Method != http.MethodPost {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	mu.Lock()
	jogador.DestravouPorta = true
	mu.Unlock()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]any{
		"sucesso": true,
	})*/
    if r.Method != http.MethodPost {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	mu.Lock()
	defer mu.Unlock()

	// Verifica se o jogador tem o anel no inventário
	possuiAnel := false
    for _, item := range jogador.ItensInventario {
		if item == "anel" {
			possuiAnel = true
			break
		}
	}

	if possuiAnel {
		jogador.DestravouPorta = true
		//jogador.SalaAtual = "saida"
		responderJSON(w, map[string]any{
			"sucesso":  true,
			"mensagem": "Porta aberta! Avançando para a próxima sala.",
		})
	} else {
		responderJSON(w, map[string]any{
			"sucesso":  false,
			"mensagem": "Você precisa do anel para abrir a porta.",
		})
	}
}

func responderJSON(w http.ResponseWriter, dados interface{}) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(dados)
}
