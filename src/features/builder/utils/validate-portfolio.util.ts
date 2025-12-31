import { usePortfolioStore } from '@/features/builder/store/portfolio.store';

export type ValidationError = {
  section: 'profile' | 'experience' | 'education' | 'projects' | 'skills';
  message: string;
  fields: string[];
};

export function validatePortfolio(): ValidationError[] {
  const state = usePortfolioStore.getState();
  const errors: ValidationError[] = [];

  if (!state.profile.title?.trim()) {
    errors.push({
      section: 'profile',
      message: 'Title is required',
      fields: ['title'],
    });
  }
  if (!state.profile.bio?.trim()) {
    errors.push({
      section: 'profile',
      message: 'Bio is required',
      fields: ['bio'],
    });
  }

  state.experiences.forEach((exp, index) => {
    const isTouched =
      exp.jobTitle?.trim() ||
      exp.company?.trim() ||
      exp.description?.trim() ||
      exp.startDate ||
      exp.endDate;

    if (!isTouched) return;

    const expErrors: string[] = [];

    if (!exp.jobTitle?.trim()) {
      expErrors.push('Job Title');
    }
    if (!exp.company?.trim()) {
      expErrors.push('Company');
    }
    if (!exp.startDate) {
      expErrors.push('Start Date');
    }

    if (expErrors.length > 0) {
      errors.push({
        section: 'experience',
        message: `Experience #${index + 1}: ${expErrors.join(', ')} required`,
        fields: expErrors,
      });
    }
  });

  state.educations.forEach((edu, index) => {
    const isTouched =
      edu.school?.trim() ||
      edu.degree?.trim() ||
      edu.fieldOfStudy?.trim() ||
      edu.startDate ||
      edu.endDate;

    if (!isTouched) return;

    const eduErrors: string[] = [];

    if (!edu.school?.trim()) {
      eduErrors.push('School/University');
    }
    if (!edu.degree?.trim()) {
      eduErrors.push('Degree');
    }
    if (!edu.startDate) {
      eduErrors.push('Start Date');
    }

    if (eduErrors.length > 0) {
      errors.push({
        section: 'education',
        message: `Education #${index + 1}: ${eduErrors.join(', ')} required`,
        fields: eduErrors,
      });
    }
  });

  state.projects.forEach((proj, index) => {
    const isTouched =
      proj.name?.trim() ||
      proj.description?.trim() ||
      proj.url?.trim() ||
      proj.imageUrl?.trim();

    if (!isTouched) return;

    const projErrors: string[] = [];

    if (!proj.name?.trim()) {
      projErrors.push('Project Name');
    }
    if (!proj.description?.trim()) {
      projErrors.push('Description');
    }

    if (projErrors.length > 0) {
      errors.push({
        section: 'projects',
        message: `Project #${index + 1}: ${projErrors.join(', ')} required`,
        fields: projErrors,
      });
    }
  });

  if (state.skills.length === 0) {
    errors.push({
      section: 'skills',
      message: 'At least one skill is required',
      fields: ['skills'],
    });
  }

  return errors;
}

export function groupErrorsBySection(errors: ValidationError[]) {
  return errors.reduce(
    (acc, error) => {
      if (!acc[error.section]) {
        acc[error.section] = [];
      }
      acc[error.section].push(error);
      return acc;
    },
    {} as Record<string, ValidationError[]>,
  );
}

export function getSectionRoute(section: ValidationError['section']): string {
  const routes = {
    profile: '/dashboard',
    experience: '/dashboard/experience',
    education: '/dashboard/education',
    projects: '/dashboard/projects',
    skills: '/dashboard/skills',
  };
  return routes[section];
}
