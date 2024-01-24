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
	userID := c.Param("userID")
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
	var User models.User
	database.DB.First(&User, userID)
	group := models.Group{Name: body.Name, LimitMembers: body.LimitMembers, CreatorId: userID}
	result := database.DB.Create(&group)
	database.DB.Model(&group).Association("Users").Append(&User)
	if result.Error != nil {
		c.Status(400)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"group":     group,
		"groupID":   group.ID,
		"creatorID": group.CreatorId,
	})

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

func ShowUsersOfOneGroup(c *gin.Context) {
	groupId := c.Param("GroupID")
	var Group models.Group

	database.DB.Preload("Users").First(&Group, groupId)

	fmt.Println(Group)

	c.JSON(200, gin.H{
		"message": Group,
	})
}

func OneGroup(c *gin.Context) {
	groupId := c.Param("GroupId")
	var Group models.Group
	database.DB.First(&Group, groupId)

	c.JSON(200, gin.H{
		"message": Group,
	})
}

func AllGroups(c *gin.Context) {
	var AllGroups []models.Group
	database.DB.Find(&AllGroups)

	c.JSON(200, gin.H{
		"message": AllGroups,
	})
}

func UpdateGroup(c *gin.Context) {
	groupId := c.Param("GroupID")
	var body struct {
		Name         string
		LimitMembers *uint8
	}
	c.Bind(&body)

	var Group models.Group
	database.DB.First(&Group, groupId)

	database.DB.Model(&Group).Updates(models.Group{Name: body.Name, LimitMembers: body.LimitMembers})

	c.JSON(200, gin.H{
		"message": Group,
	})
}

func DeleteOneGroup(c *gin.Context) {
	groupId := c.Param("GroupID")
	userId := c.Param("UserID")
	var Group models.Group

	database.DB.First(&Group, groupId)
	if Group.CreatorId == userId {
		database.DB.Delete(&Group, groupId)
		c.JSON(200, gin.H{
			"message": "Group Deleted",
		})
		return
	}
	c.JSON(403, gin.H{
		"message": "Unauthorized",
	})
	return
}
