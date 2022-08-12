var staffList = [];

function createstaff() {
  var staffId = document.getElementById("tknv").value;
  var staffName = document.getElementById("name").value;
  var staffEmail = document.getElementById("email").value;
  var staffPassword = document.getElementById("password").value;
  var staffDatepicker = document.getElementById("datepicker").value;
  var staffLuongCB = document.getElementById("luongCB").value;
  var staffChucvu = document.getElementById("chucvu").value;
  var staffGiolam = document.getElementById("gioLam").value;

  var staff = new Staff(
    staffId,
    staffName,
    staffEmail,
    staffPassword,
    staffDatepicker,
    staffLuongCB,
    staffChucvu,
    staffGiolam
  );

  var valid = true;

  valid &=
    kiemTraRong(staff.tknv, "#tknv", "Tài khoản") &
    kiemTraRong(staff.name, "#name", "Tên nhân viên") &
    kiemTraRong(staff.email, "#email", "email") &
    kiemTraRong(staff.password, "#password", "password") &
    kiemTraRong(staff.datepicker, "#datepicker", "Ngày làm") &
    kiemTraRong(staff.luongCB, "#luongCB", "Lương căn bản") &
    kiemTraRong(staff.chucvu, "#chucvu", "Chọn chức vụ") &
    kiemTraRong(staff.giolam, "#giolam", "Giờ làm");

  if (!valid) {
    return;
  }

  staffList.push(staff);

  renderStaffList(staffList);

  saveLocalStorage(staffList, "arrNV");
}

// console.log(chucvu)

function renderStaffList(arrNV) {
  var output = "";
  for (var index = 0; index < arrNV.length; index++) {
    var obStaff = arrNV[index];

    obStaff.tongluong = function () {
      var salary = this.luongCB;
      if (arrNV[index].chucvu === "Sếp") {
        return salary * 3;
      } else if (arrNV[index].chucvu === "Trưởng phòng") {
        return salary * 2;
      } else if (arrNV[index].chucvu === "Nhân viên") {
        return salary;
      }
    };

    obStaff.xeploai = function () {
      var rank = "";
      if (arrNV[index].giolam >= 192) {
        return (rank += "Xuất sắc");
      } else if (arrNV[index].giolam >= 176) {
        return (rank += "Giỏi");
      } else if (arrNV[index].giolam >= 160) {
        return (rank += "Khá");
      } else if (arrNV[index].giolam < 160) {
        return (rank += "TB");
      }
    };

    var trNV = `
        <tr>
          <td>${obStaff.tknv}</td>
          <td>${obStaff.name}</td>
          <td>${obStaff.email}</td>
          <td>${obStaff.datepicker}</td>
          <td>${obStaff.chucvu}</td>
          <td>${obStaff.tongluong()}</td>
          <td>${obStaff.xeploai()}</td>
          <td>
          <button class="btn btn-danger" onclick="delStaff('${
            obStaff.tknv
          }')">Delete</button>
          <button class="btn btn-primary" data-target="#myModal" data-toggle="modal" onclick="editStaff('${
            obStaff.tknv
          }')">Update</button>
          </td>
        </tr>
      `;

    output += trNV;
  }
  document.querySelector("#tableDanhSach").innerHTML = output;
  return output;
}

function saveLocalStorage(ob, key) {
  // {} , []
  var str = JSON.stringify(ob);
  localStorage.setItem(key, str);
}

function getLocalStorage(key) {
  if (localStorage.getItem(key)) {
    var str = localStorage.getItem(key);

    var ob = JSON.parse(str);
    return ob;
  }
  return undefined;
}

window.onload = function () {
  staffList = getLocalStorage("arrNV");
  console.log("staffList", staffList);
  if (staffList == undefined) {
    staffList = [];
  }
  debugger;
  renderStaffList(staffList);
};

function delStaff(tknvClick) {
  for (var index = staffList.length - 1; index >= 0; index--) {
    if (staffList[index].tknv == tknvClick) {
      staffList.splice(index, 1);
    }
  }
  renderStaffList(staffList);
}



function editStaff(tknvClick) {
  var staffEdit = null;
  for (var index = 0; index < staffList.length; index++) {
    if (staffList[index].tknv == tknvClick) {
      //Tại vị trí này tìm thấy idClick = id object trong mảng
      staffEdit = staffList[index];
      break;
    }
  }
  if (staffEdit !== null) {
    //Đưa dữ liệu lên các control input

    document.getElementById("tknv").value = staffEdit.id;
    document.getElementById("name").value = staffEdit.name;
    document.getElementById("email").value = staffEdit.email;
    document.getElementById("password").value = staffEdit.password;
    document.getElementById("datepicker").value = staffEdit.datepicker;
    document.getElementById("luongCB").value = staffEdit.luongCB;
    document.getElementById("chucvu").value = staffEdit.chucvu;
    document.getElementById("gioLam").value = staffEdit.giolam;
  }
}
