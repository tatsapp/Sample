var app=angular.module('starter', ['ionic','firebase','ionic-ratings','ngCordova','starter.services','ngCordovaOauth']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    });
});

app.controller('login', function($scope, $ionicPopup,$state,$cordovaSocialSharing,$ionicHistory,
  $timeout,$cordovaSms,$interval,$cordovaGeolocation,$cordovaNetwork,$window,$rootScope,$http,
  $ionicLoading, SQLService, $ionicPlatform, $firebaseAuth, $cordovaOauth, $location, MyService, $ionicSlideBoxDelegate) 
{
  $rootScope.online=navigator.onLine;
  $scope.tel="+";
  $scope.message="1001 is OTP for Sample app verification";
  $scope.profile={name:$state.params.name,dob:$state.params.birthday,choice:$state.params.gender};
  $scope.surnum = $state.params.aId;
  $scope.one=$state.params.bId;
  $scope.hem=$state.params.hme;
  $scope.intes=$state.params.referer;
  $scope.getad=$state.params.add;
  $scope.ids=$state.params.sid;
  $scope.chose=$state.params.ref;
  $scope.user_id=$state.params.id;
  $scope.userProfile=$state.params.detl;
  $scope.selectedInterest=$state.params.inter;
  $scope.chosBrand=$state.params.a;
  $scope.chosInterests=$state.params.b;
  $scope.clear_fil=0;
  $scope.co=0;
  $scope.nl=[];
  $scope.myPopup;
  $scope.choicesInt=[];
  $scope.tncpup;
  $scope.enabl=0;
  $scope.edit=0;
  $scope.seleInterest=[];
  var showInterval;
  var netPop;
  var count=$scope.surnum;
  var myPopup;
  var android=ionic.Platform.isAndroid();
  var ios=ionic.Platform.isIOS();
  var windowsPh=ionic.Platform.isWindowsPhone();
  var ipad=ionic.Platform.isIPad();

  SQLService.create();

  if($scope.userProfile && angular.isDefined($scope.userProfile)){
         var ds=$scope.userProfile[0].user_dob.split("/");
         var dt=new Date(ds[2],ds[1],ds[0]); 
         $scope.personal={name:$scope.userProfile[0].user_name,gender:$scope.userProfile[0].user_gender,dob:dt};
       }
  
  if(android || ios || ipad || windowsPh){
        $scope.browser=1;
     }
  else{
    $scope.browser=0;
    }
 
$scope.tncpopup=function(){
  $scope.tncpup=$ionicPopup.show({
    templateUrl:'templates/tncpage.html',
    cssClass:'tncpop',
    scope:$scope
  })
}

$scope.tncpopupClose=function(){
  $scope.tncpup.close();
}

$scope.dated=function(a,b){
  MyService.setId(a);
  $scope.g=a;
  $state.go('otp');
  console.log($scope.g);
}

$scope.geh=function(){
  console.log(MyService.getId());
}

$scope.nextSlide=function(){
  if(($ionicSlideBoxDelegate.slidesCount()-1) == ($ionicSlideBoxDelegate.currentIndex()))
    $ionicSlideBoxDelegate.slide(0);
  else
   $ionicSlideBoxDelegate.next();
   
}

  var mon=(new Date()).getMonth()+1;
  $scope.date=(new Date()).getDate() +"/"+ mon +"/" + (new Date()).getFullYear();

  $scope.twitterLogin = function() {     
      $ionicPlatform.ready(function(){
        $cordovaOauth.twitter("EXqH2yY8MHMltdY4olxRb99O1","4XduTuJEu9LA35dxVwdJDtrYxRlJI9Oq4QeZJt9gDp6PZ9hZ8r").then(function(result){
          $scope.user_name=result.screen_name;
          $scope.user_birthday=new Date();
          var ge=0;
          var details={name:$scope.user_name,birthday:$scope.user_birthday,gender:ge};
          $state.go('profile',details);
           },function(error){
          alert("er"+error);
          });
      })
  }

  $scope.facebookLogin=function(){
    $ionicPlatform.ready(function(){
     facebookConnectPlugin.login(["public_profile","user_birthday"], function fbLoginSuccess(userData){
     $http.get("https://graph.facebook.com/me?fields=email,name,gender,birthday&access_token="+userData.authResponse.accessToken).then(function(result){
     JSON.stringify(result);
     $scope.user_name=result.data.name;
     $scope.user_birthday=new Date(result.data.birthday);
     $scope.user_gender=result.data.gender;
     var details={name:$scope.user_name,birthday:$scope.user_birthday,gender:$scope.user_gender};
     $state.go('profile',details);
     })   
     },function loginError(error){
        alert(error);
            });
    })
  }

  $scope.githubLogin=function(){
    $ionicPlatform.ready(function(){
      $cordovaOauth.github("0649f1c842d83bb90844","9a16390c8ee067ceb4129e5d86965676130c33ec",["user","repo","gist"]).then(function(result){
        $http.get("https://api.github.com/user?access_token="+result.access_token).then(function(user_detail){
               $scope.user_name=user_detail.data.login;
               $scope.user_birthday=new Date();
                var ge=0;
                var details={name:$scope.user_name,birthday:$scope.user_birthday,gender:ge};
                $state.go('profile',details);
          },function(error){
              alert(error);
          })
       },function(error){
        alert("er "+error);
      })
    })
  }

  $scope.googleLogin=function(){
    $ionicPlatform.ready(function(){
      window.plugins.googleplus.login({},
      function(result){
        $scope.user_name=result.displayName;
        $scope.user_birthday=new Date();
        var ge=0;
        var details={name:$scope.user_name,birthday:$scope.user_birthday,gender:ge};
        $state.go('profile',details);
        },
      function(error){
         alert("err : "+error);
        }
       )
      })
   }

  $scope.instaLogin=function(){
    $ionicPlatform.ready(function(){
      $cordovaOauth.instagram("d1aacbd8f58f4ed29b547034cdf72fca",[]).then(function(result){
        $http.get("https://api.instagram.com/v1/users/self/?access_token="+result.access_token).then(function(res){
        $scope.user_name=res.data.data.full_name;
        $scope.user_birthday=new Date();
        var ge=1;
        var details={name:$scope.user_name,birthday:$scope.user_birthday,gender:ge};
        $state.go('profile',details);
        },function(error){
        alert(error);
      })
     })
    })
  }

  $scope.linkedinLogin=function(){
    $ionicPlatform.ready(function(){
      $cordovaOauth.linkedin("81mbyih24nwvlr","U16HhaeK1qfpbM0X",[],null)
      .then(function(result){
        $scope.next();
      },function(error){
        alert(error);
      })
    })
  }

  $scope.fbLogin=function(){
    $ionicPlatform.ready(function(){  
      var provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope('user_birthday');
      firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      $http.get("https://graph.facebook.com/me?fields=email,name,gender,birthday&access_token="+token).then(function(result){
      JSON.stringify(result);
      SQLService.getUserId(result.data.id).then(function(results){
        MyService.setId(result.data.id);
        if(results.length){
          $scope.next();
        }
        else
          {
            $scope.user_name=result.data.name;
            if(result.data.birthday)
              $scope.user_birthday=new Date(result.data.birthday);            
            else
               $scope.user_birthday=new Date();
            if(result.data.gender)
               $scope.user_gender=result.data.gender;
            else
              $scope.user_gender="male";
            var details={name:$scope.user_name,birthday:$scope.user_birthday,gender:$scope.user_gender,id:result.data.id};
            $state.go('profile',details);
          }
       },function(error){
      console.log(error);
    })
  })
       var user = result.user;
   }).catch(function(error) {
        alert("er "+error);
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
   });
  })
 };


$scope.google=function(){
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/plus.login');
  provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
  firebase.auth().signInWithPopup(provider).then(function(result) {
  var token = result.credential.accessToken;
  $http.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&&access_token="+token).then(function(result){
    console.log(result.data.id);
    var gen=0;
    SQLService.getUserId(result.data.id).then(function(results){
        MyService.setId(result.data.id);
        if(results.length){
          $state.go('homepage');
        }
        else
          {
            $scope.user_name=result.data.name;
            if(result.data.birthday)
              $scope.user_birthday=new Date(result.data.birthday);            
            else
               $scope.user_birthday=new Date();
            if(result.data.gender)
               $scope.user_gender=result.data.gender;
            else
              $scope.user_gender="male";
            var details={name:$scope.user_name,birthday:$scope.user_birthday,gender:$scope.user_gender,id:result.data.id};
            $state.go('profile',details);
          }
       },function(error){
      console.log(error);
    })
    })
   }).catch(function(error) {
        console.log("er1 "+error);
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
  });
 }

$scope.twitter=function(){
  var provider = new firebase.auth.TwitterAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
  var token = result.credential.accessToken;
  var secret = result.credential.secret;
  var user = result.user;
  console.log(user.providerData[0].uid);
  SQLService.getUserId(user.providerData[0].uid).then(function(results){
        MyService.setId(user.providerData[0].uid);
        if(results.length){
          $state.go('homepage');
        }
        else
          {
            $scope.user_name=user.displayName;
            if(user.birthday)
              $scope.user_birthday=new Date(result.data.birthday);            
            else
               $scope.user_birthday=new Date();
            if(user.gender)
               $scope.user_gender=result.data.gender;
            else
              $scope.user_gender="male";
            var details={name:$scope.user_name,birthday:$scope.user_birthday,gender:$scope.user_gender,id:user.providerData[0].uid};
            $state.go('profile',details);
          }
       },function(error){
      console.log(error);
    })
  var details={name:user.displayName,birthday:new Date(),gender:0};
  $state.go('profile',details);
}).catch(function(error) {
  console.log("er2 "+error)
  var errorCode = error.code;
  var errorMessage = error.message;
  var email = error.email;
  var credential = error.credential;
});
}

$scope.github=function(){
  var provider=new firebase.auth.GithubAuthProvider();
  provider.addScope('repo');
  provider.addScope('user');
  firebase.auth().signInWithPopup(provider).then(function(result) {
   var token = result.credential.accessToken;
   var user = result.user;
   $http.get("https://api.github.com/user?access_token="+token).then(function(res){
     console.log(res.data.id);
     SQLService.getUserId(res.data.id).then(function(results){
        MyService.setId(res.data.id);
        if(results.length){
          $state.go('homepage');
        }
        else
          {
            $scope.user_name=res.data.name;
            if(res.data.birthday)
              $scope.user_birthday=new Date(res.data.birthday);            
            else
               $scope.user_birthday=new Date();
            if(res.data.gender)
               $scope.user_gender=res.data.gender;
            else
              $scope.user_gender="male";
            var details={name:$scope.user_name,birthday:$scope.user_birthday,gender:$scope.user_gender,id:res.data.id};
            $state.go('profile',details);
          }
       },function(error){
      console.log(error);
    })
     var details={name:res.data.name,birthday:new Date(),gender:0};
     $state.go('profile',details);
    })
  }).catch(function(error) {
     console.log("er3 "+error.code);
     var errorCode = error.code;
     var errorMessage = error.message;
     alert(errorMessage);
     var email = error.email;
     var credential = error.credential;
   });
}

  $scope.$on("$stateChangeSuccess",function(event,to,toparams,from,fromparams){
       $scope.previous=from;
     });

  $ionicPlatform.registerBackButtonAction(function(){  
      if(!($rootScope.online)){
        event.preventDefault();
      }
      else if($state.current.name == "home" ){
         navigator.app.exitApp();
      }
      else{
         navigator.app.backHistory();
      }
     },100);

    $window.addEventListener("offline",function(){
     $rootScope.$apply(function(){
      $rootScope.online=false;
       })
      netPop = $ionicPopup.alert({
      title:'Cant Connect',
      template:'Please check your internet connection',
      scope:$scope,
      buttons:[
        {
          text:'Tap to retry',
          type:'button-positive',
          onTap:function(e){
            if(!($rootScope.online)){ 
             showInterval= $timeout(function(){
                 $ionicLoading.show({
                  template:'<ion-spinner icon="bubbles"></ion-spinner><br><br>Loading....'
                 });
              },200);
                e.preventDefault();
                $ionicLoading.hide();     
              }
           else{
            netPop.close();
              }             
            }
          } 
         ]
       })
     },false);

   $window.addEventListener("online",function(){
       $timeout.cancel(showInterval);
       showInterval=undefined;
       $ionicLoading.hide();
       netPop.close();
       $rootScope.$apply(function(){
       $rootScope.online=true;
       }) 
      },false);

  $scope.ena=function(){
    $scope.enabl=1;
    $scope.edit=0;
    }
  
  $scope.seleAdd=function(id){
    $scope.id=id;
    $scope.enabl=0;
    $scope.edit=0;
    }

  SQLService.getCartSelect().then(function(result){
      if(result){
            var i=0;      
            angular.forEach(result,function(res){
            i++;
           })
        $scope.chckLength=i;
        $scope.cartItem=result;
       }
       else{
          $scope.chckLength=0;
          $scope.cartItem=[];
            }
        },function(error){
            console.log(error);
     })
  
$scope.createAdd=function(my){
  $scope.inds=null;
  SQLService.setAdd(my).then(function(results){
     SQLService.getAdd().then(function(result){
        $scope.address=result;
        angular.forEach(result,function(res){
        $scope.inds=res.add_id;
       })
        var ad={add:$scope.address,sid:$scope.inds};
        $scope.enabl=0;
         $state.go('address',ad);
        }
      ,function(err){
        console.log(err);
       })
  },function(error){
    console.log(error);
  });
}

$scope.proDetails=[];

SQLService.getPro().then(function(result){
    $scope.lf=2;
    $scope.proDetails=result;
  },function(error){
      console.log("err db : "+error);
  })

$scope.load=function(){
  $scope.lf+=1;
}

SQLService.getBrand().then(function(result){
  $scope.brands=result;
},function(error){
  console.log(error);
})

SQLService.getInterest().then(function(results){
  $scope.interests=results;
},function(error){
  console.log(error);
})

SQLService.surveyDetails().then(function(results){
 $scope.surveyList=results;
},function(error){
  console.log(error);
})

SQLService.pastOrder().then(function(result){
    $scope.pastList=result;
},function(error){
  console.log(error);
})

SQLService.getAdd().then(function(result){
   $scope.address=result;
},function(error){
  console.log(error)
})

SQLService.daysCount().then(function(result){
      angular.forEach(result,function(res){
      var order_date=res.orderdate.split("/");
      var today_date=$scope.date.split("/");
      var date1=new Date(order_date[2],order_date[1]-1,order_date[0]);
      var date2=new Date(today_date[2],today_date[1]-1,today_date[0]);
      var mills=date2.getTime()-date1.getTime();
      var day=Math.floor(mills/(1000*24*60*60));
      if((day >= 60) && (res.survey == 1)){
          SQLService.updateAvailable(res.proid).then(function(res){             
          },function(error){
            console.log(error);
          })
         }         
      if(res.number_of_days != day){
        SQLService.updateCount(res.proid,day).then(function(re){
               //console.log(re);
        },function(error){
          console.log(error);
        })
       }
      })
     },function(error){
        console.log(error);
   })


    $scope.scrol=function(){
      $state.go('homepage'); 
    };
  
  $scope.back=function(){
       window.history.back();
     };

  $scope.ins=function(){
    SQLService.set().then(function(res){
   },function(err){
    console.log("n"+err);
   });
  }

  $scope.submitProfile=function(profile,userId){
     window.localStorage.setItem("brand","");
     window.localStorage.setItem("interests","");
     window.localStorage.setItem("inte_name","");
     SQLService.createUser(profile,userId).then(function(result){
      SQLService.setAdd(profile,userId).then(function(res){
      },function(error){
        console.log(error);
      })
         //alert("Welcome "+profile.name);
         $scope.next();
     },function(error){
         console.log(error);
     })
   };

  $scope.updateUserDetails=function(detail){
    SQLService.updateUser(detail).then(function(result){
      alert("Details updated successfully..");
      $state.go('settings');
    },function(error){
      console.log(error);
    })
  }

$scope.deleteAdd=function(id){
  $scope.enabl=0;
      $scope.inds=null;
        SQLService.deleteAd(id).then(function(results){
        SQLService.getAdd().then(function(result){
          $scope.address=result;
          angular.forEach(result,function(resu){
          $scope.inds=resu.add_id;
         })
         var ad={add:$scope.address,sid:$scope.inds};
         $state.go('address',ad);
           }
         ,function(err){
             console.log(err);
          })
        },function(error){
     console.log(error);
    })
  }

 $scope.editAdd=function(addr){
  $scope.enabl=0;
  $scope.edit=1;
  $scope.myEdit={name:addr.name,pincode:addr.pincode,deladd:addr.full_address,phone:addr.phone,id:addr.add_id};
 }

 $scope.updateAdd=function(update){
  SQLService.updateAddr(update).then(function(result){
    $scope.enabl=0;
    $scope.edit=0; 
    SQLService.getAdd().then(function(result){
        $scope.address=result;
        angular.forEach(result,function(res){
        $scope.inds=res.add_id;
       })
       $ionicPopup.alert({
        title:'sample',
        template:'Address updated sucessfully ..'
        }).then(function(res){
         var ad={add:$scope.address,sid:$scope.inds};
         $state.go('cart');
       })        
      }
      ,function(err){
        console.log(err);
      })
     },function(error){
    console.log(error);
   })
  }

$scope.refresh=function(){
  location.reload();
   SQLService.set().then(function(result){
     SQLService.getPro().then(function(result){
       $scope.proDetails=result;
      })
     })
   $scope.$broadcast('scroll.refreshComplete');
  }

  $scope.userDetails=function(){
    var id='1244947868931982'; //MyService.getId();
    SQLService.getUserDetails(id).then(function(result){
       $scope.details=result;
       var prof={detl:$scope.details};
       $state.go('details',prof);
    },function(error){
      console.log(error);
    })
  }

  $scope.deletePro=function(titl){
     $ionicPopup.confirm({
      title:'Confirm',
      template:'Are you sure you dont want to see this product in future',
      scope:$scope
       }).then(function(res){
      if(res){
       SQLService.donot(titl).then(function(res){
        location.reload();
        $scope.home(undefined);
        });
       }
      else
        event.preventDefault();
      })
    };

  $scope.logout=function(){
   $ionicPopup.confirm({
    title:'Logout',
    template:"Do you want to logout?",
    scope:$scope,
    cssClass:'po-head'
     }).then(function(res){
    if(res){
      window.localStorage.setItem('brand',"");
      window.localStorage.setItem('interests',"");
      window.localStorage.setItem('user',"");
      window.localStorage.setItem("inte_name","")
       $ionicHistory.clearCache().then(function(){
        $ionicHistory.clearHistory();
        $state.go('home');
       });     
     }
      else
       {
        event.preventDefault();
       }
     })
   };

 $scope.next=function(){
  if(android || ios || windowsPh || ipad )
  {
     cordova.plugins.diagnostic.isLocationEnabled(function(enabled){
     if(enabled)
    {
    $ionicLoading.show({
              template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location. Please wait ...'
          });
    var posOptions = {
              enableHighAccuracy: false,
              timeout: 20000
          };
    $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
            var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        $http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&sensor=true")
        .success(function(data){
          for(var i=0;i<data.results[0].address_components.length;i++){
            for(var j=0;j<data.results[0].address_components[i].types.length;j++){
                    if(data.results[0].address_components[i].types[j] == "postal_code"){
                         var city_name=data.results[0].address_components[i].long_name;
                           var cityname={city:city_name};
                            $ionicLoading.hide();
                                  alert(city_name);
                                   $scope.home(undefined);                               
                            }
                         }
                       }        
                     })
        .error(function(data){
          $ionicLoading.hide();
           alert("Please check your internet connection and try again !!");
        });
      },function(error){
        $ionicLoading.hide();
          switch(error.code){
        case error.PERMISSION_DENIED:alert("User permission is denied!");
                                     break;
        case error.POSITION_UNAVAILABLE:alert("User position is not available!");
                                         break;
        case error.TIMEOUT:alert("Time limit exceed!");
                           break;
        case error.UNKNOWN_ERROR:alert("Unknown error");
                                 break; 
          default:alert("Something went wrong. Please try again..");
                  break;
          }
      });
    }
    else{
      $ionicPopup.alert({
        title:"Location",
        template:"Please turn on your location...",
        scope:$scope
      }).then(function(res){
        cordova.plugins.diagnostic.switchToLocationSettings();
      });
    }
   });
   }
   else{
    $ionicLoading.show({
              template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location. Please wait ...'
          });  
    var posOptions = {
              enableHighAccuracy: false,
              timeout: 20000
          };  

    $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
            var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        $http.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&sensor=true")
        .success(function(data){
          //alert(data.results[0].formatted_address);
          for(var i=0;i<data.results[0].address_components.length;i++){
            for(var j=0;j<data.results[0].address_components[i].types.length;j++){
                    if(data.results[0].address_components[i].types[j] == "postal_code"){
                         var city_name=data.results[0].address_components[i].long_name;
                           var cityname={city:city_name};
                            $ionicLoading.hide();
                                 alert(city_name);
                                   $scope.home(undefined)                               
                       }
                   }
                }        
        })
        .error(function(data){
          $ionicLoading.hide();
           alert("error : "+data);
        });
      },function(error){
        $ionicLoading.hide();
          switch(error.code){
        case error.PERMISSION_DENIED:alert("User permission is denied!");
                                     break;
        case error.POSITION_UNAVAILABLE:alert("User position is not available!");
                                         break;
        case error.TIMEOUT:alert("Time limit exceed!");
                           break;
        case error.UNKNOWN_ERROR:alert("Unknown error");
                                 break; 
        default:alert("Something went wrong. Please try again..");
                  break;
          }
      });
     }
   };

$scope.shareApp=function(){
   if(android || ios || windowsPh || ipad ){
    $cordovaSocialSharing.share("Download this app","Sample App Link",null,"https://classroom.udacity.com/courses/cs046/lessons/176475143/concepts/1784228310923#");
     }
     else{
       $scope.myPopup=$ionicPopup.show({
       templateUrl:'templates/share.html',
       cssClass:'share',
       scope:$scope
      });
    }   
  };

 $scope.cancel=function(){
   $scope.myPopup.close(); 
  };

  $scope.ratingsObject = {
    iconOn : 'ion-ios-star',
    iconOff : 'ion-ios-star-outline',
    iconOnColor: 'rgb(255, 255, 0)',
    iconOffColor:  'rgb(51, 51, 0)',
    rating:  3,
    minRating:1,
    callback: function(rating) {
      $scope.ratingsCallback(rating);
    }
   };

  $scope.ratingsCallback = function(rating) {
    $scope.rate=rating;
    console.log('Selected rating is : ', rating);
   };
 
   $scope.cl=function(){
    console.log($scope.rate,$scope.lkd,$scope.pur,$scope.cou);
    }

  $scope.sel=function(id){
    $scope.days_count=0;
    $scope.survey_count=0;
    $scope.selectd=[];
    SQLService.daysCount().then(function(result){
      angular.forEach(result,function(res){
        if(res.number_of_days<=30)
         $scope.days_count++;
        else if(res.number_of_days>30 && survey==0)
         $scope.survey_count++;
        })
      if(($scope.days_count < 2) && ($scope.survey_count == 0))
       {
        SQLService.getCartSelect().then(function(result){
        var i=0;
        $scope.cartItem=result;
        angular.forEach(result,function(res){
        $scope.selectd.push(res.proid);
        i++;
       })
       $scope.chckLength=i;
       if($scope.selectd.indexOf(id) == -1 && i<2){ 
       SQLService.cartSelect(id).then(function(results){   
       },function(error){
       console.log(error);
       }) 
       $scope.chckLength++;
        if($state.current.name == "productdetail"){
          location.reload();
        }
       }
      else if(i>=2){
        alert("You can select maximum  of 5 products in a month");
       }
      else if($scope.survey_count > 0){
        alert("Kindly complete the survey for previous products to order again....");
       }
      else{
        alert("You can select this product only once in two months.");
       }
     },function(error){
    console.log(error);
     })
    }
    else
    {
      alert("You can select maximum  of 5 products in a month");
    }
    })
  };

$scope.selCart=function(id,chckd,inde){
  var i=0;
   $scope.chck=[];
   console.log(chckd+" "+inde+" "+id);
     if(chckd && chckd != 1){
      SQLService.cartSelect(id).then(function(results){
         SQLService.getCartSelect().then(function(result){
            $scope.cartItem=result;
            angular.forEach(result,function(res){
               i++;
            })
            $scope.chckLength=i;
            $state.go('cart');
         },function(error){
          console.log(error);
         })
      },function(error){
        console.log(error);
      }) 
     }
     else{
      SQLService.cartDeselect(id).then(function(results){
         SQLService.getCartSelect().then(function(result){
            $scope.cartItem=result;
            angular.forEach(result,function(res){
               i++;
            })
            $scope.chckLength=i;
            location.reload();
         },function(error){
          console.log(error);
         })
      },function(error){
        console.log(error);
      }) 
     }
  };

  $scope.addCart=function(){
    if($scope.chckLength>0){
      $scope.cil=[];
      angular.forEach($scope.cartItem,function(cart){
       $scope.cil.push(cart.title);
      })
       window.localStorage.setItem('cart',$scope.cil);
      $scope.idns;
       SQLService.getAdd().then(function(result){
        $scope.address=result;
        angular.forEach(result,function(res){
          $scope.idns=res.add_id;
        })
        var ad={add:$scope.address,sid:$scope.idns};
         $state.go('address',ad);
        }
      ,function(err){
        console.log(err);
       })
    }
    else{
      $ionicPopup.alert({
          title:'Items in Cart',
          template:'Please add atleast one item in cart to proceed further..',
          scope:$scope
        });
    }
   }

// function ordid(){
//   $scope.idlist=["1"];
//   SQLService.getOrderId().then(function(oId){
//                angular.forEach(oId,function(od){
//                 $scope.idlist.push(od);
//                })
//                $scope.idlist.push("2");
//                console.log($scope.idlist);
//                return $scope.idlist;
//                },function(error){
//                alert(error);
//                return error;
//                })
//   return $scope.idlist;
// }

function gel(){
  var rid=Math.random().toString().split(".");
  return rid[1];
}

  $scope.sendCart=function(id){ 
    if(!(angular.isDefined($scope.id))){
        $scope.id=id;
    }
    console.log($scope.id);
    if($scope.chckLength>0)
    { 
      var pop=$ionicPopup.confirm({
          title:'Confirm order',
          template:'Do you want to submit your Order? ',
          scope:$scope
         }).then(function(res){
          if(res){
           var c=1;
           var f=0;
           while(c && f<3){
           var orid=gel();
           console.log(orid);
           SQLService.getOrderId(orid).then(function(res){
            if(res.length){
               c=1;
               MyService.setOrder(c);
            }
            else
              {
                var lst="(";    
           var dummy=window.localStorage.getItem('cart');
           var chckSplit=dummy.split(",");
           var len=chckSplit.length;
            for(var i=0;i<len;i++)
              {
               if(!(angular.equals(chckSplit[i],"")) && (i < len-1))
                lst+="'"+chckSplit[i]+"',";
               else
                lst+="'"+chckSplit[i]+"'";
              }
           lst+=")";
           var or_date=$scope.date;
            SQLService.orderStatus(lst).then(function(results){
              SQLService.orderAdd(lst,$scope.id).then(function(result){
                SQLService.orderDate(lst,or_date).then(function(res){
                  SQLService.setOrderId(lst,orid).then(function(re){
                      c=0;
                      MyService.setOrder(c);
                  },function(error){
                      console.log(error);
                  })
                },function(error){
                  console.log(error);
                })
                  console.log(result);              
                },function(error){
                  console.log(error);
              })  
            alert('Your order is submitted sucessfully !');
            $ionicHistory.clearCache().then(function(){
              $scope.home(undefined);
            });
           },function(error){
            console.log(error);
           });
                c=0;
              }
           },function(error){
            console.log(error);
           })
           f++;
           c=MyService.getOrder();
           }
          }
          else{
            event.preventDefault();
           }
          });
        }
       else{
        $ionicPopup.alert({
          title:'Items in Cart',
          template:'Please add atleast one item in cart to proceed further..',
          scope:$scope
        });
       }
     };

   $scope.showAlert = function() {  
      var alertPopup = $ionicPopup.alert({
         title: 'No Internet Connection!',
         template: 'No Internet Connection Available. \n Please check.',
         cssClass:'po-head'
      });
   };

    $scope.sendSms = function(){
        var options = {
      replaceLineBreaks: false, // true to replace \n by a new line, false by default
      android: {
        intent: ''
      }
    };
        
  $cordovaSms.send('8760445439', 'HI',options).then(function(res){
      alert("SUC");
      $state.go('otp');
    }, function(err){
      alert(err);      
    });    
  };

  $scope.choices=[];
  $scope.dechoices=[];
  $scope.dechoicesInt=[];
    $scope.appFilterBrand=function(id,clicked){     
     if(clicked){
      $scope.choices.push(id);
     }
     else{
      $scope.choices.splice($scope.choices.indexOf(id),1);
      $scope.dechoices.push(id);
     }
    };

    $scope.appFilterInterest=function(id,clicked){
        if(clicked){
        $scope.choicesInt.push(id);
      }
      else{
        $scope.choicesInt.splice($scope.choicesInt.indexOf(id),1);
        $scope.dechoicesInt.push(id);
      }
    };

    $scope.home=function(intes){
    var d=window.localStorage.getItem("brand").split(",");
         angular.forEach(d,function(du){
          if($scope.choices.indexOf(du) == -1 && du != ""){
            $scope.choices.push(du);
          }
          angular.forEach($scope.dechoices,function(de){
                if($scope.choices.indexOf(de) != -1){
                   $scope.choices.splice($scope.choices.indexOf(de),1);
                }
            })
          window.localStorage.setItem("brand",$scope.choices);
         })
   
     var da=window.localStorage.getItem("interests").split(",");
         angular.forEach(da,function(du){
          if($scope.choicesInt.indexOf(du) == -1 && du != "")
          {
            $scope.choicesInt.push(du);
          }
          angular.forEach($scope.dechoicesInt,function(de){
               if($scope.choicesInt.indexOf(de) != -1){
                    $scope.choicesInt.splice($scope.choicesInt.indexOf(de),1);
               }
            })
          window.localStorage.setItem('interests',$scope.choicesInt);
         })
    var len=$scope.choices.length;
    var le=$scope.choicesInt.length;
    if(len<=0 && le<=0){
     $state.go('homepage');
    }
    else if((len>0 && le<=0)){       
     var lst="(";
     for(var i=0;i<len;i++)
    {
        if(!(angular.equals($scope.choices[i],"")) && (i < len-1))
            lst+="'"+$scope.choices[i]+"',";
          else
            lst+="'"+$scope.choices[i]+"'";
     }
     lst+=")";
     $scope.pass=[];
     SQLService.appBrandFil(lst).then(function(result){
      angular.forEach(result,function(res){
        $scope.pass.push(res.title);
      })
      if(result.length>0){
          var filt={referer:$scope.pass};
          $state.go('homepage',filt);
        }
        else
           $state.go('none');
     },function(error){
      console.log("EF "+error);
     });
    }
    else if(len<=0 && le>0){
      var lst="(";
     for(var i=0;i<le;i++)
    {
        if(!(angular.equals($scope.choicesInt[i],"")) && (i < le-1))
            lst+="'"+$scope.choicesInt[i]+"',";
          else
            lst+="'"+$scope.choicesInt[i]+"'";
     }
     lst+=")";
     $scope.pass=[];
     SQLService.appInterestFil(lst).then(function(result){
      angular.forEach(result,function(res){
        $scope.pass.push(res.title);
      })
      if(result.length>0){
          var filt={referer:$scope.pass};
          $state.go('homepage',filt);
        }
        else
           $state.go('none');
     },function(error){
      console.log("EF "+error);
     });
    }

    else if(len>0 && le>0){ 
      var lst="(";
     for(var i=0;i<len;i++)
    {
        if(!(angular.equals($scope.choices[i],"")) && (i < len-1))
            lst+="'"+$scope.choices[i]+"',";
          else
            lst+="'"+$scope.choices[i]+"'";
     }
     lst+=")";
     var lsti="(";
     for(var i=0;i<le;i++)
    {
        if(!(angular.equals($scope.choicesInt[i],"")) && (i < le-1))
            lsti+="'"+$scope.choicesInt[i]+"',";
          else
            lsti+="'"+$scope.choicesInt[i]+"'";
     }
     lsti+=")";
     $scope.pass=[];
     SQLService.appBIFil(lst,lsti).then(function(result){
      angular.forEach(result,function(res){
        $scope.pass.push(res.title);
      })
      if(result.length>0){
          var filt={referer:$scope.pass};
          $state.go('homepage',filt);
        }
        else
           $state.go('none');
     },function(error){
      console.log("EF "+error);
     });
    }   
    };

    $scope.filterSelect=function(){
      var d=window.localStorage.getItem("brand").split(",");
      $scope.chos=[];
      $scope.choa=[];
      angular.forEach(d,function(du){
           $scope.chos.push(du);
      })
      var da=window.localStorage.getItem("interests").split(",");
       angular.forEach(da,function(du){
           $scope.choa.push(du);
      })
      var ref={a:$scope.chos,b:$scope.choa};
      $state.go("filter",ref);
    }

    $scope.cart=function(intes){
    $scope.chcd=[];
    SQLService.getCartSelect().then(function(result){
      if(result){
        var i=0;
      angular.forEach(result,function(res){
        i++;
      }) 
     }
    else{
       $scope.chckLength=0;
       $scope.cartItem=[];
    }
    $scope.nl=intes;
     var ret={ref:$scope.cartItem,hme:$scope.nl};
     $state.go('cart',ret);
    },function(error){
      console.log(error);
    });  
  };

  $scope.settings=function(intes){
     $scope.nl=intes;
     var ret={hme:$scope.nl};
     $state.go('settings',ret);
  };

  $scope.history=function(intes){
     $scope.nl=intes;
     var ret={hme:$scope.nl};
     $state.go('history',ret);
  };

  $scope.deseleInterest=[];

  $scope.selInterest=function(interest_name,selc){
       if(selc)
       $scope.seleInterest.push(interest_name);
     else{
       $scope.deseleInterest.push(interest_name);
       $scope.seleInterest.splice($scope.seleInterest.indexOf(interest_name),1);
     }
    }

    $scope.appInterest=function(){
      var ai="(";
      var d=window.localStorage.getItem("interests").split(",");
      angular.forEach(d,function(du){
        if($scope.deseleInterest.length){
          angular.forEach($scope.deseleInterest,function(de){
          if(angular.equals(de,du)){
          }
          else
            $scope.seleInterest.push(du);
        })
          }
        else{
          $scope.seleInterest.push(du);
        } 
         })
       var len=$scope.seleInterest.length;
       window.localStorage.setItem("interests",$scope.seleInterest);
       $scope.home(undefined);
    //    for(var i=0;i<len;i++){
    //      if(!(angular.equals($scope.seleInterest[i],"")) && i<len-1)
    //        ai+="'"+$scope.seleInterest[i]+"'"+",";
    //      else{
    //       ai+="'"+$scope.seleInterest[i]+"'";
    //      }
    //    }
    //    ai+=")";
    //    if(len>0){
    //     $scope.sit=[];
    //     SQLService.setInterest(ai).then(function(result){
    //     for(var i=0;i<result.length;i++){
    //       $scope.sit.push(result[i].title);
    //     }
    //     var inte={referer:$scope.sit};
    //     $state.go('homepage',inte);
    //   },function(error){
    //     console.log(error);
    //   });
    //  }
    // else{
    //   $state.go('homepage');
    //  }
    }

    $scope.getInterests=function(){
      var cd=window.localStorage.getItem("interests");
      console.log(cd);
      var d=cd.split(",");
      $scope.it=[];
      angular.forEach(d,function(du){
        if(du != "")
        $scope.it.push(du);
      })
      if($scope.it.length){
        var ref={inter:$scope.it};
      $state.go('interests',ref);
      }
      else{
        $scope.it=[];
        var ref={inter:$scope.it};
        $state.go('interests',ref);
      }
    }

    $scope.clearFilter=function(){
      $scope.clear_fil=1;
      window.localStorage.setItem("brand","");
      window.localStorage.setItem("interests","");
      $scope.choices=[];
      $scope.choicesInt=[];
      $scope.filterSelect();
    };

 $scope.lkd=0;
 $scope.pur=0;
 $scope.cou=0;
 $scope.rate=3;

    $scope.liked=function(clicked){     
      if(clicked){
        $scope.lkd=1;
      }
    }

    $scope.futur=function(clicked){        
      if(clicked){
        $scope.pur=1;
      }
    }

    $scope.coupon=function(clicked){       
      if(clicked){
        $scope.cou=1;
      }
    }

    $scope.submitSurvey=function(title){
       SQLService.surveyRes(title,$scope.rate,$scope.lkd,$scope.pur,$scope.cou).then(function(result){
           if(result){
            SQLService.surveySta(title).then(function(result){
               $ionicPopup.alert({
                title:'voila',
                template:'Thanks for your valuable feedback !!',
                scope:$scope
               }).then(function(res){
                if(res){
                  location.reload();
                  $state.go('history');
                }
               });
            },function(error){
              alert("Something went wrong. Please try again...")
            })
           }
       },function(error){
        console.log(error);
       })
     };

     $scope.orderDetails=function(id){
          SQLService.getOrderDet(id).then(function(result){
             
          },function(error){

          })
     }
   });

app.filter('cartFilter',function($filter){
  return function(list,checkList,title){
    if(checkList){
      return $filter("filter")(list,function(seleList){
       return checkList.indexOf(seleList[title]) != -1; 
      })
    }
    else{
      return $filter("filter")(list,function(seleList){
       return true; 
      })
    }
  }
});

app.filter('cartSelFilter',function($filter){
  return function(list,checkList,title){
    if(checkList){
      return $filter("filter")(list,function(seleList){
       return checkList.indexOf(seleList[title]) != -1; 
      })
    }
    
  }
});


app.config(function($stateProvider , $urlRouterProvider , $ionicConfigProvider) {
  $stateProvider
  .state('info', {
    url: "/info",
    templateUrl: 'templates/info.html',
    controller: 'login'
})
.state('home', {
    url: "/home",
    templateUrl: 'templates/home.html',
    controller: 'login'
})
.state('profile',{
  url:'/profile',
  params:{name:null,birthday:null,gender:null,id:null},
  templateUrl:'templates/profile.html',
  controller:'login'
}).
state('homepage',{
  url:'/homepage',
  params:{referer:null,city:null},
  templateUrl:'templates/homepage.html',
  controller:'login'
}).
state('cart',{
  url:'/cart/',
  params:{ref:null,hme:null},
  templateUrl:'templates/cart.html',
  controller:'login'
}).
state('settings',{
  url:'/settings',
  params:{hme:null},
  templateUrl:'templates/settings.html',
  controller:'login'
}).
state('history',{
  url:'/history',
  params:{hme:null},
  templateUrl:'templates/history.html',
  controller:'login'
}).
state('survey',{
  url:'/survey/:aId',
  templateUrl:'templates/survey.html',
  controller:'login'
}).
state('interests',{
  url:'/interests',
  params:{inter:null},
  templateUrl:'templates/interests.html',
  controller:'login'
}).
state('details',{
  url:'/details',
  params:{detl:null},
  templateUrl:'templates/details.html',
  controller:'login'
}).
state('otp',{
  url:'/otp',
  templateUrl:'templates/otp.html',
  controller:'login'
}).
state('fil',{
  url:'/fil',
  params:{referer:null},
  templateUrl:'templates/fil.html',
  controller:'login'
}).
state('filter',{
  url:'/filter',
  params:{a:null,b:null},
  templateUrl:'templates/filter.html',
  controller:'login'
}).
state('share',{
  url:'share',
  templateUrl:'templates/share.html',
  controller:'login'
}).
state('homepage_web',{
  url:'/homepage_brow',
  params:{referer:null,city:null},
  templateUrl:'templates/homepage_web.html',
  controller:'login'
}).
state('none',{
  url:'/no-products-found',
  templateUrl:'templates/none.html',
  controller:'login'
}).
state('red',{
  url:'/red',
  params:{add:null,sid:null},
  templateUrl:'templates/red.html',
  controller:'login'
}).
 state('address',{
  url:'/address',
  params:{add:null,sid:null},
  templateUrl:'templates/address.html',
  controller:'login'
}).
state('tncpage',{
  url:'/Terms and Conditions',
  templateUrl:'templates/tncpage.html',
  controller:'login'
}).
state('past',{
  url:'/past-orders',
  templateUrl:'templates/past.html',
  controller:'login'
}).
state('pending',{
  url:'/pending-surveys',
  templateUrl:'templates/pending.html',
  controller:'login'
}).
state('fulldetail',{
  url:'/fulldetail/:aId',
  templateUrl:'templates/fulldetail.html',
  controller:'login'
}).
state('ordersummary',{
  url:'/order-summary/:bId',
  templateUrl:'templates/ordersummary.html',
  controller:'login'
}).
state('productdetail',{
  url:'/product-detail/:bId',
  templateUrl:'templates/productdetail.html',
  controller:'login'
})
$urlRouterProvider.otherwise('/home'); 

$ionicConfigProvider.navBar.alignTitle('center');
});
