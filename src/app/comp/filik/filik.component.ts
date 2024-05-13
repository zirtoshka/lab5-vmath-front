import {Component, EventEmitter, inject, Output} from '@angular/core';
import {AppService} from "../../app.service";
import {Respon} from "../../response";
import {Point} from "../../../Point";
import {Req} from "../../request";

@Component({
  selector: 'app-filik',
  standalone: true,
  imports: [],
  templateUrl: './filik.component.html',
  styleUrl: './filik.component.css'
})
export class FilikComponent {
  file: File | null = null;
  @Output() choseEvent = new EventEmitter<Respon>();
  @Output() newPointEvent = new EventEmitter<Point>();
  private appService = inject(AppService);

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
    }
  }

  onUpload() {

    if (this.file) {

      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const lines = e.target.result.split('\n');
          const requestData: Req = {
            interpolX: parseFloat(lines[0]), // Первая строка для interpolX
            x: [],
            y: []
          };

          // Парсим остальные строки для x и y
          for (let i = 1; i < lines.length; i++) {
            const [x, y] = lines[i].split(' ').map(parseFloat);
            requestData.x.push(x);
            requestData.y.push(y);
          }
          this.appService.interpolRequest(requestData).subscribe({
            next: (response) => {
              this.appService.dataUser = this.appService.getStringRes(response);

              this.choseEvent.emit(response);
              const point:Point ={
                x: requestData.x,
                y: requestData.y
              }
              this.newPointEvent.emit(point);

            },
            error: (error) => {
              if (error.status === 400) {
                alert(error.error);
                this.appService.dataUser = error.error;
              } else {
                console.error(error);
                this.appService.dataUser = error;
              }
            }
          });


        } catch (e) {
          alert("я не понимать файл like этот");
        }
      };
      reader.readAsText(this.file);
    }
  }


  downloadFile() {
    const blob = new Blob([this.appService.dataUser.toString()], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'res.txt'; // Имя файла
    link.click();
    URL.revokeObjectURL(url);
  }
}
