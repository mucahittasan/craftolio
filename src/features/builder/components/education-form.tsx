'use client';

import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { usePortfolioStore } from '@/features/builder/store/portfolio-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

// Tek bir eğitim için Zod şeması
const educationSchema = z.object({
  id: z.string(),
  school: z.string().min(2, 'School name is required.'),
  degree: z.string().min(2, 'Degree is required.'),
  fieldOfStudy: z.string().optional(),
  startDate: z.date({ error: 'Start date is required.' }),
  endDate: z.date().optional(),
});

// Formun tamamı için Zod şeması
const formSchema = z.object({
  educations: z.array(educationSchema),
});

export function EducationForm() {
  const router = useRouter();
  const {
    educations: educationsFromStore,
    updateEducation,
    addEducation,
    removeEducation,
  } = usePortfolioStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      educations: educationsFromStore,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'educations',
  });

  // react-hook-form'daki değişiklikleri Zustand store'a senkronize et
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (type === 'change' && value.educations) {
        value.educations.forEach((edu) => {
          if (edu?.id) {
            updateEducation(edu.id, edu);
          }
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, updateEducation]);

  const handleAddNew = () => {
    const newEducation = {
      id: crypto.randomUUID(),
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: new Date(),
    };
    append(newEducation);
    addEducation(newEducation);
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
              {/* School */}
              <div className="space-y-2">
                <Label>School / University</Label>
                <Input {...form.register(`educations.${index}.school`)} />
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.educations?.[index]?.school?.message}
                </p>
              </div>
              {/* Degree */}
              <div className="space-y-2">
                <Label>Degree</Label>
                <Input {...form.register(`educations.${index}.degree`)} />
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.educations?.[index]?.degree?.message}
                </p>
              </div>
              {/* Field of Study */}
              <div className="space-y-2 md:col-span-2">
                <Label>Field of Study (Optional)</Label>
                <Input {...form.register(`educations.${index}.fieldOfStudy`)} />
              </div>
              {/* Start Date */}
              <div className="space-y-2">
                <Label>Start Date</Label>
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
                    form.formState.errors.educations?.[index]?.startDate
                      ?.message
                  }
                </p>
              </div>
              {/* End Date */}
              <div className="space-y-2">
                <Label>End Date (Optional)</Label>
                <Controller
                  control={form.control}
                  name={`educations.${index}.endDate`}
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
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute right-4 top-4"
              onClick={() => {
                remove(index);
                removeEducation(field.id);
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

      <div className="flex justify-between pt-8">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/dashboard/experience')}
          className="group"
        >
          <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
          Back: Experience
        </Button>
        <Button
          type="button"
          onClick={() => router.push('/dashboard/projects')}
          className="group"
        >
          Next Step: Projects
          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </form>
  );
}
