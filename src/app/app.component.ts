import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
registrationForm: any;

  constructor(private http: HttpClient) {}

  // Personal Details
  fullName: string = '';
  email: string = '';
  age: number | null = null;
  student: string = '';
  collegeOrSchoolName: string = '';
  companyName: string = '';

  // Attendance Details
  attendanceType: string = '';
  phoneNumber: string = '';
  organizationName: string = '';
  numberOfParticipants: number = 1;

  // Accommodation & Meals
  accommodationRequired: string = '';
  checkInDate: string = '';
  checkOutDate: string = '';
  roomType: string = '';
  mealPreference: string = '';
  foodPreference: string = '';

  // Payment Details
  paymentMethod: string = '';
  upiId: string = '';
  cardHolderName: string = '';
  cardExpiry: string = '';

  // Submit registration
  submitRegistration(): void {

    const registrationData = {
      fullName: this.fullName,
      email: this.email,
      age: this.age,

      student: this.student === 'yes',
      collegeOrSchoolName:
        this.student === 'yes' ? this.collegeOrSchoolName : null,
      companyName:
        this.student === 'no' ? this.companyName : null,

      attendanceType: this.attendanceType,
      phoneNumber:
        this.attendanceType === 'individual' ? this.phoneNumber : null,
      organizationName:
        this.attendanceType === 'organization'
          ? this.organizationName : null,
      numberOfParticipants:
        this.attendanceType === 'organization'
          ? this.numberOfParticipants : null,

      accommodationRequired:
        this.accommodationRequired === 'yes',
      checkInDate:
        this.accommodationRequired === 'yes' ? this.checkInDate : null,
      checkOutDate:
        this.accommodationRequired === 'yes' ? this.checkOutDate : null,
      roomType:
        this.accommodationRequired === 'yes' ? this.roomType : null,
      mealPreference:
        this.accommodationRequired === 'yes' ? this.mealPreference : null,
      foodPreference:
        this.accommodationRequired === 'yes' &&
        this.mealPreference === 'Non-vegetarian'
          ? this.foodPreference : null,

      paymentMethod: this.paymentMethod,
      upiId: this.paymentMethod === 'UPI' ? this.upiId : null,
      cardHolderName:
        this.paymentMethod === 'Card' ? this.cardHolderName : null,
      cardExpiry:
        this.paymentMethod === 'Card' ? this.cardExpiry : null
    };

    this.http.post(
      'http://localhost:8080/api/registrations',
      registrationData
    ).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        alert('Registration submitted successfully!');
      },
      error: (error) => {
        console.error('Registration failed:', error);
        alert('Registration failed. Please check the backend console.');
      }
    });
  }
}