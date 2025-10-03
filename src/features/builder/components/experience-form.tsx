'use client';

import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  usePortfolioStore,
  Experience,
} from '@/features/builder/store/portfolio-store';
import { experienceFormSchema } from '@/features/builder/schemas';
import { CALENDAR_CONFIG } from '@/features/builder/constants';
import {
  useFormTriggerRegistry,
  useFormValidation,
} from '@/features/shared/hooks';
import { SavePortfolioButton } from '@/features/builder/components/save-portfolio-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  CalendarIcon,
  PlusCircle,
  Trash2,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export function ExperienceForm() {
  const router = useRouter();
  const {
    experiences: experiencesFromStore,
    updateExperience,
    addExperience,
    removeExperience,
  } = usePortfolioStore();

  const form = useForm<z.infer<typeof experienceFormSchema>>({
    resolver: zodResolver(experienceFormSchema),
    mode: 'onBlur',
    defaultValues: {
      experiences: experiencesFromStore,
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: 'experiences',
  });

  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      if (experiencesFromStore.length === 0) {
        const id = crypto.randomUUID();
        const newExp = {
          id,
          jobTitle: '',
          company: '',
          startDate: undefined,
          description: '',
        };
        addExperience(newExp);
        append(newExp);
      } else {
        replace(experiencesFromStore);
      }
    }
  }, []);

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (type === 'change' && value.experiences) {
        value.experiences.forEach((exp) => {
          if (exp?.id) {
            updateExperience(exp.id, exp as Experience);
          }
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, updateExperience]);

  const handleAddNew = () => {
    const id = crypto.randomUUID();
    const newExp = {
      id,
      jobTitle: '',
      company: '',
      startDate: undefined,
      description: '',
    };
    addExperience(newExp);
    append(newExp);
  };

  useFormTriggerRegistry('__experienceFormTrigger', form.trigger);
  useFormValidation(form.trigger);

  return (
    <form id="experience-form">
      <div className="space-y-8">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="relative rounded-2xl border border-black/10 bg-white/10 p-6 shadow-lg backdrop-blur-lg dark:border-white/10 dark:bg-black/10"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Job Title */}
              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input
                  {...form.register(`experiences.${index}.jobTitle`)}
                  className={cn(
                    form.formState.errors.experiences?.[index]?.jobTitle &&
                      'border-destructive focus-visible:ring-destructive',
                  )}
                />
                {form.formState.errors.experiences?.[index]?.jobTitle && (
                  <p className="text-sm font-medium text-destructive">
                    {
                      form.formState.errors.experiences?.[index]?.jobTitle
                        ?.message
                    }
                  </p>
                )}
              </div>
              {/* Company */}
              <div className="space-y-2">
                <Label>Company</Label>
                <Input
                  {...form.register(`experiences.${index}.company`)}
                  className={cn(
                    form.formState.errors.experiences?.[index]?.company &&
                      'border-destructive focus-visible:ring-destructive',
                  )}
                />
                {form.formState.errors.experiences?.[index]?.company && (
                  <p className="text-sm font-medium text-destructive">
                    {
                      form.formState.errors.experiences?.[index]?.company
                        ?.message
                    }
                  </p>
                )}
              </div>
              {/* Start Date */}
              <div className="space-y-2">
                <div className="flex min-h-[28px] items-center justify-between">
                  <Label>Start Date</Label>
                </div>
                <Controller
                  control={form.control}
                  name={`experiences.${index}.startDate`}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground',
                            form.formState.errors.experiences?.[index]
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
                {form.formState.errors.experiences?.[index]?.startDate && (
                  <p className="text-sm font-medium text-destructive">
                    {
                      form.formState.errors.experiences?.[index]?.startDate
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
                      name={`experiences.${index}.endDate`}
                      render={({ field }) => (
                        <>
                          <Checkbox
                            id={`present-${index}`}
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
                            htmlFor={`present-${index}`}
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
                  name={`experiences.${index}.endDate`}
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
            {/* Description */}
            <div className="mt-4 space-y-2">
              <Label>Description (Optional)</Label>
              <Textarea
                {...form.register(`experiences.${index}.description`)}
                className="min-h-[100px]"
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute right-4 top-4"
              onClick={() => {
                const experienceId = form.getValues(`experiences.${index}.id`);
                remove(index);
                removeExperience(experienceId);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button type="button" variant="outline" onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Experience
        </Button>
      </div>

      <div className="flex justify-between pt-8">
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard')}
            className="group"
          >
            <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
            Back: Profile
          </Button>
          <SavePortfolioButton variant="secondary" />
        </div>
        <Button
          type="button"
          onClick={() => router.push('/dashboard/education')}
          className="group"
        >
          Next Step: Education
          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </form>
  );
}
