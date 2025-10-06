'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { usePortfolioStore } from '@/features/builder/store/portfolio.store';
import { SavePortfolioButton } from '@/features/builder/components/save-portfolio-button';
import { Button } from '@/features/shared/components/ui/button';
import { Input } from '@/features/shared/components/ui/input';
import { PlusCircle, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Label } from '@/features/shared/components/ui/label';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { projectFormSchema } from '@/features/builder/schemas/project.schema';
import { useFormTriggerRegistry } from '@/features/shared/hooks/use-form-trigger-registry.hook';
import { useFormValidation } from '@/features/shared/hooks/use-form-validation.hook';
import { RichTextEditor } from '@/features/shared/components/ui/rich-text-editor';

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
          githubUrl: '',
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
      githubUrl: '',
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
                <RichTextEditor
                  value={form.watch(`projects.${index}.description`) || ''}
                  onChange={(value: string) => {
                    form.setValue(`projects.${index}.description`, value, {
                      shouldDirty: true,
                      shouldTouch: true,
                    });
                    const projectId = form.getValues(`projects.${index}.id`);
                    if (projectId) {
                      updateProject(projectId, { description: value });
                    }
                  }}
                  placeholder="Describe your project..."
                  error={!!form.formState.errors.projects?.[index]?.description}
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
                  placeholder="https://your-project.com"
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
              {/* GitHub URL */}
              <div className="space-y-2">
                <Label>GitHub URL (Optional)</Label>
                <Input
                  {...form.register(`projects.${index}.githubUrl`)}
                  placeholder="https://github.com/username/repo"
                  className={cn(
                    form.formState.errors.projects?.[index]?.githubUrl &&
                      'border-destructive focus-visible:ring-destructive',
                  )}
                />
                {form.formState.errors.projects?.[index]?.githubUrl && (
                  <p className="text-sm font-medium text-destructive">
                    {
                      form.formState.errors.projects?.[index]?.githubUrl
                        ?.message
                    }
                  </p>
                )}
              </div>
              {/* Image URL */}
              <div className="space-y-2">
                <Label>Image URL (Optional)</Label>
                <Input
                  {...form.register(`projects.${index}.imageUrl`)}
                  placeholder="https://example.com/project-image.jpg"
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

      <div className="flex flex-col gap-3 pt-8 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard/education')}
            className="group w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
            Back: Education
          </Button>
          <SavePortfolioButton
            variant="secondary"
            className="w-full sm:w-auto"
          />
        </div>
        <Button
          type="button"
          onClick={() => router.push('/dashboard/skills')}
          className="group w-full sm:w-auto"
        >
          Next Step: Skills
          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </form>
  );
}
