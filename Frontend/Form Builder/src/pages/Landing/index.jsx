import styles from "./landing.module.css";
import Share from "./Share.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Landing = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  useEffect(() => {
    document.body.style.backgroundColor = "#171923";
  }, []);
  return (
    <div className={styles.landing}>
      <div className={styles.landingHeader}>
        <div className={styles.leftLandingHeader}>
          <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1734768080/SVG_1_iveeul.png" />
          <h4>FormBot</h4>
        </div>
        <div className={styles.rightLandingHeader}>
          <button
            style={{
              borderColor: "#7EA6FF",
              backgroundColor: "#171923",
              color: "#7EA6FF",
            }}
            onClick={handleClick}
          >
            Sign in
          </button>
          <button
            style={{
              backgroundColor: "#1A5FFF",
              color: "white",
              borderColor: "transparent",
            }}
            onClick={handleClick}
          >
            Create a FormBot
          </button>
        </div>
      </div>
      <div className={styles.landingContent}>
        <div>
          <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1734768080/SVG_vhswpy.png" />
        </div>
        <div className={styles.loadingMidContent}>
          <div style={{ textAlign: "center" }}>
            <h1>Build advanced chatbots visually</h1>
          </div>
          <div style={{ textAlign: "center" }}>
            {" "}
            <p>
              Typebot gives you powerful blocks to create unique chat
              experiences. Embed them anywhere on your web/mobile apps and start
              collecting results like magic.
            </p>
          </div>
          <button onClick={handleClick}>Create a FormBot for free</button>
        </div>
        <div>
          <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1734768080/Container_y5u0fz.png" />
        </div>
      </div>
      <div>
        <div className={styles.landingAd}>
          {" "}
          <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1734870694/Background_Blur_bcg6xq.png" />
          <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1734870694/Background_Blur_1_grbgbk.png" />
        </div>
        <div className={styles.landingadimg}>
          <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1734768081/image_1_ke9tbm.png" />
        </div>
      </div>

      <div className={styles.landingFooter}>
        <div className={styles.footer1}>
          <div className={styles.footer1Top}>
            <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1734768080/SVG_1_iveeul.png" />
            <p>FormBot</p>
          </div>
          <p style={{ marginBottom: "0px" }}>Made with ❤️ by</p>
          <p style={{ marginTop: "0px", textDecoration: "underline" }}>
            @cuvette
          </p>
        </div>
        <div>
          <p>Product</p>
          <div className={styles.footerLink}>
            <p style={{ textDecoration: "underline" }}>Status</p>
            <img src={Share} />
          </div>
          <div className={styles.footerLink}>
            <p style={{ textDecoration: "underline" }}>Documentation</p>
            <img src={Share} />
          </div>
          <div className={styles.footerLink}>
            <p style={{ textDecoration: "underline" }}>Roadmap</p>
            <img src={Share} />
          </div>
          <div className={styles.footerLink}>
            <p style={{ textDecoration: "underline" }}>Pricing</p>
          </div>
        </div>
        <div>
          <p>Community</p>
          <div className={styles.footerLink}>
            <p style={{ textDecoration: "underline" }}>Discord</p>
            <img src={Share} />
          </div>
          <div className={styles.footerLink}>
            <p style={{ textDecoration: "underline" }}>GitHub repository</p>
            <img src={Share} />
          </div>
          <div className={styles.footerLink}>
            <p style={{ textDecoration: "underline" }}>Twitter</p>
            <img src={Share} />
          </div>
          <div className={styles.footerLink}>
            <p style={{ textDecoration: "underline" }}>LinkedIn</p>
            <img src={Share} />
          </div>
          <div className={styles.footerLink}>
            <p style={{ textDecoration: "underline" }}>OSS Friends</p>
          </div>
        </div>
        <div>
          <p>Company</p>
          <div className={styles.footerLink}>
            <p style={{ textDecoration: "underline" }}>About</p>
          </div>
          <div className={styles.footerLink}>
            <p style={{ textDecoration: "underline" }}>Contact</p>
          </div>
          <div className={styles.footerLink}>
            <p style={{ textDecoration: "underline" }}>Terms of Service</p>
          </div>
          <div className={styles.footerLink}>
            <p style={{ textDecoration: "underline" }}>Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
