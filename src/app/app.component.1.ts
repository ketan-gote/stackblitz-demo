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
    this.httpClient.get('http://localhost:8080/fetchcode').subscribe(data => {
      debugger;
      responsedata = data;
      this.renderProject(responsedata);
    }, error => {
    }, () => {
     
    });
  }

  renderProject(data : any[]){
    let filenodes = {};
    data.forEach( node =>{
      debugger;
      filenodes[node.key] = node.value;
    });

    console.log(filenodes);
    this.openProject(filenodes);
  }

  openProject(fetchfiles : any){
    
    // Create the index.ts file
    const maints = `import { enableProdMode } from '@angular/core';
    import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
    import { AppModule } from './app/app.module';
    import { environment } from './environments/environment';
    if (environment.production) {
      enableProdMode();
    }
    platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => console.log(err));
    `;

    const appmodule = `

    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { AppComponent } from './app.component';
    import { HttpClientModule } from '@angular/common/http';
    
    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        HttpClientModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
    `;

    const environmentts = `
    
export const environment = {
  production: false
};
    `;

    const appcomponentts = `
    
    import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html' 
})
export class AppComponent {
  title = 'app';
}

        
    `;


    const appcomponenthtml = `
    
    Welcome to {{ title }}!
    `;


// Create the index.html file
const html = `

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AmexioNgBaseApp</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  HELLO 
  <app-root></app-root>
</body>
</html>


`;

const polyfills = `
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
import 'hammerjs';
import 'web-animations-js';

`;


const angularclijson = `
{
  "project": {
    "name": "stackblitz-demo"
  },
  "apps": [
    {
      "root": "src",
      "outDir": "dist",
      "assets": [
        "assets",
        "favicon.ico"
      ],
      "index": "index.html",
      "main": "main.ts",
      "polyfills": "polyfills.ts",
      "test": "test.ts",
      "tsconfig": "tsconfig.app.json",
      "testTsconfig": "tsconfig.spec.json",
      "prefix": "app",
      "styles": [
       
      ],
      "scripts": [],
      "environmentSource": "environments/environment.ts",
      "environments": {
        "dev": "environments/environment.ts",
        "prod": "environments/environment.prod.ts"
      }
    }
  ],
  "defaults": {
    "styleExt": "css",
    "component": {}
  }
}



`;
        // Create the project payload.
        const project = {
          files: {
            'src/app/app.component.ts':appcomponentts,
            'src/app/app.component.html':appcomponenthtml,
            'src/app/app.module.ts':appmodule,
            'src/environments/environment.ts':environmentts,
            'src/main.ts': maints,
            'src/index.html': html,
            '.angular-cli.json': angularclijson,
            'src/polyfills.ts': polyfills
          },
          title: 'Dynamically Generated Project',
          description: 'Created with <3 by the StackBlitz SDK!',
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
            "hammerjs": "^2.0.8",
            "web-animations-js": "^2.3.1",
            "amexio-ng-extensions": "^4.2.0",
          }
        };


        sdk.embedProject('vm', project, { height: 500 });

  }
  
  openGitHubProject(){
    //sdk.embedGithubProject('vm','ketan-gote/canvaslite?embed=1&hideExplorer=1&hideNavigation=1&view=preview', {
    sdk.embedGithubProject('vm','/ketan-gote/amexio-ng-base-app', {      
      height: '1000'
    }).then((vm) => {
      console.log(vm);
      debugger;
      this.vm = vm;
    });
    sdk.connect(document.getElementById('vm') as HTMLIFrameElement)

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
