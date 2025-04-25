import "./blog.css";
import { Navbar, Footer } from "./App";

const BlogPost = () => {
  const sections = [
    {
      title: "1. Check the Source",
      content: "Verify if the news is from a credible and well-known source. Look for official domains like .gov or .edu."
    },
    {
      title: "2. Look for Bias",
      content: "Fake news often uses emotional or extreme language. Be wary of headlines that provoke strong reactions."
    },
    {
      title: "3. Verify with Other Sources",
      content: "Compare the news with multiple sources. If only one outlet reports it, it may not be trustworthy."
    },
    {
      title: "4. Fact-Checking Websites",
      content: "Use trusted fact-checking sites like Snopes, FactCheck.org, and our own Report Hub to verify claims."
    },
    {
      title: "5. Check the Date",
      content: "Outdated articles can be misleading when presented as new. Always verify the publication date."
    },
    {
      title: "6. Examine the Author",
      content: "Look for an author's credentials. Fake news often lacks author details or uses anonymous sources."
    }
  ];

  return (
    <div className="container">
      <article className="blog-post">
        <h1>How to Spot Fake News</h1>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2lpfeG-l-6xXMYvPZbW3otPx5taHij0URMA&s" alt="Fake News Illustration" className="blog-image" />
        <p>With misinformation spreading rapidly, it's crucial to identify fake news. Here are key indicators:</p>
        {sections.map((section, index) => (
          <div key={index}>
            <h2>{section.title}</h2>
            <p>{section.content}</p>
          </div>
        ))}
        <p className="conclusion">By following these steps, you can prevent the spread of misinformation and ensure a safer online environment.</p>
      </article>
    </div>
  );
};


const FakeNewsBlog = () => {
  return (
    <div>
      <Navbar />
      <BlogPost />
      <Footer />
    </div>
  );
};

export default FakeNewsBlog;
