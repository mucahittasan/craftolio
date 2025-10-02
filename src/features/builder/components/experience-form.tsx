'use client';

import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  usePortfolioStore,
  Experience,
} from '@/features/builder/store/portfolio-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Tek bir deneyim için Zod şeması
const experienceSchema = z.object({
  id: z.string(),
  jobTitle: z.string().min(2, 'Job title is required.'),
  company: z.string().min(2, 'Company name is required.'),
  startDate: z.date({ error: 'Start date is required.' }),
  endDate: z.date().optional(),
  description: z.string().optional(),
});

// Formun tamamı için Zod şeması (deneyimler dizisi)
const formSchema = z.object({
  experiences: z.array(experienceSchema),
});

export function ExperienceForm() {
  const router = useRouter();
  const {
    experiences: experiencesFromStore,
    updateExperience,
    addExperience,
    removeExperience,
  } = usePortfolioStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experiences: experiencesFromStore,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'experiences',
  });

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
    const newExperience = {
      id: crypto.randomUUID(),
      jobTitle: '',
      company: '',
      startDate: new Date(),
      description: '',
    };
    append(newExperience);
    addExperience(newExperience);
  };

  return (
    <form>
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
                <Input {...form.register(`experiences.${index}.jobTitle`)} />
                <p className="text-sm font-medium text-destructive">
                  {
                    form.formState.errors.experiences?.[index]?.jobTitle
                      ?.message
                  }
                </p>
              </div>
              {/* Company */}
              <div className="space-y-2">
                <Label>Company</Label>
                <Input {...form.register(`experiences.${index}.company`)} />
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.experiences?.[index]?.company?.message}
                </p>
              </div>
              {/* Start Date */}
              <div className="space-y-2">
                <Label>Start Date</Label>
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
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                <p className="text-sm font-medium text-destructive">
                  {
                    form.formState.errors.experiences?.[index]?.startDate
                      ?.message
                  }
                </p>
              </div>
              {/* End Date */}
              <div className="space-y-2">
                <Label>End Date (Optional)</Label>
                <Controller
                  control={form.control}
                  name={`experiences.${index}.endDate`}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground',
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
                          selected={field.value}
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
                remove(index); // Form'dan kaldır
                removeExperience(field.id); // Zustand'dan kaldır
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
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/dashboard')}
          className="group"
        >
          <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
          Back: Profile
        </Button>
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
