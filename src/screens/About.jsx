import telemoniLogo from "../assets/app_icon.png"; // Update the path as needed
import "./about.css"; // Ensure you create this CSS file

const About = () => {
  return (
    <div className="main-container">

    <div className="about-container">
      <img src={telemoniLogo} alt="Telemoni Logo" className="logo" />
      <h1 className="title">Telemoni</h1>
      <p className="description">
        Telemoni is a cutting-edge platform that empowers artists to showcase and
        sell their digital art effortlessly. We believe in providing a seamless,
        secure, and innovative space for creators to connect with buyers and
        monetize their creativity in the ever-expanding digital marketplace.
      </p>
      <p className="description">
        Our mission is to bridge the gap between art and technology, offering a
        user-friendly experience that fosters artistic growth and financial
        independence. Whether you`re an emerging talent or an established artist,
        Telemoni provides the tools you need to reach a global audience and turn
        your passion into a thriving business.
      </p>
    </div>
    </div>
  );
};

export default About;
