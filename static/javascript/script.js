var path = document.location.pathname,
    getEl = function(el) {return document.getElementById(el);},
    getClass = function(cl) {return document.getElementsByClassName(cl);},
    fadeIn = function(el) {
      setTimeout(function(){
        el.classList.remove('fadeable');
        el.classList.add('sh-fade-in');
      },500);
    },
    detailFadeIn = function(el) {
      el.classList.remove('fadeable');
      el.classList.remove('fade-in');
      el.classList.add('fadeable');
      window.setTimeout( function() {
          el.classList.add('fade-in');
      }, 10);
    };

if(path === '/' || path === '/home'){
  window.onload = function(){
    fadeIn(getEl('subheading'));

    var logos = [getEl('logo1'),getEl('logo2'),getEl('logo3')];
    
    for(var i=0;i<logos.length;i++){
      logos[i].classList.add("animated");
    }

    setTimeout(function() {
      logos[0].classList.add("bounceIn");
    },1750);

    setTimeout(function() {
      logos[0].style.animationDuration = "1s";
      logos[0].classList.add("fadeOut");
      logos[1].classList.add("bounceIn");
    },3000);

    setTimeout(function() {
      logos[0].classList.remove("animated", "bounceIn", "fadeOut");
      logos[0].style.color = '#28cb75';
      logos[1].style.animationDuration = "1s";
      logos[1].classList.add("fadeOut");
      logos[2].classList.add("bounceIn");
    },4250);

    setTimeout(function() {
      logos[1].classList.remove("animated", "bounceIn", "fadeOut");
      logos[1].style.color = '#28cb75';
      logos[2].style.animationDuration = "1s";
      logos[2].classList.add("fadeOut");
    },5500);

    setTimeout(function() {
      logos[2].classList.remove("animated", "bounceIn", "fadeOut");
      logos[2].style.color = '#28cb75';
    },6500);
  }
}
else if(path === '/extras'){
  window.onload = function(){
    var organization_list = getClass('organization_list'),
        organization_group = getClass('organization_group'),
        organization_detail = getClass('organization_detail'),
        toggleDetailSection = function(){
          event.stopPropagation();

          var class_detail = this.getAttribute('class').split(' ');
          var important_class = class_detail[1];
          var detail_section = getClass(important_class + ' organization_detail')[0];
          
          detail_section.offsetParent === null ? (detail_section.style.display = 'block', detailFadeIn(detail_section)) : (detail_section.style.display = 'none');
        },
        hideDetailSection = function(){
          event.stopPropagation();
          this.style.display = 'none';
        },
        addDetailClickListener = function(cl, type){
          for(var i=0;i<cl.length;i++){
            cl[i].addEventListener('click', type === 'listgroup' ? toggleDetailSection : hideDetailSection);
          }
        };

    addDetailClickListener(organization_list, 'listgroup');
    addDetailClickListener(organization_group, 'listgroup');
    addDetailClickListener(organization_detail, 'detail');
  }
}