package models

import (
	"gorm.io/gorm"
	
)
type Group struct {
	gorm.Model
	Name string
	LimitMembers *uint8
	Sports []string
	User []*User `gorm:"many2many:group_user;"`




}