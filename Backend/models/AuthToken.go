package models

import (
	"time"

	"gorm.io/gorm"
)

//c'est un enum in golang cela signifie que le champs device zccepte seulement le champ TABLET et MOBILEPHONE c'est le même pricipe pour l'OS

type DeviceType string

const (
	TABLET      DeviceType = "TABLET"
	MOBILEPHONE DeviceType = "MOBILEPHONE"
)

type OsType string

const (
	IOS     OsType = "IOS"
	ANDROID OsType = "ANDROID"
)

type AuthToken struct {
	gorm.Model
	Token    string
	ExpireAt time.Time
	Device   DeviceType `gorm:"type:ENUM:('TABLET', 'MOBILEPHONE')"`
	Os       OsType     `gorm:"type:ENUM:('IOS', 'ANDROID')"`
	UserID   uint
}
