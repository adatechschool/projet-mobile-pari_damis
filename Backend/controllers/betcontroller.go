package controllers

import (
	"net/http"
	"strconv"
	"strings"

	"fmt"

	"github.com/adatechschool/projet-mobile-pari_damis/database"
	"github.com/adatechschool/projet-mobile-pari_damis/models"
	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
)

func CreateBet(c *gin.Context) {
	var body struct {
		BetTab *pq.StringArray
	}
	// bg := []string{"3", "TKO", "1"} --> insertion pq.StringArray(bg)
	userIdStr := c.Param("UserID")
	groupIdStr := c.Param("GroupID")
	matchIdStr := c.Param("MatchID")

	if len(strings.Trim(userIdStr, "")) == 0 || len(strings.Trim(groupIdStr, "")) == 0 || len(strings.Trim(matchIdStr, "")) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Bad request",
		})
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to read body",
		})
		return
	}

	userId, err := strconv.ParseUint(userIdStr, 10, 64)
	if err != nil {

	}

	groupId, err := strconv.ParseUint(groupIdStr, 10, 64)
	if err != nil {

	}
	var betTab pq.StringArray
	if body.BetTab != nil {
		betTab = *body.BetTab
	}
	bet := models.Bet{

		BetTab:  &betTab,
		UserID:  userId,
		GroupID: groupId,
		MatchID: matchIdStr,
	}
	result := database.DB.Create(&bet).Error
	if result != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": result.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "everything is ok",
	})
	return
}

func GetBetsByUserId(c *gin.Context) {
	userId := c.Param("UserID")
	var User models.User
	database.DB.Preload("Bets").First(&User, userId)
	c.JSON(200, gin.H{
		"message": User,
	})
}

func GetBetsByGroupID(c *gin.Context) {
	groupId := c.Param("GroupID")
	var Group models.Group
	database.DB.Preload("Bets").First(&Group, groupId)
	c.JSON(200, gin.H{
		"message": Group,
	})
}

func GetBetsOfUserByGroupID(c *gin.Context) {
	groupId := c.Param("GroupID")
	userId := c.Param("UserID")
	// parsedgroupId, err := strconv.ParseUint(userId, 10, 64)
	// if err != nil {
	// 	fmt.Println(err)
	// }

	var Bet []models.Bet
	database.DB.Where("Group_ID = ?", groupId).Where("User_ID = ?", userId).Find(&Bet)

	c.JSON(200, gin.H{
		"message": Bet,
	})
}

func UpdateBetWithResultOfBet(c *gin.Context) {
	resultofbetId := c.Param("ResultOfBetID")
	betId := c.Param("BetID")

	var resultofbet models.ResultOfBet

	database.DB.First(&resultofbet, resultofbetId)
	fmt.Println(resultofbet)

	var bet models.Bet
	database.DB.First(&bet, betId)
	fmt.Println(bet)

	database.DB.Model(&bet).Association("ResultOfBet").Append(&resultofbet)
	// database.DB.Model(&bet).Updates(models.Bet{ResultOfBet: &resultofbetID})
	c.JSON(200, gin.H{
		"message": bet,
	})
}
