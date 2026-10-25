package handlers

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/Lamberto673/urlShort/api"
	"github.com/Lamberto673/urlShort/internal/tools"
	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
	"github.com/gorilla/schema"
	"github.com/jackc/pgx/v5"
	"github.com/jxskiss/base62"
	log "github.com/sirupsen/logrus"
)

func GetURLShortener(db tools.DatabaseInterface) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var params = api.URLs{}
		var decoder *schema.Decoder = schema.NewDecoder();
		decoder.IgnoreUnknownKeys(true)
		err := decoder.Decode(&params, r.URL.Query())
		if err != nil {
			log.Error(err)
			api.RequestErrorHandler(w, err)
			return
		}
		if params.Original == "" {
			api.RequestErrorHandler(w, errors.New("missing ?url=parameter"))
			return
		}

		id := uuid.New() 
		idbytes := id[:]
		encoded := base62.EncodeToString(idbytes)[:7]


		originalURL := params.Original
		urlsShorten := fmt.Sprintf(`https://localhost:8081/%s`, encoded)
		token := r.Header.Get("Authorization")
		
	
		err = db.SetURL(encoded, originalURL, token)
		if err != nil {
			log.Error(err)
			api.InternalErrorHandler(w)
			return
		}
		responds := api.URLs{
			Original: originalURL,
			Short: urlsShorten,
		}

		w.Header().Set("Content-Type", "application/json")
		err = json.NewEncoder(w).Encode(responds)
		if err != nil {
			log.Error(err)
		}
	}
	
}

func RedirectURLs(db tools.DatabaseInterface) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
			code := chi.URLParam(r, "code")
			originalURL, err := db.GetURL(code)
			if errors.Is(err, pgx.ErrNoRows) {
				http.NotFound(w, r)
				return
			}
			if err != nil {
				log.Error(err)
				api.InternalErrorHandler(w)
				return
			}
			http.Redirect(w, r, originalURL, http.StatusFound);
		}
}