import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users: any[] = [];
  loading = true;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.getAllUsers().subscribe((res: any[]) => {
      this.users = res;
      this.loading = false;
    });
  }

  changeRole(user: any) {
    this.userService.updateRole(user.id, user.role).subscribe(() => {
      console.log('✅ Role updated');
    });
  }

  approveUser(id: number, status: boolean) {
    this.userService.approveUser(id, status).subscribe(() => {
      console.log(status ? "✅ User approved" : "❌ User rejected");
      this.loadUsers();
    });
  }

  deleteUser(id: number) {
    if (confirm("Are you sure you want to delete this user?")) {
      this.userService.deleteUser(id).subscribe(() => {
        console.log("🗑️ User deleted");
        this.loadUsers();
      });
    }
  }
}
