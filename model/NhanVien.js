function NhanVien() {
  this.taiKhoan = "";
  this.hoTen = "";
  this.eMail = "";
  this.matKhau = "";
  this.ngayLam = 0;
  this.luongCoBan = 0;
  this.chucVu = "";
  this.heSoLuong = 0;
  this.tongGioLam = 0;
  this.tongLuong = function () {
    if (this.heSoLuong == 2) {
      return this.luongCoBan * 2;
    } else if (this.heSoLuong == 1) {
      return this.luongCoBan * 3;
    } else {
      return this.luongCoBan;
    }
  };
  this.xepLoaiNV = function () {
    var gioLam = this.tongGioLam;
    var loai = "";
    if (gioLam >= 192) {
      loai = "xuất sắc";
    } else if (gioLam >= 176) {
      loai = "giỏi";
    } else if (gioLam >= 160) {
      loai = "khá";
    } else {
      loai = "trung bình";
    }
    return loai;
  };
}
