package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/Lamberto673/urlShort/api"
	"github.com/Lamberto673/urlShort/internal/tools"
	"github.com/google/uuid"
	"github.com/gorilla/schema"
	"github.com/jxskiss/base62"
	log "github.com/sirupsen/logrus"
)

func GetURLShortener(w http.ResponseWriter, r *http.Request) {
	var params = api.URLs{}
	var decoder *schema.Decoder = schema.NewDecoder();
	decoder.IgnoreUnknownKeys(true)
	var parsing = decoder.Decode(&params, r.URL.Query());
	if parsing != nil {
		log.Error(parsing)
		api.InternalErrorHandler(w)
		return
	}

	
	database, err := tools.NewDatabase()
	if err != nil {
		log.Error(err)
		api.InternalErrorHandler(w)
		return
	}
	id := uuid.New()
	idbytes := id[:]
	encoded := base62.EncodeToString(idbytes)


	originalURL := params.Original
	urlsShorten := fmt.Sprintf(`www.shortenURL/%s`, encoded)
	err  = database.SetURL(encoded, originalURL)

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
		api.InternalErrorHandler(w)
		return
	}
}