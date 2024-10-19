import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import quickEmail from "../../assets/quick-email-2.png";
import noCoding from "../../assets/no-coding.jpg";
import Image from "next/image";

export function Benefits() {
  return (
    <>
      <div className="py-20">
        <p className="text-center font-bold text-3xl">Benefits</p>
        <div className="mt-6">
          <BentoGrid className="max-w-4xl mx-auto  md:auto-rows-[20rem]">
            {items.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                className={item.className}
                icon={item.icon}
              />
            ))}
          </BentoGrid>
        </div>
      </div>
    </>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);
const items = [
  {
    title: "Quick Email Setup",
    description:
      "Set up your email campaigns fast without any coding. Our AI takes your input and turns it into ready-to-use HTML emails so you can focus on crafting your message.",
    header: <Image src={quickEmail} alt="Innovation" className="" />,
    className: "md:col-span-2 border-gray-200 border-[1px]",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "No coding skills needed",
    description:
      "Users can create professional email designs without any technical knowledge.",
    header: (
      <Image
        src={noCoding}
        alt="Innovation"
        className="h-44 object-cover rounded-md"
      />
    ),
    className: "md:col-span-1 border-gray-200 border-[1px]",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    className: "md:col-span-1 border-gray-200 border-[1px]",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    className: "md:col-span-2 border-gray-200 border-[1px]",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];
