package api

import (
	"encoding/json"
	"net/http"
)

type Error struct {
	Code int
	Message string
}
type URLs struct {
	Original  string `json:"original" schema:"url"`
	Short string `json:"short"`
}
func writeError (w http.ResponseWriter, message string, code int) {
	resp := Error{
		Code:code,
		Message:message,
	}

	w.Header().Set("Content-Type","application/json")
	w.WriteHeader(code)

	json.NewEncoder(w).Encode(resp)
}

var (
	RequestErrorHandler = func(w http.ResponseWriter, err error) {
		writeError(w, err.Error(), http.StatusBadRequest)
	}
	InternalErrorHandler = func(w http.ResponseWriter) {
		writeError(w, "An Unexpected Error Occured", http.StatusInternalServerError)
	}
	UnAuthorizedError = func(w http.ResponseWriter, err error) {
		writeError(w, err.Error(), http.StatusUnauthorized)
	}
)