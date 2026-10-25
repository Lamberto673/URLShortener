package tools

import (
	"context"

	sq "github.com/Masterminds/squirrel"
	"github.com/jackc/pgx/v5/pgxpool"
)
var psql = sq.StatementBuilder.PlaceholderFormat(sq.Dollar)
type PostgresDB struct {
	pool *pgxpool.Pool
}

type LoginDetails struct {
	AuthToken string
	Username string
}


type DatabaseInterface interface {
	CreateUser(username string, passHash string, token string) error
	GetUserLoginDetails(username string, pass_hash string) *LoginDetails
	GetUserByToken(token string) *LoginDetails
	GetURL(code string) (string, error) 
	SetURL(code string, original string , userID string) error
	SetupDatabase() error
} 

func NewDatabase(ctx context.Context, connStr string) (DatabaseInterface, error) {

	pool, err := pgxpool.New(ctx, connStr)
	if err != nil {
		return nil, err
	}
	var database DatabaseInterface = &PostgresDB{pool: pool}
	if err := database.SetupDatabase(); err != nil {
		pool.Close()
		return nil, err
	}
	return database, nil
}
func (p *PostgresDB) CreateUser(username string, passHash string, token string) error {
	sqlStr, args, err := psql.Insert("users").Columns("name", "password_hash", "auth_token").Values(username, passHash, token).ToSql()

	if err != nil {
		return err
	}
	_, err = p.pool.Exec(context.Background(), sqlStr, args...)
	return err
}

func (p*PostgresDB) GetUserByToken(token string) *LoginDetails {
	sqlStr, args, err := psql.Select("name").From("users").Where(sq.Eq{"auth_token": token}).ToSql()

	if err != nil {
		return nil
	}
	var username string
	if err := p.pool.QueryRow(context.Background(), sqlStr, args...).Scan(&username); err != nil {
		return nil
	}
	return &LoginDetails{Username: username, AuthToken:token}
}

func (p *PostgresDB) SetupDatabase() error {
	return p.pool.Ping(context.Background())
}

func (p *PostgresDB) SetURL(code string, original string, userID string) error {
	sqlStr, args, err := psql.Insert("urls").Columns("shortcode", "long_url", "user_id").Values(code, original,  sq.Expr("(SELECT id FROM users WHERE name = ?)", userID)).ToSql()

	if err != nil {
		return err
	}

	_, err = p.pool.Exec(context.Background(), sqlStr, args...)
	return err
}

func (p *PostgresDB) GetURL(code string) (string, error ) {
	sqlStr, args, err := psql.Select("long_url").From("urls").Where(sq.Eq{"shortcode": code}).ToSql()

	if err != nil {
		return "", err
	}

	var original string
	err = p.pool.QueryRow(context.Background(), sqlStr,args...).Scan(&original)
	return original, err
}

func (p *PostgresDB) GetUserLoginDetails(username string, pass_hash string) *LoginDetails {
	sqlStr, args, err := psql.Select("auth_token").From("users").Where(sq.Eq{"name": username, "password_hash": pass_hash}).ToSql()

	if err != nil {
		return nil
	}
	var token string
	if err := p.pool.QueryRow(context.Background(), sqlStr, args...).Scan(&token); err != nil {
		return nil
	}

	return &LoginDetails{Username: username, AuthToken: token}
}