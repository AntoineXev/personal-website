import clsx from "clsx";

function FeatureCard({dashClasses}: { dashClasses?: string }) {
	return (
		<div className="w-full flex flex-col overflow-hidden group">
			<div className="flex flex-col h-full p-4 md:p-6 gap-4">
				<Icon />
				<h3 className="mt-auto text-base font-medium">Build MVP</h3>
			</div>
			<DashSeparator className={clsx("text-gray-300 mt-auto", dashClasses)}/>
		</div>
	)
}

function MvpIcon() {
	return (<svg className="group-hover:translate-x-0.5 group-hover:rotate-12 animate" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
		<rect width="256" height="256" fill="none"/>
		<path
			d="M176,176a48,48,0,1,1,25.85-88.64A4,4,0,0,0,208,84V48a8,8,0,0,0-8-8H56a8,8,0,0,0-8,8V208a8,8,0,0,0,8,8H200a8,8,0,0,0,8-8V172a4,4,0,0,0-6.12-3.38C193.9,173.74,186.27,176.41,176,176Z"
			fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
	</svg>)
}

function Icon() {
	return(
		<div className="bg-gray-900 shadow-zinc-900/30 shadow-md h-16 w-16 rounded-2xl p-3 text-zinc-200">
			<MvpIcon />
		</div>
	)
}

function DashSeparator(props: React.ComponentPropsWithoutRef<'div'>) {
	return (
		<div {...props}>
			<svg width="4268" height="2" fill="none" id="svg-1020161455_141">
				<path stroke="currentColor" strokeDasharray="9 8" d="M.5 1h4267"></path>
			</svg>
		</div>
	)
}

export function FeaturesSection() {
	return (<>
		<section>
			<div className="my-12 px-4 flex flex-col gap-4 text-center">
			<h2 className="text-3xl font-medium">How can I help you ?</h2>
				<p className="text-base text-gray-500">Here is the kind of problems that I solve on a daily baisis</p>
			</div>
			<div className="w-full ">
				<DashSeparator className="text-gray-300"/>
				<div className="flex items-center ">
					<div className="mx-auto w-full max-w-7xl px-4 md:px-28 overflow-hidden">
						<DashSeparator className="text-gray-300 rotate-90 -translate-x-1/2"/>
						<DashSeparator className="text-gray-300 rotate-90 hidden md:block"/>

						<DashSeparator className="text-gray-300 rotate-90 translate-x-1/2"/>
						<div className="grid-cols-1 md:grid-cols-2 grid grid-rows-2">
							<FeatureCard/>
							<FeatureCard/>
							<FeatureCard dashClasses="md:hidden"/>
							<FeatureCard dashClasses="hidden"/>
						</div>
					</div>
				</div>
				<DashSeparator className="text-gray-300"/>
			</div>
		</section>
	</>)

}