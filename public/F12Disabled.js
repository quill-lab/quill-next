
!function () {
    function detectDevTool() {
        // 개발자 도구가 open 된것을 감지했을때 실행할 코드 삽입
        document.location.href="http://localhost:3000/";
    }
    if (window.attachEvent) {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            detectDevTool();
            window.attachEvent('onresize', detectDevTool);
            window.attachEvent('onmousemove', detectDevTool);
            window.attachEvent('onfocus', detectDevTool);
            window.attachEvent('onblur', detectDevTool);
        } else {
            setTimeout(argument.callee, 0);
        }
    } else {
        window.addEventListener('load', detectDevTool);
        window.addEventListener('resize', detectDevTool);
        window.addEventListener('mousemove', detectDevTool);
        window.addEventListener('focus', detectDevTool);
        window.addEventListener('blur', detectDevTool);
    }
}();
