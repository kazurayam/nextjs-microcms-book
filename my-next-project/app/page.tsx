import styles from "./page.module.css";
import Image from "next/image";
import imgMv from "../public/img-mv.jpg";

export default function Home() {
  return (
    <section className={styles.top}>
      <div>
        <h1 className={styles.title}>テクノロジーの力で世界を変える</h1>
        <p className={styles.description}>わたしたちは市場をリードしているグローバルテックカンパニーです。</p>
      </div>
      <Image
        className={styles.bgimg}
        src={imgMv}
        alt=""
        //width={4000}    // automatically provided
        //height={1200}   // automatically provided
      />
    </section>
  );
}
