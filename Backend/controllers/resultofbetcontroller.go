package controllers

import (
	// "fmt"
	"net/http"
	// "strconv"
	"strings"

	"github.com/adatechschool/projet-mobile-pari_damis/database"
	"github.com/adatechschool/projet-mobile-pari_damis/models"
	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
)

func CreateResultOfBet(c *gin.Context) {
	var body struct {
		Winner       *string
		FinishMethod *string
		Rounds       *pq.StringArray
		MatchID      string
	}
	matchIdStr := c.Param("MatchID")

	if len(strings.Trim(matchIdStr, "")) == 0 {
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
	var rounds pq.StringArray
	if body.Rounds != nil {
		rounds = *body.Rounds
	}
	resultofbet := models.ResultOfBet{
		Winner:       body.Winner,
		FinishMethod: body.FinishMethod,
		Rounds:       &rounds,
		MatchID:      matchIdStr,
	}
	result := database.DB.Create(&resultofbet).Error
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

func GetResultBetsByBetId(c *gin.Context) {
	betId := c.Param("BetID")
	var Bet models.Bet
	database.DB.Preload("ResultOfBet").First(&Bet, betId)
	c.JSON(200, gin.H{
		"message": Bet,
	})
}
