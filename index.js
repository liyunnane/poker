	$(function(){
		// 1 12,2 11,3 10,4 9, 5 8,6 7;   24dui
		// 给每张牌的背景
		var paibiao=[
	       {number:2,color:'c'}
		];
		var paipai={
			'2-c':true,
		}
		var huasees=['s','h','c','d'];
		while(paibiao.length<52){
		var shuzi=Math.floor(Math.random()*13);
		var huase=huasees[Math.floor(Math.random()*4)];
		if(!paipai[shuzi+'-'+huase]){
		paibiao.push({number:shuzi,color:huase});
		paipai[shuzi+'-'+huase]=true;
		}
		}
		// 指定每张牌的位置然后发牌     发上面的牌
		var d=0;
		var index=0;
		for(var i=0;i<7;i++){
			for(var j=0;j<=i;j++){
				index+=1;
				var numbers={
					1:'A', 2:'2', 3:'3', 4:'4', 5:'5', 6:'6', 7:'7', 8:'8', 9:'9', 10:'T', 11:'J', 12:'Q', 0:'K'
				}
				d+=50;
				$('<div>')
				.addClass('poker shang')
				.css({
					backgroundImage:'url(resources/'+numbers[paibiao[index].number]+paibiao[index].color+'.png)',
					
				})
				.attr('id',i+'_'+j)
				.attr('shuzi',paibiao[index].number)
				.appendTo('.table')
				.delay(d)
				.animate({
					left:(6-i)*83+j*170,
					top:(i)*77,
					opacity:1,
				})
			}
		}


	// 发牌。发下面的牌。
		for(; index<52;index++){
			$('<div>').addClass('poker zuo').css({
					backgroundImage:'url(resources/'+numbers[paibiao[index].number]+paibiao[index].color+'.png)',

				})
			.attr('shuzi',paibiao[index].number)
			.appendTo('.table')
				.delay(index*50)
				.animate({
					left:1200,
					top:10,
					opacity:1,
				})
		}


	function sixhang(jquerys){
			var ids=jquerys.id;
	 		var xsi=ids.split('_');
	 		var sci=parseInt(xsi[0]);
	 		return sci;
	}


	var arrs=document.getElementsByClassName('shang')
	var newarrs=[];
	for(var i=0;i<arrs.length;i++){
		if(sixhang(arrs[i])==6){
			newarrs.push(arrs[i])
		}
	}
	var chudui=[];
	var arrsleft=document.getElementsByClassName('zuo')
	for(var i=0;i<newarrs.length;i++){
		for(var j=0;j<arrsleft.length;j++){
			if($(arrsleft[j]).attr('shuzi')+$(newarrs[i]).attr('shuzi')==13){
				chudui.push(arrsleft[j])
			}
		}
	}

	for(var i=0;i<newarrs.length;i++){
		for(var j=0;j<newarrs.length;j++){
			if($(newarrs[j]).attr('shuzi')+$(newarrs[i]).attr('shuzi')==13){
				chudui.push(arrsleft[j])
			}
		}
	}


	var shengyu=24;
	// 判断当前图片是否被压住，能不能被点击
	 	function canclick(jquerys){
	 		var ids=jquerys.attr('id');
	 		var xs=ids.split('_');
	 		var sc=parseInt(xs[0]);
	 		var sh=parseInt(xs[1]);
	 		return $('#'+(sc+1)+'_'+sh).length||$('#'+(sc+1)+'_'+(sh+1)).length;
	 	} 
	 	var shangyizhang;
		// 给每一张排添加点击事件，让被点击的牌做出响应
		$('.poker').on('click',function(e){e.stopPropagation();
			// 判断是否是上面的元素
			if($(this).hasClass('shang')){
				// 判断是否被压住
				if(canclick($(this))){/*如果被压住，则return，不往下执行*/
					return;
				}}

				/*如果没被压住，那么判断当前纸牌所带的数是否为13*/
					if(parseInt($(this).attr('shuzi'))==0){/*如果当前纸张为13，那么就让当前的消失*/
						$(this).animate({top:0,left:600,opacity:0}).queue(function(){
							$(this).remove();
						})
						/*既没有被压住也不是K那么就该让点击的纸牌动起来*/
					}else{
						/*此处是通过添加类名的方式来判断，当你点了一次是，纸牌上来，当你再点一次
						时，纸牌应该下去了，此处通过是否存在类名出列，用以判断相应的点击事件应该是让图片上来
						还是下去*/
						$(this).toggleClass('chulie');
						if($(this).hasClass('chulie')){
							$(this).animate({top:'-=30'})
						}else{
							$(this).animate({top:'+=30'})
						}

						/*点击的图片出列之后，那么再点击另一张，就该比较这两张是否相加等于13了*/
						/*定义变量用以存储上一张点击的纸牌*/
						
						if(!shangyizhang){/*通过判断来确认是第一张纸牌还是第二张纸牌*/
							shangyizhang=$(this);
						}else{/*如果是第二次点击那么就应该开始比较了*/
									
							if(parseInt(shangyizhang.attr('shuzi'))+parseInt($(this).attr('shuzi'))==13){
									shangyizhang.removeClass('chulie').delay(400).animate({top:0,left:600,opacity:0}).queue(function(){
										$(this).remove();
										
									});
									$(this).removeClass('chulie').animate({top:0,left:600,opacity:0}).queue(function(){	$(this).remove();
									})	
									function peidui(jquerys){
	 											var ids=jquerys.attr('id');
	 											var xs=ids.split('_');
	 											var sc=parseInt(xs[0]);
	 											var sh=parseInt(xs[1]);
	 											return $('#'+(sc+1)+'_'+sh).length||$('#'+(sc+1)+'_'+(sh+1)).length;
	 											}

									var dangqiankehuodong=document.getElementsByClassName('shang');
	 								var shoujidong=[];
	 								for(var i=0;i<dangqiankehuodong.length;i++){
	 								if(!peidui($(dangqiankehuodong[i]))){
	 								shoujidong.push(dangqiankehuodong[i]);
	 								}
	 								} 
									var xiamianx=document.getElementsByClassName('zuo');
									var xiamiany=document.getElementsByClassName('you');

									var xiamian1=[];
									var xiamian2=[];
									for(var i=0;i<xiamianx.length;i++){
		xiamian1.push(xiamianx[i])
	}
	console.log(xiamian1)
	for(var i=0;i<xiamiany.length;i++){
		xiamian2.push(xiamiany[i])
	}
	console.log(xiamian2)
	var xiamian=xiamian1.concat(xiamian2)
	console.log(xiamian)

	 								
	 								var shoujixia=[];
	 								for(var i=0;i<shoujidong.length;i++){
	 									
	 										for(var j=0;j<xiamian.length;j++){
	 										if((parseInt($(shoujidong[i]).attr('shuzi'))+parseInt($(xiamian[j]).attr('shuzi'))==13)&&($(xiamian[j])!=shangyizhang)&&($(xiamian[j])!=$(this))){
	 										shoujixia.push(xiamian[j])
	 										
	 										}
	 											}
	 										for(var m=0;j<shoujidong.length;m++){
	 										if((parseInt($(shoujidong[m]).attr('shuzi'))+parseInt($(shoujidong[m]).attr('shuzi'))==13)&&($(shoujidong[m])!=shangyizhang)&&($(shoujidong[m])!=$(this))){
	 											// for(var k=0;k<shoujixia.length;k++){
	 											// 	if(shoujidong[j]==shoujixia[k]){
	 											// 		break;
	 											// 	}
	 											// }
	 											shoujixia.push(shoujidong[j])
	 										}
	 										}
	 								}
								
	 								$('.shengyule').html('剩余匹配数:'+shoujixia.length)

									
									shengyu=shengyu-1;
									$('.shengyu').html('剩余:'+shengyu+'对')
									shangyizhang=null;	




							}else{	

							if(shangyizhang.attr('id')!=$(this).attr('id')){			
									shangyizhang.delay(400).removeClass('chulie').animate({top:'+=30'});
									$(this).removeClass('chulie').animate({top:'+=30'});
									shangyizhang=undefined;
								
							}
						}
						
						}
					}



		
		})

		function peidui(jquerys){
	 		var ids=jquerys.attr('id');
	 		var xs=ids.split('_');
	 		var sc=parseInt(xs[0]);
	 		var sh=parseInt(xs[1]);
	 		return $('#'+(sc+1)+'_'+sh).length||$('#'+(sc+1)+'_'+(sh+1)).length;
	 	}

	var dangqiankehuodong=document.getElementsByClassName('shang');
	 	var shoujidong=[];
	 	for(var i=0;i<dangqiankehuodong.length;i++){
	 		if(!peidui($(dangqiankehuodong[i]))){
	 			shoujidong.push(dangqiankehuodong[i]);
	 		}
	 	} 
	var xiamianx=document.getElementsByClassName('zuo');
	var xiamiany=document.getElementsByClassName('you');

	var xiamian1=[];
	var xiamian2=[];

	for(var i=0;i<xiamianx.length;i++){
		xiamian1.push(xiamianx[i])
	}
	console.log(xiamian1)
	for(var i=0;i<xiamiany.length;i++){
		xiamian2.push(xiamiany[i])
	}
	console.log(xiamian2)
	var xiamian=xiamian1.concat(xiamian2)
	console.log(xiamian)
// 	var xiamian2=document.getElementsByClassName('you');
// var xiamian=xiamian1+xiamian2;
	
	 	var shoujixia=[];
	 	for(var i=0;i<shoujidong.length;i++){
	 		
	 		for(var j=0;j<xiamian.length;j++){
	 			if(parseInt($(shoujidong[i]).attr('shuzi'))+parseInt($(xiamian[j]).attr('shuzi'))==13){
	 				shoujixia.push(xiamian[j])
	 			}
	 		}
	 		for(var j=0;j<shoujidong.length;j++){
	 			if(parseInt($(shoujidong[i]).attr('shuzi'))+parseInt($(shoujidong[j]).attr('shuzi'))==13){
	 				shoujixia.push(shoujidong[j])
	 			}
	 		}
	 	}

	 	$('.shengyule').html('剩余匹配数:'+shoujixia.length)

	 	
	 	



	// 按钮
	 var zIndex=1;
	  $('.move-to-right').on('click',function(e){e.stopPropagation();
	    zIndex+=1;
	    $('.table .zuo')
	    .eq(-1)
	    .removeClass('zuo')
	    .addClass('you')
	    .animate({
	      top:300,
	      left:1200
	    })
	    .css({
	      zIndex:zIndex
	    })
	  })

	  var num=0;
	  $('.move-to-left').on('click',function(e){ e.stopPropagation();   
	    if($('.zuo').length){
	      alert('左边还有牌！');
	      return;
	    }
	    num+=1;
	    if(num>3){
	      $('.gameover').css('display','block');
	      return;
	    }
	    $('.you').each(function(i,el){
	      $(this)
	      .delay(i*30)
	      .animate({
	        top:10,
	        left:1200,
	      })
	      .css({
	        zIndex:0
	      })
	      .removeClass('you')
	      .addClass('zuo')
	    })
	  })


	$(document).on('click',function(e){
		e.stopPropagation();
		$('.poker.chulie').animate({top:'+=30'}).removeClass('chulie');
		shangyizhang=undefined;
	})

	$('.queding').on('click',function(e){
		e.stopPropagation();
		$('.gameover').css({display:'none'})
	})


















	$('.chongxinfapai').on('click',function(e){
		e.stopPropagation();
		//移除之前的牌
		$('.table').empty(); 





		// 给每张牌的背景
		var paibiao=[
	       {number:2,color:'c'}
		];
		var paipai={
			'2-c':true,
		}
		var huasees=['s','h','c','d'];
		while(paibiao.length<52){
		var shuzi=Math.floor(Math.random()*13);
		var huase=huasees[Math.floor(Math.random()*4)];
		if(!paipai[shuzi+'-'+huase]){
		paibiao.push({number:shuzi,color:huase});
		paipai[shuzi+'-'+huase]=true;
		}
		}



		// 指定每张牌的位置然后发牌     发上面的牌
		var d=0;
		var index=0;
		for(var i=0;i<7;i++){
			for(var j=0;j<=i;j++){
				index+=1;
				var numbers={
					1:'A',
					2:'2',
					3:'3',
					4:'4',
					5:'5',
					6:'6',
					7:'7',
					8:'8',
					9:'9',
					10:'T',
					11:'J',
					12:'Q',
					0:'K'
				}
				d+=50;
				$('<div>')
				.addClass('poker shang')
				.css({
					backgroundImage:'url(resources/'+numbers[paibiao[index].number]+paibiao[index].color+'.png)',
					
				})
				.attr('id',i+'_'+j)
				.attr('shuzi',paibiao[index].number)
				.appendTo('.table')
				.delay(d)
				.animate({
					left:(6-i)*50+j*110+125,
					top:(i)*60,
					opacity:1,
				})
			}
		}


	// 发牌。发下面的牌。
		for(; index<52;index++){
			$('<div>').addClass('poker zuo').css({
					backgroundImage:'url(resources/'+numbers[paibiao[index].number]+paibiao[index].color+'.png)',
					
				})
			.attr('shuzi',paibiao[index].number)
			.appendTo('.table')
				.delay(index*50)
				.animate({
					left:1200,
					top:10,
					opacity:1,
				})
		}


	var shengyu=24;
	// 判断当前图片是否被压住，能不能被点击
	 	function canclick(jquerys){
	 		var ids=jquerys.attr('id');
	 		var xs=ids.split('_');
	 		var sc=parseInt(xs[0]);
	 		var sh=parseInt(xs[1]);
	 		return $('#'+(sc+1)+'_'+sh).length||$('#'+(sc+1)+'_'+(sh+1)).length;
	 	} 
	 	var shangyizhang;
		// 给每一张排添加点击事件，让被点击的牌做出响应
		$('.poker').on('click',function(e){e.stopPropagation();
			// 判断是否是上面的元素
			if($(this).hasClass('shang')){
				// 判断是否被压住
				if(canclick($(this))){/*如果被压住，则return，不往下执行*/
					return;
				}}

				/*如果没被压住，那么判断当前纸牌所带的数是否为13*/
					if(parseInt($(this).attr('shuzi'))==0){/*如果当前纸张为13，那么就让当前的消失*/
						$(this).animate({top:0,left:600,opacity:0}).queue(function(){
							$(this).remove();
						})
						/*既没有被压住也不是K那么就该让点击的纸牌动起来*/
					}else{
						/*此处是通过添加类名的方式来判断，当你点了一次是，纸牌上来，当你再点一次
						时，纸牌应该下去了，此处通过是否存在类名出列，用以判断相应的点击事件应该是让图片上来
						还是下去*/
						$(this).toggleClass('chulie');
						if($(this).hasClass('chulie')){
							$(this).animate({top:'-=30'})
						}else{
							$(this).animate({top:'+=30'})
						}

						/*点击的图片出列之后，那么再点击另一张，就该比较这两张是否相加等于13了*/
						/*定义变量用以存储上一张点击的纸牌*/
						
						if(!shangyizhang){/*通过判断来确认是第一张纸牌还是第二张纸牌*/
							shangyizhang=$(this);
						}else{/*如果是第二次点击那么就应该开始比较了*/
									
							if(parseInt(shangyizhang.attr('shuzi'))+parseInt($(this).attr('shuzi'))==13){
									shangyizhang.delay(400).animate({top:0,left:600,opacity:0}).queue(function(){
										$(this).remove();
										
									});
									$(this).animate({top:0,left:600,opacity:0}).queue(function(){
										$(this).remove();
									})	
									function peidui(jquerys){
	 											var ids=jquerys.attr('id');
	 											var xs=ids.split('_');
	 											var sc=parseInt(xs[0]);
	 											var sh=parseInt(xs[1]);
	 											return $('#'+(sc+1)+'_'+sh).length||$('#'+(sc+1)+'_'+(sh+1)).length;
	 											}

var dangqiankehuodong=document.getElementsByClassName('shang');
	 								var shoujidong=[];
	 								for(var i=0;i<dangqiankehuodong.length;i++){
	 								if(!peidui($(dangqiankehuodong[i]))){
	 								shoujidong.push(dangqiankehuodong[i]);
	 								}
	 								} 
var xiamianx=document.getElementsByClassName('zuo');
	var xiamiany=document.getElementsByClassName('you');

	var xiamian1=[];
	var xiamian2=[];

	for(var i=0;i<xiamianx.length;i++){
		xiamian1.push(xiamianx[i])
	}
	for(var i=0;i<xiamiany.length;i++){
		xiamian2.push(xiamiany[i])
	}
	var xiamian=xiamian1.concat(xiamian2)

	 						
	 								var shoujixia=[];
	 								for(var i=0;i<shoujidong.length;i++){
	 									
	 										for(var j=0;j<xiamian.length;j++){
	 										if((parseInt($(shoujidong[i]).attr('shuzi'))+parseInt($(xiamian[j]).attr('shuzi'))==13)&&($(xiamian[j])!=shangyizhang)&&($(xiamian[j])!=$(this))){
	 										shoujixia.push(xiamian[j])
	 										}
	 											}
	for(var m=0;j<shoujidong.length;m++){
	 										if((parseInt($(shoujidong[m]).attr('shuzi'))+parseInt($(shoujidong[m]).attr('shuzi'))==13)&&($(shoujidong[m])!=shangyizhang)&&($(shoujidong[m])!=$(this))){
	 											// for(var k=0;k<shoujixia.length;k++){
	 											// 	if(shoujidong[j]==shoujixia[k]){
	 											// 		break;
	 											// 	}
	 											// }
	 											shoujixia.push(shoujidong[j])
	 										}
	 										}
	 								}
	 								$('.shengyule').html('剩余匹配数:'+shoujixia.length)

									
									shengyu=shengyu-1;
									$('.shengyu').html('剩余:'+shengyu+'对')
									shangyizhang=null;	


									shangyizhang=null;							
							}else{	

							if(shangyizhang.attr('id')!=$(this).attr('id')){			
									shangyizhang.delay(400).removeClass('chulie').animate({top:'+=30'});
									$(this).removeClass('chulie').animate({top:'+=30'});
									shangyizhang=undefined;
								
							}
						}
						
						}
					}
		
		})



	// 按钮
	 var zIndex=1;
	  $('.move-to-right').on('click',function(e){e.stopPropagation();
	    zIndex+=1;
	    $('.table .zuo')
	    .eq(-1)
	    .removeClass('zuo')
	    .addClass('right')
	    .animate({
	      top:300,
	      left:1200,
	    })
	    .css({
	      zIndex:zIndex
	    })
	  })

	  var num=0;
	  $('.move-to-left').on('click',function(e){  e.stopPropagation();  
	    if($('.zuo').length){
	      alert('左边还有牌！');
	      return;
	    }
	    num+=1;
	    if(num>3){
	      $('.gameover').css({display:'block'});
	      return;
	    }
	    $('.right').each(function(i,el){
	      $(this)
	      .delay(i*30)
	      .animate({
	        top:10,
	        left:1200,
	      })
	      .css({
	        zIndex:0
	      })
	      .removeClass('right')
	      .addClass('left')
	    })
	  })



	  $(document).on('click',function(e){
		e.stopPropagation();
		$('.poker.chulie').animate({top:'+=30'}).removeClass('chulie');
		shangyizhang=undefined;
	})


	  function peidui(jquerys){
	 											var ids=jquerys.attr('id');
	 											var xs=ids.split('_');
	 											var sc=parseInt(xs[0]);
	 											var sh=parseInt(xs[1]);
	 											return $('#'+(sc+1)+'_'+sh).length||$('#'+(sc+1)+'_'+(sh+1)).length;
	 											}

var dangqiankehuodong=document.getElementsByClassName('shang');
	 								var shoujidong=[];
	 								for(var i=0;i<dangqiankehuodong.length;i++){
	 								if(!peidui($(dangqiankehuodong[i]))){
	 								shoujidong.push(dangqiankehuodong[i]);
	 								}
	 								} 
var xiamian=document.getElementsByClassName('zuo');
	 						
	 								var shoujixia=[];
	 								for(var i=0;i<shoujidong.length;i++){
	 									
	 										for(var j=0;j<xiamian.length;j++){
	 										if((parseInt($(shoujidong[i]).attr('shuzi'))+parseInt($(xiamian[j]).attr('shuzi'))==13)&&($(xiamian[j])!=shangyizhang)&&($(xiamian[j])!=$(this))){
	 										shoujixia.push(xiamian[j])
	 										}
	 											}
	for(var m=0;j<shoujidong.length;m++){
	 										if((parseInt($(shoujidong[m]).attr('shuzi'))+parseInt($(shoujidong[m]).attr('shuzi'))==13)&&($(shoujidong[m])!=shangyizhang)&&($(shoujidong[m])!=$(this))){
	 											// for(var k=0;k<shoujixia.length;k++){
	 											// 	if(shoujidong[j]==shoujixia[k]){
	 											// 		break;
	 											// 	}
	 											// }
	 											shoujixia.push(shoujidong[j])
	 										}
	 										}
	 								}
	 								$('.shengyule').html('剩余匹配数:'+shoujixia.length)

									
									shengyu=shengyu-1;
									$('.shengyu').html('剩余:'+shengyu+'对')
									shangyizhang=null;	



	})

		
	})