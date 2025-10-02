'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { usePortfolioStore } from '@/features/builder/store/portfolio-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Tek bir proje için Zod şeması
const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Project name is required.'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters.'),
  url: z.string().url('Please enter a valid URL.').optional().or(z.literal('')),
  imageUrl: z
    .string()
    .url('Please enter a valid image URL.')
    .optional()
    .or(z.literal('')),
});

// Formun tamamı için Zod şeması
const formSchema = z.object({
  projects: z.array(projectSchema),
});

export function ProjectForm() {
  const router = useRouter();
  const {
    projects: projectsFromStore,
    updateProject,
    addProject,
    removeProject,
  } = usePortfolioStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projects: projectsFromStore,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'projects',
  });

  // react-hook-form'daki değişiklikleri Zustand store'a senkronize et
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
    const newProject = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      url: '',
      imageUrl: '',
    };
    append(newProject);
    addProject(newProject);
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
              {/* Project Name */}
              <div className="space-y-2 md:col-span-2">
                <Label>Project Name</Label>
                <Input {...form.register(`projects.${index}.name`)} />
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.projects?.[index]?.name?.message}
                </p>
              </div>
              {/* Description */}
              <div className="space-y-2 md:col-span-2">
                <Label>Description</Label>
                <Textarea
                  {...form.register(`projects.${index}.description`)}
                  className="min-h-[100px]"
                />
                <p className="text-sm font-medium text-destructive">
                  {
                    form.formState.errors.projects?.[index]?.description
                      ?.message
                  }
                </p>
              </div>
              {/* URL */}
              <div className="space-y-2">
                <Label>Project URL (Optional)</Label>
                <Input {...form.register(`projects.${index}.url`)} />
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.projects?.[index]?.url?.message}
                </p>
              </div>
              {/* Image URL */}
              <div className="space-y-2">
                <Label>Image URL (Optional)</Label>
                <Input {...form.register(`projects.${index}.imageUrl`)} />
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.projects?.[index]?.imageUrl?.message}
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute right-4 top-4"
              onClick={() => {
                remove(index);
                removeProject(field.id);
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
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/dashboard/education')}
          className="group"
        >
          <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
          Back: Education
        </Button>
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
