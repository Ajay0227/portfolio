// All copy and media below comes from Ajay's current portfolio (ajay02.framer.website).
// Highlight syntax: wrap words in *asterisks* to render them in the strong/dark color.

const img = (name: string) => `/images/${name}`

export const links = {
  // served from public/doc
  resume: '/doc/Ajay.pdf',
  calendly: 'https://calendly.com/ajay2manoharan/30min',
  email: 'ajay2manoharan@gmail.com',
  emailCompose:
    'https://mail.google.com/mail/u/0/?fs=1&to=ajay2manoharan@gmail.com&su=Let%27s+Work+Together&body=HeyAjay,%0D%0A%0D%0AI+was+checking+out+your+stuff+and+thought+%E2%80%94+why+not+just+say+hi?+So+here+I+am.%0D%0A%0D%0ALet%27s+chat+about+making+something+awesome.%0D%0A%0D%0A(+Hello+there+stranger+-+I+was+going+to+add+a+design+joke+here,+but+I%E2%80%99m+still+working+on+the+final+draft%F0%9F%99%82+)&tf=cm',
}

export const brand = {
  name: 'Ajay',
  wordmark: 'AJAY',
  role: 'Web Designer',
  avatar: img('avatar.jpg'),
  avatarAlt: img('avatar-footer.jpg'),
}

export const hero = {
  users: [img('user-1.jpg'), img('user-2.jpg'), img('user-3.jpg'), img('user-4.jpg')],
  proof: 'No fluff. *Just stuff that works*',
  clients: { count: '50+', label: 'happy clients' },
  title: {
    before: 'From a kid who loved the',
    accent1: 'internet',
    middle: 'to a man',
    accent2: 'building for it.',
  },
  lead: 'I design, write, and build things that don’t just look good — *they get results*. Employers call it *“value.”* Founders call it *“ROI.”* I call it *my job*.',
  cta: 'Explore works',
  shadow: img('hero-shadow.png'),
}

export const about = {
  label: 'About Me',
  title: ['I’m', 'Ajay'],
  lead: 'A web designer who makes *pixels behave* and websites actually *feel human*. I mix design brains with front-end muscle, so every project gets a balance of creativity, strategy, and just the right amount of *caffeine*.',
  stats: [
    {
      value: '3+',
      label: 'Years',
      note: '3.7 Actually! Yes, I could round it up to 4, but hey! honesty builds trust (and also makes me sound oddly precise).',
    },
    {
      value: '100+',
      label: 'Projects',
      note: 'From clean one-pagers to beast-level custom builds shipped, launched, and still alive on the internet.',
    },
    {
      value: '50+',
      label: 'Happy clients',
      note: 'Some keep coming back so often I’m practically on their payroll (without the HR meetings).',
    },
    {
      value: '99%',
      label: 'Satisfaction',
      note: 'Still chasing that 1% probably someone who wanted their site to look like a MySpace revival.',
    },
  ],
  quote: '“No fluff. Just *stuff that works*.”',
  cta: 'About me',
}

export type Project = {
  slug: string
  title: string
  subtitle: string
  tags: string[]
  client: string
  year?: string
  href: string
  screen: string
  video?: string
  device: 'laptop' | 'float'
  shots: string[]
}

export const projectsIntro = {
  giant: 'Projects',
  outro: 'Projects that are done enough to *brag about* — but still evolving in my head.',
  cta: 'View Resume',
}

export const projects: Project[] = [
  {
    slug: 'leave-module',
    title: 'Leave Module',
    subtitle: 'Revamped Leave Module: A Case Study',
    tags: ['HRMS', 'Redesign', 'User research', 'Web Application', 'Mobile App'],
    client: 'Budgie',
    year: '2023',
    href: 'https://ajay02.framer.website/leave_management',
    screen: img('leave-cover.png'),
    device: 'laptop',
    shots: [img('leave-1.png'), img('leave-2.png'), img('leave-3.png')],
  },
  {
    slug: 'ck-bakery',
    title: 'Ck’s Bakery',
    subtitle: 'Scanning Their Way to Success',
    tags: ['Web & app design', 'User testing', 'Prototyping', 'QR Menu'],
    client: 'CK’s Bakery',
    href: 'https://ajay02.framer.website/ck_bakery',
    screen: img('bakery-cover.webp'),
    device: 'float',
    shots: [img('bakery-1.png'), img('bakery-2.png'), img('bakery-3.png')],
  },
  {
    slug: 'orange-ai',
    title: 'Orange Ai',
    subtitle: 'Revolutionizing Business Insights with LLMs',
    tags: ['Ai', 'Custom Ai', 'Product Design'],
    client: 'Orange AI',
    href: 'https://ajay02.framer.website/orange_ai',
    screen: img('orange-cover.jpg'),
    video: 'https://framerusercontent.com/assets/DEJ9jfX8J54ICbmQpvw2dxhjtKs.mp4',
    device: 'laptop',
    shots: [img('orange-1.png'), img('orange-2.png'), img('orange-3.png')],
  },
]

export const lab = {
  giant: 'AJAY LAB',
  hands: { left: img('hand-left.png'), right: img('hand-right.png') },
  phrases: [
    'Not just pretty, but purposeful.',
    'Words that get people to care.',
    'Build a vibe, not just a logo.',
    'No fluff. Just stuff that works.',
  ],
}

export const services = {
  label: 'Services',
  title: [
    [{ t: 'What' }],
    [{ t: 'I', accent: true }, { t: ' Do' }],
  ],
  lead: 'Here’s what I *actually do* (besides making jokes in *website copy*).',
  items: [
    {
      title: 'Design That Works',
      body: 'Not just pretty, but purposeful. Because aesthetics without impact is just wall art.',
      image: img('service-design.webp'),
    },
    {
      title: 'Copy That Converts',
      body: 'Words that get people to care, click, and commit (without sounding like a robot).',
      image: img('service-copy.webp'),
    },
    {
      title: 'Branding That Sticks',
      body: 'Build a vibe, not just a logo. Something founders love and customers remember.',
      image: img('service-brand.png'),
    },
  ],
  outro: 'Looking for a designer who’ll actually get your *weird ideas*?',
  cta: 'Let’s Talk',
}

export const process = {
  label: 'Process',
  title: [
    [{ t: 'How do I' }],
    [{ t: 'Do it', accent: true }],
  ],
  lead: 'My work involves many *intricate steps* and stages. Here’s *how I do it*.',
  steps: [
    {
      title: 'Stare at the Problem',
      body: 'I don’t just look — I study it. What went wrong? Who hurt you?',
      image: img('process-1.jpg'),
    },
    {
      title: 'Become a Detective',
      aside: '(Minus the Trench Coat... for now)',
      body: 'Interviews, heatmaps, competitor creeping — I gather clues until the user’s behavior makes sense.',
      image: img('process-2.jpg'),
    },
    {
      title: 'Channel My Inner Therapist',
      body: '“So what I’m hearing is... the real issue is trust.” I boil all that juicy chaos into a single, soul-searching problem statement.',
      image: img('process-3.png'),
    },
    {
      title: 'Throw Ideas at the Wall',
      body: 'Wild sketches. Bad puns. Sticky notes on sticky notes. Not everything sticks, but the good stuff always finds a way.',
      image: img('process-4.jpg'),
    },
    {
      title: 'Design Like I’m on a Netflix Reality Show',
      aside: '* Depends on your wishes',
      body: 'Drama-free pixels. Satisfying flows. Clean UI that even your grandma could use. Basically, hot interfaces and good decisions.',
      image: img('process-5.jpg'),
    },
    {
      title: 'Pass the Torch, But Don’t Vanish',
      body: 'Handoff to dev with all the assets, specs, and Slack-ready dad jokes. I don’t disappear after Figma says “done.”',
      image: img('process-6.jpg'),
    },
    {
      title: 'Stalk It Post-Launch',
      body: 'I watch it in the wild. Are users thriving? Rage-clicking? I iterate till the product feels like butter on toast.',
      image: img('process-7.jpg'),
    },
  ],
  outro: '“Be kind whenever possible. *It is always possible*.”',
  cta: 'Know a lil bit about me',
}

export const testimonials = {
  giant: 'Good Words',
  quote: {
    text: 'Ajay is a great guy to work with smart, reliable, and genuinely an interesting character. He makes projects fun without losing focus, and that balance is rare to find in design partners.',
    name: 'Pulkit Saini',
    role: 'Founder- Rawcanvas',
    avatar: img('pulkit.png'),
  },
  trusted: {
    text: 'Trusted by many — 50+ happy clients and 100+ projects shipped, launched, and still alive on the internet.',
    title: 'Trusted by many',
    role: '100+ projects completed',
    avatars: [img('trusted-1.png'), img('trusted-2.png'), img('trusted-3.png'), img('trusted-4.png')],
  },
}

export const blog = {
  label: 'Blog',
  title: [
    [{ t: 'Posts too shy' }],
    [{ t: 'for LinkedIn', accent: true }],
  ],
  lead: 'This might be a banger post for LinkedIn… but I’d rather just keep it *between us few*.',
  intro: 'Think of it as the VIP section for my half-baked thoughts, creative rants, and maybe even a good idea or two.',
  posts: [
    {
      title: 'The End of Need Is the End of Value',
      tag: 'Life story',
      date: 'April 15, 2025',
      image: img('blog-1.png'),
      href: 'https://ajay02.framer.website/blog_1',
    },
    {
      title: 'Life in Black, White, and Grey',
      tag: 'Life Story',
      date: 'May 05, 2025',
      image: img('blog-2.png'),
      href: 'https://ajay02.framer.website/blog_2',
    },
    {
      title: 'Letting go to grow',
      tag: 'Life Story',
      date: 'March 25, 2025',
      image: img('blog-3.png'),
      href: 'https://ajay02.framer.website/blog_3',
    },
  ],
  outro: 'Creative rants, and maybe even *a good idea or two*.',
  cta: 'Say Hi',
}

export const cta = {
  title: ['Let’s design', 'with purpose'],
  lead: 'Not just pixels. Looking for a designer who’ll actually get your *weird ideas* and make them *awesome*?',
  aside: 'Hit me up —\n*let’s make something awesome*',
  // transparent cut-out (head & shoulders) — anchored to the section's bottom edge
  image: img('portrait.png'),
}

export const footer = {
  tagline: 'Web Designer — I design, write & build',
  statement: 'Design with purpose, not just *pixels*.',
  nextIdea: 'Your *weird idea* starts\nwith a *conversation*',
  menu: [
    { label: 'Home', href: '#top' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Blog', href: '#blog' },
  ],
  elsewhere: [
    { label: 'Resume', href: links.resume },
    { label: 'Book a Call', href: links.calendly },
    { label: 'Email', href: links.emailCompose },
  ],
}

// In-site About panel — copy from Ajay's About page.
export const aboutPage = {
  label: 'About Me',
  title: [[{ t: 'Know a lil bit' }], [{ t: 'about me', accent: true }]],
  school: 'From the school of *Internet*.',
  bio: '🙋‍♂️ I’m *Ajay, a Product designer* 🤞 driven by *curiosity and empathy*, seeking to understand the world through the eyes of others. I approach each project as a new adventure, eager to learn, create, and collaborate. My journey in design has been shaped by experiences, both personal and professional, that have taught me the value of *listening, learning, and growing*.',
  quoteIntro: 'Let me share one quote that I follow every day. Try following it, it will help you make a difference',
  quote: '“Be kind whenever possible. *It is always possible*.”',
  image: img('about-photo.jpg'),
  copyEmail: 'Copy e-mail',
  shelf: {
    title: 'The Shelf of Eternal Intentions',
    text: 'Here are some books I’ve been *wanting* to read for a long time. They’ve been on my list so long, I think they’re starting to write a sequel.',
    covers: [img('book-1.jpg'), img('book-2.png'), img('book-3.png'), img('book-4.png')],
  },
}
