var friends = require("../data/friends");

module.exports = function(app){
    app.get("/api/friends", function(req, res){
        res.json(friends);
    });
    app.post("/api/friends", function(req, res){
        var userScores = req.body.scores;
        var bfScore = 100;
        var bfIndex = -1;
        for (var i = 0; i < friends.length; i++){
            var friendDifference = 0;
            var currentFriend = friends[i];
            for (var j = 0; j < currentFriend.scores.length; j++){
                var currentFriendScore = currentFriend.scores[j];
                var currentUserScore = userScores[j];
                friendDifference += Math.abs(currentFriendScore - currentUserScore);
            };
            if (friendDifference < bfScore){
                bfScore = friendDifference;
                bfIndex = i;
            };
        };
        friends.push(req.body);
        res.json(friends[bfIndex]);
    });
};