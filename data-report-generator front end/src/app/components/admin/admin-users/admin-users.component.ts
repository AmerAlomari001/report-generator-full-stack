import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../serviecs/user.service';

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

  // 🔹 تحميل المستخدمين
  loadUsers() {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (res: any[]) => {
        this.users = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Failed to load users:', err);
        this.loading = false;
      }
    });
  }

  // 🟢 تغيير الدور (User ↔ Admin)
  changeRole(user: any) {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    if (!confirm(`Are you sure you want to change ${user.username}'s role to "${newRole}"?`)) return;

    this.userService.updateRole(user.id, newRole).subscribe({
      next: () => {
        alert(`✅ ${user.username} is now ${newRole.toUpperCase()}`);
        this.loadUsers();
      },
      error: (err) => {
        console.error('❌ Failed to update role:', err);
        alert('Failed to update user role.');
      }
    });
  }

  // 🗑️ حذف المستخدم
  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== id);
          alert('🗑️ User deleted successfully');
        },
        error: (err) => {
          console.error('❌ Failed to delete user:', err);
          alert('Failed to delete user');
        }
      });
    }
  }
}
