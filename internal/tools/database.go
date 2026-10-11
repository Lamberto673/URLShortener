package tools

import log "github.com/sirupsen/logrus"


type LoginDetails struct {
	AuthToken string
	Username string
}

type URLS struct {
	original string
	shorten string
}

type DatabaseInterface interface {
	GetUserLoginDetails(username string) *LoginDetails
	GetURL(code string) (string, error) 
	SetURL(code string, original string) error
	SetupDatabase() error
} 

func NewDatabase() (DatabaseInterface, error) {
	var database DatabaseInterface = &DB{}

	var err error = database.SetupDatabase()
	if err != nil {
		log.Error(err)
		return nil, err
	}
	return database, nil
}