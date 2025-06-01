"use client"
import clsx from "clsx";
import {forwardRef, Ref, useEffect, useRef, useState} from "react";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

const SkillCard = forwardRef((props: any, ref: any) => {
	const { label, ...otherProps } = props;
	return (
		<div ref={ref} {...otherProps} className={clsx("relative shadow-xl dark:bg-gray-900 rounded-xl p-3 bg-zinc-50", props.className)}>
			<p className="rounded-md p-3 border border-amber-100 bg-amber-50 text-xl text-amber-500 dark:border-none dark:bg-amber-900">
				{label}
			</p>
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
			scrollTrigger: {
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
			x: isMobile ? '0' : '60%',
			y: isMobile ? '50%':'70%',
			rotation: isMobile ? -8: 16,
		})
			.addLabel('2nd icon')
			.to(skillCardRef2.current, {
				x: isMobile ?'-20%': '-85%',
				y: isMobile ? '-90%':'-70%',
				rotation: isMobile ? 12: -12
			})
			.to(skillCardRef3.current, {
				x: isMobile ? '0%': '50%',
				y: '-150%',
				rotation:-10
			})
			.to(skillCardRef4.current, {
				x: isMobile ?'-10%': '-50%',
				y: '-150%',
				rotation:20
			})
			.addLabel('end');
	}, { dependencies: [isMobile], revertOnUpdate: true});
	return (
		<section ref={pinRef} className="h-screen z-0 relative overflow-hidden flex flex-col items-center justify-center">
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