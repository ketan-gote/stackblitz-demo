import { Component } from '@angular/core';
import sdk from '../sdk';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  vm = null;

  constructor(private httpClient : HttpClient){
  }

  ngOnInit() {
   //this.openGitHubProject();
   this.renderNGProject();
  }

  response : any;

  renderNGProject(){
    //HTML FILE
    let responsedata : any;
    this.httpClient.get('assets/ngproject.json').subscribe(data => {
      responsedata = data;
      this.renderProject(responsedata);
    }, error => {
    }, () => {
     
    });
  }


  renderProject(data : any[]){
    console.log(JSON.stringify(data));
    let filenodes = {};
    data.forEach( node =>{
      filenodes[node.key] = node.value;
    });

    this.openProject(filenodes);
  }

  openProject(fetchfiles : any){
      // Create the project payload.
        const project = {
          files: fetchfiles,
          title: 'Test Stack Blitz Example',
          description: 'Test Stack Blitz Example',
          template: 'angular-cli',
          tags: ['stackblitz', 'sdk'],
          "dependencies": {
            "@angular/animations": "~7.0.0",
            "@angular/common": "~7.0.0",
            "@angular/compiler": "~7.0.0",
            "@angular/core": "~7.0.0",
            "@angular/forms": "~7.0.0",
            "@angular/http": "~7.0.0",
            "@angular/platform-browser": "~7.0.0",
            "@angular/platform-browser-dynamic": "~7.0.0",
            "@angular/router": "~7.0.0",
            "amexio-ng-extensions": "^5.4.1",
            "core-js": "^2.5.4",
            "rxjs": "~6.3.3",
            "zone.js": "~0.8.26"            
          }
        };
        sdk.embedProject('vm', project, 
        { 
          'height': 500,
          'view' :'preview'
        })
        .then((vm) => {
          this.vm = vm;
        });

      sdk.connect(document.getElementById('vm') as HTMLFrameElement)
  }
  src : string;
  openGitHubProject(){
    sdk.embedGithubProject('vm','/ketan-gote/amexio-ng-base-app', {      
      height: '1000'
    }).then((vm) => {
      console.log(vm);
      debugger;
      this.vm = vm;
    });
    sdk.connect(document.getElementById('vm') as HTMLElement)
    this.src = this.vm.preview;
  }

  buttonClick(){
    debugger;
    if (!this.vm) return;

    this.vm.applyFsDiff({
      create: {
        './src/app/app.component.html': `<h1>This was updated programmatically!</h1>`
      }
    });
   
  }

}
