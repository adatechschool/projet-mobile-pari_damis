package routes

import (
	"github.com/adatechschool/projet-mobile-pari_damis/controllers"
	"github.com/adatechschool/projet-mobile-pari_damis/middleware"
	"github.com/gin-gonic/gin"
)

func Routes(route *gin.Engine) {
	racine := route.Group("/")
	racine.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "bienvenue",
		})
	})
	auth := route.Group("/auth")
	auth.POST("/signUp", controllers.SignUp)
	auth.POST("/login", controllers.Login)
	user := route.Group("/user", middleware.RequireAuth)
	user.GET("/allUsers", controllers.AllUsers)
	user.GET("/oneUser/:UserID", controllers.OneUser)
	user.PUT("/updateUser/:UserID", controllers.UpdateUser)
	user.DELETE("/deleteOneUser/:UserID", controllers.DeleteOneUser)
	//relation
	user.GET("/groupsOfOneUser/:UserID", controllers.ShowGroupsOfOneUser)

	//route test middleware
	user.GET("/validate", middleware.RequireAuth, controllers.Validate)

	group := route.Group("/group", middleware.RequireAuth)
	group.POST("/createGroup", controllers.CreateGroup)
	group.PUT("/addUserToGroup/:GroupID/:UserID", controllers.AddUserToGroup)
	group.GET("/allGroups", controllers.AllGroups)
	group.PUT("/updateGroup/:GroupID", controllers.UpdateGroup)
	group.GET("/oneGroup/:GroupID", controllers.OneGroup)
	group.DELETE("/deleteOneGroup/:GroupID", controllers.DeleteOneGroup)
	//relation
	group.GET("/usersOfOneGroup/:GroupID", controllers.ShowUsersOfOneGroup)
}
