import { Injectable, NgZone } from '@angular/core';
import { User } from "./auth";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: any;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone 
  ) {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        this.setUserSessionStorage(this.userData);
        // localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        this.setUserSessionStorage({} as User);
        // localStorage.setItem('user', JSON.stringify({}));
      }
    })
  }

  // Login in with email/password
  SignIn(email: string, password: string) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password)
    .then((res) => {
        this.setUserSessionStorage(res.user as User);
        this.router.navigate(['list']);
    })
    .catch((err) => {
        console.log(err);
    })
  }

  // Register user with email/password
  RegisterUser(email: string, password: string) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password)
  }

  // Email verification when new user register
  async SendVerificationMail() {
    (await this.ngFireAuth.currentUser)?.sendEmailVerification().then(() => {
      this.router.navigate(['verify-email']);
    }).catch((err) => console.log(err));
  }

  // Recover password
  PasswordRecover(passwordResetEmail: string) {
    return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      
    }).catch((error: any) => {
      window.alert(error)
    })
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user: User = this.getUserSessionStorage();
    return Object.keys(user).length !== 0;
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user') ?? "");
    return (user.emailVerified !== false) ? true : false;
  }

  // Store user in localStorage
  SetUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  private setUserSessionStorage(user: User | {}): void {
    if(Object.keys(user).length !== 0) {
      sessionStorage.setItem("user", JSON.stringify(this.convertFireuserToSessionUser(user)));
    }
  }

  private getUserSessionStorage(): User {
    return JSON.parse(sessionStorage.getItem("user") ?? "{}") as User;
  }

  // Sign-out 
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('password');
      localStorage.removeItem('user');
      localStorage.removeItem('password');
      this.router.navigate([''],{replaceUrl: true});
    })
  }

  convertFireuserToSessionUser(user: any) {
    return {
      apiKey: "",
      appName: "",
      createdAt: "",
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      lastLoginAt: user.lastLoginAt,
      photoURL: user.photoURL,
      providerData: [],
      stsTokenManager: {},
      uid: user.uid,
    }
  }
}