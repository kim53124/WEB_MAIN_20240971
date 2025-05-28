function session_set(){
    let session_id = document.querySelector("#typeEmailX");
    if (sessionStorage) {
        sessionStorage.setItem("Session_Storage_test",session_id.value);

    } else {
        alert("로컬 스토리지 지원x");
    }
}

function session_get(){
    if (sessionStorage) {
        return sessionStorage.getItem("Session_Storage_test");
    } else{
        alert("세선 스토리지 지원x");
    }
}

function session_check() {
    if (sessionStorage.getItem("Session_Storage_test")) {
        alert("이미 로그인 되었습니다.");
        location.href='../index_login.html';
    }
}