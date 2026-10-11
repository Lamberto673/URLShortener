package tools

import (
	"context"

	"github.com/redis/go-redis/v9"
)

type DB struct{}

type UserSet struct {
	username string
}
type UrlShortener struct {
	shorten string
}

var rdb = redis.NewClient(&redis.Options {
	Addr: "localhost:6379",
	Password: "",
	DB: 0,
	Protocol: 2,
})


var ctx = context.Background()

func (d *DB) GetUserLoginDetails(username string) *LoginDetails {
	token, err := rdb.Get(ctx, "user:"+username).Result()
	if err != nil {
		// setUser()
		return nil
	}
	return &LoginDetails{
		Username: username,
		AuthToken: token,
	};
}
func (d *DB) setUser(username string, token string) (*UserSet,error) {
	err := rdb.Set(ctx, "user:"+username, token, 0).Err()
	if err != nil {
	
		return nil, err
	}
	return &UserSet{username:username}, nil
}
func (d *DB) SetURL(code string, original string) error {
	return rdb.Set(ctx, "url:"+code, original, 0).Err()
}
func (d *DB) GetURL(code string) (string, error) {
	return rdb.Get(ctx, "url:"+code).Result()
}
func (d *DB) SetupDatabase() error {
	return rdb.Ping(ctx).Err()
}