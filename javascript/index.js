$(document).ready(function(){
    $("a.installation_anchor").click(function(){
        $(this).toggleClass("to-install");
        $(this).find(".panel-footer").toggleClass("success");
        if($(this).hasClass("to-install")){
            $(this).find(".will-be-installed").text("Will be installed")
        } else {
            $(this).find(".will-be-installed").text("Add to installation")
        }
    });
});