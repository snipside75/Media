import { MediaService } from './../services/media.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(private uploadService: MediaService) { }

  ngOnInit() {

  }

  upload = (event, value: any) => {
    //console.log(evt.target.querySelector('input[type=file]'));
    const fileElement = event.target.querySelector('input[type=file]');
    const file = fileElement.files[0];

    const fd = new FormData();
    fd.append('file', file);
    fd.append('title',value.title);
    fd.append('description', value.description);

    this.uploadService.uploadMedia(fd)
    .subscribe(
      data => {
        console.log(data);
      }
    );
  }

}
