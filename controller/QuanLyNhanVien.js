// tạo mảng chứa thông tin các nhân viên
var arrNhanVien = [];
var arrMaNV = [];
var arrTB = ["độ dài ký tự phải từ", "số tiền phải từ", "số giờ làm phải từ"];
console.log(arrMaNV);
document.querySelector("#btnThem").onclick = function() {
    document.querySelector("#btnCapNhat").disabled = true;
    document.querySelector("#btnThemNV").disabled = false;
};

//lấy thông tin nhân viên nhập vào
document.querySelector("#btnThemNV").onclick = function() {
    var nhanVien = new NhanVien();
    nhanVien.taiKhoan = document.querySelector("#tknv").value;
    nhanVien.hoTen = document.querySelector("#name").value;
    nhanVien.eMail = document.querySelector("#email").value;
    nhanVien.matKhau = document.querySelector("#password").value;
    nhanVien.ngayLam = document.querySelector("#datepicker").value;
    nhanVien.luongCoBan = +document.querySelector("#luongCB").value;
    var schucVu = document.querySelector("#chucvu");
    var iChucVu = schucVu.selectedIndex;
    nhanVien.chucVu = schucVu[iChucVu].innerHTML;
    nhanVien.tongGioLam = +document.querySelector("#gioLam").value;
    nhanVien.heSoLuong = +document.querySelector("#chucvu").value;
    nhanVien.tongLuong();
    nhanVien.xepLoaiNV();

    //check validation
    var vaild = true;
    vaild =
        checkNull(nhanVien.taiKhoan.trim(), "#tbTKNV", "tài khoản ") &
        checkNull(nhanVien.hoTen.trim(), "#tbTen", "họ tên ") &
        checkNull(nhanVien.eMail.trim(), "#tbEmail", "email ") &
        checkNull(nhanVien.matKhau.trim(), "#tbMatKhau", "mật khẩu ") &
        checkNull(nhanVien.ngayLam, "#tbNgay", "ngày làm ") &
        checkNull(nhanVien.luongCoBan, "#tbLuongCB", "lương ") &
        checkSl(iChucVu, "#tbChucVu") &
        checkNull(nhanVien.tongGioLam, "#tbGiolam", "giờ làm ");

    vaild =
        vaild &
        checkNum(nhanVien.taiKhoan.length, "#tbTKNVRendex", arrTB[0], "", 4, 6) &
        checkID(arrMaNV, nhanVien.taiKhoan, "#tbTKNVLoop") &
        checkVal(nhanVien.hoTen, "#tbTenRendex") &
        checkEmail(nhanVien.eMail, "#tbEmailRendex") &
        checkPass(nhanVien.matKhau, "#tbMatKhauRendex") &
        checkDate(nhanVien.ngayLam, "#tbNgayRendex") &
        checkNum(
            nhanVien.luongCoBan,
            "#tbLuongCBRendex",
            arrTB[1],
            "vnđ",
            1000000,
            20000000
        ) &
        checkNum(nhanVien.tongGioLam, "#tbGiolamRendex", arrTB[2], "h", 80, 200);

    if (vaild != true) {
        //return giúp dừng lại hàm đang làm
        return;
    } else {
        alert("nhân viên mã " + nhanVien.taiKhoan + " đã thêm thành công");
    }

    //thêm dữ liệu vừa nhập vào mảng sau khi thỏa mãn val

    arrNhanVien.push(nhanVien);
    arrMaNV.push(nhanVien.taiKhoan);

    //gọi hàm tạo table nv
    tableNV(arrNhanVien);
    //lưu dữ liệu dù có load lại trang
    luuData();

    //reset form sau khi nhấn add tránh tình trạng add dữ liệu liên tục

    document.querySelector("#formBody").reset();
};

function clearAL(id) {
    var spTB = document.querySelector(id);
    spTB.style.display = "none";
}

document.querySelector("#btnDong").onclick = function() {
    document.querySelector("#btnCapNhat").disabled = false;
    document.querySelector("#tknv").disabled = false;

    document.querySelector("#formBody").reset();
    clearAL("#tbTKNV");
    clearAL("#tbTen");
    clearAL("#tbEmail");
    clearAL("#tbMatKhau");
    clearAL("#tbNgay");
    clearAL("#tbLuongCB");
    clearAL("#tbGiolam");
    clearAL("#tbChucVu");
    clearAL("#tbTKNVRendex");
    clearAL("#tbTenRendex");
    clearAL("#tbEmailRendex");
    clearAL("#tbMatKhauRendex");
    clearAL("#tbNgayRendex");
    clearAL("#tbLuongCBRendex");
    clearAL("#tbGiolamRendex");
    clearAL("#tbTKNVLoop");
};

//
// in table nhân viên ra giao diện
function tableNV(arrNV) {
    let output = "";
    for (var i = 0; i < arrNV.length; i++) {
        var nv = arrNV[i];

        output += createTB(nv, i);
    }

    document.querySelector("#tableDanhSach").innerHTML = output;

    return output;
}

// xóa nhân viên
function xoaNV(idel) {
    var res = confirm("bạn có muốn xóa dữ liệu này không");
    if (res) {
        arrNhanVien.splice(idel, 1);
        alert("xóa nhân viên thành công");
    }
    //tạo lại table nhân viên sau khi xóa
    tableNV(arrNhanVien);
    //lưu data
    luuData();
}

// sửa nhân viên
function suaNV(iedit) {
    document.querySelector("#tknv").disabled = true;

    document.querySelector("#btnThemNV").disabled = true;
    var alTK = document.querySelector("#tbTKNV");

    alTK.style.display = "block";

    alTK.innerHTML = "tài khoản đã thêm không được thay đổi";

    var nvEdit = arrNhanVien[iedit];
    //dom đến thẻ ip trên giao diện để đưa thông tin nhân viên lên
    document.querySelector("#tknv").value = nvEdit.taiKhoan;
    document.querySelector("#name").value = nvEdit.hoTen;
    document.querySelector("#email").value = nvEdit.eMail;
    document.querySelector("#password").value = nvEdit.matKhau;
    document.querySelector("#datepicker").value = nvEdit.ngayLam;
    document.querySelector("#luongCB").value = nvEdit.luongCoBan;

    document.querySelector("#gioLam").value = nvEdit.tongGioLam;
    nvEdit.chucVu = document.querySelector("#chucvu");
    document.querySelector("#chucvu").value = nvEdit.heSoLuong;

    //lưu dữ liệu vào local
    localStorage.setItem("iedit", iedit);
}

// xuất data mới sau khi sửa
document.querySelector("#btnCapNhat").onclick = function() {
    var nvU = new NhanVien();

    nvU.taiKhoan = document.querySelector("#tknv").value;
    nvU.hoTen = document.querySelector("#name").value;
    nvU.eMail = document.querySelector("#email").value;
    nvU.matKhau = document.querySelector("#password").value;
    nvU.ngayLam = document.querySelector("#datepicker").value;
    nvU.luongCoBan = +document.querySelector("#luongCB").value;
    var schucVu = document.querySelector("#chucvu");
    var iChucVu = schucVu.selectedIndex;
    nvU.chucVu = schucVu[iChucVu].innerHTML;
    nvU.tongGioLam = +document.querySelector("#gioLam").value;
    nvU.heSoLuong = +document.querySelector("#chucvu").value;
    nvU.tongLuong();
    nvU.xepLoaiNV();

    //lấy ra vị trí phần tử thay đổi trong mảng
    var iedit = localStorage.getItem("iedit");
    //add vị trí phần tử thay đổi vào mảng
    arrNhanVien[iedit] = nvU;
    var vaild =
        checkNull(nvU.taiKhoan.trim(), "#tbTKNV", "tài khoản ") &
        checkNull(nvU.hoTen.trim(), "#tbTen", "họ tên ") &
        checkNull(nvU.eMail.trim(), "#tbEmail", "email ") &
        checkNull(nvU.matKhau.trim(), "#tbMatKhau", "mật khẩu ") &
        checkNull(nvU.ngayLam, "#tbNgay", "ngày làm ") &
        checkNull(nvU.luongCoBan, "#tbLuongCB", "lương ") &
        checkSl(iChucVu, "#tbChucVu") &
        checkNull(nvU.tongGioLam, "#tbGiolam", "giờ làm ");

    vaild =
        vaild &
        checkNum(nvU.taiKhoan.length, "#tbTKNVRendex", arrTB[0], "", 4, 6) &
        checkVal(nvU.hoTen, "#tbTenRendex") &
        checkEmail(nvU.eMail, "#tbEmailRendex") &
        checkPass(nvU.matKhau, "#tbMatKhauRendex") &
        checkDate(nvU.ngayLam, "#tbNgayRendex") &
        checkNum(
            nvU.luongCoBan,
            "#tbLuongCBRendex",
            arrTB[1],
            "vnđ",
            1000000,
            20000000
        ) &
        checkNum(nvU.tongGioLam, "#tbGiolamRendex", arrTB[2], "h", 80, 200);

    if (vaild != true) {
        return;
    } else {
        alert("cập nhật tài khoản " + nvU.taiKhoan + " thành công");
    }
    //gọi sự thay đổi ra mảng table để in ra danh sách
    tableNV(arrNhanVien);
    //lưu dữ liệu thay đổi dù có load lại trang
    luuData();
    document.querySelector("#btnCapNhat").disabled = true;
    document.querySelector("#formBody").reset();
};

// lưu data vào localStorage
function luuData() {
    //đổi dữ liệu object thành chuỗi
    var strNV = JSON.stringify(arrNhanVien);

    //lấy chuỗi vừa tạo lưu vào local
    localStorage.setItem("dataNV", strNV);
    localStorage.setItem("mã nhân viên", arrMaNV);
}

//lấy data đã lưu ở localStorage
function layData() {
    //lấy chuỗi vừa lưu trong local

    var id = localStorage.getItem("mã nhân viên").split(",");
    for (const ids of id) {
        arrMaNV.push(ids);
    }

    if (localStorage.getItem("dataNV")) {
        var str = localStorage.getItem("dataNV");

        //xuất chuỗi thành dạng object
        arrNhanVien = JSON.parse(str);

        //add object vừa đổi vào mảng và xuất ra table
        tableNV(arrNhanVien);
    }
}

//sau khi load trang vẫn giữ được các dữ liệu đã nhập từ localStorage từ hàm lấy data
window.onload = function() {
    layData();
};

// chức năng tìm kiếm theo xếp loại
document.querySelector("#searching").onsubmit = function(a) {
    a.preventDefault();

    var keyWord = document.querySelector("#searchName").value;
    searching(keyWord);
    var btnSua = document.querySelector("#suaNhanVien");
    var btnXoa = document.querySelector("#xoaNhanVien");

    btnSua.style.display = "block";
    btnXoa.style.display = "block";

    if (keyWord !== "") {
        btnSua.style.display = "none";
        btnXoa.style.display = "none";
    }
};

function searching(e) {
    var key = e;
    key = stringToSlug(key); //loại bỏ dấu tiếng việt
    var output = [];
    for (var i = 0; i < arrNhanVien.length; i++) {
        var nv = arrNhanVien[i];
        var useName = stringToSlug(nv.xepLoaiNV());
        if (useName.search(key) != -1) {
            output.push(nv);
        }
    }

    tableNV(output);
}