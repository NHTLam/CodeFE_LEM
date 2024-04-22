"use client";

import { ElementRef, useRef, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";

import { cn } from "@/lib/utils";
//import { ListWithCards } from "@/types";

import { CardForm } from "@/components/ComponentsBoard/CardForm";
import { JobItem } from "@/components/ComponentsBoard/JobItem";
import { CardHeader } from "@/components/ComponentsBoard/CardHeader";
import { Card } from "@/models/card";

interface ListJobProps {
  data: Card;
  index: number;
}

export const ListJob = ({ data, index }: ListJobProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
  };

  if (data.id !== null || data.id !== undefined) {
    return (
      <Draggable draggableId={data.id!.toString()} index={index}>
        {(provided) => (
          <li
            {...provided.draggableProps}
            ref={provided.innerRef}
            className="h-full w-[272px] shrink-0 select-none"
          >
            <div
              {...provided.dragHandleProps}
              className="w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md"
            >
              <CardHeader onAddCard={enableEditing} data={data} />
              <Droppable droppableId={data.id!.toString()} type="card">
                {(provided) => (
                  <ol
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={cn(
                      "mx-1 flex flex-col gap-y-2 px-1 py-0.5",
                      data!.jobs!.length > 0 ? "mt-2" : "mt-0",
                    )}
                  >
                    {data!.jobs!.map((job, index) => (
                      <JobItem index={index} key={job.id} data={job} />
                    ))}
                    {provided.placeholder}
                  </ol>
                )}
              </Droppable>
              <CardForm
                cardId={data.id!}
                isEditing={isEditing}
                enableEditing={enableEditing}
                disableEditing={disableEditing}
              />
            </div>
          </li>
        )}
      </Draggable>
    );
  } else {
    return <></>;
  }
};
