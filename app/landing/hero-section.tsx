import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import AppImage from "@/public/original-b138fe6a93e602fdbd56215e1771dac3.webp";
import Image from "next/image";
export default function HeroSection() {
  return (
    <section>
      <div className="relative pt-24 md:pt-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
            <Link
              href="#link"
              className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
            >
              <span className="text-foreground text-sm font-semibold">
                Track your healing journey 📈🩺
              </span>
              <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

              <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                  <span className="flex size-6">
                    <ArrowRight className="m-auto size-3" />
                  </span>
                  <span className="flex size-6">
                    <ArrowRight className="m-auto size-3" />
                  </span>
                </div>
              </div>
            </Link>

            {/* preset="fade-in-blur" speedSegment={0.3} */}
            <div className="flex flex-col gap-2">
              <div className="text-balance text-5xl font-semibold md:text-7xl lg:mt-10 xl:text-6xl  flex gap-2 justify-center items-center">
                <span>Revolutionizing</span>
                <span className="bg-neutral-950 rounded-full py-2 px-8 text-white">
                  Recovery
                </span>
              </div>
              <div className="text-balance text-5xl font-semibold md:text-7xl  xl:text-6xl ">
                for Athletic Excellence
              </div>
            </div>
            {/* preset="fade-in-blur" speedSegment={0.3} */}

            <div className="mx-auto mt-8 max-w-2xl text-balance text-lg font-normal">
              A smart recovery companion built for athletes and rehab
              specialists. Recovery Ally helps you stay on track with Healing,
              Progress, and Performance.
            </div>

            <div className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row">
              <div key={1} className="bg-foreground/10 rounded-sm border p-0.5">
                <Button asChild size="lg" className="rounded-sm px-5 text-base">
                  <Link href="#link">
                    <span className="text-nowrap">Get Started</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
          <div
            aria-hidden
            className="bg-linear-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
          />
          <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto w-10/12 overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
            <Image
              className="bg-background aspect-15/8 relative hidden rounded-2xl dark:block"
              src={AppImage}
              alt="app screen"
              width="2700"
              height="1440"
            />
            <Image
              className="z-2 border-border/25  relative rounded-2xl border dark:hidden object-cover"
              src={AppImage}
              alt="app screen"
              width="2700"
              height="1440"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
