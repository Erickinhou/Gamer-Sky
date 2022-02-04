import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../../styles/Navbar.module.scss";

const Navbar = () => {
  return (
    <>
      <navbar className={styles.navbar}>
        <Image width={50} height={50} src="/images/logo.png" alt="Fox-logo" />
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/">About</Link>
          </li>
          <li>
            <Link href="/">Contact Us</Link>
          </li>
        </ul>
      </navbar>
    </>
  );
};

export default Navbar;
