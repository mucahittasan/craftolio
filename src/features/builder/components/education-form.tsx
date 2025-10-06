'use client';

import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Education,
  usePortfolioStore,
} from '@/features/builder/store/portfolio.store';

import { SavePortfolioButton } from '@/features/builder/components/save-portfolio-button';
import { Button } from '@/features/shared/components/ui/button';
import { Input } from '@/features/shared/components/ui/input';
import { Checkbox } from '@/features/shared/components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/features/shared/components/ui/popover';
import { Calendar } from '@/features/shared/components/ui/calendar';
import {
  CalendarIcon,
  PlusCircle,
  Trash2,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Label } from '@/features/shared/components/ui/label';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { educationFormSchema } from '@/features/builder/schemas/education.schema';
import { useFormTriggerRegistry } from '@/features/shared/hooks/use-form-trigger-registry.hook';
import { useFormValidation } from '@/features/shared/hooks/use-form-validation.hook';
import { CALENDAR_CONFIG } from '@/features/builder/constants/calendar.constant';

export function EducationForm() {
  const router = useRouter();
  const {
    educations: educationsFromStore,
    updateEducation,
    addEducation,
    removeEducation,
  } = usePortfolioStore();

  const form = useForm<z.infer<typeof educationFormSchema>>({
    resolver: zodResolver(educationFormSchema),
    mode: 'onBlur',
    defaultValues: {
      educations: educationsFromStore,
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: 'educations',
  });

  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      if (educationsFromStore.length === 0) {
        const id = crypto.randomUUID();
        const newEdu = {
          id,
          school: '',
          degree: '',
          fieldOfStudy: '',
          location: '',
          startDate: undefined,
          description: '',
        };
        addEducation(newEdu);
        append(newEdu);
      } else {
        replace(educationsFromStore);
      }
    }
  }, []);

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (type === 'change' && value.educations) {
        value.educations.forEach((edu) => {
          if (edu?.id) {
            updateEducation(edu.id, edu as Education);
          }
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, updateEducation]);

  const handleAddNew = () => {
    const id = crypto.randomUUID();
    const newEdu = {
      id,
      school: '',
      degree: '',
      fieldOfStudy: '',
      location: '',
      startDate: undefined,
      description: '',
    };
    addEducation(newEdu);
    append(newEdu);
  };

  useFormTriggerRegistry('__educationFormTrigger', form.trigger);
  useFormValidation(form.trigger);

  return (
    <form id="education-form">
      <div className="space-y-8">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="relative rounded-2xl border border-black/10 bg-white/10 p-6 shadow-lg backdrop-blur-lg dark:border-white/10 dark:bg-black/10"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* School */}
              <div className="space-y-2">
                <Label>School / University</Label>
                <Input
                  {...form.register(`educations.${index}.school`)}
                  className={cn(
                    form.formState.errors.educations?.[index]?.school &&
                      'border-destructive focus-visible:ring-destructive',
                  )}
                />
                {form.formState.errors.educations?.[index]?.school && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors.educations?.[index]?.school?.message}
                  </p>
                )}
              </div>
              {/* Degree */}
              <div className="space-y-2">
                <Label>Degree</Label>
                <Input
                  {...form.register(`educations.${index}.degree`)}
                  className={cn(
                    form.formState.errors.educations?.[index]?.degree &&
                      'border-destructive focus-visible:ring-destructive',
                  )}
                />
                {form.formState.errors.educations?.[index]?.degree && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors.educations?.[index]?.degree?.message}
                  </p>
                )}
              </div>
              {/* Field of Study */}
              <div className="space-y-2">
                <Label>Field of Study (Optional)</Label>
                <Input {...form.register(`educations.${index}.fieldOfStudy`)} />
              </div>
              {/* Location */}
              <div className="space-y-2">
                <Label>Location (Optional)</Label>
                <Input
                  {...form.register(`educations.${index}.location`)}
                  placeholder="e.g., Istanbul, Turkey"
                />
              </div>
              {/* Start Date */}
              <div className="space-y-2">
                <div className="flex min-h-[28px] items-center justify-between">
                  <Label>Start Date</Label>
                </div>
                <Controller
                  control={form.control}
                  name={`educations.${index}.startDate`}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground',
                            form.formState.errors.educations?.[index]
                              ?.startDate &&
                              'border-destructive focus-visible:ring-destructive',
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          captionLayout={CALENDAR_CONFIG.CAPTION_LAYOUT}
                          selected={field.value ?? undefined}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {form.formState.errors.educations?.[index]?.startDate && (
                  <p className="text-sm font-medium text-destructive">
                    {
                      form.formState.errors.educations?.[index]?.startDate
                        ?.message
                    }
                  </p>
                )}
              </div>
              {/* End Date */}
              <div className="space-y-2">
                <div className="flex min-h-[28px] items-center justify-between">
                  <Label>End Date (Optional)</Label>
                  <div className="flex items-center space-x-2">
                    <Controller
                      control={form.control}
                      name={`educations.${index}.endDate`}
                      render={({ field }) => (
                        <>
                          <Checkbox
                            id={`present-edu-${index}`}
                            checked={field.value === null}
                            onCheckedChange={(checked: boolean) => {
                              if (checked) {
                                field.onChange(null);
                              } else {
                                field.onChange(undefined);
                              }
                            }}
                          />
                          <label
                            htmlFor={`present-edu-${index}`}
                            className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Present
                          </label>
                        </>
                      )}
                    />
                  </div>
                </div>
                <Controller
                  control={form.control}
                  name={`educations.${index}.endDate`}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          disabled={field.value === null}
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value === null ? (
                            <span>Present</span>
                          ) : field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          captionLayout={CALENDAR_CONFIG.CAPTION_LAYOUT}
                          selected={field.value ?? undefined}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>
            </div>

            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute right-4 top-4"
              onClick={() => {
                const educationId = form.getValues(`educations.${index}.id`);
                remove(index);
                removeEducation(educationId);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button type="button" variant="outline" onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Education
        </Button>
      </div>

      <div className="flex flex-col gap-3 pt-8 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard/experience')}
            className="group w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
            Back: Experience
          </Button>
          <SavePortfolioButton
            variant="secondary"
            className="w-full sm:w-auto"
          />
        </div>
        <Button
          type="button"
          onClick={() => router.push('/dashboard/projects')}
          className="group w-full sm:w-auto"
        >
          Next Step: Projects
          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </form>
  );
}
