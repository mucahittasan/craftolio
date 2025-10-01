import { Header } from '@/src/features/landing/components/header';

export default function HomePage() {
  return (
    <div>
      <Header />
      <section className="container mx-auto flex min-h-[calc(100vh-56px)] flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold tracking-tighter md:text-6xl lg:text-7xl">
          Build Your Professional Portfolio in Minutes
        </h1>
        <p className="text-muted-foreground mt-4 max-w-[700px] text-lg">
          Craftolio is an AI-powered portfolio builder that helps you create a
          stunning, professional online presence effortlessly.
        </p>
      </section>
    </div>
  );
}
