package models

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type ResultOfBet struct {
	gorm.Model
	Winner         *string
	FinishMethod   *string
	Rounds         *pq.StringArray `gorm:"type:string"`
	MatchID        string
	MatchCancelled *string
}
