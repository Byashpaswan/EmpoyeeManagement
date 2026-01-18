import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Chart, ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {

  private chart?: Chart;
  totalEmployees = 0;

  constructor(private service: EmployeeService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((employees) => {
      this.totalEmployees = employees.length;

      // 🔹 Group employees by department
      const departmentCount = employees.reduce<Record<string, number>>(
        (acc, emp) => {
          acc[emp.department] = (acc[emp.department] || 0) + 1;
          return acc;
        },
        {}
      );

      this.renderPieChart(
        Object.keys(departmentCount),
        Object.values(departmentCount)
      );
    });
  }

  private renderPieChart(labels: string[], data: number[]): void {
    // 🔒 Destroy existing chart before creating a new one
    if (this.chart) {
      this.chart.destroy();
    }

    const config: ChartConfiguration<'pie'> = {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            label: 'Employees by Department',
            data,
            backgroundColor: [
              '#4e79a7',
              '#f28e2b',
              '#e15759',
              '#76b7b2',
              '#59a14f',
              '#edc948',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.raw as number;
                return `${context.label}: ${value}`;
              },
            },
          },
        },
      },
    };

    this.chart = new Chart(
      document.getElementById('employeeDeptChart') as HTMLCanvasElement,
      config
    );
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
