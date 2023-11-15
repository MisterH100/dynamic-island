"use client";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";


export default function Navbar() {
    const [section,setSection] = useState("about");
    const [icon, setIcon] = useState("/contact.svg")
    const [showNav, setShowNav] = useState<boolean>(false);
    const [hidden, setHidden] = useState<boolean>(false);
    const { scrollY } = useScroll();
  
    useMotionValueEvent(scrollY, "change", (latest: any) => {
        const previous = scrollY.getPrevious();

        if (latest > previous && latest > 150) {
            setHidden(true);
            setShowNav(false);

            if(latest < 600){
                setSection("about");
                setIcon("/contact.svg");
            }
            if(latest> 600 && latest < 1200){
                setSection("skills");
                setIcon("/skills.svg");
            }
            if(latest> 1200){
                setSection("projects");
                setIcon("/projects.svg");
            }
            
        }   else {
            setHidden(false);
        }
        if(latest < previous && latest > 150){
            setHidden(true)
        }
    });

  return (
    <motion.nav
      className={`fixed inset-0 top-4 w-[95%] sm:w-[90%] mx-auto bg-blue-600 font-medium flex max-sm:justify-between gap-4 px-3 max-w-7xl items-center rounded-full text-white h-14 p-5 overflow-hidden `}
      variants={{
        long: { maxWidth: 950 },
        short: { maxWidth: 280 },
        hideNav: {
          height: 56,
          borderRadius: 50,

          alignItems: "center",
          transition: { delay: 0, duration: 0.3 },
        },
        showNav: {
          height: 200,
          borderRadius: 22,
          alignItems: "start",
          transition: { delay: 0 },
        },
      }}
      initial={"short"}
      animate={[hidden ? "short" : "long", showNav ? "showNav" : "hideNav"]}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 80,
        damping: 14,
      }}
    >
      <div className="min-w-[40px] min-h-[40px] rounded-full gap-2 bg-slate-50 flex items-center justify-center">
        <Image 
            src={hidden?icon: "/contact.svg"}
            alt="logo" 
            width={20} 
            height={20} 
        />
      </div>
      <motion.ul
        className={`w-full ${
          showNav
            ? "flex flex-col items-center max-sm:pt-10"
            : "flex items-center justify-center"
        } [--opacity-from:0.1] [--opacity-to:1]  gap-10 max-sm:gap-5`}
        variants={{
          hidden: {
            display: "none",
            opacity: 1,
            transition: { duration: 0.6, delay: 0 },
          },
          visible: {
            display: "flex",
            opacity: 1,
            transition: { duration: 0.6, delay: 0 },
          },
        }}
        initial={"hidden"}
        animate={[
          hidden && !showNav ? "hidden" : "visible",
          showNav ? "visible" : "",
        ]}
      >
        <li className={`${section == "about"? "bg-slate-50 text-black p-2 rounded-lg": ""}`}>
          <Link 
            href={"#about"}
            className="flex items-center gap-2"
            >
            {"/About"}
            {showNav && section == "about"?
                <Image
                    src={"/rightchevron.svg"}
                    alt="right chevron" 
                    width={10} 
                    height={10} 
                />: null
            }
          </Link>
        </li>
        <li className={`${section == "skills"? "bg-slate-50 text-black p-2 rounded-lg": ""}`}>
          <Link 
            href={"#skills"}
            className="flex items-center gap-2">
            {"/Skills"}
            {showNav && section == "skills"?
                <Image
                    src={"/rightchevron.svg"}
                    alt="right chevron" 
                    width={10} 
                    height={10} 
                />: null
            }
            </Link>
        </li>
        <li className={`${section == "projects"? "bg-slate-50 text-black p-2 rounded-lg": ""}`}>
          <Link href={"#projects"}
          className="flex items-center gap-2">
            {"/Projects"}
            {showNav && section == "projects"?
                <Image
                    src={"/rightchevron.svg"}
                    alt="right chevron" 
                    width={10} 
                    height={10} 
                />: null
            } 
          </Link>
        </li>
      </motion.ul>

      <motion.div
        className="w-full inline-block bg-slate-50 text-black rounded-lg p-2"
        variants={{
          hidden: {
            display: "none",
            transition: { delay: 0, duration: 0.3 },
          },
          visible: {
            display: "flex",
            transition: { delay: 0.2, duration: 0.3 },
          },
        }}
        initial="hidden"
        animate={hidden ? "visible" : "hidden"}
      >
        <button className="w-full">{section}</button>
      </motion.div>
      <button
        className="min-w-[40px] min-h-[40px] rounded-full gap-2 bg-slate-50 flex items-center justify-center"
        onClick={() => {
          setHidden(showNav ? (window.scrollY > 150 ? true : false) : false);
          setShowNav((prev) => !prev);
        }}
      >
        <Image
          src={showNav ? "/upchevron.svg" :"/downchevron.svg"}
          alt="chevron"
          width={24}
          height={24}
        />
      </button>
    </motion.nav>
  );
}
