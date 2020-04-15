import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  isPrinting : boolean = false;

  constructor(
    private router : Router,
  ) { }

  printDocument(documentName: string, documentData: string[]){
    this.isPrinting = true;
    this.router.navigate(['./',
      {
        outlets: {
          'print': ['print', documentName, documentData.join()]
        }
      }
    ]);
  }
}
