export interface ISection {
  children?: React.ReactNode
  heading?: string
  headingClasses?: string
  sectionClasses?: string
  sectionInnerClasses?: string
}

export function Section({
  children,
  heading,
  headingClasses,
  sectionClasses = 'w-full gap-unit-5 md:gap-unit-8 grid',
  sectionInnerClasses = 'md:scroll-px-8 lg:scroll-px-12',
}: ISection) {
  return (
    <section className={sectionClasses}>
      {heading && <h2 className={headingClasses}>{heading}</h2>}
      <div className={sectionInnerClasses}>{children}</div>
    </section>
  )
}
