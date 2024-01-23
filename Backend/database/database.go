package database

import (
	"fmt"
	"os"

	"github.com/Valgard/godotenv"
	//"github.com/adatechschool/projet-mobile-pari_damis/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDatabase() {
	var err error
	dotenv := godotenv.New()
	if err := dotenv.Load(".env"); err != nil {
		panic(err)
	}
	dsn := os.Getenv("DATABASE")
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	} else {
		// DB.Begin()
		fmt.Println("succed")
		// DB.AutoMigrate(&models.User{}, &models.Group{}, &models.Bet{}, &models.AuthToken{})
		// DB.Migrator().DropTable(&models.User{}, &models.Group{}, &models.Bet{})
		// DB.Migrator().DropTable(&models.Group{}, "group_users")
		// DB.Migrator().DropTable(&models.AuthToken{}, "auth_tokens")
	}

}
