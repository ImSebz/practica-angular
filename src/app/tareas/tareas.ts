import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Tarea {
  id: number;
  nombre: string;
  completada: boolean;
}

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.html',
  styleUrls: ['./tareas.css'],
  imports: [CommonModule, FormsModule],
})
export class Tareas {
  tareas: Tarea[] = [];
  nuevaTarea: string = '';
  filtro: 'todas' | 'completadas' | 'pendientes' = 'todas';

  agregarTarea() {
    if (this.nuevaTarea.trim()) {
      this.tareas.push({
        id: Date.now(),
        nombre: this.nuevaTarea,
        completada: false
      });
      this.nuevaTarea = '';
    }
  }

  eliminarTarea(id: number) {
    this.tareas = this.tareas.filter(t => t.id !== id);
  }

  marcarCompletada(id: number) {
    this.tareas = this.tareas.map(t =>
      t.id === id ? { ...t, completada: !t.completada } : t
    );
  }

  filtrarTareas(): Tarea[] {
    if (this.filtro === 'completadas') {
      return this.tareas.filter(t => t.completada);
    } else if (this.filtro === 'pendientes') {
      return this.tareas.filter(t => !t.completada);
    }
    return this.tareas;
  }

  setFiltro(f: 'todas' | 'completadas' | 'pendientes') {
    this.filtro = f;
  }
}
