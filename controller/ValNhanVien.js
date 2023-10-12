//validation
function checkNull(val, idErr, contentErr) {
    var spTB = document.querySelector(idErr);
    spTB.innerHTML = contentErr + "không đc để trống";
    if (val == "") {
        spTB.style.display = "block";
        return false;
    } else {
        spTB.style.display = "none";
        return true;
    }
}

//
function checkSl(val, idErr) {
    var spTB = document.querySelector(idErr);
    spTB.innerHTML = "vui lòng chọn đúng chức vụ";
    if (val === 0) {
        spTB.style.display = "block";
        return false;
    } else {
        spTB.style.display = "none";
        return true;
    }
}

//
function checkVal(val, idErr) {
    var reVal = /^[a-zA-Z\u00C0-\u1EF9\s]+$/g;
    var tb = document.querySelector(idErr);
    tb.innerText = "không chứa số trong họ tên";
    if (reVal.test(val)) {
        tb.style.display = "none";
        return true;
    } else {
        tb.style.display = "block";
        return false;
    }
}

//
function checkPass(val, idErr) {
    var rePas =
        /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{6,10}/;
    var tb = document.querySelector(idErr);
    tb.innerText =
        "Bao gồm cả chữ hoa, chữ thường, số, ký tự đặc biệt và từ 6 đến 10 ký tự";
    if (rePas.test(val)) {
        tb.style.display = "none";
        return true;
    } else {
        tb.style.display = "block";
        return false;
    }
}

//
function checkDate(val, idErr) {
    var reDate =
        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-9]|2[0-9])\/(19|20)\d{2}$/;
    var tb = document.querySelector(idErr);
    tb.innerText = "định dạng ngày tháng năm phải là mm/dd/yy";
    if (reDate.test(val)) {
        tb.style.display = "none";
        return true;
    } else {
        tb.style.display = "block";
        return false;
    }
}
//
function checkNum(val, idErr, content, dv, min, max) {
    var spTB = document.querySelector(idErr);
    spTB.innerHTML = `${content} ${min}${dv} đến ${max}${dv}`;

    if (val < min || val > max) {
        spTB.style.display = "block";
        return false;
    } else {
        spTB.style.display = "none";
        return true;
    }
}

//
function checkEmail(val, idErr) {
    var reEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    var tb = document.querySelector(idErr);
    tb.innerText = "phải bao gồm chữ số và @";
    if (reEmail.test(val)) {
        tb.style.display = "none";
        return true;
    } else {
        tb.style.display = "block";
        return false;
    }
}

function checkID(arrVal, val, idErr) {
    var tb = document.querySelector(idErr);
    tb.innerHTML = "không được trùng với mã hiện có";
    for (var i = 0; i < arrVal.length; i++) {
        if (val === arrVal[i]) {
            tb.style.display = "block";
            return false;
        } else {
            tb.style.display = "none";
            return true;
        }
    }
}