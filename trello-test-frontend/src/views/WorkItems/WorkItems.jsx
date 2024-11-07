import React, {useEffect, useState, useContext} from "react";
import {useQuery, useMutation} from "@apollo/client";
import {DragDropContext, Droppable} from "@hello-pangea/dnd";

import {Store} from "../../store/Store";
import Stage from "../Stage";
import Pop from "../Pop";
import Icon from "Components/Icon";

import {
  UPDATE_WORK_ITEMS,
  REMOVE_WORK_ITEM,
  NEW_WORK_ITEM_ITEM,
  UPDATE_WORK_ITEM_ITEM,
  ADD_STAGE,
  REMOVE_STAGE,
  INIT_STATE,
} from "../../store/actions/actions";

import {getListStyle, handleDragEnd} from "../../utils/drag";
import {getInitialState} from "../../store/reducers/reducer";

import {GET_DATA} from "graphql/queries";
import {
  CREATE_LIST,
  CARD_INDEX_DRAG,
  CARD_INDEX_DRAG_TO_OTHER,
  DELETE_LIST,
  UPDATE_LIST,
  DELETE_CARD,
} from "graphql/mutations";

function WorkItems() {
  // Access the global state and dispatch function from the Store context
  const {state, dispatch} = useContext(Store);

  // Apollo Client queries and mutations
  const {loading, error, data} = useQuery(GET_DATA);
  const [createList] = useMutation(CREATE_LIST);
  const [cardIndexDrag] = useMutation(CARD_INDEX_DRAG);
  const [cardIndexDragToOther] = useMutation(CARD_INDEX_DRAG_TO_OTHER);
  const [deleteList] = useMutation(DELETE_LIST);
  const [updateList] = useMutation(UPDATE_LIST);
  const [deleteCard] = useMutation(DELETE_CARD);

  // Local state management
  const [sortList, setSortList] = useState([]);
  const [stageList, setStageList] = useState([]);
  const [newListText, setNewListText] = useState("");
  const [isAddListMode, setIsAddListMode] = useState(false);

  // Initialize state when data is loaded
  useEffect(() => {
    if (data) {
      const payload = getInitialState([...data.getAllList]);

      data.getAllCard?.forEach((card) => {
        payload[card.listId]?.push({
          id: card.id,
          text: card.text,
          index: card.index,
          editMode: card.editMode,
          created: new Date(card.created),
          updated: new Date(card.updated),
        });
      });

      dispatch({type: INIT_STATE, payload});

      const sortedStages = [...data.getAllList].sort(
        (a, b) => new Date(a.created) - new Date(b.created)
      );
      setStageList(sortedStages);
    }
  }, [data, dispatch]);

  // Initialize sortList when stageList changes
  useEffect(() => {
    setSortList(stageList.map(() => "custom"));
  }, [stageList]);

  // Handle loading and error states from Apollo
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Dispatch action creators
  const updateWorkItems = (payload) => dispatch({type: UPDATE_WORK_ITEMS, payload});
  const addEmptyWorkItem = (payload) => dispatch({type: NEW_WORK_ITEM_ITEM, payload});
  const updateWorkItem = (payload) => {
    clearSortList();
    dispatch({type: UPDATE_WORK_ITEM_ITEM, payload});
  };
  const removeWorkItem = async (payload) => {
    try {
      await deleteCard({variables: {id: payload.taskID}});
      dispatch({type: REMOVE_WORK_ITEM, payload});
    } catch (err) {
      alert(err.message);
    }
  };
  const addStage = (payload) => dispatch({type: ADD_STAGE, payload});
  const removeStage = async (payload) => {
    const updatedStageList = stageList.filter((_, idx) => idx !== payload.pos);
    setStageList(updatedStageList);

    try {
      await deleteList({variables: {id: payload.id}});
      dispatch({type: REMOVE_STAGE, payload});
    } catch (err) {
      alert(err.message);
    }
  };

  const updateSortList = async (id, index, value) => {
    const updatedSortList = [...sortList];
    updatedSortList[index] = value;
    setSortList(updatedSortList);

    try {
      await updateList({variables: {id, sort: value}});
    } catch (err) {
      alert(err.message);
    }
  };

  const getList = (key) => state.tasks[key] || [];

  const onDragEnd = (result) => {
    clearSortList();
    handleDragEnd({result, updateWorkItems, getList, cardIndexDrag, cardIndexDragToOther});
  };

  const getStageData = (key, sort) => {
    const tasks = getList(key);
    const sortedTasks = [...tasks];

    switch (sort) {
      case "newest":
        return sortedTasks.sort((a, b) => new Date(b.created) - new Date(a.created));
      case "oldest":
        return sortedTasks.sort((a, b) => new Date(a.created) - new Date(b.created));
      case "update":
        return sortedTasks.sort((a, b) => new Date(b.updated) - new Date(a.updated));
      case "alpha":
        return sortedTasks.sort((a, b) => a.text.localeCompare(b.text));
      case "custom":
        return sortedTasks.sort((a, b) => a.index - b.index);
      default:
        return tasks;
    }
  };

  const clearSortList = () => {
    setSortList(Array(sortList.length).fill("default"));
  };

  const handleNewListTextChange = (e) => {
    setNewListText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addNewList();
  };

  const addNewList = async () => {
    try {
      const result = await createList({variables: {title: newListText}});
      const newStage = {
        key: result.data.createList.list.key,
        title: result.data.createList.list.title,
        sort: result.data.createList.list.sort,
      };
      setStageList([...stageList, newStage]);
      addStage(newStage);
      setIsAddListMode(false);
      setNewListText("");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className='px-4 py-8 bg-gradient-to-br from-teal-100 via-gray-300 to-fuchsia-100 bg-cover min-h-screen'>
      <h1 className='font-heading text-4xl text-gray-800 mb-8'>Micro Kanban</h1>
      <div className='py-4 w-full relative overflow-x-auto overflow-y-hidden h-[calc(100vh-80px)]'>
        <div className='flex gap-8 justify-start items-start px-4'>
          <DragDropContext onDragEnd={onDragEnd}>
            {stageList.map(({key, title}, index) => (
              <div className='w-[400px]' key={key}>
                <div className='p-4 bg-gradient-to-b from-indigo-100 to-indigo-300 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
                  <div className='flex justify-between items-center mb-2'>
                    <h2 className='text-kb_txt font-semibold text-base'>{title}</h2>
                    <Pop
                      addEmptyWorkItem={addEmptyWorkItem}
                      updateSortList={updateSortList}
                      removeStage={removeStage}
                      id={key}
                      pos={index}
                    />
                  </div>
                  <Droppable droppableId={key}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        className={`space-y-2 p-3 rounded-lg transition-colors duration-300 ${
                          snapshot.isDraggingOver ? "bg-indigo-200" : "bg-transparent"
                        }`}>
                        <Stage
                          updateWorkItem={updateWorkItem}
                          removeWorkItem={removeWorkItem}
                          stage={key}
                          title={title}
                          data={getStageData(key, sortList[index])}
                        />
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  <button
                    className='mt-3 w-full flex items-center justify-center bg-gradient-to-r from-blue-400 to-teal-500 hover:from-orange-500 hover:to-yellow-300 text-white py-2 rounded-lg transition-transform duration-200 transform hover:scale-105'
                    onClick={() => addEmptyWorkItem(key)}>
                    <Icon type='add' width='20' height='20' className='mr-2' />
                    <span className='text-sm font-medium'>Add a work item</span>
                  </button>
                </div>
              </div>
            ))}
            <div className='w-[272px]'>
              <div
                className={`p-3 shadow-lg rounded-lg transition-colors duration-200 ${
                  !isAddListMode
                    ? "bg-kb_bg-add_plan hover:bg-kb_bg-add_plan_hover cursor-pointer"
                    : "bg-kb_bg-plan"
                }`}
                onClick={() => !isAddListMode && setIsAddListMode(true)}>
                {isAddListMode ? (
                  <>
                    <input
                      className='block w-full bg-kb_bg-card text-kb_txt placeholder-kb_txt rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                      type='text'
                      placeholder='Enter list title...'
                      value={newListText}
                      onChange={handleNewListTextChange}
                      onKeyPress={handleKeyPress}
                      autoFocus
                    />
                    <div className='flex items-center'>
                      <button
                        className='text-sm text-white bg-fuchsia-600 hover:bg-indigo-700 rounded px-3 py-1 mr-2'
                        onClick={addNewList}>
                        Add List
                      </button>
                      <button
                        className='text-kb_txt hover:text-white'
                        onClick={() => {
                          setIsAddListMode(false);
                          setNewListText("");
                        }}>
                        <Icon type='remove' width='16' height='16' />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className='flex items-center'>
                    <Icon type='add' width='16' height='16' className='text-white mr-2' />
                    <span className='text-sm text-white font-medium'>Add another list</span>
                  </div>
                )}
              </div>
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default WorkItems;
