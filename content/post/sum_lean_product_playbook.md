---
title: "The Lean Product Playbook, Dan Olsen"
date: 2020-02-02T16:04:56+01:00
draft: false
description: "Book summary"

tags: [ 
    "ProductDiscovery"
]
categories: [
    "Book Summary"
]
---
<!--more--> 

> I own this book and took these notes to further my own learning. Taking notes, publishing them and re-reading them allow me to flatten my [forgetting curve](https://en.wikipedia.org/wiki/Forgetting_curve). If you enjoy these notes, I highly encourage you to do the same, buy this book [here](https://www.amazon.com/Lean-Product-Playbook-Innovate-Products/dp/1118960874/ref=sr_1_1?crid=2UWCK4U4DHHEJ&dchild=1&keywords=lean+product+playbook&qid=1584892896&sprefix=lean+product%2Caps%2C294&sr=8-1) and take your own notes.


## INTRODUCTION
"The main reason products fail is because they don't meet customer needs in a way that is better than other alternatives. This is the essence of product-market fit." Marc Andreessen

##### The Lean Product Process:
![Example imagee](/posts/sum_lean_product/LeanProduct1.png)

## Part I: Core Concept
1. Product-market fit
    * you have built a product that creates significant customer value. This means that your product meets real customer needs and does so in a way that is better than the alternatives.
    * Even big and old corporate could not have reached product market fit and even saturated industry ( Quicken, there were already 46 personal finance products in the market. However, after conducting customer research, the cofounders concluded that none of the existing products had achieved product-market fit.--> The cofounders had a hypothesis that a checkbook-based design would do well, since everyone at the time was familiar with writing checks. Their hypothesis proved right: the UX they built using the checkbook conceptual design resonated with customers and Quicken rapidly became the leading personal finance software.
2. A market 
    * consists of all the existing and potential customers that share a particular customer need or set of related needs.
    * market is a set of related customer needs, which rests squarely in problem space. A market is not tied to any specific solutions that meet those needs. That is why you see “market disruptions”: when a new type of product (solution space) better meets the market needs (problem space). 
3. Prioritization:
    * To decide which features to build, you need to identify the specific customer needs your product should address. In doing so, you want to determine how your product will be better than the others in the market. This is the essence of product strategy.
4. Rework concept
    * A key concept in Lean manufacturing, which inspired Lean Startup, is the concept of rework: having to spend time fixing something that you did not build correctly the first time.
5. Problem space vs solution space
	* Nasa space pen vs Russian space pen
    * Problem defines market, ﻿“What” is problem space and “how” is solution space.
	* Lean product teams articulate the hypotheses they have made and solicit customer feedback on early design ideas to test those hypotheses.
	* Apple, S jobs: you begin with the customer experience and work backward with the technology solution
	* Dave McClure of 500 Startups: “Customers don't care about your solution. They care about their problems.”
	
## Part II: the lean product concept
1. Determine your target customers
	* You will hypothesis to your target customers, but you will only have a clear understanding on who they are once you will show your product 
	* Don't mix users and buyers, example salesforce = used by sales, but bought by a CTO
	* Crossing the chasm, innovator, early adopter, early majority, late majority, laggards --> get the current stage of your target, you may initially target innovator, then…
	* Personas, “a precise definition of our user and what he wishes to accomplish.” (remember: personas are not avg persons… a family does not have 2.3 children…)
2. Identify underserved needs
	* Don't look necessarily to the articulate need, or end solution (" I need…."). ﻿There are unarticulated needs—those that the customer has but doesn't express in an interview.
	* Write user stories
	* List ﻿each benefit and begin with a verb: help, check, reduce, maximize. A benefit conveys value, which means it's doing something for the customer.
	* Run discovery interview and ask: "what does this statement means to you?" (understanding), "how might this help you ?", "how valuable would it be to you if the product delivered this benefit ?", ask why!? (several times)
    ![Example imagee](/posts/sum_lean_product/LeanProduct2.png)
	* Always score the importance of the solution but also the user satisfaction of the current solution. Something that has high importance and high satisfaction does not worth spending time. Focus on the ones with the higher score: Opportunity to add value = importance*(1-satisfaction), upper left quadrant : (like uber) AND  Customer value = Importance * Satisfaction
    * Like uber, look for the 10x improvement, high important low satisfaction. Look for the underserved need
	* How to measure this ? Not at all important Slightly important Moderately important Very important Extremely important. Completely dissatisfied Mostly dissatisfied Somewhat dissatisfied Neither satisfied nor dissatisfied Somewhat satisfied Mostly satisfied Completely satisfied
	* Jobs to be done: 1) customers buy products and services to help them get a task or job done. Customers decide which product to buy based on how well it delivers their “desired outcomes” for the “job to be done.” 2) Customer are ambiguous and imprecise, don't be too much "customer-driven", outcomes are superior than customers needs or benefit. 3) Customer outcomes = well-defined customer benefit, good product team looks for deeper insights and look for the most elegant and simple solution
	* The KANO MODEL: most important is to break features into 3 categories: delighters, performance, must have (cost of entry). Delighters becomes must have through times (for instance GPS in car). Needs migrate over time. Good tool to use to map the problem space of users
    ![Example imagee](/posts/sum_lean_product/LeanProduct3.png)
3. Define your value proposition
    * You want to make sure your product delivers enough customer value and is better than other alternatives, which is the essence of product strategy. But strategy means "deciding what you are not going to do" (s. jobs). Your should not risk to waste resources with an initial scope that is too large, A good exercise is too do a tableau with the three categories and market competitors
    * Best way to analyze your product strategy: Create a table with all the must-haves, performance benefits, and delighters that are relevant to you and your competitors. Nobody is doing this today. “If you know the enemy and know yourself, you need not fear the result of a hundred battles. If you know yourself but not the enemy, for every victory gained you will also suffer a defeat. If you know neither the enemy nor yourself, you will succumb in every battle.” SUN TZU
    * This table will help you to understand if you are not just solving for current market condition and to reduce the risk of being suboptimal in the future
4. Specify your minimum viable product
	* How to write good user stories ? INVEST  (I - independent, users should be implementable in any order. N - negociable, not a contract of features, open to discussion for the solution. V - valuable to customers. E - estimable, effort can be estimated. S - small in scope. T - Testable, enough info to tell if the story is "done" at the end
	* Breaking features: Once you have you high level user stories. “chunking.” - "feature chunck" -  The goal is to find ways to reduce scope and build only the most valuable pieces of each feature. Small is beautiful - lean manufacturing
	* Benefit of working in small batch size is to get also rapid feedback from users and polish along the way
	* How to prioritize ? ROI = return / investment = (final value - investment) / investment
    ![Example imagee](/posts/sum_lean_product/LeanProduct4.png)
	* Summary of the last steps - NB: Lean Product Process, you have done a fair bit of work: You have: Formed hypotheses about your target customers Formed hypotheses about their underserved needs Articulated the value proposition you plan to pursue so that your product is better and different Identified the top feature ideas you believe will address those needs and broken them down into smaller chunks Prioritized those feature chunks based on ROI Selected a set of those feature chunks for your MVP candidate, which you hypothesize customers will find valuable
5. Create your MVP
    ![Example imagee](/posts/sum_lean_product/LeanProduct5.png)
    * marketing materials
    * landing pages, smoke tests, explainer video, ad campaign, crowdfunding
    * wireframes, mockups, wizard of oz, concierge, prototype
    * fake door, 404 pages, product analytics, ab tests
6. Create your MVP - UX law
	* “Olsen's Law of Usability”: The more user effort required to take an action, the lower the percentage of users who will take that action. The less user effort required, the higher the percentage of users who will take that action.
	* User experiences that seem to read the user's mind can help create delight. By selecting smart default choices on the user's behalf or proactively addressing top-of-mind questions, a product can make users feel like it understands them and is empathetic.
	* If users click a button and there is no resulting indication that something is happening, they will assume their click didn't register or that your product isn't working. Slow performance creates poor interaction design.
	* where a large, prominent photo shows your product, a typical customer, or some other artistic or inspirational object or scene. For example, Netflix often uses large photos of customers watching and enjoying a show.
	* The Gestalt principle of similarity maintains that the brain perceives objects that share similar characteristics as more related than objects that don't share those characteristics.
	* all other things being equal, people will look at elements near the top left corner of the screen first.
	* four essential skills of an amazing UX product team: product management, interaction design, visual design, and front-end development—the “A-Team”
7. Test your MVP - Users interviews
	* Will tell you what you don't know: product blindness
	* See users' screen: ﻿GoToMeeting, WebEx, Skype, Screenleap, or join.me
	* ﻿unmoderated remote testing, which you accomplish using a service such as User Testing or Validate. More close to the reality because less guided
	* Filter users: instead of asking "do you play videogames ?" ask "how many hours a week do you play videogames?"
	* Go deeper:  For example, if the user answered, “I clicked on the button because I was looking for [...],” the moderator might ask, “Why were you looking for [...]?” This is reminiscent of the “five whys” technique. Asking a customer “why” too many times can make them feel defensive, so it's a good idea to mix it up with other phrases such as “Could you please tell me more about that?,” “Could you please help me understand [...]?,” or “What thoughts were going through your head when you did [...]?”
	* It's common for users to ask the moderator questions during the test. For example, a user might ask a moderator, “So, should I click here to log in?” Rather than replying yes or no, a good moderator might ask, “What would you expect to happen if you clicked there?,” or might say, “Do whatever you would do if you were by yourself.”
	* In user interviews, search for 3 things: functionality (right benefit), UX design and messaging (copy). Create a table and track the patterns to understand how strong is the finding
	* In the lean startup, the step "build" simply means having something to show to the customers, goal is to confirm your hypothesis. Hypothese > design > test > learn > ….

## Part III Building and Optimizing Your Product
1. Agile development
	* Waterfall, the team does not go to the next steps until the previous step is 100% complete. You define first requirements, then design everything, then you code everything. Waterfall method is still a good approach in some case: Nasa for instance… you don't want to send human to space with MVP, in this case the cost of change/error will be too high, it's better spend more times
	* Agile breaks the product into smaller pieces, shorter cycle of requirements, design, coding, design, no order, all in the same time
		* You react faster to change market with rapid delivery
		* You get fast customers feedbacks allowing you to have a better product market fit
	* Why breaking down large tasks into small ones ? To reduce the unknowns unknown and convert them into knowns unknowns
	* Scrum:  the team works in time-boxed increments—that is, limited to a specific timeframe.
	* Well-written: user stories include acceptance criteria, which are used to confirm when a story is completed and working as intended.
	* Kanban uses WIP limit to smooth work and improve velocity. 
	* Measure: throughput, which is just the number of work items completed in a given timeframe. Cycle time—the amount of time on average from when work starts on an item to when the item is delivered to the customer. Lead time, the amount of time on average from when a work item is created (e.g., requested by a customer) to when it is delivered.
	* The idea is that your lead time and cycle time should go down over time as your team makes process improvements and becomes more proficient.
	* Kanban tends to work best with smaller development teams. The lower process overhead and the lack of a predetermined iteration length can enable faster delivery of product.
	* QA: code review, pair programming
2. Analytics methods
	* In survey: don't forget to ask Why, after asking for a score
	* Revenue = ARPU*users
	* Avg customer lifetime = 1/churnRate. Example, if your churn rate is 5 percent per month, then your customer lifetime is 20 months.
	* LTV = ( ARPU * Gross Margin) / churnrate
	* Avoiding a local maximum by considering a completely different approach
3. 10 best practices for creating successful products.
	* Have a point of view but stay open-minded
	* Articulate your hypothesis by writing them down
	* Ruthless prioritization 
	* Keep your scope small but focus
	* Talk to your users
	* Test before you build
	* Avoid a local maximum
	* Try out promising tools and new techniques
	* Ensure your team had the right skills
    * Cultivate your team's collaboration