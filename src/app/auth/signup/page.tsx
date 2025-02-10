import SignUp from "@/components/auth/SignUp/SignUp";
import styles from "./page.module.css";

const page = () => {
  return (
    <div className={styles.container}>
      <SignUp />
    </div>
  );
};

export default page;
