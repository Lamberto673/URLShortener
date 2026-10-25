package middleware

import (
	"errors"
	"net/http"

	"github.com/Lamberto673/urlShort/api"
	"github.com/Lamberto673/urlShort/internal/tools"
	log "github.com/sirupsen/logrus"
)





var UnAuthorizedError = errors.New("Invalid username or token")

func Authorization(db tools.DatabaseInterface) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r*http.Request) {
			var token = r.Header.Get("Authorization")
			if token == "" {
				api.UnAuthorizedError(w, UnAuthorizedError)
				return
			}
			if db.GetUserByToken(token) == nil {
				log.Error(UnAuthorizedError)
				api.UnAuthorizedError(w, UnAuthorizedError)
				return
			}
			next.ServeHTTP(w, r)
		})
	}
	
}