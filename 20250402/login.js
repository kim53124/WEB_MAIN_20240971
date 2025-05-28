const check_input = () => {
    const loginForm = document.getElementById('login_form');
    const loginBtn = document.getElementById('login_Btn');
    const emailInput = document.getElementById('typeEmailX');
    const passwordInput = document.getElementById('typePasswordX');
    
    const c = '아이디, 패스워드를 체크합니다';
    alert(c);

    const emailValue = emailInput.Value.trim();
    const passwordValue = passwordInput.Value.trim();

    if (emailValue.length < 5) {
        alert('아이디는 최소 5글자 이상 입력해야 합니다');
        return false;
    }

    if (passwordValue.length < 12) {
        alert('비밀번호는 반드시 12글자 이상 입력해야 합니다');
        return false;
    }

    const hasSpecialChar = passwordValue.match(/[!,@#$%^&*()_+\-+\[\]{};':"\\|,.<>\/?]+/) !== null;
    if (!hasSpecialChar) {
        alert('패스워드는 특수문자를 1개 이상 포함해야 합니다');
        return false;
    }

    const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
    const haslowerCase = passwordValue.match(/[a-z]+/) !== null;
    if (!hasUpperCase || !haslowerCase) {
        alert('패스워드는 대소문자를 1개 이상 포함해야 합니다');
        return false;
    }

    console.log('이메일: ', emailValue);
    console.log('비밀번호: ', passwordValue);
    loginForm.onsubmit();

    const sanitizePassword = check_xss(passwordInput);
    // check_xss 함수로 비밀번호 sanitized
    const sanitizedEmail = check_xss(emailInput);

    const payload = {
        id : emailValue,
        exp: Math.floor(Date.now() / 1000) + 3600
    };
    const jwtToken = generateJWT(payload);
    
    if (!sanitizedEmail) {
        return false;
    }

    if (!sanitizePassword) {
        return false;
    }
};

const check_xss = (input) => {
    //DOMPurify 라이브러리 로드 (CDN사용)
    const DOMPurify = window.DOMPurify;

    //입력 값을 DOMPurify로 sanitize
    const sanitizeInput = DOMPurify.sanitize(input);

    // Sanitized된 값과 원본 입력 값 비교
    if (sanitizeInput !== input) {
        //XSS 공격 가능성 발견 시 에러 철;
        alert('XSS 공격 가능성이 있는 입력값을 발견했습니다.');
        return false;
    }
    //Sanitized된 값 변환
    return sanitizeInput;
}

document.getElementById("login_btn").addEventListener('click', check_input);

const idsave_check = document.getElementById('idSavaCheck');

    if (idsave_check.checked == true) {
        alert("쿠카를 저장합니다.", emailValue);
        setCookie("id", emailValue, 1);
        alert("쿠키캆 : " + emailValue);
    }
    else{
        setCookie("id", emailValue.value, 0);
    }


function session_set() {
    let session_id = document.querySelector("#typeEmailX");
    let session_pass = document.querySelector("#typePasswordX");
    if (sessionStorage) {
        let en_text = encrypt_text(session_pass.value);
        sessionStorage.setItem("Session_Storage_id", session_id.value);
        sessionStorage.setItem("Session_Storage_pass", en_text);
    }
    else {
        alert("로컬 스토리지 지원 x");
    }
}

function init_logined(){
    if (sessionStorage) {
        decrypt_text();
    }
    else{
        alert("세선 스토리지 지원x");
    }
}

function init(){
    const emailInput = document.getElementById('typeEamulX');
    const idsave_check = document.getElementById('idSaveCheck');
    let get_id = getCookie("id");

    if (get_id) {
        emailInput.value = get_id;
        idsave_check.checked = true;
    }
    session_check();
}