import styles from "./Hero.module.css";
import GetStartedButton from "@/components/homepage/cta/GetStartedButton/GetStartedButton";

const Hero = () => {
  return (
    <section id={"home"} className={styles.hero}>
      <div className={styles.content}>
        <h1>Helios: Smart Solar Savings</h1>
        <p>
          Transform sunlight into smart savings with real-time, personalized ROI
          insights.
        </p>
      </div>
      <div>
        <GetStartedButton />
      </div>
    </section>
  );
};

export default Hero;
