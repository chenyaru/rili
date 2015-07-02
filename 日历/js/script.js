;(function($){
   var now=new Date(),
       year=now.getFullYear(),
       month=now.getMonth()+1,
       day=now.getDate(),
       datebox=$('#datebox'),
       scale=$(window).width();

   datebox.find('ul').first().attr('id','curDate');
   datebox.find('ul').last().attr('id','otherDate');

   // 生成日历
   function createDate(mon,other){
      // 获取这个月的第一天是从星期几开始的
      var date=new Date();
      date.setFullYear(year);
      date.setMonth(mon-1); 
      date.setDate(1);
      var week=date.getDay();// 5
      var days=getDays(year,mon);   
      var prevDays=getDays(year,mon-1);
      var html='';
      var $parent=other?$('#otherDate'):$('#curDate');

      $('#now').html(year+'年'+mon+'月');

      for(var i=prevDays-week+1;i<=prevDays;i++){
          html+='<li class="past">'+i+'</li>';
      }

      for(var d=1;d<=days;d++){
          if(d==day){
             html+='<li class="current">'+d+'</li>';
          }else{
             html+='<li>'+d+'</li>';
          }
      }
      
      $parent.html(html);
   }

   function getDays(y,m){
      var days;
      if(m==1 || m==3 || m==5 || m==7 || m==8 || m==10 || m==12){
         days=31;
      }else if(m==4 || m==6 || m==9 || m==11){
         days=30;
      }else{
         if(y%400==0 || (y%4==0 && y!=100)){
            days=29;
         }else{
            days=28;
         }
      }
      return days;
   }

   createDate(month);

   $('#next').on('click',nextMonth);
   $('#datebox').on('swipeLeft',nextMonth);

   $('#prev').on('click',prevMonth);
   $('#datebox').on('swipeRight',prevMonth);

   // 下一个月
   function nextMonth(){
      month++;
      if(month>12){
         month=1;
         year+=1;
      }
      createDate(month,'other');
      $('#datebox').animate({'marginLeft':-scale},500,function(){
         $(this).append($(this).find('ul').first()).css('marginLeft',0);
         $(this).find('ul').last().empty().attr('id','otherDate');
         $(this).find('ul').first().attr('id','curDate');
      })
   }

   // 上一个月
   function prevMonth(){
      month--;
      if(month<1){
         month=12;
         year-=1;
      }
      createDate(month,'other');
      $('#datebox').prepend($('#datebox').find('ul').last())
      .css('marginLeft',-scale+'px')
      .animate({'marginLeft':0},300,function(){
        $(this).find('ul').last().empty().attr('id','otherDate');
        $(this).find('ul').first().attr('id','curDate');
      });
      
   }

})(Zepto)