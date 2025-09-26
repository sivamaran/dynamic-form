import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalState } from '../../models/form-definition.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-submission-modal',
  standalone: true,
  imports: [CommonModule], // Import CommonModule for *ngIf
  templateUrl: './submission-modal.component.html',
})
export class SubmissionModalComponent {
  @Input() modalState: ModalState = { isOpen: false, title: '', content: '', type: 'info' };
  @Output() close = new EventEmitter<void>();

  get colorClass(): string {
    switch (this.modalState.type) {
      case 'success': return 'text-green-400';
      case 'error': return 'text-red-400';
      default: return 'text-cyan-400';
    }
  }

  onClose() {
    this.close.emit();
  }
}