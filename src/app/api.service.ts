import { Injectable, Output, EventEmitter } from '@angular/core';
import { map, tap, retry, catchError, retryWhen, delayWhen } from 'rxjs/operators';
import { Observable, pipe, throwError, timer} from 'rxjs';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Users } from './users';
import { Respo } from './respo';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

//baseUrl:string = "http://localhost/search/search/src/app/php";
baseUrl:string = "https://www.histam.com/php";

redirectUrl: string;
@Output() getLoggedInName: EventEmitter <any> = new EventEmitter();

  constructor(private httpClient : HttpClient) { }

  public userlogin(username, password) {
  alert(username)
  return this.httpClient.post<any>(this.baseUrl + '/login.php', { username, password }).pipe(map(Users => {
  this.setToken(Users[0].name);
  this.getLoggedInName.emit(true);
  return Users;
  }));
  }

    //token
    setToken(token: string){
      localStorage.setItem('token', token)
    }
    getToken(){
      return localStorage.getItem('token');
    }
    deleteToken(){
      localStorage.removeItem('token');
    }
    isLoggedIn(){
    const usertoken = this.getToken();
    if (usertoken !=null) {
      return true
    }
      return false
    }

    handleError(error: HttpErrorResponse) {
          let errorMessage = 'Unknown error!';
          if (error.error instanceof ErrorEvent) {
            // Client-side errors
            //errorMessage = `CSError: ${error.error.message}`;
            errorMessage = `Ooops!!, there was a Network Error. Try again later`;
          } else {
            // Server-side errors
            //errorMessage = `SSError Code: ${error.status}\nMessage: ${error.message}`;
            errorMessage = `OoopsS!!, there was a Network Error. Try again later`;
          }
          window.alert(errorMessage);
          return throwError(errorMessage);
        }


 public getData(): Observable<Users[]>
    {
      return this.httpClient.get<any>(this.baseUrl + '/fetch_profile.php');
    }

    public mostSerc(): Observable<any>
    {
      return this.httpClient.get<any>(this.baseUrl + '/searchedStats.php');
    }

    public leastSerc(): Observable<any>
    {
      return this.httpClient.get<any>(this.baseUrl + '/leastSearched.php');
    }

     public addDoc(formData)
    {
      return this.httpClient.post<any>(this.baseUrl + '/add_file.php', formData); 
      }

       public payDoc(p_number:any): Observable<any>
            {
              return this.httpClient.get(`${this.baseUrl + '/stkpush.php'}?p_number=${p_number}`).pipe(catchError(this.handleError)); 
              }

      downloadFile(): any {
              return this.httpClient.get(this.baseUrl + '/fetch_profile.php', {responseType: 'blob'});
            }

      findByTitle(title:any): Observable<any> {
              return this.httpClient.get(`${this.baseUrl + '/fetch_data.php'}?title=${title}`);
            }
      
      getDoc(Id:any): Observable<any> {
              return this.httpClient.get(`${this.baseUrl + '/getDoc.php'}?title=${Id}`).pipe(retry(0), catchError(this.handleError));
            }
  
      deleteData(pdfId:any): Observable<any> {
              return this.httpClient.delete(`${this.baseUrl + '/deleteData.php'}?title=${pdfId}`);
            }
      deleteTerm(name:any): Observable<any> {
              return this.httpClient.delete(`${this.baseUrl + '/deleteTerm.php'}?title=${name}`);
            }

      public getFname(): Observable<any>
            {
              return this.httpClient.get<any>(this.baseUrl + '/fetch_file.php');
            }

       public queryRequest(CRequestID:any): Observable<any>
            {
              return this.httpClient.get(`${this.baseUrl + '/stkpushquery.php'}?CRequestID=${CRequestID}`).pipe(retryWhen(errors => {
                  return errors
                    .pipe(
                        delayWhen(() => timer(7000)),
                        tap(() => console.log('retrying...'))
                            );
                        } ),
                     catchError(this.handleError)); 
                       }

      updateDoc(formData)
            {
              return this.httpClient.post<any>(this.baseUrl + '/updateDoc.php', formData); 
              }

    public noSerc(): Observable<any>
    {
      return this.httpClient.get<any>(this.baseUrl + '/noSearched.php');
    }

 
}
