# how-blast-works

[Check out the live deployment of this app here](https://how-blast-works.vercel.app/), current up to the latest successful build.

This project is an instructional website exploring a topic at the intersection of biology and computer science: pairwise sequence alignment. It is a staged introduction to the antecedents and principles of NCBI's BLAST, one of the more popular pairwise sequence alignment tools on the Internet. Reference will also be made to similar tools maintained by the EBI. 

Section 1 is currently presentable, and the short term goal is to implement Section 2, an interactive lesson on local alignment, by re-using as many of Section 1's view components as possible. In particular, I would like the "sandbox" element, which runs sequence alignment on any two input strings and three parameters and then stores the answers to validate user input, to be used for both global alignment and local alignment problems.

![Sandbox GIF](/demo_assets/sandbox.gif)

This app has a React frontend, routing and middleware by Next.js, and a Flask API that runs a Python module implementing the sequence alignment algorithms. User input is supplied from the client to the Flask API by way of a Next.js server API. Presets are stored as static assets (JSON files in /public/json) and are fetched to render some of the elements on each page.

## Other Links

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
