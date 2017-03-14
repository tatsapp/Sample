var ser=angular.module("starter.services",[])

ser.factory("SQLService",function($q){
var db;
function createDB(){
    db=window.openDatabase("First","1.0","My first App",10*1024*1024);
    db.transaction(function(tx){
    //tx.executeSql("update pro set interested=1 where proid=3",[]);
    //tx.executeSql("drop table address",[]);
    tx.executeSql("create table if not exists pro (proid integer primary key AUTOINCREMENT, title varchar(50) ,img varchar(20),desc varchar(100),ordered integer,interested integer,orderdate varchar(20),survey integer,brand_id integer,intrst_id integer,addres_id integer,selected integer,number_of_days integer,order_id varchar(10))",[]);
    tx.executeSql("create table if not exists brand (brand_id integer primary key AUTOINCREMENT,brand_name varchar(50))",[]);  
    tx.executeSql("create table if not exists interest (interest_id integer primary key AUTOINCREMENT,interest_name varchar(20))",[]); 
    tx.executeSql("create table if not exists surveydisplay (survey_id integer primary key AUTOINCREMENT,survey_title varchar(50),ratings integer,liked integer,purchase integer,coupons integer)",[]); 
    tx.executeSql("create table if not exists address (add_id integer primary key AUTOINCREMENT,user_id varchar(50), name varchar(20), pincode varchar(20),full_address varchar(100),phone varchar(20))",[]); 
    tx.executeSql("create table if not exists user (id varchar(50) primary key,user_name varchar(50),user_address varchar(100),user_mobile varchar(15),user_gender varchar(13),user_dob varchar(11))",[]);
    }) 
   }

function insert(){
	 //return promisedQuery("alter table pro add orders_id varchar(100)",result,error);
	 //return promisedQuery("update pro set ordered=0,selected=0, survey=0 where ordered=1",result,error);
   //return promisedQuery("insert into pro (title,img,desc,ordered,interested,orderdate,survey,brand_id,intrst_id) values('Olay','img/olay.jpg','The Olay brand has expanded into a range of other products grouped into boutiques including Complete, Total Effects, ProX, Regenerist, Regenerist Luminous, Classics, Fresh Effects, Body (North America) and White Radiance (Asia). Olay is the market leader in many countries including the US, UK, and China.[6] Olay has extended its heritage as a moisturizer to stay looking young, to formally creating the anti-aging category in mass stores with the launch of Total Effects in 1999. Active Hydrating Formula, generally the least expensive variety, bears the closest resemblance to the pink Oil of Olay marketed in the US before the P&G acquisition.',0,1,'0',0,4,4)",result,error);
     return promisedQuery("insert into pro (title,img,desc,ordered,interested,orderdate,survey,brand_id,intrst_id,addres_id,selected,number_of_days,orders_id) values('Ambipur','img/ambipur.png','Ambi-Pur first product was launched in 1958 in Spain by Javier de Merelo Barberá Sanromä Cruz. Cruz Verde was a Spanish household brand selling a wide range of products, and even in the 2010s is a well-known brand in Spain because of the great tradition of innovation and advertising. Cruz Verde was purchased in the 1970s by the US multinational company Syntex. Ambi-Pur, which differs from other products and Cruz Verde, became a brand name, with cellulose products constant and aerosols, and in the late 1970s and 1980s, continued to strengthen the brand with new products and diversification of the intended use',0,1,'0',0,1,1,0,0,0,'0')",result,error);
   //return promisedQuery("insert into pro (title,img,desc,ordered,interested,orderdate,survey,brand_id,intrst_id,addres_id,selected,number_of_days,orders_id) values('Gillette','img/gillette.jpg','The Gillette Companys assets were incorporated into a P&G unit known internally as Global Gillette. In July 2007, Global Gillette was dissolved and incorporated into Procter & Gambles other two main divisions, Procter & Gamble Beauty and Procter & Gamble Household Care. Gillettes brands and products were divided between the two accordingly. The Gillette R&D center in Boston, Massachusetts as, and the Gillette South Boston Manufacturing Center',0,1,'0',0,2,2,0,0,0,'0')",result,error);
   //return promisedQuery("insert into pro (title,img,desc,ordered,interested,orderdate,survey,brand_id,intrst_id,addres_id,selected,number_of_days,orders_id) values('Pampers','img/pampers.jpg', 'In 1956 P&G researcher Victor Mills disliked changing the cloth diapers of his newborn grandchild. So he assigned fellow researchers in P&Gs Exploratory Division in Miami Valley, Ohio to look into making a better disposable diaper. Pampers were introduced in 1961. They were created by researchers at P&G including Vic Mills and Norma Lueders Baker. The name Pampers was coined by Alfred Goldman, Creative Director at Benton & Bowles, the first ad agency for the account.These early diapers were bulky, heavy products composed of fluff pulp with a rayon topsheet, polyethylene backsheet. In 1966 Pampers launched a wingfold design and by 1969 started a third size. By this time Pampers had become a national brand in the United States.[citation needed] Procter and Gamble replaced the pin-on design with tapes in 1971.',0,1,'0',0,3,3,0,0,0,'0')",result,error);
   //return promisedQuery("insert into pro (title,img,desc,ordered,interested,orderdate,survey,brand_id,intrst_id,addres_id,selected,number_of_days,orders_id) values('Olay','img/olay.jpg','The Olay brand has expanded into a range of other products grouped into boutiques including Complete, Total Effects, ProX, Regenerist, Regenerist Luminous, Classics, Fresh Effects, Body (North America) and White Radiance (Asia). Olay is the market leader in many countries including the US, UK, and China.[6] Olay has extended its heritage as a moisturizer to stay looking young, to formally creating the anti-aging category in mass stores with the launch of Total Effects in 1999. Active Hydrating Formula, generally the least expensive variety, bears the closest resemblance to the pink Oil of Olay marketed in the US before the P&G acquisition.',0,1,'0',0,4,4,0,0,0,'0')",result,error);
   //return promisedQuery("update pro set ordered=0 and survey=0 where ordered=1",result,error);    
   //return promisedQuery("insert into interest (interest_name) values('Household')",result,error);
   //return promisedQuery("insert into interest (interest_name) values('Beauty')",result,error);
   //return promisedQuery("insert into interest (interest_name) values('Hygiene')",result,error);
   //return promisedQuery("insert into interest (interest_name) values('Health')",result,error);
   //return promisedQuery("insert into brand (brand_name) values('Ambipur')",result,error);
   //return promisedQuery("insert into brand (brand_name) values('Gillette')",result,error);
   //return promisedQuery("insert into brand (brand_name) values('Pampers')",result,error);
   //return promisedQuery("insert into brand (brand_name) values('Olay')",result,error);
}

function applyInterest(ai){
  return promisedQuery("select * from pro,interest where pro.intrst_id=interest.interest_id and pro.interested=1 and interest.interest_name in "+ai,result,error);
}

function selectPro(){
  return promisedQuery("select * from pro where interested = 1 and ordered=0",result,error);
}

function selectBrand(){
  return promisedQuery("select * from brand",result,error);
}

function selectInterest(){
  return promisedQuery("select * from interest",result,error);
}

function sendCartList(title){
  return promisedQuery("update pro set ordered=1 where title in "+title,result,error);
}

function donotsee(titl){
  return promisedQuery("update pro set interested=0 where title = '"+titl +"'",result,error);
}

function selectSurvey(){
  return promisedQuery("select * from pro where survey=0 and ordered=1",result,error);
}

function surveyResult(title,rate,like,purchas,coupon){
  return promisedQuery("insert into surveydisplay (survey_title,ratings,liked,purchase,coupons) values('"+title+"',"+rate+","+like+","+purchas+","+coupon+")",result,error);
}

function surveyStatus(title){
   return promisedQuery("update pro set survey=1 where title= '"+title+"'",result,error);
}

function applyFilterBrand(id){
	return promisedQuery("select * from pro where brand_id in (select brand_id from brand where brand_name in "+id+")",result,error);
}

function applyFilterInterest(id){
	return promisedQuery("select * from pro where intrst_id in (select interest_id from interest where interest_name in "+id+")",result,error);
}

function applyFilterBI(i1,i2){
	return promisedQuery("select * from pro where brand_id in (select brand_id from brand where brand_name in "+i1+" ) and intrst_id in (select interest_id from interest where interest_name in "+i2+" )",result,error);
}

function getAddress(){
	return promisedQuery("select * from address",result,error);
  //check for order details too in order-summary url
}

function insertAdd(my,userId){
   //var userd=1244947868931982;  
	//console.log(my.name+"','"+my.pincode+"','"+my.deladd+"','"+my.phone+"','"+userd);
	return promisedQuery("insert into address (name,pincode,full_address,phone,user_id) values ('"+my.name+"','"+my.pincode+"','"+my.deladd+"','"+my.phone+"','"+userId+"')",result,error);
 }                                                                                               

function orderAddress(list,id){
	return promisedQuery("update pro set addres_id="+id+" where title in "+list,result,error);
}

function deleteAddress(id){
	return promisedQuery("delete from address where add_id="+id,result,error);
}

function cartSelection(id){
	return promisedQuery("update pro set selected=1 where proid="+id,result,error);
}

function getCartList(){
	return promisedQuery("select * from pro where selected=1 and ordered=0",result,error);
}

function cartDeSelection(id){
	return promisedQuery("update pro set selected=0 where proid="+id,result,error);
}

function OrderDate(list,date){
  return promisedQuery("update pro set orderdate='"+date+"' where title in "+list,result,error);
}

function datediff(){
  return promisedQuery("select * from pro where ordered=1",result,error);
}

function updateDaysCount(id,days){
  return promisedQuery("update pro set number_of_days="+days+" where proid="+id,result,error);
}

function updatePro(id){
  return promisedQuery("update pro set ordered=0 where proid="+id,result,error);
}

function createUserProfile(profile,userId){
	var m=profile.dob.getMonth();
	var d=profile.dob.getDate()+"/"+m+"/"+profile.dob.getFullYear();
   return promisedQuery("insert into user (id,user_name,user_address,user_mobile,user_gender,user_dob) values('"+userId+"','"+profile.name+"','"+profile.address+"','"+profile.mobile+"','"+profile.choice+"','"+d+"')",result,error);
}

function updateAddress(update){
	return promisedQuery("update address set name='"+update.name+"',pincode='"+update.pincode+"',full_address='"+update.deladd+"',phone='"+update.phone+"' where add_id="+update.id,result,error);
}

function userIdCheck(id){
	return promisedQuery("select * from user where id='"+id+"'",result,error);
}

function getUserProfile(id){
	return promisedQuery("select * from user where id='"+id+"'",result,error);
}

function updatUser(user){
	var m=user.dob.getMonth();
	var d=user.dob.getDate()+"/"+m+"/"+user.dob.getFullYear();
	return promisedQuery("update user set user_name='"+user.name+"',user_gender='"+user.gender+"',user_dob='"+d+"'",result,error);
}

function pastOrders(){
  return promisedQuery("select * from pro where ordered=1 and survey=1",result,error);
}

function surveySubmitted(title){console.log(title);
  return promisedQuery("update pro set survey_submitted=1 where title="+title,result,error);
}

function getOrderid(id){
  return promisedQuery("select orders_id from pro where orders_id in '"+id+"'",result,error);
}

function setOrderid(title,id){
  return promisedQuery("update pro set orders_id='"+id+"' where title in "+title,result,error);
}

function getOrderDetails(id){
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
  }

}

});

ser.service('MyService',function(){
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