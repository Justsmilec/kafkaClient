import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { WebSocketAPI } from './WebSocketAPI';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';


  webSocketAPI: WebSocketAPI;
  greeting: any;
  name: string;
  list:any = [];
  mylist:any = [
    "asf",
    "sdfsdf",
    "sdfsdf",
  ]

  object:any = [
    {
      "content":"Adem",
      "path":"sadas",
      "rowNr":1
    }
  ]
  
  
  constructor(websocket : WebSocketAPI,private httpRequest: HttpClient)
  {
      this.webSocketAPI = websocket;
  }
  ngOnInit() {
    //this.webSocketAPI = new WebSocketAPI();
  }

  connect(){
    this.webSocketAPI._connect();
  }

  disconnect(){
    this.webSocketAPI._disconnect();
  }


  resolveAfter2Seconds(x) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, 400);
    });
  }
  consumeTopic(topicname){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
       // 'Authorization': this.jwt
      })
    };
    const data = new FormData();
    data.append("topicname",topicname.target.name);
    this.httpRequest.post<any>('http://localhost:8081/test/insert',data,httpOptions).subscribe((res) => {
      console.log(res);
     });;
    //this.webSocketAPI._send(this.object);
    console.log("!!--- ", topicname.target.name);
    this.webSocketAPI.actualTopic = topicname.target.name;
    this.resolveAfter2Seconds(20).then(value => {
      this.list = this.webSocketAPI.listTopic1;
      console.log("Message From me: ",this.list[0]);
      
    }) 
  }

  

  // handleMessage(message){
  //   this.greeting = message;
  // }
}
