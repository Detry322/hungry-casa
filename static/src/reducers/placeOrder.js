import {
    PLACE_ORDER_LOAD_REQUEST,
    PLACE_ORDER_LOAD_SUCCESS,
    PLACE_ORDER_LOAD_FAILURE,
    PLACE_ORDER_SAVE_REQUEST,
    PLACE_ORDER_SAVE_SUCCESS,
    PLACE_ORDER_SAVE_FAILURE,
} from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    orderMeta: null,
    isLoading: false,
    isSaving: false,
    error: false,
    saveSequenceNumber: 0
};

export default createReducer(initialState, {
    [PLACE_ORDER_LOAD_REQUEST]: (state) =>
        Object.assign({}, state, {
            orderMeta: null,
            saveSequenceNumber: 0,
            isLoading: true
        }),
    [PLACE_ORDER_LOAD_SUCCESS]: (state, orderMeta) =>
        Object.assign({}, state, {
            isLoading: false,
            isSaving: false,
            orderMeta
        }),
    [PLACE_ORDER_SAVE_FAILURE]: (state, error) =>
        Object.assign({}, state, {
            isLoading: false,
            isSaving: false,
            error
        }),
    [PLACE_ORDER_SAVE_REQUEST]: (state) =>
        Object.assign({}, state, {
            isSaving: true
        }),
    [PLACE_ORDER_SAVE_SUCCESS]: (state, response) =>
        Object.assign({}, state, {
            isSaving: false,
            saveSequenceNumber: response.sequence_number,
        }),
    [PLACE_ORDER_SAVE_FAILURE]: (state, error) =>
        Object.assign({}, state, {
            isSaving: false,
            error
        }),
});
