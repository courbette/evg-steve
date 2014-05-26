(function(){
   var evg = angular.module("evg",['ui.router']);

    evg.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        //
        // Now set up the states
        $stateProvider
            .state('main', {
                url: "/",
                templateUrl: "partials/main.html"
            })
            .state('list', {
                url: "/list",
                templateUrl: "partials/quest-list.html",
                resolve:{
                    quests:function(data){
                        return data.all;
                    }
                },
                controller: function($scope,$state,quests) {
                   var items =  $scope.items = quests.data;

                    var nbQuests = function(){
                        var ret = 0;
                      for(var i = 0; i< items.length;i++){
                          ret += items[i].quests.length;
                      }
                        $scope.nbQuests = ret;
                    };
                    $scope.getClass = function(cat,quest){
                        var p = $state.current.url;
                        var ret = quest.classes;
                        if(p == "/quest") {
                            if(ret.indexOf("active") < -1)
                                ret.push("active")
                        }else{
                            var index = ret.indexOf("active");
                            if( index > -1){
                                ret.splice(index,1);
                            }

                        }

                    return ret;
                    };

                    nbQuests();
                }
            })
            .state('list.quest', {
                url: "/quest:name",
                templateUrl: "partials/quest.html",
                controller: function($scope,$stateParams,quests,template) {
                    var items = quests.data;
                    $scope.template = template.data;

                    var filter = function (name) {
                        for (var i = 0; i < items.length; i++) {
                            var cat = items[i];
                            for (var j = 0; j < items[i].quests.length; j++) {
                                var quest = cat.quests[j];
                                if (quest.name == name) {
                                    return quest;
                                }
                            }
                        }

                    };
                    $scope.quest = filter($stateParams.name);

                },
                resolve : {
                    quests:function(data){
                        return data.all;
                    },
                    template: function(data){
                        return data.template;
                    }
                }
            });




    });


})();