$(function(){
  //plugin 초기화
  $(window).on('load',function(){
    new WOW().init();
  });
}); 

$(function(){
  //var
  var $gnb = $('header>nav>.gnb>li');
  var $sub = $('header>nav>.gnb>li>.sub');

  var $slide = $('section>.slide-container>.slide>li');
  var $indicator = $('section>.slide-container>.slide-pagination>ol>li>a');
  var intervalKey = null;

  var nowIdx  = 0;

  //function
  function nextIdx(){
    if(nowIdx<2){
      nowIdx++;
    }else{
      nowIdx = 0;
    }
  }

  function slideMove(){
    $indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
    
    $slide.filter('.on').stop().fadeOut(1500).removeClass('on');
    $slide.eq(nowIdx).stop().fadeIn(1500).addClass('on');
  }

  function autoPlay(){
    intervalKey = setInterval(function(){
      nextIdx();
      slideMove();
    },2000);
  }

  autoPlay();

  function autoStop(){
    clearInterval(intervalKey);
  }
  
  //header
  $gnb.on({
    'mouseenter':function(){
      nowIdx = $gnb.index(this);
      $sub.eq(nowIdx).stop().fadeIn();
    },
    'mouseleave':function(){
      $sub.stop().fadeOut();
    }
  });

  $('header>nav>.gnb>li>a').focus(function(){
    $sub.stop().fadeOut();
    $(this).parent().find('.sub').stop().fadeIn();
  });

  $('.last>a').blur(function(){
    $sub.stop().fadeOut();
  });

  //section - slide banner
  $indicator.on('click',function(event){
    event.preventDefault();
    autoStop();
    nowIdx = $indicator.index(this);

    slideMove();
  });//end of section

  // Dark Mode Toggle
  $('.dark-mode-toggle').on('click', function(){
    $('body').toggleClass('dark-mode');
  });
});