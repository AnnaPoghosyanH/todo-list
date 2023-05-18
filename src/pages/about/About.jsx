import styles from "./about.module.css";

function About() {
  return (
    <div className="m-5 p-5 text-center">
      <h1 className={styles.h1}>Organize your work and life.</h1>
      <h3 className={styles.h3}>
        Become focused, organized, and manage your daily activities.{" "}
      </h3>
      <h3 className={styles.h3}> One of the best todo list apps. </h3>
    </div>
  );
}

export default About;
