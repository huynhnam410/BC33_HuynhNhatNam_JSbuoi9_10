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
    staffGiolam,
    
  );

  console.log(staff);

  var valid = true;

  
  valid &= kiemTraRong(staff.tknv,'#tknv','Tài khoản') & kiemTraRong(staff.name,'#name','Tên nhân viên') & kiemTraRong(staff.email,'#email','email') & kiemTraRong(staff.password,'#password','password') & kiemTraRong(staff.datepicker,'#datepicker','Ngày làm') & kiemTraRong(staff.luongCB,'#luongCB','Lương căn bản') & kiemTraRong(staff.chucvu,'#chucvu','Chọn chức vụ') & kiemTraRong(staff.giolam,'#giolam','Giờ làm');

  if(!valid){
    return;
  }



staffList.push(staff);

renderStaffList(staffList);


saveLocalStorage(staffList, 'arrNV');


}

// console.log(chucvu)

function renderStaffList(arrNV) { 
  var output = '';
  for (var index = 0; index < arrNV.length; index++) {
    var obStaff = arrNV[index];
    
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
          <button class="btn btn-danger" onclick="delStaff('${obStaff.tknv}')">Delete</button>
          <button class="btn btn-primary" data-target="#myModal" data-toggle="modal" onclick="editStaff('${obStaff.tknv}')">Update</button>
          </td>
        </tr>
      `;

    output += trNV;
  }
  document.querySelector('#tableDanhSach').innerHTML = output;
  return output;
}

function saveLocalStorage(ob, key) { // {} , []
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
  
  staffList = getLocalStorage('arrNV');
  console.log('staffList', staffList);
  if (staffList == undefined) {
    staffList = [];
  }
  debugger;
  renderStaffList(staffList);


}



  