
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  registrations: any[] = [];
  totalRegistrations = 0;
  
today = new Date();

totalAmount = 0;

accommodationYes = 0;
accommodationNo = 0;

vegCount = 0;
nonVegCount = 0;
veganCount = 0;

singleRoomCount = 0;
doubleRoomCount = 0;

upiCount = 0;
cardCount = 0;
cashCount = 0;

attendanceGradient =
  'conic-gradient(#4385f5 0% 0%, #8b5cf6 0% 0%)';

barHeight(value: number): string {
  const maxValue = Math.max(
    this.accommodationYes,
    this.accommodationNo,
    1
  );

  return Math.max((value / maxValue) * 130, value > 0 ? 8 : 0) + 'px';
}


  students = 0;
  professionals = 0;
  individualRegistrations = 0;
  organizationRegistrations = 0;

  loading = true;
  errorMessage = '';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    this.errorMessage = '';

    this.dashboardService.getRegistrations().subscribe({
      next: (data) => {
        this.registrations = data;
        this.calculateStatistics();
      },
      error: (error) => {
        console.error('Error fetching registrations:', error);
        this.errorMessage =
          'Unable to load registrations. Please check the backend.';
        this.loading = false;
      }
    });
  }

 
calculateStatistics(): void {
  const records = this.registrations;

  const isYes = (value: any): boolean =>
    value === true ||
    String(value).toLowerCase() === 'yes' ||
    String(value).toLowerCase() === 'true';

  const normalize = (value: any): string =>
    String(value ?? '').trim().toLowerCase();

  this.totalRegistrations = records.length;

  this.students = records.filter(
    r => isYes(r.student)
  ).length;

  this.professionals = this.totalRegistrations - this.students;

  this.individualRegistrations = records.filter(
    r => normalize(r.attendanceType) === 'individual'
  ).length;

  this.organizationRegistrations = records.filter(
    r => normalize(r.attendanceType) === 'organization'
  ).length;

  this.accommodationYes = records.filter(
    r => isYes(r.accommodationRequired)
  ).length;

  this.accommodationNo =
    this.totalRegistrations - this.accommodationYes;

  this.vegCount = records.filter(
    r => normalize(r.mealPreference) === 'veg'
  ).length;

  this.nonVegCount = records.filter(
    r => ['non-veg', 'nonveg', 'non vegetarian'].includes(
      normalize(r.mealPreference)
    )
  ).length;

  this.veganCount = records.filter(
    r => normalize(r.mealPreference) === 'vegan'
  ).length;

  this.singleRoomCount = records.filter(
    r => normalize(r.roomType) === 'single'
  ).length;

  this.doubleRoomCount = records.filter(
    r => normalize(r.roomType) === 'double'
  ).length;

  this.upiCount = records.filter(
    r => normalize(r.paymentMethod) === 'upi'
  ).length;

  this.cardCount = records.filter(
    r => normalize(r.paymentMethod) === 'card'
  ).length;

  this.cashCount = records.filter(
    r => normalize(r.paymentMethod) === 'cash'
  ).length;

  // Count only recorded online payment amounts.
  // Cash registrations are not counted as online payments.
  this.totalAmount = records.reduce((sum, r) => {
    const method = normalize(r.paymentMethod);
    const amount = Number(r.paymentAmount ?? r.amount ?? 0);

    if (['upi', 'card'].includes(method) && Number.isFinite(amount)) {
      return sum + amount;
    }

    return sum;
  }, 0);

  const total = this.totalRegistrations || 1;
  const individualPercent =
    (this.individualRegistrations / total) * 100;

  this.attendanceGradient =
    `conic-gradient(#4385f5 0% ${individualPercent}%, ` +
    `#8b5cf6 ${individualPercent}% 100%)`;

  this.loading = false;
}


  getPaymentMethod(registration: any): string {
    return registration.paymentMethod || 'N/A';
  }
}
