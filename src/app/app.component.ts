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
            "core-js": "^2.4.1",
            "rxjs": "^5.5.2",
            "zone.js": "^0.8.14",
            "@angular/core": "^5.0.0",
            "@angular/forms": "^5.0.0",
            "@angular/common": "^5.0.0",
            "@angular/http": "^5.0.0",
            "@angular/router": "^5.0.0",
            "@angular/compiler": "^5.0.0",
            "@angular/platform-browser": "^5.0.0",
            "@angular/platform-browser-dynamic": "^5.0.0",
            "@angular-devkit/core": "^0.6.3",
            "amexio-ng-extensions": "^4.2.0",
          }
        };
        sdk.embedProject('vm', project, 
        { 
          'height': 500,
          'hideDevTools':true,
          'view' :'preview',
          'hideExplorer' : '1',
          'hideNavigation' : '1',
          'forceEmbedLayout' :'1' 
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
        'src/app/app.component.html': `<h1>This was updated programmatically!</h1>`
      }
    });
   
  }

}
