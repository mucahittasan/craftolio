import { Project } from '@/features/builder/store/portfolio.store';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/features/shared/components/ui/card';
import Image from 'next/image';
import { Button } from '@/features/shared/components/ui/button';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {project.imageUrl && (
          <div className="relative mb-4 h-40 w-full">
            <Image
              src={project.imageUrl}
              alt={project.name}
              className="rounded-md object-cover"
              fill
            />
          </div>
        )}
      </CardContent>
      {project.url && (
        <CardFooter>
          <Button asChild variant="secondary" className="group">
            <Link href={project.url} target="_blank" rel="noopener noreferrer">
              View Project
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
