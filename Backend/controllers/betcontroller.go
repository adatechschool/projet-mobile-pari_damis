package controllers

import (
	// "fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/adatechschool/projet-mobile-pari_damis/database"
	"github.com/adatechschool/projet-mobile-pari_damis/models"
	"github.com/gin-gonic/gin"
)

func CreateBet(c *gin.Context) {
	var body struct {
		Winner *int
		KoTko  *int
		Soum   *int
		R1     *int
		R2     *int
		R3     *int
		R4     *int
		R5     *int
		Points *int
		Draw   *int
	}
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

	bet := models.Bet{
		Winner:  body.Winner,
		KoTko:   body.KoTko,
		Soum:    body.Soum,
		R1:      body.R1,
		R2:      body.R2,
		R3:      body.R3,
		R4:      body.R4,
		R5:      body.R5,
		Points:  body.Points,
		Draw:    body.Draw,
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