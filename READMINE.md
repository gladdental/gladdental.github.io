#THIS IS LATEST VERSION

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


#GENERAL IMPORT
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ... } from './../../../services/...';
import Swal from 'sweetalert2';

ng g c new-component --nospec

Swal.fire({
      title: 'Bạn có chắc muốn xóa tài khoản này?',
      text: "Bạn sẽ không thể phục hồi lại",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.value) {
        this.userService.deleteUser(id).subscribe(res => {
          this.loadUser();
          Swal.fire(
            'Đã xóa!',
            'Xóa thành công.',
            'success'
          )
        },error => {
          var message = JSON.stringify(error.error)
          Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        });
      }
    });