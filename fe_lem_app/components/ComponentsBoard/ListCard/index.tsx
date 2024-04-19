"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

// import { ListWithCards } from "@/types";
// import { useAction } from "@/hooks/use-action";
// import { updateListOrder } from "@/actions/update-list-order";
// import { updateCardOrder } from "@/actions/update-card-order";

import { CardInput } from "@/components/ComponentsBoard/CardInput";
import { ListJob } from "@/components/ComponentsBoard/ListJob";
import { GetBoard } from "@/services/board-service";
import { Card } from "@/models/card";
import { Board } from "@/models/board";

interface ListCardProps {
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const ListCard = ({ boardId }: ListCardProps) => {
  const [orderedCard, setOrderedCard] = useState<Card[] | null>(null);
  const [board, setBoard] = useState<Board | null>(null);

  // const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
  //   onSuccess: () => {
  //     toast.success("List reordered");
  //   },
  //   onError: (error) => {
  //     toast.error(error);
  //   },
  // });

  // const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
  //   onSuccess: () => {
  //     toast.success("Card reordered");
  //   },
  //   onError: (error) => {
  //     toast.error(error);
  //   },
  // });

  useEffect(() => {
    const fecthData = async () => {
      const board = await GetBoard(Number(boardId));
      setOrderedCard(board?.cards ?? null);
      setBoard(board);
    };
    fecthData();
  }, []);

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    // if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // User moves a list
    if (type === "list") {
      const items = reorder(orderedCard!, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index }),
      );

      setOrderedCard(items);
      //executeUpdateListOrder({ items, boardId });
    }

    // User moves a card
    if (type === "card") {
      let neworderedCard = [...orderedCard!];

      // Source and destination list
      const sourceList = neworderedCard.find(
        (list) => list.id === source.droppableId,
      );
      const destList = neworderedCard.find(
        (list) => list.id === destination.droppableId,
      );

      if (!sourceList || !destList) {
        return;
      }

      // Check if jobs exists on the sourceList
      if (!sourceList.jobs) {
        sourceList.jobs = [];
      }

      // Check if jobs exists on the destList
      if (!destList.jobs) {
        destList.jobs = [];
      }

      // Moving the job in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.jobs,
          source.index,
          destination.index,
        );

        reorderedCards.forEach((card, idx) => {
          card.order = idx;
        });

        sourceList.jobs = reorderedCards;

        setOrderedCard(neworderedCard);
        // executeUpdateCardOrder({
        //   boardId: boardId,
        //   items: reorderedCards,
        // });

        // User moves the card to another list
      } else {
        // Remove card from the source list
        const [movedCard] = sourceList.jobs.splice(source.index, 1);

        // Assign the new listId to the moved card
        movedCard.id = destination.droppableId;

        // Add card to the destination list
        destList.jobs.splice(destination.index, 0, movedCard);

        sourceList.jobs.forEach((card, idx) => {
          card.order = idx;
        });

        // Update the order for each card in the destination list
        destList.jobs.forEach((card, idx) => {
          card.order = idx;
        });

        setOrderedCard(neworderedCard);
        // executeUpdateCardOrder({
        //   boardId: boardId,
        //   items: destList.cards,
        // });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex h-full gap-x-3"
          >
            {orderedCard &&
              orderedCard.length > 0 &&
              orderedCard!.map((list, index) => {
                return (
                  <ListJob
                    key={list.id}
                    index={index}
                    data={list}
                    boardData={board ?? {}}
                  />
                );
              })}
            {provided.placeholder}
            <CardInput boardData={board!} />
            <div className="w-1 flex-shrink-0" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
