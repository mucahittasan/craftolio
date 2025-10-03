'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { usePortfolioStore } from '@/features/builder/store/portfolio-store';
import { SavePortfolioButton } from '@/features/builder/components/save-portfolio-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { projectFormSchema } from '@/features/builder/schemas';
import {
  useFormValidation,
  useFormTriggerRegistry,
} from '@/features/shared/hooks';

export function ProjectForm() {
  const router = useRouter();
  const {
    projects: projectsFromStore,
    updateProject,
    addProject,
    removeProject,
  } = usePortfolioStore();

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    mode: 'onBlur',
    defaultValues: {
      projects: projectsFromStore,
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: 'projects',
  });

  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      if (projectsFromStore.length === 0) {
        const id = crypto.randomUUID();
        const newProj = {
          id,
          name: '',
          description: '',
          url: '',
          imageUrl: '',
        };
        addProject(newProj);
        append(newProj);
      } else {
        replace(projectsFromStore);
      }
    }
  }, []);

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (type === 'change' && value.projects) {
        value.projects.forEach((proj) => {
          if (proj?.id) {
            updateProject(proj.id, proj);
          }
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, updateProject]);

  const handleAddNew = () => {
    const id = crypto.randomUUID();
    const newProj = {
      id,
      name: '',
      description: '',
      url: '',
      imageUrl: '',
    };
    addProject(newProj);
    append(newProj);
  };

  useFormTriggerRegistry('__projectFormTrigger', form.trigger);
  useFormValidation(form.trigger);

  return (
    <form id="project-form">
      <div className="space-y-8">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="relative rounded-2xl border border-black/10 bg-white/10 p-6 shadow-lg backdrop-blur-lg dark:border-white/10 dark:bg-black/10"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Project Name */}
              <div className="space-y-2 md:col-span-2">
                <Label>Project Name</Label>
                <Input
                  {...form.register(`projects.${index}.name`)}
                  className={cn(
                    form.formState.errors.projects?.[index]?.name &&
                      'border-destructive focus-visible:ring-destructive',
                  )}
                />
                {form.formState.errors.projects?.[index]?.name && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors.projects?.[index]?.name?.message}
                  </p>
                )}
              </div>
              {/* Description */}
              <div className="space-y-2 md:col-span-2">
                <Label>Description</Label>
                <Textarea
                  {...form.register(`projects.${index}.description`)}
                  className={cn(
                    'min-h-[100px]',
                    form.formState.errors.projects?.[index]?.description &&
                      'border-destructive focus-visible:ring-destructive',
                  )}
                />
                {form.formState.errors.projects?.[index]?.description && (
                  <p className="text-sm font-medium text-destructive">
                    {
                      form.formState.errors.projects?.[index]?.description
                        ?.message
                    }
                  </p>
                )}
              </div>
              {/* URL */}
              <div className="space-y-2">
                <Label>Project URL (Optional)</Label>
                <Input
                  {...form.register(`projects.${index}.url`)}
                  className={cn(
                    form.formState.errors.projects?.[index]?.url &&
                      'border-destructive focus-visible:ring-destructive',
                  )}
                />
                {form.formState.errors.projects?.[index]?.url && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors.projects?.[index]?.url?.message}
                  </p>
                )}
              </div>
              {/* Image URL */}
              <div className="space-y-2">
                <Label>Image URL (Optional)</Label>
                <Input
                  {...form.register(`projects.${index}.imageUrl`)}
                  className={cn(
                    form.formState.errors.projects?.[index]?.imageUrl &&
                      'border-destructive focus-visible:ring-destructive',
                  )}
                />
                {form.formState.errors.projects?.[index]?.imageUrl && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors.projects?.[index]?.imageUrl?.message}
                  </p>
                )}
              </div>
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute right-4 top-4"
              onClick={() => {
                const projectId = form.getValues(`projects.${index}.id`);
                remove(index);
                removeProject(projectId);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

        <Button type="button" variant="outline" onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Project
        </Button>
      </div>

      <div className="flex justify-between pt-8">
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard/education')}
            className="group"
          >
            <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
            Back: Education
          </Button>
          <SavePortfolioButton variant="secondary" />
        </div>
        <Button
          type="button"
          onClick={() => router.push('/dashboard/skills')}
          className="group"
        >
          Next Step: Skills
          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </form>
  );
}
