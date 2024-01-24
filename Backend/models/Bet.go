package models

import "gorm.io/gorm"

type Bet struct {
	gorm.Model
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
	GroupID uint64 `gorm:"column:group_id"`
	UserID  uint64 `gorm:"column:user_id"`

}
