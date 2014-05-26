/**
 * Created by pierremarot on 25/05/2014.
 */
angular.module("evg").factory("data",function($http){
    return {
        all: $http.get("data.json"),
        template: $http.get("template.json")
    };
});
