package routes

import (
	"github.com/adatechschool/projet-mobile-pari_damis/middleware"
	"github.com/adatechschool/projet-mobile-pari_damis/controllers"
	"github.com/gin-gonic/gin"
)

func Routes(route *gin.Engine) {
	user := route.Group("/")
	user.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "bienvenue",
		})
	})
	user.POST("/groupeCreate", controllers.SignUp)
	user.POST("/signUp", controllers.SignUp)
	user.POST("/login", controllers.Login)
	user.GET("/validate", middleware.RequireAuth, controllers.Validate)
	user.POST("/addUser", controllers.AddUser)
	user.GET("/allUsers", controllers.AllUsers)
	user.GET("/oneUser/:id", controllers.OneUser)
	user.PUT("/updateUser/:id", controllers.UpdateUser)
	user.DELETE("/deleteOneUser/:id", controllers.DeleteOneUser)

	user.GET("/groupsOfOneUser/:id", controllers.ShowGroupsOfOneUser)

	group := route.Group("/group")
	group.POST("/", controllers.CreateGroup)
	group.PUT("/:GroupID/:UserID", controllers.AddUserToGroup)
	group.GET("/:GroupID", controllers.ShowOneGroup)
}
