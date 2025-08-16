import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
export interface Tarea {
  id: number;
  nombre: string;
  completada: boolean;
}

type FiltroTarea = 'todas' | 'completadas' | 'pendientes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  tareas: Tarea[] = [];
  nuevaTarea: string = '';
  filtro: FiltroTarea = 'todas';

  agregarTarea(taskName: string): void {
    if (taskName && taskName.trim()) {
      this.tareas.push({ id: Date.now(), nombre: taskName, completada: false });
      this.nuevaTarea = '';
    }
  }

  eliminarTarea(taskId: number): void {
    this.tareas = this.tareas.filter(t => t.id !== taskId);
  }

  completarTarea(taskId: number): void {
    this.tareas = this.tareas.map(t =>
      t.id === taskId ? { ...t, completada: !t.completada } : t
    );
  }

  filtrarTareas(completadas: boolean): Tarea[] {
    return this.tareas.filter(t => t.completada === completadas);
  }

  mostrarTareas(): Tarea[] {
    if (this.filtro === 'completadas') {
      return this.filtrarTareas(true);
    } else if (this.filtro === 'pendientes') {
      return this.filtrarTareas(false);
    }
    return this.tareas;
  }
}
