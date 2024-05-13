import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Respon} from "./response";
import {Req} from "./request";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private readonly baseUrl = `http://localhost:8080/app-controller`;
  dataUser = ['Zero zero one one one zero zero one one\nCryin\' zeros and I\'m\nZero zero one one one zero zero one one\nCryin\' zeros and I\'m'];

  constructor(private httpClient: HttpClient) {
  }

  interpolRequest(req: Req ){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient
      .post<Respon>(`${this.baseUrl}`, JSON.stringify(req), { headers });
  }
  getStringRes(respon:Respon):string[]{
    let res = respon.resiki;
    let resStr =[];
    let naming = ["Лфгранж" ,"Ньютон","Гаусс", "Стирлинг", "Бессель"];
    for ( let i=0;i<5;i++){
      if(res[i]!=null){
        resStr.push(naming[i]+": "+res[i]);
      }else {
        resStr.push(naming[i]+": данные не позволяют использовать этот метод((");
      }
    }


    return resStr;
  }


}
