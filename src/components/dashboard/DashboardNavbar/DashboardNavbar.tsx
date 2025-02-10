import SignOutButton from "@/components/auth/SignOutButton/SignOutButton";
import styles from "./DashboardNavbar.module.css";

const DashboardNavbar = () => {
  return (
    <nav className={styles.navbar}>
      <h1>Dashboard</h1>
      <SignOutButton />
    </nav>
  );
};

export default DashboardNavbar;
