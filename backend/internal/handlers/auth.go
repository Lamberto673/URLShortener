package handlers

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"errors"
	"net/http"

	"github.com/Lamberto673/urlShort/api"
	"github.com/Lamberto673/urlShort/internal/tools"
	"github.com/jackc/pgx/v5/pgconn"
	log "github.com/sirupsen/logrus"
)

type tokenResponse struct {
	Username string `json:"username"`
	Token string `json:"token"`
}

func hashPassword(password string ) string {
	sum := sha256.Sum256([]byte(password))
	return hex.EncodeToString(sum[:])
}	
func newToken() string {
	b := make([]byte, 32)
	rand.Read(b)
	return hex.EncodeToString(b)
}

func Register (db tools.DatabaseInterface) http.HandlerFunc{
	return func(w http.ResponseWriter, r *http.Request) {
			username := r.URL.Query().Get("username")
			password := r.URL.Query().Get("password")

			if username == "" || password == "" {
				api.RequestErrorHandler(w, errors.New("username and password are required"))
				return
			}
			token := newToken()
			err := db.CreateUser(username, hashPassword(password), token)

			var pgErr *pgconn.PgError
			if errors.As(err, &pgErr) && pgErr.Code == "23505"{
				api.RequestErrorHandler(w, errors.New("Username already taken"))
				return
			}  //Unique violation 

			if err != nil {
				log.Error(err)
				api.InternalErrorHandler(w)
				return
			}
			w.Header().Set("Content-Type","application/json")
			w.WriteHeader(http.StatusCreated)
			json.NewEncoder(w).Encode(tokenResponse{Username: username, Token:token})
			
	}
}

func Login(db tools.DatabaseInterface) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		username := r.URL.Query().Get("username")
		password := r.URL.Query().Get("password")
		
		details := db.GetUserLoginDetails(username, hashPassword((password)))
		if details == nil {
			api.UnAuthorizedError(w, errors.New("Wrong username or password"))
			return
		}
		w.Header().Set("Content-Type","application/json")
		json.NewEncoder(w).Encode(tokenResponse{Username:details.Username, Token: details.AuthToken})
	})		
}