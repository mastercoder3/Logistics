import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private afs: AngularFirestore) { }

  // Pricing
  getPrice(dest){
   return this.afs.collection('pricing', ref => ref.where('to','==',dest)).snapshotChanges();
  }

  getPricingById(id){
    return this.afs.doc('pricing/'+id).valueChanges();
  }

  getRates(id){
    return this.afs.collection('rates', ref => ref.where('id','==',id)).valueChanges();
  }

  // Create Username
  createUser(uid, data){
    return this.afs.doc('users/'+uid).set(data);
  }

  //get User
  getUser(uid){
    return this.afs.doc('users/'+uid).valueChanges();
  }

  //get User data with meta
  getUserProfile(uid){
    return this.afs.doc('users/'+uid).snapshotChanges();
  }

  //Update User
  updateUser(uid,data){
    return this.afs.doc('users/'+uid).set(data);
  }

  //retrieve country data
  getCountryName(dest){
    return this.afs.collection('pricing', ref => ref.where('to','==',dest)).snapshotChanges();
  }
  //get price
  getCountryPrices(id,weight){      
    return this.afs.collection('rates', ref => ref.where('id','==',id).where('maxweight','>=',weight)).snapshotChanges();
  }

  setBill(order){
    return this.afs.collection('orders').add(order);
  }

  processPayment(id,amount,token: any){
    const payment = {id: id, token, amount};
    return this.afs.collection('payments').add(payment);
  }

  processPayment1(id,amount){
    const payment = {id: id, amount};
    return this.afs.collection('payments').add(payment);
  }

  //return orders by id
  getOrder(uid){
    return this.afs.collection('orders', ref=> ref.where('userId', '==', uid)).snapshotChanges();
  }

  getBoxes(){
    return this.afs.collection('box').valueChanges();
  }

  getNewOrders(){
    return this.afs.collection('neworders').valueChanges();
  }
  
  createOrder(data){
    return this.afs.collection('neworders').add(data);
  }

  getNewOrdersById(id){
    return this.afs.collection('neworders', ref => ref.where('userid','==',id)).valueChanges();
  }

  getOrdersById(id){
    return this.afs.collection('orders', ref=> ref.where('userid','==',id)).valueChanges()
  }

  getNewOrderByOrderId(id){
    return this.afs.collection('neworders', ref => ref.where('orderid','==',id)).valueChanges();
  }

  getOrderByOrderId(id){
    return this.afs.collection('orders', ref => ref.where('orderid','==',id)).valueChanges();
  }

  getTrackingInformation(id){
    return this.afs.doc('tracking/'+id).valueChanges();
  }

  contactUs(data){
    return this.afs.collection('contactus').add(data);
  }



}
