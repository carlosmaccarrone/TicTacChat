import styles from '@/pages/Nickname/NicknamePage.module.css';
import TitleSection from '@/pages/Nickname/TitleSection';
import NicknameForm from '@/pages/Nickname/NicknameForm';

export default function NicknamePage() {
  return (
    <div className={styles.container}>
      <TitleSection title="Tic-Tac-Toe" subtitle="Pick a nickname" />
      <NicknameForm />
    </div>
  );
}