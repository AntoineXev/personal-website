"use client"
import {Container} from "@/components/Container";
import Image from "next/image";
import HeroImage from "@/images/hero-image.png";
import {useEffect, useRef, useState} from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function HeroSection() {
	const imageRef = useRef<HTMLDivElement>(null);
	const [isMobile, setIsMobile] = useState<boolean>(false);
	useEffect(() => {
		if (typeof window !== "undefined") {
			const handleResize = () => {
				if(window?.innerWidth >= 768) {
					setIsMobile(false)
				} else {
					setIsMobile(true)
				}
			};
			handleResize()
		}
	}, []);
	useGSAP(() => {
		gsap.to(imageRef.current, {
			y: isMobile ? '-530px': '-565px',
			rotation:10,
			delay: 0.5,
			duration: 0.5,
			transformOrigin:"left 50%"
		});
	},  { dependencies: [isMobile], revertOnUpdate: true});
	return (
		<>
			<Container className="px-0 -mt-24 h-[100vh] overflow-hidden snap-center" >
				<div className="max-w-4xl  pt-48 mx-auto flex flex-col items-center">
					<h1
						className="font-medium text-3xl leading-normal text-center tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
						Entrepreneur, Créatif, <br/>& Digital Enthousiast
					</h1>
					<div className="flex gap-6 w-[600px] mt-96 md:w-[800px] z-0" ref={imageRef}>
						<Image src={HeroImage} alt="iphone" />
					</div>
				</div>
			</Container>
		</>
	)
}