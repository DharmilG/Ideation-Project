import "./eduhub.css";
import { Navbar, Footer } from "../../App";

const Header = () => {
  return (
    <header className="eduhub-header">
      <h1>Education Hub</h1>
      <p>Learn about online safety, cyberbullying prevention, and fake news detection.</p>
    </header>
  );
};

const Article = ({ title, description, link }) => {
  return (
    <div className="eduhub-article-box">
      <h2>{title}</h2>
      <p>{description}</p>
      <a href={link}>
        <button className="eduhub-btn">Read More</button>
      </a>
    </div>
  );
};

const Articles = () => {
  return (
    <section className="eduhub-articles">
      <Article
        title="How to Spot Fake News"
        description="Learn key indicators of misinformation and how to verify sources."
        link="/eduhub/fakenews"
      />
      <Article
        title="Cyberbullying: What You Can Do"
        description="Understand cyberbullying and take action to prevent or report it."
        link="/eduhub/cyberbulling"
      />
      <Article
        title="Protecting Your Privacy Online"
        description="Tips on securing personal data and staying safe on the internet."
        link="/eduhub/privacy"
      />
    </section>
  );
};

const EduHub = () => {
  return (
    <div className="eduhub-container">
      <Navbar />
      <Header />
      <Articles />
      <Footer />
    </div>
  );
};

export default EduHub;