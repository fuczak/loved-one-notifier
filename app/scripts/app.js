'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('LovedOneNotifier', ['ionic', 'config', 'LocalStorageModule', 'LovedOneNotifier.controllers'])

.run(function($ionicPlatform, $rootScope, localStorageService, $location, $timeout) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

      var skipIntro;

      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
        skipIntro = localStorageService.get('skip') === 'true' ? true : false;

        if (fromState.name === 'home' && toState.name === 'intro') {
          if (skipIntro) {
            navigator.app.exitApp();
          }
        }
        if (fromState.name === 'intro' && toState.name === 'loading') {
          navigator.app.exitApp();
        }
        if (fromState.name === 'home' && toState.name === 'loading') {
          navigator.app.exitApp();
        }
        if (toState.name === 'intro') {
          if (skipIntro) {
            location.href = '#/home';
          }
        }
      });

      skipIntro = localStorageService.get('skip') === 'true' ? true : false;

      if ($location.$$url === '/loading') {
        $timeout(function() {
          if (skipIntro) {
            location.href = '#/home';
          } else {
            location.href = '#/intro';
          }
        }, 2000);
      }
    });
  })
  .config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
    $stateProvider
      .state('loading', {
        url: '/loading',
        templateUrl: 'templates/loading.html'
      })
      .state('intro', {
        url: '/intro',
        templateUrl: 'templates/intro.html',
        controller: 'IntroCtrl'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      })
      .state('contacts', {
        url: '/contacts',
        templateUrl: 'templates/contacts.html',
        controller: 'ContactsCtrl'
      });

    $urlRouterProvider.otherwise('/intro'); //set to '/loading'

    localStorageServiceProvider.setPrefix('lon');
  });
