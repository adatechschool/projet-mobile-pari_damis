package database

import (
	"fmt"
	"log"
	"os"

	"github.com/adatechschool/projet-mobile-pari_damis/models"
	"github.com/joho/godotenv"

	//"github.com/adatechschool/projet-mobile-pari_damis/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDatabase() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	dsn := os.Getenv("DATABASE")
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	} else {
		// DB.Begin()
		fmt.Println("succed")
		// DB.AutoMigrate( &models.ResultOfBet{})
		DB.AutoMigrate(&models.User{}, &models.Group{}, &models.Bet{}, &models.AuthToken{}, &models.ResultOfBet{})
		// DB.Migrator().DropTable(&models.User{}, &models.Group{}, &models.Bet{}, &models.AuthToken{}, &models.ResultOfBet{})
		// DB.Migrator().DropTable(&models.Group{}, "group_users")
		// DB.Migrator().DropTable(&models.AuthToken{}, "auth_tokens")
	}

}
