import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_model/Member';
import { map } from 'rxjs/internal/operators/map';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  members: Member[] = [];

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers() {
    if(this.members.length>0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
      map(members => {
       this.members = members
       return members;
      })
    );
  }

  getMember(username: string) {
    const member = this.members.find(x=> x.username === username);
    if(member !== undefined) return of (member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }
  
  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    )
  }
}
