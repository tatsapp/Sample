var servic=angular.module("starter.services",['ngCordova','ionic']);

servic.factory("SQLService",function($q,$cordovaSQLite){
var db;

  function createDB(){
    if(window.cordova){
        db=$cordovaSQLite.openDB({name:'sample.db',location:'default'});
        $cordovaSQLite.execute(db,"create table if not exists pro (proid integer primary key, title text ,img text,desc text,ordered integer,interested integer,orderdate text,survey integer,brand_id integer,intrst_id integer,addres_id integer,selected integer,number_of_days integer,orders_id text)");
        $cordovaSQLite.execute(db,"create table if not exists brand (brand_id integer primary key ,brand_name text)");  
        $cordovaSQLite.execute(db,"create table if not exists interest (interest_id integer primary key ,interest_name text)"); 
        $cordovaSQLite.execute(db,"create table if not exists surveydisplay (survey_id integer primary key ,survey_title text,ratings integer,liked integer,purchase integer,coupons integer)"); 
        $cordovaSQLite.execute(db,"create table if not exists address (add_id integer primary key ,user_id text, name text, pincode text,full_address text,phone text)"); 
        $cordovaSQLite.execute(db,"create table if not exists user (id text primary key,user_name text,user_address text,user_mobile text,user_gender text,user_dob text)");
       }
    else{
         db=window.openDatabase("First","1.0","My first App",10*1024*1024);
         db.transaction(function(tx){
            tx.executeSql("create table if not exists pro (proid integer primary key AUTOINCREMENT, title varchar(50) ,img varchar(20),desc varchar(100),ordered integer,interested integer,orderdate varchar(20),survey integer,brand_id integer,intrst_id integer,addres_id integer,selected integer,number_of_days integer,orders_id varchar(30))",[]);
            tx.executeSql("create table if not exists brand (brand_id integer primary key AUTOINCREMENT,brand_name varchar(50))",[]);  
            tx.executeSql("create table if not exists interest (interest_id integer primary key AUTOINCREMENT,interest_name varchar(20))",[]); 
            tx.executeSql("create table if not exists surveydisplay (survey_id integer primary key AUTOINCREMENT,survey_title varchar(50),ratings integer,liked integer,purchase integer,coupons integer)",[]); 
            tx.executeSql("create table if not exists address (add_id integer primary key AUTOINCREMENT,user_id varchar(50), name varchar(20), pincode varchar(20),full_address varchar(100),phone varchar(20))",[]); 
            tx.executeSql("create table if not exists user (id varchar(50) primary key,user_name varchar(50),user_address varchar(100),user_mobile varchar(15),user_gender varchar(13),user_dob varchar(11))",[]);
          })
        }
     }  

  function insert(){
      if(window.cordova){
         return promisedQuery("update pro set ordered=0,selected=0, survey=0 where ordered=1",result,error);
        }  
      else
        return promisedQuery("update pro set ordered=0,selected=0, survey=0 where ordered=1",result,error);
    }

    function getf(){       
         return promiseQuery("select * from pro",result,error);
    }

  function applyInterest(ai){
      if(window.cordova)
        return promiseQuery("select * from pro,interest where pro.intrst_id=interest.interest_id and pro.interested=1 and interest.interest_name in "+ai,result,error);
      else
        return promisedQuery("select * from pro,interest where pro.intrst_id=interest.interest_id and pro.interested=1 and interest.interest_name in "+ai,result,error);
  }

  function selectPro(){
    if(window.cordova)
     return promiseQuery("select * from pro where interested = 1 and ordered=0",result,error);
    else
     return promisedQuery("select * from pro where interested = 1 and ordered=0",result,error);
  }

  function selectBrand(){
       if(window.cordova)
        return promiseQuery("select * from brand",result,error);
       else
        return promisedQuery("select * from brand",result,error);
  }

  function selectInterest(){
      if(window.cordova)
       return promiseQuery("select * from interest",result,error);
      else
       return promisedQuery("select * from interest",result,error);
  }

  function sendCartList(title){
    if(window.cordova)
        return promiseQuery("update pro set ordered=1 where title in "+title,result,error);
    else
        return promisedQuery("update pro set ordered=1 where title in "+title,result,error);
  }

  function donotsee(titl){
    if(window.cordova)
      return promiseQuery("update pro set interested=0 where title = '"+titl +"'",result,error);
    else
      return promisedQuery("update pro set interested=0 where title = '"+titl +"'",result,error);
  }

  function selectSurvey(){
    if(window.cordova)
      return promiseQuery("select * from pro where survey=0 and ordered=1",result,error);
    else
      return promisedQuery("select * from pro where survey=0 and ordered=1",result,error);
  }

  function surveyResult(title,rate,like,purchas,coupon){
      if(window.cordova)
        return promiseQuery("insert into surveydisplay (survey_title,ratings,liked,purchase,coupons) values('"+title+"',"+rate+","+like+","+purchas+","+coupon+")",result,error);
      else
        return promisedQuery("insert into surveydisplay (survey_title,ratings,liked,purchase,coupons) values('"+title+"',"+rate+","+like+","+purchas+","+coupon+")",result,error);
  }

  function surveyStatus(title){
    if(window.cordova)
       return promiseQuery("update pro set survey=1 where title= '"+title+"'",result,error);
    else
       return promisedQuery("update pro set survey=1 where title= '"+title+"'",result,error);
  }

  function applyFilterBrand(id){
    if(window.cordova)
      return promiseQuery("select * from pro where brand_id in (select brand_id from brand where brand_name in "+id+")",result,error);
    else
      return promisedQuery("select * from pro where brand_id in (select brand_id from brand where brand_name in "+id+")",result,error);
  }

  function applyFilterInterest(id){
    if(window.cordova)
      return promiseQuery("select * from pro where intrst_id in (select interest_id from interest where interest_name in "+id+")",result,error);
    else
      return promisedQuery("select * from pro where intrst_id in (select interest_id from interest where interest_name in "+id+")",result,error);
  }

  function applyFilterBI(i1,i2){
    if(window.cordova)
      return promiseQuery("select * from pro where brand_id in (select brand_id from brand where brand_name in "+i1+" ) and intrst_id in (select interest_id from interest where interest_name in "+i2+" )",result,error);
    else
      return promisedQuery("select * from pro where brand_id in (select brand_id from brand where brand_name in "+i1+" ) and intrst_id in (select interest_id from interest where interest_name in "+i2+" )",result,error);
   }

  function getAddress(){
    if(window.cordova)
       return promiseQuery("select * from address",result,error);
    else
       return promisedQuery("select * from address",result,error);
    //check for order details too in order-summary url
   }

  function insertAdd(my,userId){
    if(window.cordova)
      return promiseQuery("insert into address (name,pincode,full_address,phone,user_id) values ('"+my.name+"','"+my.pincode+"','"+my.deladd+"','"+my.phone+"','"+userId+"')",result,error);
    else
      return promisedQuery("insert into address (name,pincode,full_address,phone,user_id) values ('"+my.name+"','"+my.pincode+"','"+my.deladd+"','"+my.phone+"','"+userId+"')",result,error);
   }                                                                                               

  function orderAddress(list,id){
    if(window.cordova)
     return promiseQuery("update pro set addres_id="+id+" where title in "+list,result,error);
    else
     return promisedQuery("update pro set addres_id="+id+" where title in "+list,result,error);
  }

  function deleteAddress(id){
    if(window.cordova)
     return promiseQuery("delete from address where add_id="+id,result,error);
    else
     return promisedQuery("delete from address where add_id="+id,result,error);
  }

  function cartSelection(id){
    if(window.cordova)
     return promiseQuery("update pro set selected=1 where proid="+id,result,error);
    else
     return promisedQuery("update pro set selected=1 where proid="+id,result,error);
  }

  function getCartList(){
    if(window.cordova)
     return promiseQuery("select * from pro where selected=1 and ordered=0",result,error);
    else
     return promisedQuery("select * from pro where selected=1 and ordered=0",result,error);
  } 

  function cartDeSelection(id){
    if(window.cordova)
     return promiseQuery("update pro set selected=0 where proid="+id,result,error);
    else
     return promisedQuery("update pro set selected=0 where proid="+id,result,error);
   }

   function OrderDate(list,date){
    if(window.cordova)
      return promiseQuery("update pro set orderdate='"+date+"' where title in "+list,result,error);
    else
      return promisedQuery("update pro set orderdate='"+date+"' where title in "+list,result,error);
   }

   function datediff(){
    if(window.cordova)
      return promiseQuery("select * from pro where ordered=1",result,error);
    else
      return promisedQuery("select * from pro where ordered=1",result,error);
   }

   function updateDaysCount(id,days){
     if(window.cordova)
      return promiseQuery("update pro set number_of_days="+days+" where proid="+id,result,error);
     else
      return promisedQuery("update pro set number_of_days="+days+" where proid="+id,result,error);
    }

   function updatePro(id){
    if(window.cordova)
        return promiseQuery("update pro set ordered=0 where proid="+id,result,error);
    else
        return promisedQuery("update pro set ordered=0 where proid="+id,result,error);
   }

   function createUserProfile(profile,userId){
        var m=profile.dob.getMonth();
        var d=profile.dob.getDate()+"/"+m+"/"+profile.dob.getFullYear();
        if(window.cordova)
          return promiseQuery("insert into user (id,user_name,user_address,user_mobile,user_gender,user_dob) values('"+userId+"','"+profile.name+"','"+profile.address+"','"+profile.mobile+"','"+profile.choice+"','"+d+"')",result,error);
        else
          return promisedQuery("insert into user (id,user_name,user_address,user_mobile,user_gender,user_dob) values('"+userId+"','"+profile.name+"','"+profile.address+"','"+profile.mobile+"','"+profile.choice+"','"+d+"')",result,error);
   }

    function updateAddress(update){
      if(window.cordova)
          return promiseQuery("update address set name='"+update.name+"',pincode='"+update.pincode+"',full_address='"+update.deladd+"',phone='"+update.phone+"' where add_id="+update.id,result,error);
      else
          return promisedQuery("update address set name='"+update.name+"',pincode='"+update.pincode+"',full_address='"+update.deladd+"',phone='"+update.phone+"' where add_id="+update.id,result,error);
    }

    function userIdCheck(id){
      if(window.cordova)
         return promiseQuery("select * from user where id='"+id+"'",result,error);
      else
         return promisedQuery("select * from user where id='"+id+"'",result,error);
    }

    function getUserProfile(id){
      if(window.cordova)
        return promiseQuery("select * from user where id='"+id+"'",result,error);
      else
        return promisedQuery("select * from user where id='"+id+"'",result,error);
    }

    function updatUser(user){
         var m=user.dob.getMonth();
         var d=user.dob.getDate()+"/"+m+"/"+user.dob.getFullYear();
         if(window.cordova)
           return promiseQuery("update user set user_name='"+user.name+"',user_gender='"+user.gender+"',user_dob='"+d+"'",result,error);
         else
           return promisedQuery("update user set user_name='"+user.name+"',user_gender='"+user.gender+"',user_dob='"+d+"'",result,error);
    }

    function pastOrders(){
      if(window.cordova)
        return promiseQuery("select * from pro where ordered=1 and survey=1",result,error);
      else
        return promisedQuery("select * from pro where ordered=1 and survey=1",result,error);
    }

    function surveySubmitted(title){
      if(window.cordova)
       return promiseQuery("update pro set survey_submitted=1 where title="+title,result,error);
      else
       return promisedQuery("update pro set survey_submitted=1 where title="+title,result,error);
    }

    function getOrderid(id){
      if(window.cordova)
       return promiseQuery("select orders_id from pro where orders_id in '"+id+"'",result,error);
      else
       return promisedQuery("select orders_id from pro where orders_id in '"+id+"'",result,error);
    }

    function setOrderid(title,id){
      if(window.cordova)
       return promiseQuery("update pro set orders_id='"+id+"' where title in "+title,result,error);
      else
       return promisedQuery("update pro set orders_id='"+id+"' where title in "+title,result,error);
    }

    function getOrderDetails(id){
      if(window.cordova)
       return promiseQuery("select * from pro,address where pro.addres_id=address.id and orders_id='"+id+"'",result,error);
      else
       return promisedQuery("select * from pro,address where pro.addres_id=address.id and orders_id='"+id+"'",result,error);
    }

    function result(deferred){
         return function(tx,results){
             var len=results.rows.length;
             var output=[];
               for(var i=0;i<len;i++){
                   var ot=results.rows.item(i);
                   output.push(ot);
                }
             deferred.resolve(output);
            }
           }

     function error(deferred){
         return function(tx,results){
              var len=0;
              var output="";
              deferred.resolve(output);
          }
      }

    function promisedQuery(query,success,err){
       var deferred=$q.defer();
       db.transaction(function(tx){
           tx.executeSql(query,[],success(deferred),err(deferred));
        },err);
       return deferred.promise;
      }

      function promiseQuery(query,success,err){
           var deferred=$q.defer();
           $cordovaSQLite.execute(db,query,[]).then(function(results){
                var len=results.rows.length;
                var output=[];
                  for(var i=0;i<len;i++){
                   var ot=results.rows.item(i);
                   output.push(ot);
                   }
                deferred.resolve(output);
            },function(error){
                var len=0;
                var output="";
                deferred.resolve(output);
            })
       return deferred.promise;
      }

      
     
return{
  create:function(){
         return createDB();
  },
  set:function(){
          return insert();
  },
  getPro:function(){
         return selectPro();
  },
  getBrand:function(){
           return selectBrand();
  },
  getInterest:function(){
           return selectInterest();
  },
  donot:function(titl){
       return donotsee(titl);
  },
  setInterest:function(ai){
       return applyInterest(ai);
  },
  orderStatus: function(title){
         return sendCartList(title);
  },
  surveyDetails:function(){
       return selectSurvey();
  },
  surveyRes:function(title,rate,like,purchas,coupon){
    return surveyResult(title,rate,like,purchas,coupon);
  },
  surveySta:function(title){
    return surveyStatus(title);
  },
  appBrandFil:function(id){
      return applyFilterBrand(id);
  },
  appInterestFil:function(id){
       return applyFilterInterest(id);
  },
  appBIFil:function(i1,i2){
       return applyFilterBI(i1,i2);
  },
  getAdd:function(){
      return getAddress();
  },
  setAdd:function(my,userId){
    return insertAdd(my,userId);
  },
  orderAdd:function(list,id){
       return orderAddress(list,id);
  },
  deleteAd:function(id){
         return deleteAddress(id);
  },
  cartSelect:function(id){
    return cartSelection(id);
  },
  cartDeselect:function(id){
    return cartDeSelection(id); 
  },
  getCartSelect:function(){
    return getCartList();
  },
  orderDate:function(list,date){
    return OrderDate(list,date);
  },
  daysCount:function(){
      return datediff();
  },
  updateCount:function(id,days){
      return updateDaysCount(id,days);
  },
  updateAvailable:function(id){
    return updatePro(id);
  },
  createUser:function(profile,userId){
    return createUserProfile(profile,userId);
  },
  updateAddr:function(update){
    return updateAddress(update);
  },
  getUserId:function(id){
    return userIdCheck(id);
  },
  getUserDetails:function(id){
    return getUserProfile(id);
  },
  updateUser:function(user){
    return updatUser(user);
  },
  pastOrder:function(){
    return pastOrders();
  },
  surveySub:function(title){
    return surveySubmitted(title);
  },
  getOrderId:function(id){
    return getOrderid(id);
  },
  setOrderId:function(lst,id){
    return setOrderid(lst,id);
  },
  getOrderDet:function(id){
    return getOrderDetails(id);
  },
  getfm:function(){
    return getf();
  }
 }
});

servic.service('MyService',function(){
  var id="";
  var order=null;

  this.setId=function(name){
    id=name;
  }
  this.getId=function(){
    return id;
  }
  this.setOrder=function(o){
    order=o;
  }   
  this.getOrder=function(){
    return order;
  }
})