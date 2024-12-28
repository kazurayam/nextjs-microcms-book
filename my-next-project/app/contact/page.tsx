import styles from "./page.module.css";
import ContactForm from "@/app/_components/ContactForm";
/**
 * section 9-1-4
 */
export default function Page() {
  return (
    <div className={styles.container}>
      <ContactForm />
    </div>
  );
}
