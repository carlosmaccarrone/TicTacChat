import styles from '@/pages/Nickname/TitleSection/TitleSection.module.css';

const TitleSection = ({ title, subtitle }) => {
  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </>
  );
}

export default TitleSection;