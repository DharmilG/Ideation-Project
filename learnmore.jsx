import React from 'react';
import {Navbar, Footer } from '../../App';
import './Learnmore.css';

const Learnmore = () => {
  const sections = [
    {
      title: "What is Cyberbullying and How to Prevent It?",
      content: [
        "Cyberbullying is harassment or bullying that takes place over digital devices like phones, computers, or tablets. It includes mean comments, threats, sharing private information without consent, and online shaming.",
      ],
      subTitle: "How to Prevent Cyberbullying?",
      listItems: [
        "Think before you post – avoid sharing sensitive personal details.",
        "Block and report bullies on social media platforms.",
        "Do not respond to hateful messages; instead, save evidence and report them.",
        "Encourage open communication with parents, teachers, or trusted adults.",
      ],
    },
    {
      title: "How to Identify and Stop Fake News?",
      content: [
        "Fake news spreads misinformation and can be harmful. It is designed to manipulate opinions, mislead people, or cause panic.",
      ],
      subTitle: "Ways to Identify Fake News:",
      listItems: [
        "Check the source – Reliable news comes from credible websites and journalists.",
        "Look for multiple sources – Cross-check the information with other news sites.",
        "Verify images – Use reverse image searches to see if photos are real or edited.",
        "Watch out for emotional manipulation – If a headline sounds too shocking or biased, it might be fake.",
      ],
    },
    {
      title: "Best Practices to Protect Your Online Privacy",
      content: [
        "Protecting your online privacy is crucial to avoid data theft, identity fraud, and cyber threats.",
      ],
      subTitle: "How to Secure Your Data?",
      listItems: [
        "Use strong, unique passwords for different accounts.",
        "Enable two-factor authentication (2FA) wherever possible.",
        "Be cautious about sharing personal details on social media.",
        "Keep software and antivirus programs updated.",
        "Regularly review privacy settings on social media and online accounts.",
      ],
    },
    {
      title: "How to Report Cyberbullying, Fake News, or Privacy Violations?",
      content: [
        "If you encounter harmful content, it's important to report it. Here’s how:",
      ],
      listItems: [
        "Social Media: Use built-in reporting options on platforms like Facebook, Instagram, and Twitter.",
        "Government Cybercrime Units: Many countries have official cybercrime portals where you can file complaints.",
        "Local Authorities: If online harassment turns into serious threats, report to the police.",
      ],
    },
  ];

  return (
    <div className="learnmore-container">
        <Navbar />
      <div className="learnmore-content">
        <h1 className="learnmore-title">Online Safety Awareness</h1>
        <p className="learnmore-subtitle">Stay informed and protect yourself online.</p>

        {sections.map((section, index) => (
          <section className="learnmore-section" key={index}>
            <h2 className="learnmore-section-title">{section.title}</h2>
            {section.content && section.content.map((text, idx) => (
              <p className="learnmore-text" key={idx}>{text}</p>
            ))}
            {section.subTitle && (
              <>
                <h3 className="learnmore-subsection-title">{section.subTitle}</h3>
                <ul className="learnmore-list">
                  {section.listItems.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </section>
        ))}
        <div className='extra' style={{lineHeight:1.7, marginBottom:"10px",}}>
            <li style={{lineHeight:1.7, marginBottom:"10px",color:"#4b5563",}}>Social Media: Use built-in reporting options on platforms like Facebook, Instagram, and Twitter.</li>
            <li style={{lineHeight:1.7, marginBottom:"10px",color:"#4b5563",}}>Government Cybercrime Units: Many countries have official cybercrime portals where you can file complaints.</li>
            <li style={{lineHeight:1.7, marginBottom:"10px",color:"#4b5563",}}>Local Authorities: If online harassment turns into serious threats, report to the police.</li>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Learnmore;