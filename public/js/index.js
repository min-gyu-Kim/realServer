var curSideState = false;
var width = 0;

function slideMenu(){
    var menu = document.getElementById('sideMenu');
    
    if(!curSideState)
        menu.style.display = 'block';
    
    moveMenu(curSideState);
    curSideState = !curSideState;
    if(curSideState){
        document.body.style.background = "rgba(0,0,0,0.2)";
    }
    else{
        document.body.style.background = "rgba(0,0,0,0)";
        menu.style.display = 'none';
    }
}

function moveMenu(state){
    var menu = document.getElementById('sideMenu');
    
    if(state){
        if(width > 0){
            width = 0;
            menu.style.width = width + 'px';
            setTimeout('moveMenu(' + state + ')', 5);
        }
    } else {
        if(width < 300){
            width += 10;
            menu.style.width = width + 'px';
            setTimeout('moveMenu(' + state + ')', 5);
        }
    }
}

function login(){
    var modal = document.querySelector('.modal');
    modal.style.display = 'block';
}

function modalClose(){
    var modal = document.querySelector('.modal');
    modal.style.display = 'none';
}