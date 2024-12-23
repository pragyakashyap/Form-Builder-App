import styles from "./landing.module.css";

const Landing = () => {
  return (
    <div>
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
          >
            Sign in
          </button>
          <button
            style={{
              backgroundColor: "#1A5FFF",
              color: "white",
              borderColor: "transparent",
            }}
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
          <button>Create a FormBot for free</button>
        </div>
        <div>
          <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1734768080/Container_y5u0fz.png" />
        </div>
      </div>
      <div className={styles.landingAd}>
        <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1734870694/Background_Blur_bcg6xq.png" />

        <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1734870694/Background_Blur_1_grbgbk.png" />
      </div>
      <div className={styles.landingadimg}>
        <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1734768081/image_1_ke9tbm.png" />
      </div>

      <div className={styles.landingFooter}>
        <div className={styles.footer1}>
          <div className={styles.footer1Top}>
            <img src="https://res.cloudinary.com/dft6bqu4v/image/upload/v1734768080/SVG_1_iveeul.png" />
            <h4>FormBot</h4>
          </div>
          <p style={{marginBottom:'0px'}}>Made with ❤️ by</p>
          <p style={{textDecoration:'underline',margin:'0px'}}>@cuvette</p>
        </div>
        <div className={styles.footer2}>
          <div className={styles.footer1Top}><h4>Product</h4></div>
          <div className={styles.footerContent}>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
