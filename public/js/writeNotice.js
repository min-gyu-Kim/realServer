function getContent(){
    if(document.getElementById("notTitle").value == ''){
        alert('제목을 입력하세요.');
        return;
    }

    document.getElementById("notContent").value = editWindow.document.body.innerHTML;

    document.getElementById("noticeFrm").submit();
}

function htmledit(excute,values){
    if(values==null){
        if(excute == 'bold'){
            var bold = document.getElementsByName('bold').item(0);
            if(bold.innerHTML == 'bold On')
                bold.innerHTML = 'bold';
            else
                bold.innerHTML = 'bold On';
        } else if(excute == 'italic'){
            var italic = document.getElementsByName('italic').item(0);
            if(italic.innerHTML == 'italic On')
                italic.innerHTML = 'italic';
            else
                italic.innerHTML = 'italic On';
        } else if(excute == 'underline'){
            var underline = document.getElementsByName('underline').item(0);
            if(underline.innerHTML == 'underline On')
                underline.innerHTML = 'underline';
            else
                underline.innerHTML = 'underline On';
        }
        editWindow.document.execCommand(excute);
    }
    else{
        editWindow.document.execCommand(excute,"",values);
    }
}