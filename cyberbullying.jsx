import "./blog.css";
import { Navbar, Footer } from "./App";
const BlogPost = () => {
  const sections = [
    {
      title: "1. Recognizing Cyberbullying",
      content: "Cyberbullying includes threats, hate speech, spreading rumors, or impersonation. It often happens on social media, messaging apps, and gaming platforms."
    },
    {
      title: "2. Steps to Prevent Cyberbullying",
      content: "",
      tips: [
        "Think before you post: Avoid sharing personal information online.",
        "Adjust privacy settings: Limit who can see your posts and contact you.",
        "Block and report: If someone is harassing you, block them and report the behavior."
      ]
    },
    {
      title: "3. How to Respond to Cyberbullying",
      content: "Here’s what you can do if you or someone you know is a victim of cyberbullying:",
      tips: [
        "Stay calm: Do not respond to the bully’s messages.",
        "Document the evidence: Take screenshots of harmful messages or posts.",
        "Report the abuse: Use the reporting tools on social media platforms.",
        "Seek help: Talk to a trusted adult, teacher, or counselor."
      ]
    },
    {
      title: "4. Reporting Cyberbullying",
      content: "If cyberbullying violates platform policies, report it to the respective social media or website administrators. If threats are involved, contact local authorities."
    }
  ];

  return (
    <div className="container">
      <article className="blog-post">
        <h1>Cyberbullying: What You Can Do</h1>
        <img src="https://cdn.mos.cms.futurecdn.net/xLWijuzjuxAbGKXQAE2NCJ-1200-80.png" alt="Cyberbullying Awareness" className="blog-image" />
        <p>Cyberbullying is a serious issue that affects millions of people worldwide. It can take many forms, such as harassment, spreading false information, or sharing personal content without consent.</p>
        {sections.map((section, index) => (
          <div key={index}>
            <h2>{section.title}</h2>
            <p>{section.content}</p>
            {section.tips && (
              <ul>
                {section.tips.map((tip, idx) => (
                  <li key={idx}><b>{tip.split(":")[0]}:</b>{tip.split(":")[1]}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
        <p className="conclusion">By taking these steps, you can help create a safer online environment for yourself and others. Speak up and take action against cyberbullying!</p>
      </article>
    </div>
  );
};

const CyberbullyingBlog = () => {
  return (
    <div>
      <Navbar />
      <BlogPost />
      <Footer />
    </div>
  );
};

export default CyberbullyingBlog;
