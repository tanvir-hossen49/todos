import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const BorderAccording = () => {
  const [isAccordingOpen, setIsPlusAccording] = useState(null);

  const accordingData = [
    {
      title: "Namaz",
      todos:[
        { id: 1234234, level: "Faza", isChecked: true },
        { id: 2342345, level: "Zohor", isChecked: true },
        { id: 1234532, level: "Asor", isChecked: true },
        { id: 4564534, level: "Magrib", isChecked: true },
      ]
    },
    {
      title: "BBA 2nd Year",
      todos:[
        { id: 1234234, level: "Intermediate Accounting", isChecked: true },
        { id: 2342345, level: "Taxation In Bangladesh", isChecked: true },
      ]
    },
    {
      title: "English",
      todos:[
        { id: 1234234, level: "Grammar", isChecked: true },
        { id: 2342345, level: "Writing", isChecked: true },
        { id: 2342345, level: "Spoken", isChecked: true },
      ]
    },
  ];

  const handleBorderClick = (index) =>
    setIsPlusAccording((prevIndex) => (prevIndex === index ? null : index));

  return (
    <div className="flex gap-3 flex-col w-full">
      {accordingData?.map((according, index) => (
        <article key={index} className="border dark:border-[#e5eaf2] border-black rounded p-3">
          <div
            className="flex gap-2 cursor-pointer items-center justify-between w-full"
            onClick={() => handleBorderClick(index)}>
            <h2 className="text-[#3B9DF8] font-[600] text-[1.2rem]">
              {according.title}
            </h2>
            <p>
              <Plus
                className={`text-[1.3rem] transition-all duration-300 ${
                  isAccordingOpen === index && "rotate-[45deg] !text-[#3B9DF8]"
                }`}
              />
            </p>
          </div>
            <div
              className={`grid  transition-all duration-300 overflow-hidden ease-in-out ${
                isAccordingOpen === index
                  ? "grid-rows-[1fr] opacity-100 mt-4"
                  : "grid-rows-[0fr] opacity-0"
              }`}>
                <div className="overflow-hidden">
                  <ul className="list-disc pl-5 text-[0.9rem] ">
                    {according.todos.map((todo, index) => (
                      <li key={index}>{todo.level}</li>
                    ))}
                  </ul>

                  <Button className="mt-2" aria-label="select model">Select Model</Button>
                </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default BorderAccording;