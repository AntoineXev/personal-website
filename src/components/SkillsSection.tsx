"use client"
import clsx from "clsx";
import {forwardRef, Ref, useRef} from "react";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
// gsap.registerPlugin(useGSAP);

const SkillCard = forwardRef((props: any, ref: any) => {
	return (
		<div ref={ref} {...props} className={clsx("relative shadow-xl rounded-xl p-3 bg-zinc-50", props.className)}>
			<p className="rounded-md p-3 border border-amber-100 bg-amber-50 text-xl text-amber-500">
				Product Design
			</p>
		</div>
	)
})

export function SkillsSection () {
	const skillCardRef1 = useRef<HTMLDivElement>(null);
	const skillCardRef2 = useRef<HTMLDivElement>(null);
	const skillCardRef3 = useRef<HTMLDivElement>(null);
	const skillCardRef4 = useRef<HTMLDivElement>(null);
	const pinRef = useRef<HTMLDivElement>(null);
	useGSAP(() => {
		gsap.registerPlugin(ScrollTrigger);
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: pinRef.current,
				pin: pinRef.current,
				start: 'top top',    // Trigger when the top of the box hits the center of the viewport
				end: 'bottom top',
				markers: true,// End when the bottom of the box reaches the top of the viewport
				scrub: true,
				anticipatePin: 1
			}
		})
		tl.addLabel('start')
			.to(skillCardRef1.current, {
			x: '60%',
			y: '90%',
			rotation:16,
		})
			.addLabel('2nd icon')
			.to(skillCardRef2.current, {
				x: '-65%',
				y: '120%',
				rotation:-12
			})
			.to(skillCardRef3.current, {
				x: '50%',
				y: '-150%',
				rotation:-10
			})
			.to(skillCardRef4.current, {
				x: '-50%',
				y: '-150%',
				rotation:20
			})
			.addLabel('end');
	});
	return (
		<section ref={pinRef} className="h-screen z-0 relative flex flex-col items-center justify-center">
			<h2
				className="font-medium text-9xl leading-normal text-center tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-9xl">
				Top skills
			</h2>
			<div className="absolute grid-rows-4 grid-cols-1 md:grid-cols-2 grid md:grid-rows-2 left-0 right-0 bottom-0 top-0 z-10">
				<SkillCard ref={skillCardRef1} className="m-auto -translate-x-[200%]"/>
				<SkillCard ref={skillCardRef2} className="m-auto translate-x-[200%]"/>
				<SkillCard ref={skillCardRef3} className="m-auto -translate-x-[200%]"/>
				<SkillCard ref={skillCardRef4} className="m-auto translate-x-[200%]"/>
			</div>
		</section>

	)
}