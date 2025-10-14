import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <nav className="h-12 bg-background border-b">
        <div className="h-full flex items-center justify-between max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6 lg:px-8">
          <Logo />
          <div className="flex items-center gap-3">
            <Link href={"/login"}>
              <Button className="inline-flex">Log In</Button>
            </Link>
          </div>
        </div>
      </nav>
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-3xl">
          <Badge
            variant="secondary"
            className="rounded-full py-1 border-border"
            asChild>
            <span>
              Just released v1.0.0 <ArrowUpRight className="ml-1 size-4" />
            </span>
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:leading-[1.2] font-semibold tracking-tighter">
            Smart Production & Quality Control Dashboard
          </h1>
          <p className="mt-6 md:text-lg text-muted-foreground">
            Monitor production orders, track inspections, and ensure consistent
            product quality — all in one intuitive dashboard powered by Express &
            Next.js.
          </p>
          <div className="mt-12 flex items-center justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="rounded-full text-base">
                Go to Dashboard <ArrowUpRight className="size-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base shadow-none">
              <CirclePlay className="size-5" />
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
