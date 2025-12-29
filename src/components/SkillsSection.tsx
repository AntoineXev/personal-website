"use client"
import clsx from "clsx";
import {forwardRef, Ref, useEffect, useRef, useState} from "react";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import { LiquidGlass } from "./LiquidGlass";

const SkillCard = forwardRef((props: any, ref: any) => {
	const { label, ...otherProps } = props;
	return (
			<div ref={ref} {...otherProps} className={props.className}>
			<LiquidGlass  as="div" blur={1} style={{ '--glass-padding': '1rem', '--glass-bg': 'rgba(255, 255, 255, 0)' } as React.CSSProperties} className="relative rounded-[999px] p-3 md:p-5">

			<p className="rounded-3xl text-2xl text-amber-800 dark:text-amber-300">
				{label}
			</p>
			</LiquidGlass>

		</div>
	
	)
})

SkillCard.displayName = "SkillCard"

export function SkillsSection () {
	const skillCardRef1 = useRef<HTMLDivElement>(null);
	const skillCardRef2 = useRef<HTMLDivElement>(null);
	const skillCardRef3 = useRef<HTMLDivElement>(null);
	const skillCardRef4 = useRef<HTMLDivElement>(null);
	const pinRef = useRef<HTMLDivElement>(null);
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
		gsap.registerPlugin(ScrollTrigger);

		const tl = gsap.timeline({
			id: 'skills-tl',
			scrollTrigger: {
				id: 'skills-pin',
				trigger: pinRef.current,
				pin: pinRef.current,
				start: 'top top',    // Trigger when the top of the box hits the center of the viewport
				end: 'bottom top',
				scrub: true,
				anticipatePin: 1
			}
		})
		tl.addLabel('start')
			.to(skillCardRef1.current, {
				x: isMobile ? '20' : '20%',
				y: isMobile ? '220%':'170%',
				rotation: isMobile ? -8: 12,
			})
			.addLabel('2nd icon')
			.to(skillCardRef2.current, {
				x: isMobile ?'-10%': '-35%',
				y: isMobile ? '20%':'160%',
				rotation: isMobile ? 12: -12
			})
			.to(skillCardRef3.current, {
				x: isMobile ? '0%': '50%',
				y: isMobile ? '-150%': '-180%',
				rotation:-10
			})
			.to(skillCardRef4.current, {
				x: isMobile ?'-10%': '-50%',
				y: isMobile ? '-240%':'-180%',
				rotation:4
			})
			.addLabel('end');
	}, { dependencies: [isMobile], revertOnUpdate: true});
	return (
		<section id="skills-section" ref={pinRef} className="h-screen z-0 relative overflow-hidden flex flex-col items-center justify-center">
			<h2
				className="font-medium text-9xl leading-normal text-center tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-9xl">
				Top skills
			</h2>
			<div className="absolute overflow-hidden grid-rows-4 grid-cols-1 md:grid-cols-2 grid md:grid-rows-2 left-0 right-0 bottom-0 top-0 z-10">
				<SkillCard ref={skillCardRef1} className="m-auto -translate-x-[200%]" label="Design Produit"/>
				<SkillCard ref={skillCardRef2} className="m-auto translate-x-[200%]"  label="Pilotage de projets"/>
				<SkillCard ref={skillCardRef3} className="m-auto -translate-x-[200%]" label="Data manipulation"/>
				<SkillCard ref={skillCardRef4} className="m-auto translate-x-[200%]" label="Direction produit"/>
			</div>
		</section>

	)
}