import {
  NEW_WORK_ITEM_ITEM,
  UPDATE_WORK_ITEM_ITEM,
  UPDATE_WORK_ITEMS,
  REMOVE_WORK_ITEM,
  ADD_STAGE,
  REMOVE_STAGE,
  INIT_STATE
} from "./actions";
import stages from "./stages";
import { createUUID } from "./utils";

export const getInitialState = stages => ({
  ...stages.reduce((mem, { key }) => {
    mem[key] = [];
    return mem;
  }, {}),
  searchTerm: ""
});

const initialState = getInitialState(stages);

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INIT_STATE: {
      return{
        ...state,
        ...action.payload,
      }
    }

    case ADD_STAGE: {
      return {
        ...state,
        [`${action.payload.key}`]: []
      }
    }

    case REMOVE_STAGE: {
      delete state[`${action.payload.id}`]
      return{
        ...state
      }
    }

    case NEW_WORK_ITEM_ITEM: {
      const now = new Date().getTime();
      const stage = action.payload;
      return {
        ...state,
        [stage]: [
          ...state[stage],
          {
            id: createUUID(),
            editMode: true,
            created: now,
            updated: now
          },
        ]
      };
    }

    case UPDATE_WORK_ITEM_ITEM: {
      const { taskID, text, stage, index } = action.payload;
      const now = new Date().getTime();
      return {
        ...state,
        [stage]: state[stage].map(item => {
          if (item.id !== taskID) {
            return item;
          }
          return {
            ...item,
            text,
            index,
            editMode: false,
            updated: now
          };
        })
      };
    }

    case UPDATE_WORK_ITEMS: {
      return {
        ...state,
        ...action.payload
      };
    }

    case REMOVE_WORK_ITEM: {
      const { stage, taskID } = action.payload;
      return {
        ...state,
        [stage]: state[stage].filter(t => t.id !== taskID)
      };
    }

    default:
      return state;
  }
}
