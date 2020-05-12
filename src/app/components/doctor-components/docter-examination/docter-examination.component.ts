import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DoctorService } from './../../../services/doctor.service';
import { Renderer2 } from '@angular/core';
import Swal from 'sweetalert2';
import { DOCUMENT } from '@angular/common';
import { lastDayOfMonth } from '@progress/kendo-date-math';

@Component({
  selector: 'app-docter-examination',
  templateUrl: './docter-examination.component.html',
  styleUrls: ['./docter-examination.component.css']
})

export class DocterExaminationComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  public tooth: any[];
  public Patient: any[] = null;
  public Category: any[];
  public Service: any[];
  public deletedPatient: number = -1;
  public currentPatient = {
    "id_exam": null,
    "patient_name": null,
    "note": null
  };
  public Diagnosis: any[] = [];

  constructor(
    public doctorService: DoctorService,
    public renderer: Renderer2,
    // private document : DOCUMENT
  ) { }

  ngOnInit() {
    this.loadTooth();
    this.loadPatient();
    this.loadCategory();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadTooth() {
    this.subscription = this.doctorService.getListTooth().subscribe(data => {
      this.tooth = data;
    })
  }

  loadPatient() {
    this.subscription = this.doctorService.getListWaitingPatient().subscribe(data => {
      this.Patient = data;
    }, error => {
      console.log(error);
    });
  }

  onRefreshQueue() {
    this.loadPatient();
  }

  loadCategory() {
    this.subscription = this.doctorService.getListCategory().subscribe(data => {
      this.Category = data;
      this.loadService(data[0]['id']);
    }, error => {
      console.log(error);
    });
  }

  loadService(id) {
    this.subscription = this.doctorService.filterListService(id).subscribe(data => {
      this.Service = data;
    }, error => {
      console.log(error);
    });
  }

  filterService(id) {
    this.subscription = this.doctorService.filterListService(id).subscribe(data => {
      this.Service = data;
    }, error => {
      console.log(error);
    });
  }

  private arr_tooth: any[] = [];
  private eventList: any[] = [];
  toggleClass(event: any, cls: string, tooth_id: number, toothname: string) {
    const hasClass = event.target.classList.contains(cls);
    if (this.unit == 'hàm' && tooth_id < 33) {
      Swal.fire(
        'Cảnh báo',
        'Vui lòng chọn răng hàm!',
        'question'
      )
      return;
    }
    if (hasClass) {
      this.renderer.removeClass(event.target, cls);
      this.arr_tooth.splice(this.arr_tooth.indexOf(tooth_id), 1);
    } else {

      if (toothname == 'A1') {
        this.eventList.forEach(element => {
          if (element['parentElement']['innerText'].substr(1, 1) == "1") {
            this.arr_tooth.splice(this.arr_tooth.indexOf(parseInt(element["id"])), 1);
            this.renderer.removeClass(element, cls);
          }
        });
      }
      else if (toothname == 'A2') {
        this.eventList.forEach(element => {
          if (element['parentElement']['innerText'].substr(1, 1) == "0") {
            this.arr_tooth.splice(this.arr_tooth.indexOf(parseInt(element["id"])), 1);
            this.renderer.removeClass(element, cls);
          }
        });
      } else if (toothname == 'A3') {
        this.eventList.forEach(element => {
          this.renderer.removeClass(element, cls);
        });
        this.arr_tooth = [];
      }
      console.log(event.target); //#

      this.renderer.addClass(event.target, cls);
      this.arr_tooth.push(tooth_id);
      this.eventList.push(event.target);


    }
  }

  public EnableReExam: boolean = false;
  onEnableReExam() {
    if (this.EnableReExam) {
      this.EnableReExam = false;
    } else {
      this.EnableReExam = true;
    }
  }

  getCurrentPatient(id, name, note) {
    this.doctorService.pickExamination(id).subscribe(res => {
      this.currentPatient.id_exam = id;
      this.currentPatient.patient_name = name;
      this.currentPatient.note = note;
      (document.getElementById('btnsave') as HTMLInputElement).disabled = false;
      this.getDiagnosis(id);
    },error => {
      var message = JSON.stringify(error.error)
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Cool'
      });
      this.loadPatient();
    })

  }

  onNextPatient(id_exam) {
    this.doctorService.deleteExamination(id_exam).subscribe(data => {
      this.deletedPatient = id_exam;
      this.loadPatient();
    }, error => {
      console.log(error);
    });
  }

  onReversePatient() {
    this.doctorService.reverseExamination(this.deletedPatient).subscribe(data => {
      this.loadPatient();
    }, error => {
      console.log(error);
    });
  }

  public unit: string;
  public id_service: number;
  onSelectedService(values) {
    const i = values.indexOf(' ');
    this.id_service = values.substring(0, i);
    this.unit = values.substring(i + 1);
    if (values.substring(i + 1) == 'hàm') {
      this.eventList.forEach(element => {
        this.renderer.removeClass(element, 'highlight');
      });
    }
  }

  onDiganosis(note, service) {

    const _service = service.substring(0, service.indexOf(' '));
    if (this.arr_tooth.length < 1) {
      Swal.fire(
        'Lưu ý',
        'Vui lòng chọn vị trí răng',
        'question'
      );
      return;
    }
    this.doctorService.createDiagnosis(note, _service, this.currentPatient.id_exam, this.arr_tooth).subscribe(data => {
      this.eventList.forEach(element => {
        this.renderer.removeClass(element, 'highlight');
      });
      this.eventList = [];
      this.arr_tooth = [];
      (document.getElementById('doctor_note') as HTMLInputElement).value = "";
      this.getDiagnosis(this.currentPatient.id_exam);
    }, error => {
      console.log(error);

    });
  }

  getDiagnosis(id_exam) {
    this.subscription = this.doctorService.filterDiagnosisByExam(id_exam).subscribe(data => {
      this.Diagnosis = data;
    }, error => {
      console.log(error);
    });
  }

  deleteDiagnosis(id) {
    this.doctorService.deleteDiagnosis(id).subscribe(data => {
      this.getDiagnosis(this.currentPatient.id_exam);
    }, error => {
      console.log(error);

    })
  }

  onFinish() {
    //chưa nhập đủ thông tin
    if (this.currentPatient.id_exam == null) {
      Swal.fire(
        'Lưu ý',
        'Bạn chưa khám cho ai cả!',
        'question'
      );
      return;
    }
    this.doctorService.finishExamination(this.currentPatient.id_exam).subscribe(data => {
      Swal.fire({
        title: 'Success',
        text: 'Quá trình khám đã hoàn tất. Hãy chọn bệnh nhân tiếp theo!',
        icon: 'success',
      });
      this.loadPatient();
      this.Diagnosis = [];
    }, error => {
      console.log(error);

    })
  }

  onShedule(date, time, message) {
    this.doctorService.createShedule(date, time, message, this.currentPatient.id_exam).subscribe(data => {
      Swal.fire({
        title: 'Success',
        text: 'Đã thêm vào lịch hẹn khám',
        icon: 'success',
      });
    }, error => {
      console.log(error);
    });
  }

}
