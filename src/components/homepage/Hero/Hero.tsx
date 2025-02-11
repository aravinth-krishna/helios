import styles from "./Hero.module.css";
import GetStartedButton from "@/components/homepage/cta/GetStartedButton/GetStartedButton";

const Hero = () => {
  return (
    <section id={"home"} className={styles.hero}>
      <div className={styles.content}>
        <h1>Helios</h1>
        <h2>All your Solar needs in One place. </h2>
        <p>
          Your All-in-One Solar Platform: Data, Maps, News, Savings and much
          more.
        </p>
      </div>
      <div>
        <GetStartedButton />
      </div>
    </section>
  );
};

export default Hero;
