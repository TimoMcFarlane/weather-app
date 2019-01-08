export const SET_LOADING = 'set_loading';
export const TOGGLE_SIDE_MENU = 'toggle_side_menu';
export const TOGGLE_DATA_TAB = 'toggle_data_tab';
export const TOGGLE_MODAL = 'toggle_modal';

export const setLoading = (val) => {
  return {
    type: SET_LOADING,
    payload: val
  };
};

export const toggleSideMenu = (val) => {
  return {
    type: TOGGLE_SIDE_MENU,
    payload: {
      open: val
    }
  }
}

export const toggleModal = () => {
  return {
    type: TOGGLE_MODAL
  };
};

export const toggleDataTab = () => {
  return {
    type: TOGGLE_DATA_TAB
  }
};