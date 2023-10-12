//tạo danh sách nhân viên
function createTB(ob, index) {
    ob.tongLuong = function() {
        if (this.heSoLuong === 2) {
            return this.luongCoBan * 2;
        } else if (this.heSoLuong === 1) {
            return this.luongCoBan * 3;
        } else {
            return this.luongCoBan;
        }
    };
    ob.xepLoaiNV = function() {
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
    var tb = `
      <tr >   
        <td>${ob.taiKhoan}</td>
        <td>${ob.hoTen}</td>
        <td>${ob.eMail}</td>
        <td>${ob.ngayLam}</td>
        <td>${ob.chucVu}</td>
        <td>${ob.tongLuong().toLocaleString()}vnđ</td>
        <td>${ob.xepLoaiNV()}</td>
        <td>
          <button class="btn btn-danger mb-2 mx-0" data-toggle="modal" data-target="#modalDel" id = 'xoaNhanVien' onclick="xoaNV('${index}')">Xóa</button>
          <button class="btn btn-warning mb-2" data-toggle="modal"
          data-target="#myModal" id = 'suaNhanVien' onclick="suaNV('${index}')">Sửa</button>
        </td>
      </tr>
      `;
    return tb;
}