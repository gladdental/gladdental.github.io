#04032020
    + Sharing data
    - Tạo bản in hóa đơn sau khi bấm thanh toán +
    - xóa biến localstorage +
    - Get diagnosis
    - custom hóa đơn


#07032020
    - Need to create customer's history page
    - customer's history page for doctor and admin
    - Add reset pass function for admin
    - Add Examination Record Detail for Admin and doctor
    - Fix logo responsive for admin and doctor page

#11032020
    - thông báo khi lưu diagnosis, hẹn tái khám, tạo examination


#the way to get error message

import Swal from 'sweetalert2';
Swal.fire({
        title: 'Success',
        text: 'Khôi phục mật khẩu thành công',
        icon: 'success',
      });

var message = JSON.stringify(error.error)
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Cool'
      });