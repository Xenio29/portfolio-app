import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

type SkillKey = 'front' | 'back' | 'angular' | 'games' | 'python';
type SkillColorClass = 'progressred' | 'progressblue' | 'progresspurple' | 'progressorange' | 'progressgreen';

type SkillItem = {
  key: SkillKey;
  label: string;
  percent: string;
  colorClass: SkillColorClass;
  order: number;
};

@Component({
  selector: 'app-competences',
  imports: [],
  templateUrl: './competences.html',
  styleUrl: './competences.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Competences implements OnInit, OnDestroy {
  readonly skills: SkillItem[] = [
    { key: 'front', label: 'HTML5/CSS/JS', percent: '80%', colorClass: 'progressred', order: 1 },
    { key: 'back', label: 'Java/PHP/SQL', percent: '50%', colorClass: 'progressblue', order: 2 },
    { key: 'angular', label: 'AngularCLI/Angular', percent: '80%', colorClass: 'progresspurple', order: 3 },
    { key: 'games', label: 'C#/C++', percent: '85%', colorClass: 'progressorange', order: 4 },
    { key: 'python', label: 'Python', percent: '100%', colorClass: 'progressgreen', order: 5 },
  ];

  displayedPercents: Record<SkillKey, string> = {
    front: '',
    back: '',
    angular: '',
    games: '',
    python: '',
  };

  private timeoutIds: number[] = [];

  ngOnInit(): void {
    const delay = 700;
    const baseDelay = 4;

    this.skills.forEach((skill, index) => {
      const timeoutId = window.setTimeout(() => {
        this.displayedPercents[skill.key] = skill.percent;
      }, delay * (baseDelay + index));

      this.timeoutIds.push(timeoutId);
    });
  }

  ngOnDestroy(): void {
    this.timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
  }
}
