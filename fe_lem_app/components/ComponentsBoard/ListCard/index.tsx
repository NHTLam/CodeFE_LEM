"use client";

import { toast } from "sonner";
import { Fragment, useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import { notFound, redirect } from "next/navigation";
import { CardInput } from "@/components/ComponentsBoard/CardInput";
import { ListJob } from "@/components/ComponentsBoard/ListJob";
import { DeleteBoard, GetBoard } from "@/services/board-service";
import { Card } from "@/models/card";
import { Board } from "@/models/board";
import { Dialog, Transition } from "@headlessui/react";
import { AlertTriangle } from "lucide-react";

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  async function handleDeleteBoard() {
    const result = await DeleteBoard(board?.id ?? 0);
    window.history.back();
  }

  return (
    <>
      {board?.classroomId !== null ? (
        <button
          type="button"
          className="float-right mr-3 flex w-50 justify-center rounded-sm border border-rose-500 py-1.5 text-sm text-rose-500 hover:bg-rose-100"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete this Board
        </button>
      ) : (
        <></>
      )}

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

      <Transition.Root show={showDeleteModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowDeleteModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className="relative transform overflow-hidden rounded-lg
                        bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                >
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div
                        className="mx-auto flex h-12 w-12 flex-shrink-0 items-center 
                        justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                      >
                        <AlertTriangle
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Delete Board
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete this board?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm 
                        font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={handleDeleteBoard}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 
                        shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
