import { useMutation } from "@apollo/client";
import React, { useRef, useState } from "react";
import { CREATE_CARD } from "WorkItems/gq";
import useOnClickOutside from "WorkItems/utils/useOnClickOutside";

export default function EditableWorkItem({ task, stage, removeWorkItem, updateWorkItem }) {
  const elementToEdit = useRef(null);
  const [text, setText] = useState(task.text || "");
  const [isEditing, setIsEditing] = useState(task.editMode);
  const [showAnimation, setShowAnimation] = useState(false);
  let timer;

  const [createCard] = useMutation(CREATE_CARD);

  useOnClickOutside(elementToEdit, () => {
    handleEmptyWorkItem();
  });

  function handleTextChange(e) {
    setText(e.target.value);
  }

  async function handleWorkItemUpdate() {
    if (!text) {
      removeWorkItem({ taskID: task.id, stage });
    } else {
      try {
        // Execute the mutation
        let result = await createCard({
          variables: {
            id: task.id,
            listId: stage,
            text: text
          }
        });

        updateWorkItem({
          taskID: result.data.createCard.card.id,
          text: result.data.createCard.card.text,
          stage: result.data.createCard.card.listId,
          index: result.data.createCard.card.index
        });

      } catch (error) {
        // console.log("error", error)
        alert(error)
      }
    }

    setIsEditing(false);
    setShowAnimation(true);
    timer = setTimeout(() => {
      setShowAnimation(false);
      clearTimeout(timer);
    }, 600);

  }

  function handleEmptyWorkItem() {
    if (!task.text) {
      removeWorkItem({ taskID: task.id, stage });
    } else {
      setText(task.text);
      setIsEditing(false);
    }
  }

  function handleKeyPress(event) {
    if (event.keyCode === 13) handleWorkItemUpdate();
    if (event.keyCode === 27) handleEmptyWorkItem();
  }

  return (
    <div
      className={`${showAnimation && "opacity-0 transform -translate-x-10"} w-full`}
      onDoubleClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <div ref={elementToEdit} className="">
          <input
            className="font-heading txt-3xl font-extra-black focus:border-2 focus:border-blue-400 focus:outline-0 rounded-lg text-base"
            type="text"
            placeholder="New work item"
            value={text}
            onChange={handleTextChange}
            onKeyUp={handleKeyPress}
            autoFocus
          />
        </div>
      ) : (
        <div className="">
          <div className="text-shadow-customs text-kb_txt text-sm mt-[2px]">{task.text}</div>
        </div>
      )}
    </div>
  );
}
