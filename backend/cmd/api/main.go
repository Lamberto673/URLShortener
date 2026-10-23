package main

import (
	"fmt"
	"net/http"

	"github.com/Lamberto673/urlShort/internal/handlers"
	"github.com/go-chi/chi/v5"
	log "github.com/sirupsen/logrus"
)

func main() {
	log.SetReportCaller(true)
	var r *chi.Mux = chi.NewRouter()
	handlers.Handler(r)
	// id := uuid.New();

	// id_bytes := []byte(id)

	// encoded = base62.EncodeToString(id_bytes)
	fmt.Println("Starting GO API service...")
	fmt.Println(`

 ██████      ██████            ██████    ████████    ██████
██  ░░░░░░  ██  ░░░░██        ██  ░░░░██  ██░░░░░░██    ██░░░░
██░░██████  ██░░    ██░░      ██████████░░████████  ░░  ██░░
██░░  ░░██░░██░░    ██░░      ██░░░░░░██░░██░░░░░░░░    ██░░
  ██████  ░░  ██████  ░░      ██░░    ██░░██░░        ██████
    ░░░░░░      ░░░░░░          ░░      ░░  ░░          ░░░░░░
     `)

	err := http.ListenAndServe("localhost:8081", r)
	if err != nil {
		log.Error(err)
	}

}
