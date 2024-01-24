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
			"message": "message",
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
	//relation groupe
	user.GET("/groupsOfOneUser/:UserID", controllers.ShowGroupsOfOneUser)
	//Token
	user.GET("/tokensOfOneUser/:UserID", controllers.ShowTokenOfUser)
	user.DELETE("/deleteOneTokenOfOneUser/:UserID/:AuthTokID", controllers.DeleteTokenOfUser)
	//route test middleware
	user.GET("/validate", middleware.RequireAuth, controllers.Validate)

	group := route.Group("/group", middleware.RequireAuth)
	group.POST("/createGroup/:userID", controllers.CreateGroup)
	group.PUT("/addUserToGroup/:GroupID/:UserID", controllers.AddUserToGroup)
	group.GET("/allGroups", controllers.AllGroups)
	group.PUT("/updateGroup/:GroupID", controllers.UpdateGroup)
	group.GET("/oneGroup/:GroupID", controllers.OneGroup)
	group.DELETE("/deleteOneGroup/:GroupID/:UserID", controllers.DeleteOneGroup)
	//relation User
	group.GET("/usersOfOneGroup/:GroupID", controllers.ShowUsersOfOneGroup)

	bet := route.Group("/bet", middleware.RequireAuth)
	bet.POST("/:UserID/:GroupID/:MatchID", controllers.CreateBet)
	bet.GET("betOfUser/:UserID", controllers.GetBetsByUserId)
	bet.GET("betOfGroup/:GroupID", controllers.GetBetsByGroupID)
	bet.GET("betOfUserByGroup/:GroupID/:UserID", controllers.GetBetsOfUserByGroupID)
}