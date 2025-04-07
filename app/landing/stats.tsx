
export default function StatsSection() {
  const stats = [
    {
      title: "Plans Completed",
      stat: "250+",
      description:
        "Over 250 recovery plans successfully completed by our early users.",
    },
    {
      title: "Patient Satisfaction",
      stat: "88%",
      description:
        "88% of patients reported feeling more supported during their recovery journey.",
    },
    {
      title: "Active Patients",
      stat: "150+",
      description:
        "More than 150 patients are currently engaging with their recovery plans.",
    },
    {
      title: "Therapists Onboarded",
      stat: "20+",
      description:
        "20+ verified therapists have joined to provide quality care and guidance.",
    },
  ];
  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
              <div className="grid gap-0.5 *:text-center md:grid-cols-4 dark:[--color-muted:var(--color-zinc-900)]">
          {stats.map((data) => {
            return (
              <div className="bg-muted rounded-(--radius) space-y-4 py-12">
                <div className="text-5xl font-bold">{data.stat}</div>
                <p className="font-medium">{data.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
