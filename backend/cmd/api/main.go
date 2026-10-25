package main

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/Lamberto673/urlShort/internal/handlers"
	"github.com/Lamberto673/urlShort/internal/tools"
	"github.com/go-chi/chi/v5"
	log "github.com/sirupsen/logrus"
)

func main() {
	log.SetReportCaller(true)
	connStr := os.Getenv("POSTGRES_URL")
	if connStr == "" {
		connStr = "postgres://urlshort:urlshort@localhost:5432/postgres?sslmode=disable"
	}
	db, err := tools.NewDatabase(context.Background(), connStr)
	if err != nil {
		log.Fatal(err)
	}
	var r *chi.Mux = chi.NewRouter()
	handlers.Handler(r, db)
	
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

	err = http.ListenAndServe("localhost:8081", r)
	if err != nil {
		log.Error(err)
	}

}
