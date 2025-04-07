import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import AppImage from "@/public/original-b138fe6a93e602fdbd56215e1771dac3.webp";
import Image from "next/image";
export default function LandingMain() {
//   const features = [
//     {
//       icon: "🔄",
//       title: "Drag & Drop",
//       description:
//         "Effortlessly move tasks between columns using an intuitive drag-and-drop interface.",
//     },
//     {
//       icon: "📝",
//       title: "Customizable",
//       description:
//         "Create, rename, and delete columns to match your workflow. Add task descriptions, labels, and more.",
//     },
//     {
//       icon: "📌",
//       title: "Task Prioritization & Labels",
//       description:
//         "Categorize tasks with labels and set priority levels (e.g., High, Medium, Low) to stay organized.",
//     },
//     {
//       icon: "🕒",
//       title: "Due Dates",
//       description:
//         "Set deadlines for tasks and receive timely reminders so nothing slips through the cracks.",
//     },
//     {
//       icon: "📂",
//       title: "File Attachments",
//       description:
//         "Attach files, images, or documents to tasks for easy reference.",
//     },
//     {
//       icon: "🔍",
//       title: "Advanced Search",
//       description:
//         "Quickly find tasks by keywords, labels, due dates, or assigned team members.",
//     },
//   ];
  return (
    <main className={`overflow-hidden  w-full`}>
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
                <div
                  key={1}
                  className="bg-foreground/10 rounded-sm border p-0.5"
                >
                  <Button
                    asChild
                    size="lg"
                    className="rounded-sm px-5 text-base"
                  >
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
            <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
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

      {/* <section className="  flex justify-center mb-20">
        <div className=" w-9/12  flex flex-col gap-20">
          <div className="text-center">
            <h2 className="text-balance text-4xl font-medium lg:text-5xl">
              Built to cover your needs
            </h2>
            <p className="mt-4">Work smarter in every way.</p>
          </div>
          <div className="relative mx-auto grid max-w-[90rem] divide-x divide-y border *:p-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div>{Icon}</div>
                  <h3 className="text-base font-medium">{title}</h3>
                </div>
                <p className="text-sm text-neutral-500 font-medium">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      {/* <section className="py-16 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto max-w-2xl space-y-6 text-center">
            <h1 className="text-center text-4xl font-medium lg:text-5xl">
              Pricing that Scales with You
            </h1>
            <p>
              Gemini is evolving to be more than just the models. It supports an
              entire to the APIs and platforms helping developers and businesses
              innovate.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-5 md:gap-0">
            <div className="rounded-md flex flex-col justify-between space-y-8 border p-6 md:col-span-2 md:my-4 md:rounded-r-none md:border-r-0 lg:p-10">
              <div className="space-y-4">
                <div>
                  <h2 className="font-medium">Free</h2>
                  <span className="my-3 block text-2xl font-medium">
                    $0 / mo
                  </span>
                  <p className="text-muted-foreground text-sm">Per editor</p>
                </div>

                <Button asChild variant="outline" className="w-full">
                  <Link href="">Get Started</Link>
                </Button>

                <ul className="list-outside space-y-3 text-sm">
                  {[
                    "Basic Kanban Board",
                    "Up to 3 Boards",
                    "Basic Task Management",
                    "File Attachments (Limited) ",
                    "Basic Search & Filters",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="size-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="dark:bg-background rounded-md border p-6 shadow-lg shadow-gray-950/5 md:col-span-3 lg:p-10 dark:[--color-muted:var(--color-zinc-900)]">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <div>
                    <h2 className="font-medium">Pro</h2>
                    <span className="my-2 block text-2xl font-medium">
                      $19 / mo
                    </span>
                    <p className="text-muted-foreground text-sm">Per editor</p>
                  </div>

                  <Button asChild className="w-full">
                    <Link href="">Get Started</Link>
                  </Button>
                </div>

                <ul className="mt-4 list-outside space-y-3 text-sm">
                  {[
                    "Everything in Free Plan",
                    "Unlimited Boards & Tasks",
                    "Advanced Search & Filters",
                    "Real-Time Collaboration",
                    "File Attachments (Larger Storage)",
                    "Custom Labels & Task Prioritization",
                    "Due Date Reminders & Notifications",
                    "Board Analytics & Reports",
                    "Monthly Product Updates",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="size-3" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section className="px-20">
        <div className="w-full flex justify-between  text-secondary-text text-sm pt-6  pb-2 border-t mt-20">
          <div className=" h-32 w-max">
            <div className="text-xl  font-semibold font-Poppins ">
              Recovery Ally
            </div>
            <div className="text-muted-foreground text-sm font-medium">
              Revolutionizing Recovery for Athletic Excellence
            </div>
          </div>
          <div className=" w-max font-medium">
            © 2025 Recovery Ally. All rights reserved
          </div>
        </div>
      </section>
    </main>
  );
}
