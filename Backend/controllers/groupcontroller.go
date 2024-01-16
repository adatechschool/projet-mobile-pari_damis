package controllers

import (
	"fmt"
	"net/http"

	// "os"
	// "time"

	"github.com/adatechschool/projet-mobile-pari_damis/database"
	"github.com/adatechschool/projet-mobile-pari_damis/models"
	"github.com/gin-gonic/gin"
	// "github.com/golang-jwt/jwt/v5"
	// "golang.org/x/crypto/bcrypt"
)

func CreateGroup(c *gin.Context) {
	var body struct {
		Name         string
		LimitMembers *uint8
		Users        []models.User
		Bets         []models.Bet
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to read body",
		})
		return
	}
	group := models.Group{Name: body.Name, LimitMembers: body.LimitMembers}
	result := database.DB.Create(&group)
	if result.Error != nil {
		c.Status(400)
		return
	}
	c.JSON(http.StatusOK, gin.H{})

}

func AddUserToGroup(c *gin.Context) {
	groupId := c.Param("GroupID")
	userId := c.Param("UserID")
	var Group models.Group
	var User models.User
	database.DB.First(&User, userId)
	database.DB.First(&Group, groupId)

	database.DB.Model(&Group).Association("Users").Append(&User)
	// if result.Error != nil {
	// 	c.Status(400)
	// 	return
	// }
	c.JSON(200, gin.H{
		"message": Group,
	})
}

func ShowOneGroup(c *gin.Context) {
	groupId := c.Param("GroupID")
	var Group models.Group

	database.DB.Preload("Users").First(&Group, groupId)

	fmt.Println(Group)

	c.JSON(200, gin.H{
		"message": Group,
	})
}

// func AllUsers(c *gin.Context) {
// 	var AllUser []models.User
// 	database.DB.Find(&AllUser)

// 	c.JSON(200, gin.H{
// 		"message": AllUser,
// 	})
// }

// func UpdateUser(c *gin.Context) {
// 	id := c.Param("id")
// 	var body struct {
// 		Firstname string
// 		Email     string
// 		Password  string
// 	}
// 	c.Bind(&body)

// 	var User models.User
// 	database.DB.First(&User, id)

// 	database.DB.Model(&User).Updates(models.User{Firstname: body.Firstname, Email: body.Email, Password: body.Password})

// 	c.JSON(200, gin.H{
// 		"message": User,
// 	})
// }

// func DeleteOneUser(c *gin.Context) {
// 	id := c.Param("id")
// 	var User models.User
// 	database.DB.Delete(&User, id)

// 	c.Status(200)
// }
