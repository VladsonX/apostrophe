// Fills an empty Apostrophe backend with demo content so the apps look alive.
// Usage: API_URL=https://your-backend node scripts/seed-demo.mjs
// Creates (or reuses) a demo account that recruiters can log in with.

const API_URL = process.env.API_URL ?? "http://localhost:8080";
const DEMO_EMAIL = process.env.DEMO_EMAIL ?? "demo@apostrophe.dev";
const DEMO_PASSWORD = process.env.DEMO_PASSWORD ?? "Demo12345!";

async function request(path, { method = "GET", body, token } = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body && JSON.stringify(body),
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`${method} ${path} -> ${response.status}: ${text}`);
  return text ? JSON.parse(text) : null;
}

const login = async (targetSystem) =>
  (
    await request("/auth/login", {
      method: "POST",
      body: { email: DEMO_EMAIL, password: DEMO_PASSWORD, targetSystem },
    })
  ).jwt;

const paragraph = (text) => `<p>${text}</p>`;

const CHANNELS = [
  {
    name: "Frontend Notes",
    description: "Short, practical write-ups about React, CSS and the modern web platform.",
    topics: [
      { name: "React", description: "Hooks, state management and component design." },
      { name: "CSS", description: "Layouts, responsive design and Sass tricks." },
    ],
    posts: [
      {
        topic: "React",
        title: "Stop prop drilling: a gentle intro to React Context",
        postSnippet: "When three components in a row only pass a prop along, it is time for Context.",
        content: [
          "Prop drilling happens when data travels through components that do not need it.",
          "React Context lets a deep child read a value directly from a provider above it.",
          "Use it for app-wide things like the current user or theme, not for every piece of state.",
        ],
      },
      {
        topic: "CSS",
        title: "Grid vs Flexbox: which one and when",
        postSnippet: "Flexbox is for one direction, Grid is for two. Here is how to choose quickly.",
        content: [
          "Flexbox shines when items flow in a single row or column.",
          "CSS Grid is better when you control rows and columns at the same time.",
          "Most real layouts combine both: Grid for the page, Flexbox inside components.",
        ],
      },
    ],
  },
  {
    name: "Lublin Tech Life",
    description: "Stories about studying and working in tech in Lublin, Poland.",
    topics: [],
    posts: [
      {
        title: "From EPAM Frontend Fundamentals to a real project",
        postSnippet: "What eight weeks of HTML, Sass, JavaScript and TypeScript look like in practice.",
        content: [
          "The program covered advanced CSS, JavaScript, async code and TypeScript in eight weeks.",
          "The capstone was a multi-page e-shop built without frameworks.",
          "The best part was turning theory into a working, deployed project.",
        ],
      },
    ],
  },
];

async function main() {
  try {
    await request("/auth/registration", {
      method: "POST",
      body: { email: DEMO_EMAIL, password: DEMO_PASSWORD, name: "Demo", surname: "User" },
    });
    console.log(`Registered ${DEMO_EMAIL}`);
  } catch {
    console.log(`${DEMO_EMAIL} already exists, reusing it`);
  }

  const studioToken = await login("STUDIO");
  const existing = await request("/api/v1/channels", { token: studioToken });

  for (const seed of CHANNELS) {
    if (existing.some((channel) => channel.name === seed.name)) {
      console.log(`Channel "${seed.name}" exists, skipping`);
      continue;
    }

    const channel = await request("/api/v1/channels", {
      method: "POST",
      token: studioToken,
      body: {
        name: seed.name,
        description: seed.description,
        topicsEnabled: seed.topics.length > 0,
        ...(seed.topics.length && { topics: seed.topics }),
      },
    });

    const topicIds = Object.fromEntries(
      (channel.topics ?? []).map((topic) => [topic.name, topic.topicId])
    );

    for (const post of seed.posts) {
      await request("/api/v1/posts", {
        method: "POST",
        token: studioToken,
        body: {
          title: post.title,
          postSnippet: post.postSnippet,
          content: post.content.map(paragraph).join(""),
          channel: { channelId: channel.channelId },
          ...(post.topic && { topic: { topicId: topicIds[post.topic] } }),
        },
      });
    }
    console.log(`Created channel "${seed.name}" with ${seed.posts.length} posts`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
