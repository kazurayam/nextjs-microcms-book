import styles from "./page.module.css";
import ContactForm from "@/app/_components/ContactForm";
/**
 * section 9-1-4
 */
export default function Page() {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        ご質問、ご相談は下記フォームよりお問い合わせください。
        <br />
        内容確認後、担当者より通常３営業日以内にご連絡いたします。
      </p>
      <ContactForm />
    </div>
  );
}
