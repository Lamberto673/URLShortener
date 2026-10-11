package handlers

import (
	"github.com/Lamberto673/urlShort/internal/middleware"
	"github.com/go-chi/chi/v5"
	chimiddle "github.com/go-chi/chi/v5/middleware"
)

func Handler(r *chi.Mux) {

	r.Use(chimiddle.StripSlashes)

	r.Route("/user", func(route chi.Router) {
		route.Use(middleware.Authorization)
		route.Get("/urlShorten", GetURLShortener)
	})
}