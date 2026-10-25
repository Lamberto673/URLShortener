package handlers

import (
	"github.com/Lamberto673/urlShort/internal/middleware"
	"github.com/Lamberto673/urlShort/internal/tools"
	"github.com/go-chi/chi/v5"
	chimiddle "github.com/go-chi/chi/v5/middleware"
)

func Handler(r *chi.Mux, db tools.DatabaseInterface) {

	r.Use(chimiddle.StripSlashes)
	r.Post("/register", Register(db))
	r.Post("/login", Login(db))
	r.Get("/{code}", RedirectURLs(db))

	r.Route("/user", func(route chi.Router) {
		route.Use(middleware.Authorization(db))
		route.Get("/urlShorten", GetURLShortener(db))
	})
}