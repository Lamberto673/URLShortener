package middleware

import (
	"errors"
	"net/http"

	"github.com/Lamberto673/urlShort/api"
	"github.com/Lamberto673/urlShort/internal/tools"
	log "github.com/sirupsen/logrus"
)





var UnAuthorizedError = errors.New("Invalid username or token")

func Authorization(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r*http.Request) {
		var username string = r.URL.Query().Get("username")
		var token = r.Header.Get("Authorization")
		var err error

		if username == "" || token == "" {
			log.Error(UnAuthorizedError)
			api.RequestErrorHandler(w, UnAuthorizedError)
			return
		}
		
		database, err := tools.NewDatabase()
		if err != nil {
			log.Error(err)
			api.InternalErrorHandler(w)
			return 
		}
		var LoginDetails *tools.LoginDetails
		LoginDetails = database.GetUserLoginDetails(username)
		if LoginDetails == nil || token != (LoginDetails).AuthToken {
			log.Error(UnAuthorizedError)
			api.UnAuthorizedError(w, UnAuthorizedError)
			return
		}
		next.ServeHTTP(w, r)
	})
}