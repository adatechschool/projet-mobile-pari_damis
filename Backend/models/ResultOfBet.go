package models

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type ResultOfBet struct {
	gorm.Model
	Winner  *int
	KoTko   *int
	Soum    *int
	Rounds  pq.StringArray `gorm:"type:string"`
	Points  *int
	Draw    *int
	MatchID string
}
