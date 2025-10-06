import * as z from 'zod';

export const educationSchema = z
  .object({
    id: z.string(),
    school: z.string(),
    degree: z.string(),
    fieldOfStudy: z.string().nullish(),
    location: z.string().nullish(),
    startDate: z.date().nullish(),
    endDate: z.date().nullish(),
    description: z.string().nullish(),
  })
  .superRefine((data, ctx) => {
    const isTouched =
      data.school?.trim() ||
      data.degree?.trim() ||
      data.fieldOfStudy?.trim() ||
      data.startDate ||
      data.endDate;

    if (isTouched) {
      if (!data.school?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'School/University is required',
          path: ['school'],
        });
      }
      if (!data.degree?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Degree is required',
          path: ['degree'],
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

export const educationFormSchema = z.object({
  educations: z.array(educationSchema),
});
