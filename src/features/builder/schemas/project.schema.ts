import * as z from 'zod';

export const projectSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    url: z.string().nullish().or(z.literal('')),
    githubUrl: z.string().nullish().or(z.literal('')),
    imageUrl: z.string().nullish().or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    const isTouched =
      data.name?.trim() ||
      data.description?.trim() ||
      data.url?.trim() ||
      data.githubUrl?.trim() ||
      data.imageUrl?.trim();

    if (isTouched) {
      if (!data.name?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Project name is required',
          path: ['name'],
        });
      }
      if (!data.description?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Description is required',
          path: ['description'],
        });
      }

      // URL validation
      if (data.url?.trim() && data.url !== '') {
        try {
          new URL(data.url);
        } catch {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Please enter a valid URL',
            path: ['url'],
          });
        }
      }

      // GitHub URL validation
      if (data.githubUrl?.trim() && data.githubUrl !== '') {
        try {
          new URL(data.githubUrl);
        } catch {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Please enter a valid GitHub URL',
            path: ['githubUrl'],
          });
        }
      }

      if (data.imageUrl?.trim() && data.imageUrl !== '') {
        try {
          new URL(data.imageUrl);
        } catch {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Please enter a valid image URL',
            path: ['imageUrl'],
          });
        }
      }
    }
  });

export const projectFormSchema = z.object({
  projects: z.array(projectSchema),
});
