"use client";

import styles from "./index.module.css";
import { useEffect } from 'react';

export default function ContactForm() {
  if (!process.env.NEXT_PUBLIC_FORMRUN_FORM_URL_PATH) {
    throw new Error("NEXT_PUBLIC_FORMRUN_FORM_URL_PATH is required");
  }
  useEffect(() => {
    console.log(`The ContactForm compnent was rendered`)
    /* generate the following stuff in the DOM
    <div id="embededForm">
      <script src="https://sdk.form.run/js/v2/embed.js"></script>
      <div
        class="formrun-embed"
        data-formrun-form=`${NEXT_PUBLIC_FORMRUN_FORM_URL_PATH}`
        data-formrun-redirect="false">
      </div>
    </div>
    */
    const form = document.getElementById("embededForm");
    const containerDiv = form?.querySelector('div'); // child div element
    if (containerDiv === null) { // insert iframe only if it is not yet there
      const script = document.createElement("script");
      script.setAttribute("src", "https://sdk.form.run/js/v2/embed.js");
      script.async = true;
      form?.appendChild(script);

      const embed = document.createElement("div");
      embed.className = "formrun-embed";
      embed.setAttribute("data-formrun-form", `${process.env.NEXT_PUBLIC_FORMRUN_FORM_URL_PATH}`);
      embed.setAttribute("data-formrun-redirect", "false");
      form?.appendChild(embed);

      return () => {
        form?.removeChild(script);
      }
    }
  }, []);

  return (
    <>
      <div id="embededForm" className={styles.form}></div>
    </>
  );
}
