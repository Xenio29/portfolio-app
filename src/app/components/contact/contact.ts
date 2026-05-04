import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

type MainSubject = 'project' | 'collaboration' | 'stage' | 'maintenance' | 'autres';

type SubjectOption = {
  value: string;
  label: string;
};

type SubjectConfig = {
  label: string;
  subSubjects: SubjectOption[];
};

const SUBJECTS: Record<MainSubject, SubjectConfig> = {
  project: {
    label: 'Projet',
    subSubjects: [
      { value: 'site-vitrine', label: 'Site vitrine' },
      { value: 'application-web', label: 'Application web' },
      { value: 'refonte', label: 'Refonte de site' },
      { value: 'ui-ux', label: 'UI / UX' },
    ],
  },
  collaboration: {
    label: 'Collaboration',
    subSubjects: [
      { value: 'frontend', label: 'Développement front-end' },
      { value: 'backend', label: 'Développement back-end' },
      { value: 'integration', label: 'Intégration' },
      { value: 'audit', label: 'Audit / conseil' },
    ],
  },
  stage: {
    label: 'Stage',
    subSubjects: [
      { value: 'stage-court', label: 'Stage court' },
      { value: 'stage-long', label: 'Stage long' },
      { value: 'alternance', label: 'Alternance' },
      { value: 'decouverte', label: 'Découverte métier' },
    ],
  },
  maintenance: {
    label: 'Maintenance',
    subSubjects: [
      { value: 'bugfix', label: 'Correction de bug' },
      { value: 'optimisation', label: 'Optimisation' },
      { value: 'nouvelle-fonctionnalite', label: 'Nouvelle fonctionnalité' },
      { value: 'audit', label: 'Revue technique' },
    ],
  },
  autres: {
    label: 'Autres',
    subSubjects: [],
  },
};

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly formSubmitUrl = 'https://formsubmit.co/ajax/tigane.guelloul@icloud.com';
  protected readonly submitted = signal(false);
  protected readonly isSending = signal(false);
  protected readonly sendSuccess = signal(false);
  protected readonly sendError = signal('');
  protected readonly subjectOptions = Object.entries(SUBJECTS).map(([value, config]) => ({
    value,
    label: config.label,
  }));

  protected readonly contactForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: this.fb.control<MainSubject>('project', { validators: [Validators.required] }),
    subSubject: ['', [Validators.required]],
    customSubSubject: this.fb.control({ value: '', disabled: true }, []),
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  protected readonly selectedSubject = signal<MainSubject>(this.contactForm.controls.subject.value);
  protected readonly selectedSubjectConfig = computed(() => SUBJECTS[this.selectedSubject()]);
  protected readonly subSubjectOptions = computed(() => this.selectedSubjectConfig().subSubjects);
  protected readonly isCustomSubject = computed(() => this.selectedSubject() === 'autres');

  constructor() {
    this.syncSubjectControls(this.contactForm.controls.subject.value);

    this.contactForm.controls.subject.valueChanges.pipe(takeUntilDestroyed()).subscribe((subject) => {
      this.selectedSubject.set(subject);
      this.syncSubjectControls(subject);
    });
  }

  protected async sendMail(): Promise<void> {
    this.submitted.set(true);
    this.sendSuccess.set(false);
    this.sendError.set('');

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const formValue = this.contactForm.getRawValue();
    const subjectLabel = SUBJECTS[formValue.subject].label;
    const subLabel = formValue.subject === 'autres'
      ? formValue.customSubSubject.trim()
      : this.getSubSubjectLabel(formValue.subject, formValue.subSubject);
    const body = this.buildMailBody(formValue.firstName, formValue.lastName, formValue.email, formValue.message);
    const subject = `${subjectLabel} - ${subLabel || 'Autres'}`;

    this.isSending.set(true);

    try {
      const payload = new FormData();
      payload.append('_subject', subject);
      payload.append('_replyto', formValue.email);
      payload.append('_captcha', 'false');
      payload.append('name', `${formValue.firstName} ${formValue.lastName}`);
      payload.append('email', formValue.email);
      payload.append('category', subjectLabel);
      payload.append('subcategory', subLabel || 'Autres');
      payload.append('message', body);

      const response = await fetch(this.formSubmitUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: payload,
      });

      if (!response.ok) {
        throw new Error('Mail relay refused the request.');
      }

      this.sendSuccess.set(true);
      this.contactForm.reset({
        firstName: '',
        lastName: '',
        email: '',
        subject: 'project',
        subSubject: '',
        customSubSubject: '',
        message: '',
      });
      this.selectedSubject.set('project');
      this.syncSubjectControls('project');
      this.contactForm.markAsPristine();
      this.contactForm.markAsUntouched();
      this.submitted.set(false);
    } catch {
      this.sendError.set('L’envoi a échoué. Réessaie dans un instant.');
    } finally {
      this.isSending.set(false);
    }
  }

  private syncSubjectControls(subject: MainSubject): void {
    const subSubjectControl = this.contactForm.controls.subSubject;
    const customSubSubjectControl = this.contactForm.controls.customSubSubject;

    if (subject === 'autres') {
      subSubjectControl.reset('');
      subSubjectControl.disable({ emitEvent: false });
      subSubjectControl.clearValidators();
      subSubjectControl.updateValueAndValidity({ emitEvent: false });

      customSubSubjectControl.enable({ emitEvent: false });
      customSubSubjectControl.setValidators([Validators.required, Validators.minLength(3)]);
      customSubSubjectControl.updateValueAndValidity({ emitEvent: false });
      return;
    }

    customSubSubjectControl.reset('');
    customSubSubjectControl.disable({ emitEvent: false });
    customSubSubjectControl.clearValidators();
    customSubSubjectControl.updateValueAndValidity({ emitEvent: false });

    subSubjectControl.enable({ emitEvent: false });
    subSubjectControl.setValidators([Validators.required]);
    const firstOption = SUBJECTS[subject].subSubjects[0]?.value ?? '';
    subSubjectControl.setValue(firstOption, { emitEvent: false });
    subSubjectControl.updateValueAndValidity({ emitEvent: false });
  }

  private getSubSubjectLabel(subject: MainSubject, subSubjectValue: string): string {
    return SUBJECTS[subject].subSubjects.find((option) => option.value === subSubjectValue)?.label ?? subSubjectValue;
  }

  private buildMailBody(firstName: string, lastName: string, email: string, message: string): string {
    const dateTime = new Intl.DateTimeFormat('fr-FR', {
      dateStyle: 'full',
      timeStyle: 'short',
    }).format(new Date());

    return `${firstName} ${lastName} - ${email}\n---\n${message}\n\n---\n${dateTime}`;
  }
}
