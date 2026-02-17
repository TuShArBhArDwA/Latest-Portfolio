"use client";
import { FaLocationArrow } from "react-icons/fa6";
import { projects } from "@/data";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { Button } from "./ui/moving-border";
import Link from "next/link";

const RecentProjects = () => {
  return (
    <div className="py-10" id="projects">
      <h1 className="heading">
        A small selection of{" "}
        <span className="text-purple">recent projects</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-4 md:gap-x-10 md:gap-y-4 mt-6">
        {projects.map((item) => (
          <div
            key={item.id}
            className="lg:min-h-[28rem] h-auto flex items-center justify-center sm:w-96 w-[80vw]"
          >
            <CardContainer className="inter-var">
              <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-96 w-[80vw] h-auto rounded-xl p-6 border">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  {item.title}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 line-clamp-2"
                >
                  {item.des}
                </CardItem>
                <CardItem
                  translateZ="100"
                  className="w-full mt-4"
                >
                  <img
                    src={item.img}
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt={item.title}
                  />
                </CardItem>
                <div className="flex justify-between items-center mt-6 md:mt-8">
                  <CardItem
                    translateZ={20}
                    as="a"
                    href={item.link}
                    target="__blank"
                    className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                  >
                    Check Live Site →
                  </CardItem>
                  <CardItem
                    translateZ={20}
                    as="div"
                    className="flex items-center"
                  >
                    {item.iconLists.map((icon, index) => (
                      <div
                        key={index}
                        className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                        style={{
                          transform: `translateX(-${5 * index + 2}px)`,
                        }}
                      >
                        <img src={icon} alt="icon" className="p-2" />
                      </div>
                    ))}
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </div>
        ))}
      </div>
      <div className="mt-16 flex justify-center w-full">
        <Link href="https://github.com/TuShArBhArDwA" target="_blank">
          <Button
            borderRadius="1.75rem"
            className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            Check my GitHub
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RecentProjects;
