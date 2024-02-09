package models

import (
	"gorm.io/gorm"
	"github.com/lib/pq"
)

type Bet struct {
	gorm.Model
	Winner        *int
	KoTko         *int
	Soum          *int
	Rounds        pq.StringArray `gorm:"type:string"`
	Points        *int
	Draw          *int
	MatchID       string
	GroupID       uint64 `gorm:"column:group_id"`
	UserID        uint64 `gorm:"column:user_id"`
	ResultOfBetID *uint64
	ResultOfBet   *ResultOfBet
}
