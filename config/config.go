package config

import (
	"log"
	"os"

	"github.com/kelseyhightower/envconfig"
	"gopkg.in/yaml.v3"
)

type Config struct {
	Server struct {
		Port string `yaml:"port" envconfig:"SERVER_PORT"`
		Secret string `yaml:"secret" envconfig:"SERVER_SECRET"`
		TokenLifespan int32 `yaml:"tokenLifespan" envconfig:"SERVER_TOKEN_LIFESPAN"`
	} `yaml:"server"`
	Database struct {
		Username string `yaml:"username" envconfig:"DB_USERNAME"`
		Password string `yaml:"password" envconfig:"DB_PASSWORD"`
		Host     string `yaml:"host" envconfig:"DB_HOST"`
		Port     string `yaml:"port" envconfig:"DB_PORT"`
	} `yaml:"database"`
}

var Cfg Config

func InitConfig() error {
	f, err := os.Open("local.yaml")
	if err == nil {
		decoder := yaml.NewDecoder(f)
		err = decoder.Decode(&Cfg)
		if err != nil {
			return err
		}
	} else {
		// We assume that the error was caused by a missing
		// local file which isn't fatal because it most likely means
		// we'll fall back to an env variable
		log.Println(err.Error())
	}
	f.Close()

	err = envconfig.Process("", &Cfg)
	if err != nil {
		return err
	}
	return nil
}