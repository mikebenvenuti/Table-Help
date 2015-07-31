/**
 * Created by Mike on 7/18/2015.
 */
Stamplay.init("annex");
angular.module('app', ['ngStamplay'])
    .controller('flagctrl', function($scope,Annex) {

         $scope.annexs = [];
        $scope.showit =  function(myRec) {

            //alert(myRec.Field + ' ' + myRec.ticket);
            $scope.myTicket = myRec.ticket;
            $scope.myUnit = myRec.Unit;
            $scope.myOverview = myRec.Overview;
        };
        Annex.all().then(function(annexs) {
            $scope.annexs = annexs;

            $scope.annexs.forEach(function(annexs) {
              console.log(annexs.instance.first)

            }   );
        });

        $.getJSON('examcode.json', function(data) {
            $scope.items = [];

            //var select = document.createElement("select");

            //add on change event
            /*select.onchange = function() {
                var  x = select.options[select.selectedIndex].value;
                $('#overview').html('<b>Overview: </b> ' + x );
                $('#ticket').html('<b>Ticket: </b> ' + x );
            } ;
*/
            $.each(data,  function(key, value) {
                $scope.items.push(value);

            }  )
            for (var i=0; i < $scope.items.length; i++)
            {
                /*console.log($scope.items[i].Field);
                console.log($scope.items[i].ticket);

                var option = document.createElement("option");
                option.id = $scope.items[i].Field;
                option.value = $scope.items[i].Overview;
                option.innerHTML = $scope.items[i].Field ;

                select.appendChild(option);         */
            }
           // var currentDiv = document.getElementById("flag");
           // document.body.insertBefore(select,currentDiv);
            $scope.$apply();
        });



    })
    .factory('Annex', function($q, $stamplay){
        function all() {
            var deferred = $q.defer();

            var BookCollection = $stamplay.Cobject('game').Collection;
            BookCollection.fetch().then(function() {
                deferred.resolve(BookCollection.instance);
            });

            return deferred.promise;
        }

        return {
            all: all
        }
    })
    .controller('NavController', function($scope, User, $rootScope){
        $scope.login = function(){
            User.login().then(function(user){
                // Add their details to root scope
                $rootScope.$emit('User::loggedIn', {user: user});
            });
        }

        $scope.logout = function(){
            User.logout();
        }
    })
    .factory('User', function($q, $stamplay){
        function login() {
            var deferred = $q.defer();

            var User = $stamplay.User().Model;
            User.login('google').then(function(){
                deferred.resolve(User);
            });
        }

        function active() {
            var deferred = $q.defer();

            var User = $stamplay.User().Model;
            User.currentUser().then(function() {
                deferred.resolve(User);
            }).catch(function(err) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function logout() {
            var User = $stamplay.User().Model;
            User.logout();
        }

        return {
            active: active,
            logout: logout,
            login: login
        };
    })
    .run(function($rootScope, User){
        // Listen for login events
        $rootScope.$on('User::loggedIn', function(event, data){
            $rootScope.loggedIn = true;
            $rootScope.user = data.user;
        });

        // Check if there's a user logged in already
        User.active().then(function(activeUser){
            if(activeUser.isLogged()){
                // Add their details to rootScope
                $rootScope.$emit('User::loggedIn', {user: activeUser});
            }
        });
    });

/**
 *        convert jquery to anagular to get data binding
 *
 *
 *
 *
 *
 *
 * @constructor
 */


function JSONRead() {
    $.getJSON('examcode.json', function(data) {
        var itemsx = [];


        $.each(data,  function(key, value) {
            itemsx.push(value);


        }  )
        for (var i=0; i < itemsx.length; i++)
        {

        }

    } )


}

