"use client"
import {Container} from "@/components/Container";
import Image from "next/image";
import HeroImage from "@/images/hero-image.png";
import {useRef} from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function HeroSection() {
	const imageRef = useRef<HTMLDivElement>(null);
	useGSAP(() => {
		gsap.to(imageRef.current, {
			y: '-535px',
			rotation:10,
			transformOrigin:"left 50%"
		});
	});
	return (
		<>
			<Container className="px-0 pt-36 h-[100vh] overflow-hidden snap-center" >
				<div className="max-w-4xl mx-auto flex flex-col items-center">
					<div
						className="bg-green-50 dark:bg-green-950 dark:text-green-600 text-green-800 px-3 py-1 rounded-full mb-6 flex items-center justify-center gap-2">
						<div className="relative flex h-3 w-3">
              <span
	              className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
							<span className="relative inline-flex h-3 w-3 rounded-full bg-green-600"></span>

						</div>
						Available
					</div>
					<h1
						className="font-medium text-3xl leading-normal text-center tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
						Mobile & web designer, Developper, and entrepreneur
					</h1>
					<div className="flex gap-6 w-[650px] mt-96 md:max-w-lg z-0" ref={imageRef}>
						<Image src={HeroImage} alt="iphone" />
					</div>
				</div>
			</Container>
			<div className="relative w-full h-16 z-10   border-t   border-gray-200 dark:border-gray-800" style={{boxShadow:  '0px -15px 15px rgba(0, 0, 0, 0.2)'}}></div>
		</>
	)
}