import "./blog.css";
import { Navbar, Footer} from "../../../App";
const BlogPost = () => {
  return (
    <div className="container">
      <article className="blog-post">
        <h1>Protecting Your Privacy Online</h1>
        <img src="https://media.kasperskydaily.com/wp-content/uploads/sites/92/2015/11/06023651/privacy-10x10-featured.jpg" alt="Online Privacy Protection" className="blog-image" />
        <p>In the digital age, maintaining online privacy is more important than ever. Hackers, advertisers, and even social media platforms can track and use your personal information. Here’s how to protect your privacy online.</p>
        <h2>1. Strengthen Your Passwords</h2>
        <p>Use strong and unique passwords for different accounts. Consider using a password manager to generate and store them securely.</p>
        <h2>2. Enable Two-Factor Authentication (2FA)</h2>
        <p>Adding an extra layer of security by enabling 2FA makes it harder for hackers to access your accounts, even if they have your password.</p>
        <h2>3. Adjust Privacy Settings</h2>
        <ul>
          <li><b>Social Media:</b> Limit who can see your posts and personal details.</li>
          <li><b>Browsers:</b> Disable tracking cookies and use private browsing modes.</li>
          <li><b>Apps:</b> Review app permissions and restrict unnecessary access.</li>
        </ul>
        <h2>4. Avoid Public Wi-Fi for Sensitive Tasks</h2>
        <p>Public Wi-Fi networks are not secure. Avoid logging into banking or other sensitive accounts when using them.</p>
        <h2>5. Be Cautious with Personal Information</h2>
        <p>Think twice before sharing personal details online. Scammers can use small pieces of information to impersonate or target you.</p>
        <h2>6. Use a VPN for Added Security</h2>
        <p>A Virtual Private Network (VPN) encrypts your internet traffic, making it harder for hackers or advertisers to track your activity.</p>
        <p className="conclusion">By following these steps, you can significantly reduce the risks associated with online privacy threats and keep your personal information safe.</p>
      </article>
    </div>
  );
};


const PrivacyBlog = () => {
  return (
    <div>
      <Navbar />
      <BlogPost />
      <Footer />
    </div>
  );
};

export default PrivacyBlog;
