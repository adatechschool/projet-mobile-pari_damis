package controllers

import (
	// "fmt"
	"net/http"
	// "strconv"
	"strings"

	"github.com/adatechschool/projet-mobile-pari_damis/database"
	"github.com/adatechschool/projet-mobile-pari_damis/models"
	"github.com/gin-gonic/gin"
)

func CreateResultOfBet(c *gin.Context) {
	var body struct {
		Winner  *int
		KoTko   *int
		Soum    *int
		R1      *int
		R2      *int
		R3      *int
		R4      *int
		R5      *int
		Points  *int
		Draw    *int
		MatchID string
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

	resultofbet := models.ResultOfBet{
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
		MatchID: matchIdStr,
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