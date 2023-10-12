Page({
  data:{
    dicearray1:[],
    dicearray2:[],
    diceimage:['/image/骰子/骰子1.png','/image/骰子/骰子2.png','/image/骰子/骰子3.png','/image/骰子/骰子4.png','/image/骰子/骰子5.png','/image/骰子/骰子6.png'],
    jushu:1,
    rounds : 1,//设置回合数
    game_over : false,
    sumrate:1,
    sno : 0,//选择的骰子号
     lock1:[],
     locksno1:[],
      rate1 : 1,
      chip1:1000,
      type1:'',
     lock2:[],
     locksno2:[],
      rate2 : 1,
      chip2:1000,
      type2:'',
    sumscore1 : 0,
    sumscore2 :0,
     turn1 : false,
     turn2 : false,
     zhitouzi1:true,
     zhitouzi2:true,
  },
  tomenu: function() {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  dicechange1: function() {
    var locksno1=this.data.locksno1;
    var lock1=this.data.lock1;
    var zhitouzi1=this.data.zhitouzi1;
    let dice = [];
    if(zhitouzi1==false){
      console.log("骰子已经投掷过");
      return;
    }
    for(let i = 0; i < 5; i++) {
        // 生成1到6的随机整数
        let roll = Math.floor(Math.random() * 6) + 1;
        dice.push(roll);
    }
    // 使用setData更新页面数据
    for(let i=0;i<locksno1.length;i++){
      dice[locksno1[i]]=lock1[i];
    }
    this.setData({
      dicearray1: dice,
      zhitouzi1:false
    });
    
    console.log(dice);
  },
  dicechange2: function() {
    var locksno2=this.data.locksno2;
    var lock2=this.data.lock2;
    var zhitouzi2=this.data.zhitouzi2;
    let dice = [];
    if(zhitouzi2==false){
      console.log("骰子已经投掷过");
      return;
    }
    for(let i = 0; i < 5; i++) {
        // 生成1到6的随机整数
        let roll = Math.floor(Math.random() * 6) + 1;
        dice.push(roll);
    }
    // 使用setData更新页面数据
    for(let i=0;i<locksno2.length;i++){
      dice[locksno2[i]]=lock2[i];
    }
    this.setData({
      dicearray2: dice,
      zhitouzi2:false
    });
    
    console.log(dice);
  },
  

  Touzishow:function (touzi, lock_touzi){
  

    //console.log("touzi.length001:"+lock_touzi.length);
    var touzilen = lock_touzi.length;
    for (var i = 0; i < 5 - touzilen; i ++){
        touzi[i] = Math.round(Math.random() * (6 - 1) + 1);
        //console.log("touzi.length:"+touzi.length);
        //console.log(touzi[i]);
        
    }
    console.log("骰子：" + touzi);
  },
  //Touzishow(touzi1, lock1);
  //player1.printplayer();
  //console.log("当前锁定：" + lock1);
   Locktouzi:function (event){
    var sno=Number(event.currentTarget.dataset.sno);
    var dice_touzi1=this.data.dicearray1;
    var dice_touzi2=this.data.dicearray2;
    var lock_touzi1=this.data.lock1;
    var lock_touzi2=this.data.lock2;
    var locksno1=this.data.locksno1;
    var locksno2=this.data.locksno2;
    if(sno>=0){
      console.log(sno);
    }
    
    if(sno >= 0 && sno <= 4){
        for(var i = 0; i < locksno1.length; i ++){
            if(sno == locksno1[i]){
                console.log("error:The dice was locked");
                return ;
            }
        }
        locksno1[locksno1.length]= sno;
        var touzilen = lock_touzi1.length;
      lock_touzi1[touzilen] = dice_touzi1[sno];
      console.log("锁定的骰子:" + lock_touzi1);
      this.setData({
        lock1:lock_touzi1,
        locksno1:locksno1,
      })
    }
    else if(sno>=5&&sno<=9){
        sno -= 5;
        for(var i = 0; i < locksno2.length; i ++){
            if(sno == locksno2[i]){
                console.log("error:The dice was locked");
                return ;
            }
        }
        locksno2[locksno2.length] = sno;
        
        var touzilen = lock_touzi2.length;
      lock_touzi2[touzilen] = dice_touzi2[sno];
      console.log("锁定的骰子:" + lock_touzi2);
      this.setData({
        lock2:lock_touzi2,
        locksno2:locksno2,
      })
    }
   
    
},
  //Locktouzi(sno, touzi1, lock1);
  
   Ratetouzi:function (event){
    var sno=Number(event.currentTarget.dataset.sno);
    if(sno>=0&&sno<=4){
        var rate=this.data.rate1;
      var sumrate=this.data.sumrate;
      if(rate == 4){
          return ;
      }
      rate ++;
      sumrate++;
      console.log("倍数" + rate);
      this.setData({
        rate1:rate,
        sumrate:sumrate
      })

    }
     else if(sno>=5&&sno<=9){
      var rate=this.data.rate2;
      var sumrate=this.data.sumrate;
     if(rate == 4){
         return ;
     }
     rate ++;
     sumrate++;
     console.log("倍数" + rate);
     this.setData({
       rate2:rate,
       sumrate:sumrate
     })

     }
  },
  //Ratetouzi(rate1);
  /*
  for(var i = 0; i < 5; i ++){
        sumscore1 += lock1[i];
  }
  */
  
  //console.log("总分:" + sumscore1);
   Score:function(lock1, sumscore1,sno){
     var type =this.data.type1;
    //console.log(sumscore1);
    var counts = [0,0,0,0,0,0];
    for(var i = 0; i < 5; i ++){
  
        sumscore1 += lock1[i];
    }
    //console.log(sumscore1);
    for(var j = 0; j < 6; j ++){
  
        for(var i = 0; i < 5; i ++){
            if(lock1[i] == j + 1)
            counts[j] ++;
        }
    }
    counts.sort();
    counts.reverse();
   // console.log("数量统计：" + counts);
    if(counts[0] == 5){
        sumscore1 += 100;
        type="五连";
        console.log("五连");
    }
    else if(counts[0] == 4){
        sumscore1 += 40;
        type="四连";
        console.log("四连");
    }
    else if(counts[0] == 3 && counts[1] == 2){
        sumscore1 += 20;
        type="葫芦";
        console.log("葫芦");
    }
    else if(counts[0] == 3 && counts[1] == 1 ){
        sumscore1 += 10;
        type="三连";
        console.log("三连");
    }
    else if(counts[0] == 2 && counts[1] == 2){
        sumscore1 += 10;
        type="双对";
        console.log("双对");
    }
    else{
        lock1.sort();
        //console.log("paixuhou:" + lock1);
        if(counts[0] == 1 && lock1[4] - lock1[0] == 4){
            sumscore1 += 60;
            type="大顺子";
            console.log("大顺子");
        }
        else if(lock1[4] - lock1[0] == 3){
            sumscore1 += 30;
            type="小顺子";
            console.log("小顺子");
        }
        else if((counts[0] == 1 && (lock1[4] - lock1[3] == 2)) || (counts[0] == 1 && (lock1[1] - lock1[0] == 2))){
            sumscore1 += 30;
            type="小顺子";
            console.log("小顺子");
        }
        else{
          type="其他";
            console.log("其他");
        }

    }
    if(sno==0){
      this.setData({
        type1:type,
      })
    }
    else if(sno==5){
      this.setData({
        type2:type,
      })
    }
    
    return sumscore1;
    console.log(sumscore1);
    
  },
  
  //Score(lock1, sumscore1);

 Maingame:function() {
  var that=this;
  var sumrate = 0;
  var dice1=[]; 
  var dice2=[];
  var lock1=[];
  var lock2=[];
  var chip1 = 1000;
  var chip2 = 1000;
  var sno = 0;
  var rate1 = 0;
  var rate2 = 0;
  //var player0 = new Players("0", [], [1,1,1,1,1], 1000, 1);
  
  var sumscore1 = 0;
  var sumscore2 = 0;
  
  var aaa = false;
  var rounds=1;
  outer: for(var i = 1; i <= rounds; i++){
      console.log("player1的筹码：" + chip1);
      console.log("player2的筹码：" + chip2);

      if(chip1<= 0){
          console.log("player1的筹码已用完，游戏结束");

          game_over = true;   
          break outer;
      }
      else if(chip2 <= 0){
          console.log("player1的筹码已用完，游戏结束");

          game_over = true;   
          break outer;
      }

      //初始化
      dice1 = [];
      lock1 = [];
      rate1 = 0;
      dice2 = [];
      lock2 = [];
      rate2 = 0;
      sumrate = 0;
      //  

      for (var i = 1; i <= 1; i++){

          console.log("两位玩家的锁定区：", lock1, lock2);
          dice1 = [];
          that.Touzishow(dice1, lock1);
          //sno =;
          that.Locktouzi(sno, dice1, lock1);
          
          that.Locktouzi(sno, dice1, lock1);
          
          that.Locktouzi(sno, dice1, lock1);
          
          that.Locktouzi(sno, dice1, lock1);
          
          that.Locktouzi(sno, dice1, lock1);
          
          //console.log("length:" + lock1.length);
          sno = 0;
          dice2 =[];
          that.Touzishow(dice2, lock2);
          //sno =;
          that.Locktouzi(sno, dice2, lock2);
          
          that.Locktouzi(sno, dice2, lock2);
         
          that.Locktouzi(sno, dice2, lock2);
          
          that.Locktouzi(sno, dice2, lock2);
          
          that.Locktouzi(sno, dice2, lock2);

          if(i < 2){
              rate1 = that.Ratetouzi(2, rate1);
              rate2 = that.Ratetouzi(2, rate2);
          }
          sumrate += rate1 + rate2;
          
          console.log("当前总倍率：" + sumrate);
      }

      sumscore1 =  that.Score(lock1, sumscore1);
      sumscore2 =  that.Score(lock2, sumscore2);

      console.log("1:" + sumscore1);
      console.log("2:" + sumscore2);

  }

  

},

//console.log(a0 = Math.round(Math.random() * (6 - 1) + 1));

 Confirm:function(event){
  var sno=Number(event.currentTarget.dataset.sno);
  var turn1 = this.data.turn1;
  var turn2 = this.data.turn2;
  
  var lock1 = this.data.lock1;
  var lock2 = this.data.lock2;
  var rate1 = this.data.rate1;
  var rate2 = this.data.rate2;
  var rounds = this.data.rounds;
  var sumscore1=this.data.sumscore1;
  var sumscore2=this.data.sumscore2;
  var zhitouzi1=this.data.zhitouzi1;
  var zhitouzi2=this.data.zhitouzi2;
  if(rounds==0){
    console.log("请开始下一局");
    return;
  }
  if(sno===0){
    turn1=true;
  }
  else if(sno===5){
    turn2=true;
  }
  if(lock1.length == 5 && lock2.length == 5){
      rounds = 0;
      sumscore1 = this.Score(lock1, sumscore1,0);
      sumscore2 = this.Score(lock2, sumscore2,5);
      this.setData({
        sumscore1:sumscore1,
        sumscore2:sumscore2,
      })
      this.Chipchange();
  }
  else if(rounds != 2 && turn1 == true && turn2 == true){
      rounds ++;
      turn1 = false;
      turn2 = false;
      this.setData({
        rate1:1,
        rate2:1,
        zhitouzi1:true,
        zhitouzi2:true,
      })
  }
  else if(rounds == 2 && turn1 == true && turn2 == true){
      rounds = 0;
      var lkl1 = lock1.length;
      var lkl2 = lock2.length;

      //补齐骰子
      for(var i = 0; i < 5 - lkl1; i ++){
          lock1[4 - i] = Math.round(Math.random() * (6 - 1) + 1);
      }
      for(var i = 0; i < 5 - lkl2; i ++){
          lock2[4 - i] = Math.round(Math.random() * (6 - 1) + 1);
      }

      sumscore1 = this.Score(lock1, sumscore1,0);
      sumscore2 = this.Score(lock2, sumscore2,5);
      this.setData({
        sumscore1:sumscore1,
        sumscore2:sumscore2,
        lock1:lock1,
        lock2:lock2
      })
      this.Chipchange();
  }
  else{
      console.log("error");
      
  }
  console.log("p1:" + sumscore1);
console.log("p2:" + sumscore2);
console.log("rounds:" + rounds);
this.setData({
  rounds:rounds,
  turn1:turn1,
  turn2:turn2,
  sumscore1:sumscore1,
  sumscore2:sumscore2,
})
return;
},
Chipchange:function(){
  var sumscore1=this.data.sumscore1;
  var sumscore2=this.data.sumscore2;
  var chip1=this.data.chip1;
  var chip2=this.data.chip2;
  var sumrate=this.data.sumrate;
  if(sumscore1 != sumscore2){
    chip1 += (sumscore1 - sumscore2) * sumrate;
    chip2 -= (sumscore1 - sumscore2) * sumrate;
    console.log("chip1:"+chip1);
    console.log("chip2:"+chip2);
  }
  else if(sumscore2 == sumscore1){
   console.log("平局");
  }
  this.setData({
    chip1:chip1,
    chip2:chip2
  })
},
nextround:function(){
  var jushu=this.data.jushu;
  if(jushu==3){
    console.log("游戏已结束，请重新开始");
    return;
  }
  jushu++;
  this.setData({
    jushu:jushu,
    dicearray1:[],
    dicearray2:[],
    rounds : 1,//设置回合数
    game_over : false,
    sumrate:1,
    sno : 0,//选择的骰子号
     lock1:[],
     locksno1:[],
      rate1 : 1,
      type1:'',
     lock2:[],
     locksno2:[],
      rate2 : 1,
      type2:'',
    sumscore1 : 0,
    sumscore2 :0,
     turn1 : false,
     turn2 : false,
     zhitouzi1:true,
        zhitouzi2:true,
  })


},

gameagain:function(){
  this.setData({
    dicearray1:[],
    dicearray2:[],
    diceimage:['/image/骰子/骰子1.png','/image/骰子/骰子2.png','/image/骰子/骰子3.png','/image/骰子/骰子4.png','/image/骰子/骰子5.png','/image/骰子/骰子6.png'],
    jushu:1,
    rounds : 1,//设置回合数
    game_over : false,
    sumrate:1,
    sno : 0,//选择的骰子号
     lock1:[],
     locksno1:[],
      rate1 : 1,
      chip1:1000,
      type1:'',
     lock2:[],
     locksno2:[],
      rate2 : 1,
      chip2:1000,
      type2:'',
    sumscore1 : 0,
    sumscore2 :0,
     turn1 : false,
     turn2 : false,
     zhitouzi1:true,
        zhitouzi2:true,
  })
}






})

