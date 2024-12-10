const navigation = {
  main: [
    {
      name: 'TailwindCSS',
      href: 'https://tailwindcss.com/',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    },
    {
      name: 'Ant Design',
      href: 'https://ant.design/',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/antdesign/antdesign-plain.svg',
    },
  ],
}

const Footer = () => {
  return (
    <footer className="bg-gray-10">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-16 sm:py-20 lg:px-8">
        <nav
          aria-label="Footer"
          className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-base/6"
        >
          {navigation.main.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              className="text-gray-5 hover:text-white flex flex-col gap-1 items-center opacity-90 hover:opacity-100"
            >
              <img
                className="size-2 md:size-4 lg:size-8"
                alt={item.name + ' logo'}
                src={item.logo}
              />
              {item.name}
            </a>
          ))}
        </nav>
        <p className="mt-10 text-center text-base/6 text-gray-4">
          This page is using Ant Design and TailwindCSS with Ant Design preset.
        </p>
      </div>
    </footer>
  )
}

export { Footer }
