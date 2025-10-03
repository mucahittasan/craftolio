import * as z from 'zod';

export const experienceSchema = z
  .object({
    id: z.string(),
    jobTitle: z.string(),
    company: z.string(),
    startDate: z.date().nullish(),
    endDate: z.date().nullish(),
    description: z.string().nullish(),
  })
  .superRefine((data, ctx) => {
    const isTouched =
      data.jobTitle?.trim() ||
      data.company?.trim() ||
      data.description?.trim() ||
      data.startDate ||
      data.endDate;

    if (isTouched) {
      if (!data.jobTitle?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Job title is required',
          path: ['jobTitle'],
        });
      }
      if (!data.company?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Company is required',
          path: ['company'],
        });
      }
      if (!data.startDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Start date is required',
          path: ['startDate'],
        });
      }
    }
  });

export const experienceFormSchema = z.object({
  experiences: z.array(experienceSchema),
});
