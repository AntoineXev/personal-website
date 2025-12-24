import { Button } from "@/components/Button";
import clsx from "clsx";
import Image from "next/image";

export interface ProjectExcerptProps {
    align?: 'left' | 'right' | 'center',
    image: {
        src: string
    },
    title: string,
    subtitle: string,
    href: string,
    buttonText: string,
    imageAlt: string,
}

export function ProjectExcerpt ({
                                    className,
                                    ...props
                                }: React.ComponentPropsWithoutRef<'div'> &
    ProjectExcerptProps) {
    const {
        align,
        image,
        title,
        subtitle,
        href,
        buttonText,
        imageAlt
    } = props
    let wrapperClasses: string = 'text-left justify-start'
    let buttonClasses: string = 'mr-auto'
    let imgWrapperClasses: string = 'order-2 lg:gap-20'
    let imgContainerClasses: string = 'absolute left-0 hidden'
    let textWrapperClasses: string = 'max-w-[40rem] py-12 my-24'
    let imgClasses: string = 'h-full w-auto'
    if (align === 'right') {
        wrapperClasses = 'text-right justify-end lg:gap-20'
        buttonClasses = 'ml-auto'
        imgWrapperClasses = 'order-0'
        imgContainerClasses = 'absolute right-0 hidden'
    } else if (align === 'center') {
        wrapperClasses = 'text-center justify-center flex-col gap-16'
        buttonClasses = 'mx-auto'
        imgWrapperClasses = 'order-0 max-h-[20rem] mx-auto'
        imgContainerClasses = 'h-full'
        imgClasses = 'md:h-full md:w-auto h-auto w-full'
        textWrapperClasses = ''
    }
    return (
        <div className="h-screen flex flex-col justify-center">
            <div className={clsx(wrapperClasses, "flex")}>
                <div className={clsx(textWrapperClasses, "flex flex-col order-1 w-full")}>
                    <h2 className="text-4xl tracking-tight sm:text-4xl mb-5">{title}</h2>
                    <p className="text-sm">{subtitle}</p>
                    <Button className={clsx(buttonClasses, 'mt-8')} href={href} target={'_blank'} hasArrow>
                        {buttonText}
                    </Button>
                </div>
                <div className={clsx(imgWrapperClasses, "flex-grow relative")}>
                    <div
                        className={clsx(imgContainerClasses, "top-0 bottom-0 lg:block rounded-md")}>
                        <Image width={500} height={500} alt={imageAlt} className={clsx(imgClasses, "max-w-none")} src={image.src}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
