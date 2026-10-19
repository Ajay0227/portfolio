// Case study copy and media from Ajay's current portfolio (ajay02.framer.website).
// Highlight syntax: wrap words in *asterisks* to render them in the strong/dark color.
// Keyed by project slug (content.ts); the page's title, tags, client and cover come from the project.

const img = (slug: string, name: string) => `/images/work/${slug}/${name}`

export type Media = { src: string; alt: string }
export type Point = { title: string; body: string }

export type FeatureBlock = {
  kind: 'feature'
  kicker?: string
  title: string
  body?: string[]
  media?: Media[]
  /** Numbered notes for the markers on the screen. */
  points?: Point[]
  /** Text above full-width media, instead of side by side. */
  stack?: boolean
}

export type Block =
  | { kind: 'text'; body: string[] }
  /** `inset` keeps small illustrations in the text column instead of full width. */
  | { kind: 'media'; items: Media[]; inset?: boolean }
  | { kind: 'cards'; title?: string; items: Point[] }
  | { kind: 'chips'; items: string[] }
  | { kind: 'points'; items: Point[] }
  | FeatureBlock

export type CaseSection = {
  title: string
  lead?: string
  blocks?: Block[]
}

export type CaseStudy = {
  intro: string
  /** Extra facts shown beside client and year. */
  facts?: Point[]
  note?: Point
  sections: CaseSection[]
}

const leave = (name: string) => img('leave-module', name)
const bakery = (name: string) => img('ck-bakery', name)
const orange = (name: string) => img('orange-ai', name)

export const caseOutro = {
  title: [[{ t: 'Yes!', accent: true }, { t: ' You might have done it better' }]],
  body: [
    'There are multiple ways to approach a problem. One way is usually better than the others. We arrived at this design decision after extensive research, brainstorming, and testing. It works well for our users, so we’re sticking with it for now.',
    'However, I’m always open to learning new approaches. If you have any ideas that might lead to an even better result, *I’d love to hear them!* Ping me and I can incorporate them into the process next time.',
  ],
  cta: 'Ping me',
  back: 'All projects',
  next: 'Next case study',
}

export const caseStudies: Record<string, CaseStudy> = {
  'leave-module': {
    intro:
      'In this case study, we’ll explore how we redesigned the leave module in our HRMS application to make it *easier and more efficient* for users. We aimed to improve the user experience and simplify the leave management process. Let’s dive in and see how we achieved these goals!',
    facts: [
      { title: 'Timeline', body: 'Jan 2023 — Aug 2023' },
      { title: 'Team', body: '2 Product Designers, 1 Product Manager and 10+ Engineers' },
      {
        title: 'Role',
        body: 'Accountable for researching, conceptualizing, designing, conducting user testing, and delivering crucial modules and feature areas.',
      },
    ],
    sections: [
      {
        title: 'Introduction to Budgie',
        lead: 'Budgie is a comprehensive *HRMS software solution* that goes beyond HR portals and payroll software to include project management, task management, and other management-related features. This makes it a *one-stop shop* for businesses of all sizes to manage their human resources and operations.',
        blocks: [{ kind: 'media', items: [{ src: leave('intro.png'), alt: 'Budgie HRMS dashboard' }] }],
      },
      {
        title: 'Backstory',
        lead: 'Budgie, a successful product already embraced by *10+ companies* and *5,000+ employees* daily, is embarking on an exciting second phase of development. Committed to enhancing user-friendliness, efficiency, and features, Budgie aims to elevate the HRMS experience.',
        blocks: [
          {
            kind: 'text',
            body: [
              'One such improvement journey was our reimagining of the leave module. Through in-depth research and user interviews, we identified pain points and streamlined the process. By implementing a more intuitive interface, we *reduced process time* and *minimized user queries*, leading to a more seamless and satisfying experience for all users.',
            ],
          },
          { kind: 'media', items: [{ src: leave('backstory.webp'), alt: 'Leave apply and leave balance screens on a desktop' }] },
        ],
      },
      {
        title: 'Goals',
        lead: 'Our primary goal is to *empower Budgie users* with an improved leave module experience. Through in-depth research, we aim to identify opportunities to make the module *more user-friendly and efficient*.',
        blocks: [
          {
            kind: 'cards',
            items: [
              {
                title: 'Simplify leave request and approval',
                body: 'We aim to streamline the leave request and approval process by identifying and addressing usability issues that may hinder its smooth operation.',
              },
              {
                title: 'Boost user satisfaction',
                body: 'Our focus is on enhancing user satisfaction by improving the user experience through a friendly interface and intuitive workflows.',
              },
              {
                title: 'Enhance data visibility',
                body: 'We aim to reduce the administrative burden and manual data entry by enhancing data visibility within the system.',
              },
              {
                title: 'Ensure compliance',
                body: 'We will enhance the system to ensure compliance with company policies and regulations, reducing the risk of errors and improving the overall leave management process.',
              },
            ],
          },
        ],
      },
      {
        title: 'Research goal',
        lead: 'Our approach involved collecting extensive data from various perspectives to ensure a *comprehensive understanding* and informed decision-making process.',
        blocks: [
          {
            kind: 'text',
            body: [
              'The absence of time constraints and the extensive user base utilizing the product provided us with a significant advantage in our research efforts.',
            ],
          },
          { kind: 'media', items: [{ src: leave('research.svg'), alt: 'Budgie mascot looking through a magnifying glass' }] },
          {
            kind: 'cards',
            title: 'Methodologies',
            items: [
              {
                title: 'User interviews',
                body: 'We interviewed people from different departments and people in charge of human resources (HR) to hear their thoughts on the current system.',
              },
              {
                title: 'Task analysis',
                body: 'We observed how people typically request and approve leave to find any roadblocks or slowdowns. This helped us see how information flows and where the system might be making things harder for users.',
              },
              {
                title: 'Support desk tickets',
                body: 'Customer support tickets, often a hidden gem, offer valuable insights into user issues. This wealth of information helps us pinpoint common problems and areas for product improvement, which is why we extensively reviewed them, uncovering common issues and opportunities related to the leave module.',
              },
              {
                title: 'Competitor analysis',
                body: 'Studying our competitors enabled us to learn from their successes and failures, identifying areas where we can improve our own processes and offerings.',
              },
            ],
          },
        ],
      },
      {
        title: 'Overall findings',
        lead: 'Our findings reveal both user-centric insights and technical considerations that can significantly improve the user experience for both *employees and HR administrators*. We have identified several pain points in the current Budgie leave module:',
        blocks: [
          {
            kind: 'chips',
            items: [
              'Complex user interface',
              'Lack of mobile optimization',
              'Unclear leave policies',
              'Poor integration',
              'Lack of notifications',
            ],
          },
          { kind: 'media', inset: true, items: [{ src: leave('findings.png'), alt: 'Budgie mascot on a pile of paperwork' }] },
        ],
      },
      {
        title: 'Ideation process',
        lead: 'With user pain points in mind, we shifted our focus to *brainstorming solutions*. Here, we focused on creative solutions to explore innovative ways to improve the leave module’s user experience, ensuring both user needs and technical feasibility are considered.',
        blocks: [{ kind: 'media', items: [{ src: leave('ideation.png'), alt: 'Whiteboard sketches from the ideation sessions' }] }],
      },
      {
        title: 'Iterations',
        lead: 'Brainstorming wasn’t enough! We adopted an *iterative design approach*, rapidly prototyping and testing different design types to meticulously refine the user interface and ensure it aligns perfectly with user needs and expectations.',
        blocks: [{ kind: 'media', items: [{ src: leave('iterations.png'), alt: 'Wireframe iterations of the leave module' }] }],
      },
      {
        title: 'Design solution',
        lead: 'We explored a wide range of creative ideas through brainstorming and prototyping. Finally, we meticulously refined the design based on user feedback and testing. The result? *The ultimate design solution*, crafted with care and backed by a rigorous development process.',
        blocks: [
          { kind: 'media', items: [{ src: leave('solution.png'), alt: 'Redesigned leave module dashboard' }] },
          {
            kind: 'text',
            body: [
              'After extensive research and refinement, we’ve arrived at our *final design*. It’s a one-stop shop, carefully designed to balance all users’ needs in a *single, user-friendly interface*.',
              'Now that we’ve unveiled the final design, let’s dive deeper and explore everything it has to offer. Get ready for a tour of the user-friendly interface, where all your needs are seamlessly integrated in one place.',
            ],
          },
        ],
      },
      {
        title: 'Leave meter',
        lead: 'Leave Meter is a feature designed to help users easily *track and manage their leave balance*. It provides a clear indication of the number of leave days they have taken during the year, helping them stay informed about their remaining leave allowance. The feature also incorporates a *friendly tone and positive vibe*, which aims to make the leave management process more engaging and enjoyable.',
        blocks: [
          { kind: 'media', items: [{ src: leave('meter.png'), alt: 'Leave meter on the leave dashboard' }] },
          { kind: 'media', items: [{ src: leave('meter-detail.png'), alt: 'Leave meter with numbered markers' }] },
          {
            kind: 'points',
            items: [
              { title: 'No. of leave taken', body: 'This helps users to quickly check their total leave taken during the year.' },
              { title: 'Friendly message', body: 'A friendly message to keep the user feeling positive about the application.' },
              { title: 'User-friendly illustration', body: 'An illustration that resonates with the user’s mood related to their leave balance.' },
              { title: 'View details', body: 'A CTA to help users find the detailed view of their leave balance and history.' },
            ],
          },
        ],
      },
      {
        title: 'Leave balance & apply',
        lead: 'This section is really important for users because it gives them a *clear view of how much leave they have left*. This helps them plan their time off better. Plus, it makes it super easy for them to apply for leave when they need to. Overall, this section makes managing leave a breeze and improves the user experience.',
        blocks: [
          { kind: 'media', items: [{ src: leave('balance.png'), alt: 'Leave balance screen' }] },
          {
            kind: 'feature',
            kicker: 'Card',
            title: 'Leave card',
            stack: true,
            body: ['Interactive leave cards with emotional icons. This highlights the interactive elements and the use of icons.'],
            media: [{ src: leave('leave-card.png'), alt: 'Leave card with numbered markers' }],
            points: [
              { title: 'Emotional emoji', body: 'Emojis help people understand the emotional tone of a message.' },
              { title: 'Leave type', body: 'This emphasizes the type of leave being requested.' },
              { title: 'Consumed leave', body: 'This emphasizes how much of the allotted leave has been used.' },
              { title: 'Balance', body: 'This emphasizes that the balance is the portion of leave that can still be taken.' },
              { title: 'Progress bar', body: 'A visual representation of the leave availed and leave consumed.' },
              { title: 'Apply leave', body: 'A simpler and more direct button to apply for leave.' },
            ],
          },
          {
            kind: 'feature',
            kicker: 'Action 1',
            title: 'Leave apply',
            body: [
              'We initially designed a streamlined leave application process. However, we realized that users sometimes change their minds after selecting a leave type. They might want to check their remaining balances for other leave categories or switch to a different leave type altogether.',
              'To address this, we’ve updated the design to *display leave balances* and allow users to *easily change their leave type* during the application process.',
            ],
            media: [{ src: leave('apply.png'), alt: 'Leave apply form showing leave balances' }],
          },
          {
            kind: 'feature',
            kicker: 'Action 2',
            title: 'Record off-day work',
            body: [
              'This feature allows users to log work done during their days off, which can be used to take *compensatory time off* on another day.',
            ],
            media: [{ src: leave('off-day.png'), alt: 'Record off-day work form' }],
          },
        ],
      },
      {
        title: 'Leave history',
        lead: 'Leave history is the *central hub for past time off requests*. Users can view a clear list of all their previous requests, including leave type (casual, sick leave, etc.), requested dates, and current status (approved, denied, pending).',
        blocks: [
          { kind: 'media', items: [{ src: leave('history.png'), alt: 'Leave history screen' }] },
          {
            kind: 'feature',
            kicker: 'Card',
            title: 'Leave history card',
            stack: true,
            body: ['Interactive leave cards with emotional icons. This highlights the interactive elements and the use of icons.'],
            media: [{ src: leave('history-card.png'), alt: 'Leave history card with numbered markers' }],
            points: [
              { title: 'Emotional emoji', body: 'Emojis help people understand the emotional tone of a message.' },
              { title: 'Leave type', body: 'This emphasizes the type of leave being requested.' },
              { title: 'Status', body: 'The status of the user’s leave application is clearly indicated.' },
              { title: 'Session details', body: 'The details of the leave taken time are displayed here.' },
            ],
          },
          {
            kind: 'feature',
            kicker: 'Action 1',
            title: 'Leave cancel',
            body: [
              'Users can review and manage their leave requests with ease. A detailed breakdown of leave details is provided, including leave type, requested dates, and current status. Additional information, such as the reason for leave and any attached notes, may also be displayed.',
              'If a user can’t take the leave after all, they can *easily cancel it right here!*',
            ],
            media: [{ src: leave('cancel.png'), alt: 'Leave details with a cancel option' }],
          },
          {
            kind: 'feature',
            kicker: 'Action 2',
            title: 'Leave withdraw',
            body: ['For requests still pending approval, users can also *withdraw their request*.'],
            media: [{ src: leave('withdraw.png'), alt: 'Withdrawing a pending leave request' }],
          },
        ],
      },
      {
        title: 'Mobile responsiveness',
        lead: 'Our redesign successfully implemented a *mobile-responsive design*, ensuring that users can easily access and use the leave management system on their mobile devices. Users can now manage their leave efficiently and effectively, whether they are using a desktop computer, tablet, or smartphone.',
        blocks: [{ kind: 'media', items: [{ src: leave('mobile.svg'), alt: 'Leave module on two mobile phones' }] }],
      },
      {
        title: 'Notifications',
        lead: 'We addressed a key user issue by implementing *notification alerts for every application action*. This ensures users stay informed about the status of their applications.',
        blocks: [{ kind: 'media', items: [{ src: leave('notifications.webp'), alt: 'Leave notifications on a phone lock screen' }] }],
      },
      {
        title: 'Before and after',
        lead: 'Overall, the redesign successfully *improved the user experience*, simplified the leave tracking process, and provided users with effective leave management tools. This achievement was the result of hours of hard work and dedication.',
        blocks: [
          {
            kind: 'cards',
            items: [
              {
                title: 'Before',
                body: 'Leave balance tracking was a hassle, requiring manual calculations and multiple steps to get an accurate count. Users struggled to manage their leave effectively and often missed out on important details.',
              },
              {
                title: 'After',
                body: 'With our new design, tracking leave balance is a breeze. A simple, user-friendly interface provides all the necessary information at a glance, empowering users to manage their leave efficiently. The ability to cancel leave directly from the interface adds a layer of convenience, streamlining the entire process.',
              },
            ],
          },
        ],
      },
      {
        title: 'Usability test report',
        lead: 'The usability test was conducted to evaluate the *effectiveness and efficiency* of the Leave Module. Participants were asked to complete a series of tasks while their interactions were observed and recorded.',
        blocks: [
          { kind: 'media', items: [{ src: leave('usability.png'), alt: 'Usability test report summary' }] },
          {
            kind: 'cards',
            title: 'We observed real users interact with the design and gathered their feedback',
            items: [
              {
                title: 'What’s done correctly',
                body: 'During testing, we discovered that users perceive the design as intuitive, user-friendly, and effective.',
              },
              {
                title: 'What went wrong',
                body: 'The initial idea of using icons to represent each leave type did not resonate well with users.',
              },
              {
                title: 'Making changes',
                body: 'However, in the next version, the use of emojis proved to be more engaging and relatable to users.',
              },
            ],
          },
          {
            kind: 'text',
            body: [
              'The feedback from the usability test was carefully analyzed and used to refine the design in subsequent iterations. This process ensured that the changes made were *directly responsive to the issues identified during testing*, ultimately improving the overall user experience of the leave module.',
            ],
          },
        ],
      },
      {
        title: 'Struggles we faced',
        blocks: [
          {
            kind: 'cards',
            items: [
              {
                title: 'Balancing the need',
                body: 'Balancing the diverse needs of our users was no easy feat. Each person brings a unique perspective and set of requirements to the table. But through thoughtful design and careful consideration, we’ve crafted a solution that aims to meet the varied needs of all our users, ensuring a seamless and satisfying experience for everyone.',
              },
              {
                title: 'How we solved it?',
                body: 'By taking a user-centered approach and prioritizing user needs, we were able to successfully balance the diverse requirements of our users and create a solution that delivers a satisfying experience for everyone.',
              },
            ],
          },
        ],
      },
      {
        title: 'Conclusion',
        lead: 'The redesign of the leave module has not only improved the user experience but also contributed to a *more efficient leave management process*. By putting users at the center of our design process, we were able to create a module that meets their needs to improve efficiency, reduce frustration, and enhance employee and HR administrators’ satisfaction.',
      },
    ],
  },

  'ck-bakery': {
    intro:
      'In today’s digital age, restaurants are finding new ways to enhance the dining experience. CK’s Bakery, a popular eatery known for its delicious offerings, decided to embrace technology by introducing a *QR menu*. This case study explores how this simple yet innovative change transformed the way customers order, making the process *more convenient and enjoyable*.',
    note: {
      title: 'Disclaimer',
      body: 'Due to confidentiality restrictions, I cannot share specific details about this project. However, I can walk you through the general process to provide a clearer understanding of what happened. This overview will not include any sensitive or proprietary information.',
    },
    sections: [
      {
        title: 'Introduction to CK’s Bakery',
        lead: 'For over two decades, CK’s Bakery has been a cherished part of the community, serving up a delightful array of freshly baked goods across *more than 80 stores*. With a commitment to providing delicious treats at affordable prices, CK’s Bakery has become a beloved destination for those seeking a *warm and welcoming atmosphere* along with their favorite baked delights.',
        blocks: [{ kind: 'media', inset: true, items: [{ src: bakery('intro.jpg'), alt: 'Inside a CK’s Bakery store' }] }],
      },
      {
        title: 'The problem',
        lead: 'The customers of CK’s Bakery have expressed concerns about the hurdles they face when trying to order items from the store. These include difficulties in *navigating the menu*, uncertainty about *product availability and customization* options, and challenges during the *checkout process*.',
        blocks: [
          {
            kind: 'text',
            body: ['These issues have led to frustration and may have contributed to a lower-than-desired conversion rate for orders.'],
          },
          { kind: 'media', inset: true, items: [{ src: bakery('problem.png'), alt: 'Choosing a frowning face on a satisfaction scale' }] },
        ],
      },
      {
        title: 'Goals',
        lead: 'Our mission is to identify and solve customer challenges across the *entire process*, from placing orders to checking status and paying.',
        blocks: [
          {
            kind: 'text',
            body: [
              'By smoothing out these pain points, we can eliminate frustrations, keep customers informed about their treats, and ensure secure, seamless payments. Ultimately, this user-centered approach will lead to a *happier customer experience* and a *boost in orders* for CK’s Bakery.',
            ],
          },
        ],
      },
      {
        title: 'Research goal',
        lead: 'The research goal is to delve deeply into the customer experience of ordering items from CK’s Bakery, with a focus on understanding the *specific challenges and frustrations* they encounter.',
        blocks: [
          {
            kind: 'text',
            body: [
              'By gaining insights into those areas, we aim to develop a comprehensive solution that effectively addresses all the challenges, reduces customer hurdles, and significantly enhances the overall experience for CK’s Bakery customers.',
            ],
          },
          { kind: 'media', items: [{ src: bakery('research.png'), alt: 'Research board on a desktop screen' }] },
          {
            kind: 'cards',
            title: 'Research methodologies',
            items: [
              {
                title: 'Observational studies',
                body: 'Conducted observational studies within CK’s Bakery stores to observe how customers interact with the menu, inquire about product availability and customization options, and navigate the checkout process.',
              },
              {
                title: 'In-store interviews',
                body: 'Conducted interviews with customers in-store to gather insights into their experiences, pain points, and suggestions for improvement.',
              },
              {
                title: 'Staff interviews',
                body: 'Interviewed CK’s Bakery staff to understand their perspective on the ordering process, including any challenges they face in serving customers efficiently.',
              },
              {
                title: 'Prototype testing',
                body: 'Created prototypes of new ordering process designs and tested them with customers in-store to gather feedback and refine the designs.',
              },
            ],
          },
          {
            kind: 'feature',
            kicker: 'Method 1',
            title: 'Observational studies',
            media: [{ src: bakery('observation.png'), alt: 'Illustration of customers queueing at a bakery counter' }],
            points: [
              {
                title: 'Menu navigation',
                body: 'Customers spend a significant amount of time scanning the entire menu before making a decision, especially those unfamiliar with CK’s offerings.',
              },
              {
                title: 'Product availability',
                body: 'Many customers asked bakery staff about the availability of certain products, suggesting that the current menu did not adequately communicate availability. This led to delays in ordering and potential disappointment if desired items were unavailable.',
              },
              {
                title: 'Customization requests',
                body: 'A significant number of customers requested customization of their orders, such as specific ingredients or modifications to standard menu items. This highlighted the importance of offering flexible options to cater to individual preferences.',
              },
              {
                title: 'Checkout process',
                body: 'Observations revealed that the checkout process was sometimes slow, particularly during peak hours, due to manual payment processing. This resulted in longer wait times and potential frustration among customers.',
              },
            ],
          },
          {
            kind: 'feature',
            kicker: 'Method 2',
            title: 'In-store interviews',
            media: [{ src: bakery('interviews.png'), alt: 'Illustration of customers talking at a café table' }],
            points: [
              {
                title: 'Dietary restrictions',
                body: 'Many customers expressed the importance of having clear information about dietary restrictions, such as gluten-free, dairy-free, or vegan options. They suggested labeling menu items accordingly and providing detailed ingredient lists.',
              },
              {
                title: 'Afraid of allergy',
                body: 'Customers with allergies highlighted the need for detailed ingredient lists and allergy information, either on the menu or through a digital platform, to help them make informed choices and avoid potential allergens.',
              },
              {
                title: 'Group menu accessibility',
                body: 'Some customers mentioned that the current menu layout could be overwhelming, especially for groups ordering together. They suggested organizing the menu by categories or offering a digital menu that allows for easier navigation and group ordering.',
              },
            ],
          },
          {
            kind: 'feature',
            kicker: 'Method 3',
            title: 'Staff interviews',
            media: [{ src: bakery('staff.webp'), alt: 'Illustration of three bakery staff members' }],
            points: [
              {
                title: 'Order management',
                body: 'Staff mentioned that they sometimes miss orders, especially during busy periods, which can lead to delays and customer dissatisfaction. They suggested a more efficient order management system to ensure all orders are processed promptly.',
              },
              {
                title: 'Limited resources',
                body: 'With limited staff and resources, some staff members expressed challenges in attending to all customers effectively, especially during peak hours. They suggested optimizing staffing levels or workflow to improve customer service.',
              },
              {
                title: 'Ingredient knowledge',
                body: 'Staff highlighted the importance of comprehensive knowledge about the ingredients used in CK’s Bakery’s products. Ongoing training on ingredients and allergens would help them address customer inquiries more effectively.',
              },
              {
                title: 'Menu updates',
                body: 'Staff mentioned that they sometimes struggle to keep up with menu updates and changes, which can lead to confusion among customers. They suggested a system to ensure staff are informed promptly about any menu changes.',
              },
            ],
          },
          {
            kind: 'feature',
            kicker: 'Method 4',
            title: 'Metrics tracking',
            points: [
              {
                title: 'Wait times',
                body: 'Average wait times during peak hours were observed to be approximately *15 to 20 minutes*, leading to customer frustration and potential loss of business.',
              },
              {
                title: 'Order accuracy',
                body: 'Customer feedback indicated that order accuracy was a recurring issue, with approximately *10% (1 out of 10)* of orders containing errors or missing items.',
              },
              {
                title: 'Customer satisfaction',
                body: 'Surveys revealed that only *60% of customers* were satisfied with the current ordering process, citing long wait times and confusion over menu options as key concerns.',
              },
            ],
          },
        ],
      },
      {
        title: 'Overall findings',
        lead: 'CK’s Bakery faces several challenges, including *outdated menus*, inconvenient ordering processes, limited payment options, and a lack of data insights due to traditional menus and cash transactions.',
        blocks: [
          {
            kind: 'chips',
            items: ['Menu clarity', 'Dietary and allergen information', 'Customization options', 'Checkout efficiency', 'Ordering process complexity'],
          },
          { kind: 'media', inset: true, items: [{ src: bakery('findings.webp'), alt: 'Bakery mascot surrounded by paper menus' }] },
        ],
      },
      {
        title: 'Proposed solutions',
        lead: 'We propose a comprehensive approach that tackles the identified pain points across various touchpoints. This includes utilizing *QR menu design*, empowering staff with knowledge, *streamlining the ordering process*, and implementing a robust order management system.',
        blocks: [
          {
            kind: 'cards',
            items: [
              {
                title: 'Digital menu and QR code integration',
                body: 'Implement a digital menu with QR code integration for easy access to menu items and information. Include food macros and nutritional information for health-conscious customers.',
              },
              {
                title: 'Food preference and customization',
                body: 'Provide options for customers to indicate their food preferences and dietary restrictions. Include detailed ingredient lists and nutritional information for transparency.',
              },
              {
                title: 'Streamlined ordering process',
                body: 'Simplify the ordering process through a user-friendly interface and clear menu categories.',
              },
              {
                title: 'Improved checkout efficiency',
                body: 'Introduce contactless payment options for a faster and more convenient checkout process. Implement a digital order tracking system to monitor and manage orders efficiently.',
              },
            ],
          },
        ],
      },
      {
        title: 'Ideating the solutions',
        lead: 'To address the challenges faced by CK’s Bakery, we propose a comprehensive solution that focuses on improving checkout efficiency, catering to food preferences, streamlining the ordering process, and integrating digital menu and QR code technology. These solutions aim to *enhance the overall customer experience*, improve staff efficiency, and drive business growth.',
      },
      {
        title: 'Design implementation',
        lead: 'We explored a wide range of creative ideas through brainstorming and prototyping. Finally, we meticulously refined the design based on user feedback and testing. The result? *The ultimate design solution*, crafted with care and backed by a rigorous development process.',
        blocks: [
          { kind: 'media', items: [{ src: bakery('solution.webp'), alt: 'CK’s Bakery QR code stand on a café table' }] },
          {
            kind: 'text',
            body: [
              'After extensive research and refinement, we’ve arrived at our *final design*. It’s a one-stop shop, meticulously crafted to balance all your needs in a *single, user-friendly interface*.',
            ],
          },
          {
            kind: 'feature',
            kicker: 'Flow 1',
            title: 'Onboarding',
            body: [
              'We made the onboarding process at CK’s Bakery easier after scanning the QR code by *cutting down on steps* and giving clear instructions. Users now see a simple interface that guides them through selecting items, customizing orders, and finishing the transaction. We also added visual tips to help users along the way. This simpler process reduces confusion and makes users happier.',
            ],
            media: [{ src: bakery('onboarding.webp'), alt: 'Onboarding screens of the QR menu app' }],
          },
          {
            kind: 'feature',
            kicker: 'Flow 2',
            title: 'Selecting preferences',
            body: [
              'Our new interface makes it easy for users to indicate their *dietary needs and preferences*, including options like gluten-free, vegan, organic, poultry, non-veg, spicy, nut-free, dairy-free, mild, veg, low-carb, or high-fiber. With thoughtful design and clear visual cues, users can effortlessly navigate the menu and find the perfect meal tailored to their tastes.',
            ],
            media: [{ src: bakery('preferences.webp'), alt: 'Food preference selection screens' }],
          },
          {
            kind: 'feature',
            kicker: 'Flow 3',
            title: 'Food ordering',
            body: [
              'We simplified the user flow at CK’s Bakery by creating a straightforward process. We *reduced unnecessary steps* and provided clear instructions, making it quick and easy to place an order. This streamlined approach ensures a smooth and hassle-free experience for customers.',
            ],
            media: [{ src: bakery('ordering.webp'), alt: 'Menu browsing and food ordering screens' }],
          },
          {
            kind: 'feature',
            kicker: 'Flow 4',
            title: 'Review order & status',
            body: [
              'We’ve streamlined the process for users to review and track their orders. Users receive *real-time updates* on the status of their treats, whether they’re being prepared, on their way, or ready for pickup. Stay in the loop and get ready to enjoy your delicious food!',
            ],
            media: [{ src: bakery('status.webp'), alt: 'Order review and order status screens' }],
          },
          {
            kind: 'feature',
            kicker: 'Flow 5',
            title: 'Ratings and review',
            body: [
              'We’ve integrated a feedback and rating system to make it easy for customers to share their experiences. After placing an order, users can *rate their overall experience* and leave comments if they wish. This feedback is valuable as it helps us understand what our customers love and where we can improve.',
            ],
            media: [{ src: bakery('ratings.webp'), alt: 'Rating and review screen' }],
          },
        ],
      },
      {
        title: 'Final design',
        lead: 'Before we finalize the project, let’s create a *checklist* to ensure we’ve addressed all user pain points and solved them.',
        blocks: [
          { kind: 'media', items: [{ src: bakery('checklist.webp'), alt: 'Final QR menu app screens on four phones' }] },
          {
            kind: 'text',
            body: [
              'We’ve thoroughly addressed all the pain points on our list. Our solution is designed to tackle each challenge head-on, ensuring a *smoother and more user-friendly* experience.',
            ],
          },
        ],
      },
      {
        title: 'Prototype testing',
        lead: 'Before finalizing the design, we conducted prototype testing with *real users* to gather valuable feedback.',
        blocks: [
          {
            kind: 'text',
            body: [
              'This testing process involved putting prototypes of the final product design in the hands of our target audience. We observed how they interacted with the product, listened to their feedback on usability and functionality, and identified any areas for improvement.',
              'By incorporating this user feedback, we were able to refine the final design and ensure it delivers a *smooth, intuitive, and enjoyable* experience for everyone.',
            ],
          },
          { kind: 'media', items: [{ src: bakery('testing.webp'), alt: 'Customer testing the QR menu prototype on a phone' }] },
        ],
      },
      {
        title: 'Changes made',
        lead: 'After a successful review of CK’s Bakery’s QR menu and order app, we found it to be *generally well-received* but identified a few areas for improvement. Menu loading times were slightly slow, and offering more payment options would enhance convenience for customers. Changes were made accordingly.',
      },
      {
        title: 'Struggles we faced',
        lead: '*What if?* Our initial focus didn’t consider the challenge of serving customers without smartphones, particularly older adults who might find them difficult to use. Finding solutions for this *accessibility gap* became a key priority.',
        blocks: [
          {
            kind: 'feature',
            kicker: 'Solution for the struggle',
            title: 'Order buzzer',
            body: [
              'Customers without a smartphone can order at the counter and take an *order buzzer*, which alerts them when their order is ready.',
            ],
            media: [{ src: bakery('buzzer.webp'), alt: 'Order buzzer on a café table' }],
          },
        ],
      },
      {
        title: 'Next step',
        lead: 'Our project to enhance the ordering experience at CK’s Bakery has successfully completed the design phase and is now *moving into development*. This milestone brings us one step closer to revolutionizing how customers interact with the bakery and simplifying the ordering process.',
        blocks: [
          {
            kind: 'text',
            body: [
              'With the design finalized, our development team is ready to transform these concepts into a functional reality. Every aspect of the user experience, from menu navigation to checkout, will be carefully crafted to ensure a seamless and enjoyable experience for customers.',
            ],
          },
        ],
      },
      {
        title: 'Conclusion',
        lead: 'Throughout this project, we have collaborated with the CK’s Bakery team, listened to customer feedback, and leveraged the latest technologies and design principles to create a solution that is *both innovative and user-friendly*. From redesigning the menu to streamlining the checkout process, every decision was made with the customer in mind.',
      },
      {
        title: 'Learning & takeaways',
        lead: '*Change is consistent.* Throughout this project, I learned a lot about how people’s preferences change frequently, and their needs often change rapidly. As designers, we have the responsibility to balance these factors for them.',
      },
    ],
  },

  'orange-ai': {
    intro:
      'Orange AI is a versatile platform that turns *complex data into actionable insights*, empowering businesses across industries with precise, growth-driven intelligence.',
    sections: [
      {
        title: 'Introducing Orange AI',
        lead: 'Orange AI is an adaptable AI platform designed to transform your complex data into *actionable insights* for real-world growth. From e-commerce to finance, healthcare, and beyond, Orange AI is tailor-made to analyze and learn from your data, providing precise intelligence that sharpens your competitive edge.',
        blocks: [
          {
            kind: 'text',
            body: [
              'Orange AI combines a sleek, flexible design with an intuitive interface that’s built to *inspire confidence*. From branding to user experience, every detail has been crafted to engage users and make complex insights easy to access and understand.',
            ],
          },
        ],
      },
      {
        title: 'Understanding the problem',
        lead: 'Modern businesses are *drowning in data*. While data holds immense potential for driving innovation and growth, most organizations struggle to effectively leverage it.',
        blocks: [
          {
            kind: 'cards',
            items: [
              { title: 'Data silos', body: 'Data is often trapped in disparate systems, hindering a holistic view.' },
              { title: 'Manual processes', body: 'Manual processes, which are time-consuming, error-prone, and limit scalability.' },
              { title: 'Lack of expertise', body: 'Turning raw data into insight takes data-science skills most teams don’t have in-house.' },
              { title: 'Limited accessibility', body: 'Traditional analytics tools are complex and costly, limiting accessibility.' },
            ],
          },
        ],
      },
      {
        title: 'Research methods',
        lead: 'Orange AI’s smart assistant learns directly from your data, offering *real-time insights* at the click of a button. With interactive tools and intelligent suggestions, Orange AI provides detailed, relevant responses, helping you make data-driven decisions effortlessly.',
        blocks: [
          {
            kind: 'cards',
            items: [
              { title: 'User interviews & survey', body: 'Deep dive into user behavior, needs, and concerns.' },
              { title: 'Competitor analysis', body: 'Identify strengths, weaknesses, and opportunities by analyzing existing customizable AI tools.' },
              { title: 'Community forums', body: 'Gather organic, unfiltered opinions and ideas from user communities.' },
            ],
          },
          {
            kind: 'feature',
            kicker: 'Method 1',
            title: 'User interviews & survey',
            body: ['We conducted in-depth interviews with key stakeholders and end users to understand their *workflows, challenges, and goals*.'],
            media: [{ src: orange('interviews.jpg'), alt: 'Interview notes from Orange AI user research' }],
          },
          {
            kind: 'feature',
            kicker: 'Method 2',
            title: 'Competitor analysis',
            body: [
              'To build a truly impactful product, we took a deep dive into the competitive landscape. By analyzing key players in the AI space, we identified *gaps, strengths, and opportunities* that helped us refine Orange AI.',
            ],
            media: [{ src: orange('competitors.jpg'), alt: 'Competitor positioning chart' }],
          },
          {
            kind: 'feature',
            kicker: 'Method 3',
            title: 'Community forums',
            body: [
              'We turned to community forums to gather raw, unfiltered opinions and ideas about Orange AI. These real conversations gave us invaluable insights into *user needs, pain points, and expectations*.',
            ],
            media: [{ src: orange('forums.jpg'), alt: 'Orange AI assistant on a phone with community feedback' }],
          },
        ],
      },
      {
        title: 'Findings',
        lead: 'Through extensive research, we identified several key challenges that impact *user experience, engagement, and overall efficiency*. These findings highlight areas that require improvement to enhance usability, streamline workflows, and create a more intuitive experience for users.',
        blocks: [{ kind: 'media', items: [{ src: orange('findings.jpg'), alt: 'Research findings summary' }] }],
      },
      {
        title: 'The solution',
        lead: '*An AI trained with your data.* Generic AI doesn’t cut it. That’s why Orange AI learns from your data, adapting to your unique needs and workflows.',
        blocks: [{ kind: 'media', items: [{ src: orange('solution.jpg'), alt: 'Orange AI learning from connected data sources' }] }],
      },
      {
        title: 'Final design',
        blocks: [
          { kind: 'media', items: [{ src: orange('final.jpg'), alt: 'Orange AI chat interface on a tablet' }] },
          {
            kind: 'feature',
            title: 'Responsive design',
            body: ['Optimized for any device, providing a *consistent experience*.'],
            media: [{ src: orange('responsive.jpg'), alt: 'Orange AI on a phone' }],
          },
          {
            kind: 'feature',
            title: 'Easily trainable AI',
            body: ['Orange AI adapts to your data effortlessly, learning quickly to deliver *smarter, personalized insights*.'],
            media: [{ src: orange('trainable.jpg'), alt: 'Training Orange AI with your own files' }],
          },
          {
            kind: 'media',
            items: [
              { src: orange('screen-2.jpg'), alt: 'Upload screen for training data' },
              { src: orange('screen-3.jpg'), alt: 'Orange AI brand typography' },
            ],
          },
        ],
      },
      {
        title: 'Challenges faced',
        blocks: [
          {
            kind: 'cards',
            items: [
              {
                title: 'Handling large PDF uploads',
                body: 'We implemented a queue-based data structure that could effectively manage the upload process, distributing upload tasks efficiently across multiple large files. Service workers on the frontend manage and monitor uploads, providing users with a seamless and responsive experience.',
              },
              {
                title: 'Feedback loop integration',
                body: 'We designed a lightweight feedback mechanism that collected user feedback asynchronously and periodically updated the model parameters. This ensured that the AI model continued to optimize its responses without impacting user experience.',
              },
              {
                title: 'Context generation and management',
                body: 'We developed a context generation system that prioritized relevance using advanced text summarization techniques. The generated contexts were indexed and stored efficiently, enabling quick retrieval and accurate answers to user queries.',
              },
              {
                title: 'Data warehouse dumping script performance',
                body: 'We optimized the dumping script with batch processing and data compression, transferring data in smaller, manageable chunks to reduce the load on the system. Encryption in the backend ensures the privacy and security of the stored PDFs, addressing both performance and compliance requirements.',
              },
            ],
          },
        ],
      },
    ],
  },
}
