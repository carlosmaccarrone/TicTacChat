import TitleSection from '@/pages/Nickname/TitleSection/TitleSection';
import NicknameForm from '@/pages/Nickname/NicknameForm/NicknameForm';
import styles from '@/pages/Nickname/NicknamePage.module.css';

export default function NicknamePage() {
  return (
    <div className={styles.container}>
      <TitleSection title="Tic-Tac-Chat" subtitle="Pick a nickname" />
      <NicknameForm />
    </div>
  );
}